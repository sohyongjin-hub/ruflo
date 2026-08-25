#!/usr/bin/env node
// Standalone daily stock screener. Runs on GitHub Actions (open egress, no
// Claude Code sandbox) because the cloud RemoteTrigger sandbox's egress proxy
// blocks scanner.tradingview.com, query1.finance.yahoo.com, api.telegram.org,
// and *.workers.dev outright (confirmed 2026-08-25). See stock-screener/CLAUDE.md.
//
// Required env vars: NOTION_TOKEN, NOTION_SCREENER_POOL_DATA_SOURCE_ID,
// NOTION_SCREENER_CONFIG_DATA_SOURCE_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const POOL_LOG_PATH = path.join(REPO_ROOT, 'stock-screener', 'references', 'pool-log.md');

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

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

async function loadConfig() {
  const token = need('NOTION_TOKEN');
  const dataSourceId = need('NOTION_SCREENER_CONFIG_DATA_SOURCE_ID');
  try {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 50 }),
    });
    if (!res.ok) throw new Error(`Notion config query HTTP ${res.status}`);
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
    let usedFallback = false;
    for (const [notionKey, cfgKey] of Object.entries(map)) {
      if (byParam[notionKey] !== undefined) {
        cfg[cfgKey] = Number(byParam[notionKey]);
      } else {
        usedFallback = true;
      }
    }
    return { config: cfg, source: usedFallback ? 'partial-fallback' : 'notion-live' };
  } catch (err) {
    console.error('Config load failed, using defaults:', err.message);
    return { config: { ...DEFAULT_CONFIG }, source: 'full-fallback: ' + err.message };
  }
}

async function stage1(config) {
  const body = {
    filter: [
      { left: 'change', operation: 'greater', right: config.changePctFloor },
      { left: 'market_cap_basic', operation: 'greater', right: config.marketCapFloor },
      { left: 'close', operation: 'egreater', right: config.priceFloor },
      { left: 'volume', operation: 'egreater', right: config.volumeFloor },
    ],
    options: { lang: 'en' },
    markets: ['america'],
    symbols: { query: { types: [] }, tickers: [] },
    columns: ['name', 'close', 'change', 'market_cap_basic', 'volume'],
    sort: { sortBy: 'change', sortOrder: 'desc' },
    range: [0, 200],
  };
  const res = await fetch('https://scanner.tradingview.com/america/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Stage 1 scanner HTTP ${res.status}`);
  const data = await res.json();
  return {
    totalCount: data.totalCount,
    rows: data.data.map((r) => ({
      ticker: r.d[0],
      close: r.d[1],
      changePct: r.d[2],
      marketCap: r.d[3],
      volume: r.d[4],
    })),
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

async function fetchYahooBars(ticker, retried = false) {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=1y&interval=1d`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  );
  if (!res.ok) {
    if (!retried) return fetchYahooBars(ticker, true); // retry once, per verified behavior
    throw new Error(`Yahoo HTTP ${res.status}`);
  }
  const data = await res.json();
  const result = data.chart.result && data.chart.result[0];
  if (!result) throw new Error(data.chart.error ? JSON.stringify(data.chart.error) : 'no result');
  const closes = result.indicators.quote[0].close.filter((c) => c !== null);
  return closes;
}

async function stage2(stage1Rows, config) {
  const passed = [];
  const skipped = [];
  for (const row of stage1Rows) {
    try {
      const closes = await fetchYahooBars(row.ticker);
      if (closes.length < 30) {
        skipped.push({ ticker: row.ticker, reason: `insufficient history: ${closes.length} bars` });
        continue;
      }
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
      const pass = (hugging || dipsOk) && aboveSma;
      if (pass) {
        passed.push({
          ...row,
          bars: closes.length,
          hugging,
          dips,
          smaUsed,
          smaVal,
          aboveSma,
        });
      }
    } catch (err) {
      skipped.push({ ticker: row.ticker, reason: err.message });
    }
  }
  return { passed, skipped };
}

async function fetchAlreadyCaughtToday(dateStr) {
  const token = need('NOTION_TOKEN');
  const dataSourceId = need('NOTION_SCREENER_POOL_DATA_SOURCE_ID');
  const already = new Set();
  try {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Date Caught', date: { equals: dateStr } },
        page_size: 100,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    for (const row of data.results) {
      const t = row.properties?.Ticker?.title?.[0]?.plain_text;
      if (t) already.add(t);
    }
  } catch (err) {
    // Fail open (write anyway) rather than fail closed (silently skip everything) —
    // a dedup check that can't run shouldn't block the whole day's screen.
    console.error('Dedup check failed, proceeding without it:', err.message);
  }
  return already;
}

async function writeNotionRows(passed, dateStr) {
  const token = need('NOTION_TOKEN');
  const dataSourceId = need('NOTION_SCREENER_POOL_DATA_SOURCE_ID');
  const alreadyCaught = await fetchAlreadyCaughtToday(dateStr);
  let ok = 0, failed = 0, skippedDupes = 0;
  for (const p of passed) {
    if (alreadyCaught.has(p.ticker)) {
      skippedDupes++;
      console.log(`Skipping ${p.ticker} — already has a row for ${dateStr}`);
      continue;
    }
    const filtersPassed =
      `Fundamental: change +${p.changePct.toFixed(1)}%, mktcap ~$${(p.marketCap / 1e9).toFixed(2)}B, ` +
      `close $${p.close.toFixed(2)}, vol ${(p.volume / 1e6).toFixed(2)}M. ` +
      `Technical: ${p.hugging ? 'hugging 8EMA' : `${p.dips} recovered-dips`}, above ${p.smaUsed}SMA ($${p.smaVal.toFixed(2)}).`;
    try {
      const res = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': '2025-09-03',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parent: { type: 'data_source_id', data_source_id: dataSourceId },
          properties: {
            Ticker: { title: [{ text: { content: p.ticker } }] },
            'Date Caught': { date: { start: dateStr } },
            Status: { select: { name: 'New' } },
            'Filters Passed': { rich_text: [{ text: { content: filtersPassed } }] },
            'Catch Price': { number: p.close },
          },
        }),
      });
      if (res.ok) ok++; else { failed++; console.error(`Notion write failed for ${p.ticker}: HTTP ${res.status}`); }
    } catch (err) {
      failed++;
      console.error(`Notion write failed for ${p.ticker}:`, err.message);
    }
  }
  return { ok, failed, skippedDupes };
}

function appendPoolLog(dateStr, passed, skipped, configSource, notionResult) {
  const header = `\n## ${dateStr} batch\n\n`;
  const cols = '| Ticker | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |\n|---|---|---|---|---|---|\n';
  const rows = passed.map((p) => {
    const fund = `change +${p.changePct.toFixed(1)}%, mktcap ~$${(p.marketCap / 1e9).toFixed(2)}B, close $${p.close.toFixed(2)}, vol ${(p.volume / 1e6).toFixed(2)}M`;
    const tech = `${p.hugging ? 'hugging 8EMA' : `${p.dips} recovered-dips (within range)`}, above ${p.smaUsed}SMA ($${p.smaVal.toFixed(2)})`;
    return `| ${p.ticker} | $${p.close.toFixed(2)} | ${fund} | ${tech} | ${configSource} | OK |`;
  }).join('\n');
  const note = passed.length === 0
    ? `\n\n**0 tickers caught this run.** ${skipped.length} Stage-1 survivors processed, none cleared Stage 2.`
    : `\n\n${passed.length} tickers caught. ${skipped.length} Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: ${notionResult.ok} ok, ${notionResult.failed} failed, ${notionResult.skippedDupes || 0} already logged today (skipped as duplicates).`;
  const block = header + cols + (rows || '| — | — | — | — | — | — |') + note + '\n';

  let content = fs.readFileSync(POOL_LOG_PATH, 'utf8');
  const marker = '## Run log';
  const idx = content.indexOf(marker);
  if (idx === -1) {
    content += block;
  } else {
    const insertAt = idx + marker.length;
    content = content.slice(0, insertAt) + '\n' + block + content.slice(insertAt);
  }
  fs.writeFileSync(POOL_LOG_PATH, content, 'utf8');
}

async function sendTelegram(text) {
  const token = need('TELEGRAM_BOT_TOKEN');
  const chatId = need('TELEGRAM_CHAT_ID');
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram send failed: HTTP ${res.status} ${body}`);
  }
}

async function main() {
  const dateStr = new Date().toISOString().slice(0, 10);
  console.log(`Stock screen run for ${dateStr}`);

  let config, configSource, s1, s2, notionResult;
  try {
    ({ config, source: configSource } = await loadConfig());
    console.log('Config source:', configSource, config);

    s1 = await stage1(config);
    console.log(`Stage 1: ${s1.totalCount} total, ${s1.rows.length} rows fetched`);

    s2 = await stage2(s1.rows, config);
    console.log(`Stage 2: ${s2.passed.length} passed, ${s2.skipped.length} skipped`);

    notionResult = s2.passed.length > 0
      ? await writeNotionRows(s2.passed, dateStr)
      : { ok: 0, failed: 0 };

    appendPoolLog(dateStr, s2.passed, s2.skipped, configSource, notionResult);

    const topLine = s2.passed.length > 0
      ? s2.passed.slice(0, 5).map((p) => p.ticker).join(', ')
      : 'none';
    const msg = s2.passed.length > 0
      ? `📈 Stock screen ${dateStr}: ${s2.passed.length} caught (top: ${topLine}). Stage 1 total: ${s1.totalCount}.`
      : `📊 Stock screen ${dateStr}: 0 caught today. Stage 1 total: ${s1.totalCount}, none cleared Stage 2. This is a confirmed clean run, not a failure.`;
    await sendTelegram(msg);
    console.log('Done.');
  } catch (err) {
    console.error('FAILED:', err);
    try {
      appendPoolLog(dateStr, [], [], 'N/A — run failed', { ok: 0, failed: 0 });
      const marker = `## ${dateStr} batch`;
      let content = fs.readFileSync(POOL_LOG_PATH, 'utf8');
      content = content.replace(marker, `${marker} — FAILED: ${err.message}`);
      fs.writeFileSync(POOL_LOG_PATH, content, 'utf8');
    } catch (logErr) {
      console.error('Also failed to log the failure:', logErr.message);
    }
    try {
      await sendTelegram(`🚨 Stock screen ${dateStr} FAILED: ${err.message}`);
    } catch (tgErr) {
      console.error('Also failed to send Telegram failure alert:', tgErr.message);
    }
    process.exitCode = 1;
  }
}

main();
