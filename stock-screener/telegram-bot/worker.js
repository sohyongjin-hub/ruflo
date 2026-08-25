// Interactive Telegram bot for on-demand ticker screening.
// Deployed as a Cloudflare Worker, receiving updates via Telegram webhook.
// Separate from the scheduled GitHub Actions / cloud-routine jobs in
// stock-screener/scripts/ -- this is the two-way, user-initiated path.
// See stock-screener/CLAUDE.md "Interactive /screen bot" for the full design.

const DEFAULT_CONFIG = {
  changePctFloor: 3,
  marketCapFloor: 1_000_000_000,
  priceFloor: 1,
  volumeFloor: 500_000,
  emaLength: 8,
  smaLength: 200,
  smaFallbackLength: 100,
  minDips: 2,
  maxDips: 4,
};

async function loadConfig(env) {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/data_sources/${env.NOTION_SCREENER_CONFIG_DATA_SOURCE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.NOTION_TOKEN}`,
          'Notion-Version': '2025-09-03',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_size: 50 }),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const byParam = {};
    for (const row of data.results) {
      const p = row.properties.Parameter?.title?.[0]?.plain_text;
      const v = row.properties.Value?.rich_text?.[0]?.plain_text;
      if (p && v !== undefined) byParam[p] = v;
    }
    const cfg = { ...DEFAULT_CONFIG };
    const map = {
      'Change % floor': 'changePctFloor',
      'Market cap floor': 'marketCapFloor',
      'Price floor': 'priceFloor',
      'Volume floor': 'volumeFloor',
      'EMA length': 'emaLength',
      'SMA length': 'smaLength',
      'SMA fallback length': 'smaFallbackLength',
      'Min recovered-dip count': 'minDips',
      'Max recovered-dip count': 'maxDips',
    };
    for (const [notionKey, cfgKey] of Object.entries(map)) {
      if (byParam[notionKey] !== undefined) cfg[cfgKey] = Number(byParam[notionKey]);
    }
    return cfg;
  } catch (err) {
    console.error('Config load failed, using defaults:', err.message);
    return { ...DEFAULT_CONFIG };
  }
}

async function fetchTickerFundamentals(ticker) {
  const res = await fetch('https://scanner.tradingview.com/america/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filter: [{ left: 'name', operation: 'equal', right: ticker }],
      options: { lang: 'en' },
      markets: ['america'],
      symbols: { query: { types: [] }, tickers: [] },
      columns: ['name', 'description', 'close', 'change', 'market_cap_basic', 'volume'],
      range: [0, 5],
    }),
  });
  if (!res.ok) throw new Error(`TradingView scanner HTTP ${res.status}`);
  const data = await res.json();
  const row = data.data?.find((r) => r.d[0] === ticker);
  if (!row) return null; // ticker not found / not on US market / delisted
  return {
    ticker: row.d[0],
    companyName: row.d[1],
    close: row.d[2],
    changePct: row.d[3],
    marketCap: row.d[4],
    volume: row.d[5],
  };
}

function ema(vals, length) {
  const k = 2 / (length + 1);
  let e = vals[0];
  const out = [e];
  for (let i = 1; i < vals.length; i++) { e = vals[i] * k + e * (1 - k); out.push(e); }
  return out;
}
function sma(vals, length) {
  const out = [];
  for (let i = 0; i < vals.length; i++) {
    if (i + 1 < length) out.push(null);
    else { let s = 0; for (let j = i + 1 - length; j <= i; j++) s += vals[j]; out.push(s / length); }
  }
  return out;
}
function countRecoveredDips(closes, emaVals) {
  let count = 0, below = false;
  for (let i = 1; i < closes.length; i++) {
    if (closes[i] < emaVals[i]) below = true;
    else if (below && closes[i] >= emaVals[i]) { count++; below = false; }
  }
  return count;
}

async function fetchTechnicals(ticker, config) {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=1y&interval=1d`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  );
  if (!res.ok) throw new Error(`Yahoo HTTP ${res.status}`);
  const data = await res.json();
  const result = data.chart.result && data.chart.result[0];
  if (!result) throw new Error(data.chart.error ? JSON.stringify(data.chart.error) : 'no chart data');
  const closes = result.indicators.quote[0].close.filter((c) => c !== null);
  if (closes.length < 30) return { insufficientHistory: true, bars: closes.length };

  const e = ema(closes, config.emaLength);
  const s200 = sma(closes, config.smaLength);
  const s100 = sma(closes, config.smaFallbackLength);
  const lastClose = closes[closes.length - 1];
  const lastEma = e[e.length - 1];
  const hugging = Math.abs(lastClose - lastEma) / lastEma < 0.015;
  const dips = countRecoveredDips(closes.slice(-60), e.slice(-60));
  const dipsOk = dips >= config.minDips && dips <= config.maxDips;
  const smaUsed = s200[s200.length - 1] !== null ? config.smaLength : config.smaFallbackLength;
  const smaVal = smaUsed === config.smaLength ? s200[s200.length - 1] : s100[s100.length - 1];
  const aboveSma = smaVal !== null && lastClose > smaVal;

  return { hugging, dips, dipsOk, smaUsed, smaVal, aboveSma, lastClose, lastEma };
}

async function screenTicker(rawTicker, env) {
  const ticker = rawTicker.trim().toUpperCase();
  const config = await loadConfig(env);
  const fund = await fetchTickerFundamentals(ticker);

  if (!fund) {
    return { ticker, notFound: true };
  }

  const fundChecks = [
    { label: `Change ≥ ${config.changePctFloor}%`, value: `${fund.changePct.toFixed(2)}%`, pass: fund.changePct >= config.changePctFloor },
    { label: `Market cap > $${(config.marketCapFloor / 1e9).toFixed(1)}B`, value: `$${(fund.marketCap / 1e9).toFixed(2)}B`, pass: fund.marketCap > config.marketCapFloor },
    { label: `Price ≥ $${config.priceFloor}`, value: `$${fund.close.toFixed(2)}`, pass: fund.close >= config.priceFloor },
    { label: `Volume ≥ ${(config.volumeFloor / 1e3).toFixed(0)}K`, value: `${(fund.volume / 1e3).toFixed(0)}K`, pass: fund.volume >= config.volumeFloor },
  ];
  const stage1Pass = fundChecks.every((c) => c.pass);

  let stage2Pass = false;
  let tech = null;
  if (stage1Pass) {
    tech = await fetchTechnicals(ticker, config);
    if (!tech.insufficientHistory) {
      stage2Pass = (tech.hugging || tech.dipsOk) && tech.aboveSma;
    }
  }

  return {
    ticker,
    fund,
    fundChecks,
    stage1Pass,
    tech,
    stage2Pass: stage1Pass && stage2Pass,
    config,
  };
}

function formatScreenResult(result) {
  if (result.notFound) {
    return `❔ Couldn't find "${result.ticker}" on the US market scanner — check the symbol and try again.`;
  }
  const { ticker, fund, fundChecks, stage1Pass, tech, stage2Pass } = result;
  const fundLines = fundChecks
    .map((c) => `${c.pass ? '✅' : '❌'} ${c.label} — actual: ${c.value}`)
    .join('\n');

  let msg = `📊 ${ticker} — ${fund.companyName}\n\n*Fundamental check:*\n${fundLines}\n`;

  if (!stage1Pass) {
    msg += `\n❌ *Overall: FAILED fundamental screen.* Doesn't clear enough of the broad-market filters to proceed to the technical check.`;
    return msg;
  }

  msg += `\n✅ Fundamental screen passed. Proceeding to technical check...\n\n*Technical check:*\n`;
  if (tech.insufficientHistory) {
    msg += `❌ Only ${tech.bars} days of trading history — not enough for a reliable EMA/SMA read.`;
    msg += `\n\n❌ *Overall: FAILED* — insufficient trading history.`;
    return msg;
  }

  const emaLine = tech.hugging
    ? `✅ Hugging the ${result.config.emaLength}EMA (within tolerance)`
    : tech.dipsOk
      ? `✅ Not hugging, but ${tech.dips} recovered-dip(s) in the last 60 days (within ${result.config.minDips}-${result.config.maxDips} range)`
      : `❌ Not hugging the EMA, and ${tech.dips} recovered-dip(s) is outside the ${result.config.minDips}-${result.config.maxDips} range`;
  const smaLine = tech.aboveSma
    ? `✅ Trading above the ${tech.smaUsed}SMA ($${tech.smaVal.toFixed(2)}), currently $${tech.lastClose.toFixed(2)}`
    : `❌ Trading below the ${tech.smaUsed}SMA ($${tech.smaVal.toFixed(2)}), currently $${tech.lastClose.toFixed(2)}`;

  msg += `${emaLine}\n${smaLine}\n`;
  msg += stage2Pass
    ? `\n✅ *Overall: PASSED both stages.*`
    : `\n❌ *Overall: FAILED technical screen.*`;
  return msg;
}

async function sendTelegram(env, chatId, text, replyMarkup) {
  const body = { chat_id: chatId, text, parse_mode: 'Markdown' };
  if (replyMarkup) body.reply_markup = replyMarkup;
  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function addToPool(result, env) {
  const dateStr = new Date().toISOString().slice(0, 10);
  // Same-day dedup, matching the scheduled screener's own guard.
  const existing = await fetch(
    `https://api.notion.com/v1/data_sources/${env.NOTION_SCREENER_POOL_DATA_SOURCE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Date Caught', date: { equals: dateStr } },
        page_size: 100,
      }),
    }
  ).then((r) => r.json());
  const alreadyCaught = (existing.results || []).some(
    (row) => row.properties?.Ticker?.title?.[0]?.plain_text === result.ticker
  );
  if (alreadyCaught) return { alreadyCaught: true };

  const { fund, tech, config } = result;
  const filtersPassed =
    `Fundamental: change +${fund.changePct.toFixed(1)}%, mktcap ~$${(fund.marketCap / 1e9).toFixed(2)}B, ` +
    `close $${fund.close.toFixed(2)}, vol ${(fund.volume / 1e6).toFixed(2)}M. ` +
    `Technical: ${tech.hugging ? 'hugging 8EMA' : `${tech.dips} recovered-dips`}, above ${tech.smaUsed}SMA ($${tech.smaVal.toFixed(2)}). ` +
    `[Manually added via Telegram /screen]`;

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { type: 'data_source_id', data_source_id: env.NOTION_SCREENER_POOL_DATA_SOURCE_ID },
      properties: {
        Ticker: { title: [{ text: { content: result.ticker } }] },
        'Company Name': { rich_text: [{ text: { content: fund.companyName || 'Unknown' } }] },
        'Date Caught': { date: { start: dateStr } },
        Status: { select: { name: 'New' } },
        'Filters Passed': { rich_text: [{ text: { content: filtersPassed } }] },
        'Catch Price': { number: fund.close },
      },
    }),
  });
  return { ok: res.ok };
}

async function handleUpdate(update, env) {
  const msg = update.message;
  if (!msg || !msg.text) return;
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  const stateKey = `state:${chatId}`;
  const stateRaw = await env.SCREENER_STATE.get(stateKey);
  const state = stateRaw ? JSON.parse(stateRaw) : null;

  if (text === '/start' || text === '/help') {
    await sendTelegram(env, chatId, 'Send /screen to check a specific ticker against the fundamental + technical screen.');
    return;
  }

  if (text === '/screen') {
    await env.SCREENER_STATE.put(stateKey, JSON.stringify({ step: 'awaiting_ticker' }), { expirationTtl: 600 });
    await sendTelegram(env, chatId, 'Type the ticker you want to screen (e.g. AAPL):');
    return;
  }

  if (state?.step === 'awaiting_ticker') {
    await env.SCREENER_STATE.delete(stateKey);
    await sendTelegram(env, chatId, `Screening ${text.toUpperCase()}...`);
    try {
      const result = await screenTicker(text, env);
      await sendTelegram(env, chatId, formatScreenResult(result));
      if (result.stage2Pass) {
        await env.SCREENER_STATE.put(
          stateKey,
          JSON.stringify({ step: 'awaiting_add_confirm', result }),
          { expirationTtl: 600 }
        );
        await sendTelegram(env, chatId, `Add ${result.ticker} to the Screener Pool? Reply yes or no.`);
      }
    } catch (err) {
      await sendTelegram(env, chatId, `⚠️ Screening failed: ${err.message}`);
    }
    return;
  }

  if (state?.step === 'awaiting_add_confirm') {
    await env.SCREENER_STATE.delete(stateKey);
    const answer = text.toLowerCase();
    if (answer === 'yes' || answer === 'y') {
      try {
        const outcome = await addToPool(state.result, env);
        if (outcome.alreadyCaught) {
          await sendTelegram(env, chatId, `${state.result.ticker} was already caught today — not added again (same-day dedup).`);
        } else if (outcome.ok) {
          await sendTelegram(env, chatId, `✅ Added ${state.result.ticker} to the Screener Pool.`);
        } else {
          await sendTelegram(env, chatId, `⚠️ Notion write failed for ${state.result.ticker}.`);
        }
      } catch (err) {
        await sendTelegram(env, chatId, `⚠️ Failed to add to pool: ${err.message}`);
      }
    } else {
      await sendTelegram(env, chatId, `OK, not added.`);
    }
    return;
  }

  await sendTelegram(env, chatId, 'Send /screen to check a specific ticker.');
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('OK', { status: 200 });

    const secret = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (secret !== env.WEBHOOK_SECRET) {
      return new Response('Forbidden', { status: 403 });
    }

    let update;
    try {
      update = await request.json();
    } catch {
      return new Response('Bad Request', { status: 400 });
    }

    try {
      await handleUpdate(update, env);
    } catch (err) {
      console.error('handleUpdate failed:', err);
    }
    return new Response('OK', { status: 200 });
  },
};
