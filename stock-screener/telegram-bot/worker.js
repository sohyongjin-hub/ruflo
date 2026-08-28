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

// Chunked send for messages that might exceed Telegram's 4096-char cap --
// /level2's combined 5-section report is the one reply from this bot long
// enough to risk it. Same defensive-chunking convention used by
// notify-tracking.js / stock-screen.js elsewhere in this project.
async function sendTelegramChunked(env, chatId, text) {
  const LIMIT = 3900;
  if (text.length <= LIMIT) {
    await sendTelegram(env, chatId, text);
    return;
  }
  let rest = text;
  while (rest.length > 0) {
    await sendTelegram(env, chatId, rest.slice(0, LIMIT));
    rest = rest.slice(LIMIT);
  }
}

// ---------------------------------------------------------------------
// /level2 -- deep-dive research (Fundamentals, Qualitative, Quantitative,
// Catalyst, Technical). See stock-screener/CLAUDE.md "Lane 3 — /level2".
// Fundamentals/Qualitative are cached in the "Company Research" Notion
// database (one row per company); Quantitative/Catalyst/Technical are
// always pulled fresh from data this bot/pipeline already gathers
// elsewhere, never cached, since they're cheap and time-sensitive.
// ---------------------------------------------------------------------

const RESEARCH_STALE_DAYS = 90;

function secUserAgent(env) {
  return `stock-screener (contact: ${env.SEC_CONTACT_EMAIL})`;
}

// SEC's ticker->CIK mapping file is several MB covering every US filer --
// cached in the same KV namespace used for conversation state, 7-day TTL,
// so a normal run of /level2 calls doesn't re-fetch it every time.
async function fetchCikForTicker(ticker, env) {
  const cacheKey = 'sec-cik-map';
  let map = null;
  const cached = await env.SCREENER_STATE.get(cacheKey);
  if (cached) {
    try { map = JSON.parse(cached); } catch { map = null; }
  }
  if (!map) {
    const res = await fetch('https://www.sec.gov/files/company_tickers.json', {
      headers: { 'User-Agent': secUserAgent(env) },
    });
    if (!res.ok) throw new Error(`SEC ticker map HTTP ${res.status}`);
    const data = await res.json();
    map = {};
    for (const key of Object.keys(data)) {
      const row = data[key];
      map[row.ticker] = String(row.cik_str).padStart(10, '0');
    }
    await env.SCREENER_STATE.put(cacheKey, JSON.stringify(map), { expirationTtl: 7 * 24 * 3600 });
  }
  return map[ticker.toUpperCase()] || null;
}

async function fetchCompanyFacts(cik, env) {
  const res = await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`, {
    headers: { 'User-Agent': secUserAgent(env) },
  });
  if (!res.ok) throw new Error(`SEC companyfacts HTTP ${res.status}`);
  return res.json();
}

// Same curated concepts + extraction logic as
// stock-screener/scripts/fetch-fundamentals.js, duplicated here rather than
// imported -- a Cloudflare Worker deployed as a single file can't
// `require()` another script. Keep the two in sync if either changes.
const FUNDAMENTALS_CONCEPTS = [
  { key: 'Revenues', label: 'Revenue', fallbacks: ['RevenueFromContractWithCustomerExcludingAssessedTax'] },
  { key: 'GrossProfit', label: 'Gross Profit' },
  { key: 'OperatingIncomeLoss', label: 'Operating Income' },
  { key: 'NetIncomeLoss', label: 'Net Income' },
  { key: 'EarningsPerShareDiluted', label: 'Diluted EPS', isPerShare: true },
  { key: 'Assets', label: 'Total Assets' },
  { key: 'Liabilities', label: 'Total Liabilities' },
  { key: 'StockholdersEquity', label: "Stockholders' Equity" },
  { key: 'CashAndCashEquivalentsAtCarryingValue', label: 'Cash & Equivalents' },
];

function mostRecentFact(usGaap, concept) {
  const names = [concept.key, ...(concept.fallbacks || [])];
  const unitKey = concept.isPerShare ? 'USD/shares' : 'USD';
  for (const name of names) {
    const node = usGaap[name];
    const entries = node?.units?.[unitKey];
    if (!entries || entries.length === 0) continue;
    const annual = entries.filter((e) => e.form === '10-K' && e.fp === 'FY');
    const quarterly = entries.filter((e) => e.form === '10-Q');
    const pool = annual.length > 0 ? annual : quarterly;
    if (pool.length === 0) continue;
    pool.sort((a, b) => (a.end < b.end ? 1 : -1));
    const best = pool[0];
    return { val: best.val, end: best.end, fy: best.fy, form: best.form };
  }
  return null;
}

function formatUSD(val) {
  const abs = Math.abs(val);
  if (abs >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
  return `$${val.toFixed(2)}`;
}

function extractFundamentals(companyFacts) {
  const usGaap = companyFacts.facts?.['us-gaap'] || {};
  const lines = [];
  for (const concept of FUNDAMENTALS_CONCEPTS) {
    const fact = mostRecentFact(usGaap, concept);
    if (!fact) continue;
    const formatted = concept.isPerShare ? `$${fact.val.toFixed(2)}` : formatUSD(fact.val);
    const period = fact.form === '10-K' ? `FY${fact.fy}` : `period ending ${fact.end}`;
    lines.push(`${concept.label} (${period}, ${fact.form}): ${formatted}`);
  }
  return lines.length > 0
    ? lines.join('\n')
    : 'No structured fundamentals found in SEC EDGAR for this ticker (may be a non-XBRL filer, an ADR, or very recently listed).';
}

async function tavilySearch(query, env) {
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.TAVILY_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, search_depth: 'basic', max_results: 5 }),
  });
  if (!res.ok) throw new Error(`Tavily HTTP ${res.status}`);
  const data = await res.json();
  return data.results || [];
}

const QUALITATIVE_JSON_SCHEMA = {
  type: 'object',
  properties: {
    moat: { type: 'string' },
    competitivePosition: { type: 'string' },
    management: { type: 'string' },
    industryPosition: { type: 'string' },
  },
};

const QUALITATIVE_SYSTEM_PROMPT =
  "You research US-listed public companies for a swing trader. Given search results about a " +
  "ticker, extract only qualitative signal actually present in the sources -- moat/durable " +
  "competitive advantage, competitive position vs peers, management quality/track record, and " +
  "industry position/trends. Leave a field as an empty string if the sources don't say anything " +
  "specific about it -- never invent or pad. Be concise: 1-2 sentences per field. Respond only " +
  "with the JSON object matching the schema.";

// Uses the Workers AI *binding* (env.AI.run), not the REST API stock-screen.js
// calls from GitHub Actions -- this code already runs inside the Worker, so
// no HTTP round-trip is needed, per the Option-C decision in the handover doc.
async function synthesizeQualitative(ticker, searchResults, env) {
  if (!searchResults || searchResults.length === 0) return null;
  const context = searchResults.map((r) => `${r.title}\n${r.url}\n${r.content}`).join('\n\n');
  try {
    const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fp8-fast', {
      messages: [
        { role: 'system', content: QUALITATIVE_SYSTEM_PROMPT },
        { role: 'user', content: `Ticker: ${ticker}\n\nSearch results:\n${context}` },
      ],
      response_format: { type: 'json_schema', json_schema: QUALITATIVE_JSON_SCHEMA },
    });
    // Not yet live-verified which shape the binding returns (no AI binding
    // available from this interactive session to test against) -- check
    // both `result.response` (matches the REST API's envelope) and `result`
    // itself (the binding may return the parsed object directly).
    const raw = result?.response !== undefined ? result.response : result;
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (err) {
    console.error('Workers AI qualitative synthesis failed:', err.message);
    return null;
  }
}

function formatQualitativeForCache(qual) {
  if (!qual) return '(no qualitative signal found)';
  const lines = [];
  if (qual.moat) lines.push(`Moat: ${qual.moat}`);
  if (qual.competitivePosition) lines.push(`Competitive position: ${qual.competitivePosition}`);
  if (qual.management) lines.push(`Management: ${qual.management}`);
  if (qual.industryPosition) lines.push(`Industry position: ${qual.industryPosition}`);
  return lines.length > 0 ? lines.join('\n') : '(no qualitative signal found)';
}

async function fetchExistingResearch(ticker, env) {
  const res = await fetch(
    `https://api.notion.com/v1/data_sources/${env.NOTION_COMPANY_RESEARCH_DATA_SOURCE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filter: { property: 'Ticker', title: { equals: ticker } }, page_size: 1 }),
    }
  );
  if (!res.ok) throw new Error(`Notion Company Research query HTTP ${res.status}`);
  const data = await res.json();
  return data.results[0] || null;
}

function isResearchFresh(page) {
  const lastResearched = page.properties?.['Last Researched']?.date?.start;
  if (!lastResearched) return false;
  const ageDays = (Date.now() - new Date(lastResearched + 'T00:00:00Z').getTime()) / 86400000;
  return ageDays < RESEARCH_STALE_DAYS;
}

// Upsert -- Company Research is one row per company, not per catch event
// (unlike Screener Pool), so a re-research always overwrites the same row.
async function upsertResearch(ticker, fundamentalsText, qualitativeText, sourcesText, dateStr, env) {
  const properties = {
    Fundamentals: { rich_text: [{ text: { content: fundamentalsText.slice(0, 2000) } }] },
    Qualitative: { rich_text: [{ text: { content: qualitativeText.slice(0, 2000) } }] },
    Sources: { rich_text: [{ text: { content: sourcesText.slice(0, 2000) } }] },
    'Last Researched': { date: { start: dateStr } },
  };
  const existing = await fetchExistingResearch(ticker, env);
  const url = existing
    ? `https://api.notion.com/v1/pages/${existing.id}`
    : 'https://api.notion.com/v1/pages';
  const body = existing
    ? { properties }
    : {
        parent: { type: 'data_source_id', data_source_id: env.NOTION_COMPANY_RESEARCH_DATA_SOURCE_ID },
        properties: { Ticker: { title: [{ text: { content: ticker } }] }, ...properties },
      };
  await fetch(url, {
    method: existing ? 'PATCH' : 'POST',
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

// Most recent Screener Pool row for this ticker, for the Catalyst section --
// same-day catch-time verdict from Lane 1, not re-researched here.
async function fetchLatestPoolCatalyst(ticker, env) {
  const res = await fetch(
    `https://api.notion.com/v1/data_sources/${env.NOTION_SCREENER_POOL_DATA_SOURCE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filter: { property: 'Ticker', title: { equals: ticker } }, page_size: 100 }),
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  let latest = null;
  for (const row of data.results || []) {
    const dateCaught = row.properties?.['Date Caught']?.date?.start;
    if (!dateCaught) continue;
    if (!latest || dateCaught > latest.dateCaught) {
      latest = {
        dateCaught,
        confidence: row.properties?.['Catalyst Confidence']?.select?.name,
        reason: row.properties?.['Catalyst Reason']?.rich_text?.[0]?.plain_text,
        sources: row.properties?.['Catalyst Sources']?.rich_text?.[0]?.plain_text,
      };
    }
  }
  return latest;
}

async function buildLevel2Report(ticker, env) {
  const existing = await fetchExistingResearch(ticker, env);
  let fundamentalsText, qualitativeText, lastResearched, cached;

  if (existing && isResearchFresh(existing)) {
    cached = true;
    fundamentalsText = existing.properties?.Fundamentals?.rich_text?.[0]?.plain_text || '(no fundamentals cached)';
    qualitativeText = existing.properties?.Qualitative?.rich_text?.[0]?.plain_text || '(no qualitative cached)';
    lastResearched = existing.properties?.['Last Researched']?.date?.start;
  } else {
    cached = false;
    let fundText;
    try {
      const cik = await fetchCikForTicker(ticker, env);
      fundText = cik
        ? extractFundamentals(await fetchCompanyFacts(cik, env))
        : 'No SEC CIK found for this ticker (may not be a US-listed filer).';
    } catch (err) {
      fundText = `Fundamentals fetch failed: ${err.message}`;
    }
    fundamentalsText = fundText;

    let qualSearchResults = [];
    try {
      qualSearchResults = await tavilySearch(`${ticker} stock moat competitive advantage management industry position`, env);
    } catch (err) {
      console.error('Tavily search failed:', err.message);
    }
    const qualParsed = await synthesizeQualitative(ticker, qualSearchResults, env);
    qualitativeText = formatQualitativeForCache(qualParsed);
    const sourcesText = qualSearchResults.map((r) => r.url).join('; ') || '(no qualitative sources found)';
    lastResearched = new Date().toISOString().slice(0, 10);

    await upsertResearch(ticker, fundamentalsText, qualitativeText, sourcesText, lastResearched, env);
  }

  const fund = await fetchTickerFundamentals(ticker).catch(() => null);
  let tech = null;
  if (fund) {
    try {
      const config = await loadConfig(env);
      tech = await fetchTechnicals(ticker, config);
    } catch (err) {
      console.error('Technical fetch failed:', err.message);
    }
  }
  const catalyst = await fetchLatestPoolCatalyst(ticker, env).catch(() => null);

  const lines = [];
  lines.push(`🔎 *Level 2 — ${ticker}*${fund?.companyName ? ` (${fund.companyName})` : ''}`);
  lines.push(cached ? `_Cached research from ${lastResearched}_` : `_Freshly researched ${lastResearched}_`);
  lines.push('');
  lines.push('*Fundamentals*');
  lines.push(fundamentalsText);
  lines.push('');
  lines.push('*Qualitative*');
  lines.push(qualitativeText);
  lines.push('');
  lines.push('*Quantitative*');
  if (fund) {
    lines.push(`Price: $${fund.close.toFixed(2)} (${fund.changePct >= 0 ? '+' : ''}${fund.changePct.toFixed(2)}%)`);
    lines.push(`Market cap: $${(fund.marketCap / 1e9).toFixed(2)}B, Volume: ${(fund.volume / 1e6).toFixed(2)}M`);
  } else {
    lines.push("(couldn't fetch a live quote for this ticker)");
  }
  lines.push('');
  lines.push('*Catalyst*');
  if (catalyst) {
    lines.push(`${catalyst.confidence || 'Unknown'} (from catch on ${catalyst.dateCaught})`);
    if (catalyst.reason) lines.push(catalyst.reason);
    if (catalyst.sources) lines.push(`Sources: ${catalyst.sources}`);
  } else {
    lines.push('(no catch-day catalyst on record — this ticker may not have gone through the screen yet)');
  }
  lines.push('');
  lines.push('*Technical*');
  if (tech && tech.insufficientHistory) {
    lines.push(`Only ${tech.bars} days of trading history — not enough for a reliable read.`);
  } else if (tech) {
    lines.push(tech.hugging ? 'Hugging the EMA' : `${tech.dips} recovered-dip(s) recently`);
    lines.push(tech.aboveSma ? `Above the ${tech.smaUsed}SMA ($${tech.smaVal.toFixed(2)})` : `Below the ${tech.smaUsed}SMA ($${tech.smaVal.toFixed(2)})`);
  } else {
    lines.push('(not available)');
  }
  return lines.join('\n');
}

async function runLevel2(rawTicker, chatId, env) {
  const ticker = rawTicker.trim().toUpperCase();
  await sendTelegram(env, chatId, `Researching ${ticker} (this can take a few seconds)...`);
  try {
    const report = await buildLevel2Report(ticker, env);
    await sendTelegramChunked(env, chatId, report);
  } catch (err) {
    await sendTelegram(env, chatId, `⚠️ /level2 failed for ${ticker}: ${err.message}`);
  }
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

  // Re-chase check: has this ticker ever been marked Removed before?
  const removedCheck = await fetch(
    `https://api.notion.com/v1/data_sources/${env.NOTION_SCREENER_POOL_DATA_SOURCE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Status', select: { equals: 'Removed' } },
        page_size: 100,
      }),
    }
  ).then((r) => r.json()).catch(() => ({ results: [] }));
  const wasRemoved = (removedCheck.results || []).some(
    (row) => row.properties?.Ticker?.title?.[0]?.plain_text === result.ticker
  );

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
        'Previously Removed': { checkbox: wasRemoved },
      },
    }),
  });
  return { ok: res.ok, wasRemoved };
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
    await sendTelegram(
      env,
      chatId,
      'Send /screen to check a specific ticker against the fundamental + technical screen.\n' +
        'Send /level2 TICKER for deep-dive research (Fundamentals, Qualitative, Quantitative, Catalyst, Technical).'
    );
    return;
  }

  if (text === '/screen') {
    await env.SCREENER_STATE.put(stateKey, JSON.stringify({ step: 'awaiting_ticker' }), { expirationTtl: 600 });
    await sendTelegram(env, chatId, 'Type the ticker you want to screen (e.g. AAPL):');
    return;
  }

  if (text === '/level2' || text.toLowerCase().startsWith('/level2 ')) {
    const tickerArg = text.split(/\s+/)[1];
    if (!tickerArg) {
      await env.SCREENER_STATE.put(stateKey, JSON.stringify({ step: 'awaiting_level2_ticker' }), { expirationTtl: 600 });
      await sendTelegram(env, chatId, 'Type the ticker you want deep research on (e.g. AAPL):');
      return;
    }
    await runLevel2(tickerArg, chatId, env);
    return;
  }

  if (state?.step === 'awaiting_level2_ticker') {
    await env.SCREENER_STATE.delete(stateKey);
    await runLevel2(text, chatId, env);
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
          const warning = outcome.wasRemoved ? `\n⚠️ You've marked ${state.result.ticker} Removed before — check why before re-chasing.` : '';
          await sendTelegram(env, chatId, `✅ Added ${state.result.ticker} to the Screener Pool.${warning}`);
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
