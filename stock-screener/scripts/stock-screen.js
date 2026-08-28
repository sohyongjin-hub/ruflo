#!/usr/bin/env node
// Standalone daily stock screener. Runs on GitHub Actions (open egress, no
// Claude Code sandbox) because the cloud RemoteTrigger sandbox's egress proxy
// blocks scanner.tradingview.com, query1.finance.yahoo.com, api.telegram.org,
// and *.workers.dev outright (confirmed 2026-08-25). See stock-screener/CLAUDE.md.
//
// Mockup 1 (added 2026-08-28): every ticker that clears both stages gets a
// same-run "why did this move enough to get caught today" catalyst search, on
// top of the quant data this script already had. This needs an LLM, which a
// deterministic GitHub Actions script doesn't have on its own -- so it calls
// Cloudflare Workers AI directly over plain HTTP (an open-weight model, free
// tier, no Worker/webhook needed to invoke it) with Tavily supplying the
// search results as context, since Workers AI has no built-in web search.
// Same backend choice as /level2's deep-dive tier, for the same reason: free
// and synchronous, at a known, accepted quality cost against Claude. See
// stock-screener/CLAUDE.md for the full reasoning.
//
// Required env vars: NOTION_TOKEN, NOTION_SCREENER_POOL_DATA_SOURCE_ID,
// NOTION_SCREENER_CONFIG_DATA_SOURCE_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
// CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, TAVILY_API_KEY

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
    columns: ['name', 'description', 'close', 'change', 'market_cap_basic', 'volume'],
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
      companyName: r.d[1],
      close: r.d[2],
      changePct: r.d[3],
      marketCap: r.d[4],
      volume: r.d[5],
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

async function fetchPreviouslyRemovedTickers() {
  const token = need('NOTION_TOKEN');
  const dataSourceId = need('NOTION_SCREENER_POOL_DATA_SOURCE_ID');
  const removed = new Set();
  try {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Status', select: { equals: 'Removed' } },
        page_size: 100,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    for (const row of data.results) {
      const t = row.properties?.Ticker?.title?.[0]?.plain_text;
      if (t) removed.add(t);
    }
  } catch (err) {
    // Fail open — a missed re-chase badge is a UX miss, not worth blocking the run over.
    console.error('Previously-Removed check failed, proceeding without it:', err.message);
  }
  return removed;
}

// Same query pattern as fetchPreviouslyRemovedTickers, broadened: any prior
// row for this ticker (any Status), not just Removed ones. Powers the
// "Repeated" badge -- the user's chosen replacement for automatic passive
// tracking of every catch. Paginated: unlike the Removed-only query, this
// scans the whole table's history, which won't stay under 100 rows for long
// at ~30 catches/day.
async function fetchPriorCatchDates(dateStr) {
  const token = need('NOTION_TOKEN');
  const dataSourceId = need('NOTION_SCREENER_POOL_DATA_SOURCE_ID');
  const priorByTicker = new Map(); // ticker -> most recent prior "Date Caught" (ISO)
  try {
    let cursor;
    do {
      const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': '2025-09-03',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: { property: 'Date Caught', date: { before: dateStr } },
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      for (const row of data.results) {
        const t = row.properties?.Ticker?.title?.[0]?.plain_text;
        const d = row.properties?.['Date Caught']?.date?.start;
        if (t && d) {
          const existing = priorByTicker.get(t);
          if (!existing || d > existing) priorByTicker.set(t, d);
        }
      }
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);
  } catch (err) {
    // Fail open — a missed Repeated badge is a UX miss, not worth blocking the run over.
    console.error('Prior-catch check failed, proceeding without it:', err.message);
  }
  return priorByTicker;
}

async function tavilySearch(query) {
  const apiKey = need('TAVILY_API_KEY');
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, search_depth: 'basic', max_results: 5 }),
  });
  if (!res.ok) throw new Error(`Tavily HTTP ${res.status}`);
  const data = await res.json();
  return data.results || [];
}

const CATALYST_JSON_SCHEMA = {
  type: 'object',
  properties: {
    confidence: {
      type: 'string',
      enum: ['Confirmed catalyst', 'Plausible unconfirmed', 'No clear catalyst found', 'Source error'],
    },
    reason: { type: 'string' },
    sources: { type: 'string' },
  },
  required: ['confidence', 'reason', 'sources'],
};

async function callWorkersAI(messages) {
  const accountId = need('CLOUDFLARE_ACCOUNT_ID');
  const apiToken = need('CLOUDFLARE_API_TOKEN');
  const model = '@cf/meta/llama-3.1-8b-instruct-fp8-fast'; // confirmed JSON-schema-mode compatible
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, response_format: { type: 'json_schema', json_schema: CATALYST_JSON_SCHEMA } }),
  });
  if (!res.ok) throw new Error(`Workers AI HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(`Workers AI error: ${JSON.stringify(data.errors)}`);
  return data.result?.response;
}

const VALID_CATALYST_CONFIDENCE = new Set([
  'Confirmed catalyst',
  'Plausible unconfirmed',
  'No clear catalyst found',
  'Source error',
]);

// Every Mockup 1 catalyst search runs for a ticker that just cleared Stage 1's
// own change% floor -- by construction the day's move is always material, so
// unlike Daily Tracking there's no threshold gate here; every catch gets a
// search. Workers AI has no built-in web search (unlike Claude's server-side
// tool), so Tavily supplies the search results as plain context; the model's
// job is synthesis and classification, not retrieval. JSON-schema mode isn't
// guaranteed to be honored by every model, so the result is still validated,
// not trusted blindly.
async function findCatalyst(ticker, dateStr) {
  try {
    const results = await tavilySearch(`${ticker} stock news ${dateStr}`);
    if (results.length === 0) {
      return { confidence: 'No clear catalyst found', reason: 'Search returned no results for this ticker and date.', sources: '(none found)' };
    }
    const context = results.map((r) => `${r.title}\n${r.url}\n${r.content}`).join('\n\n');
    const messages = [
      {
        role: 'system',
        content: 'You classify why a US-listed stock moved on a given trading day, for a beginner swing trader\'s own research -- never suggest a buy/sell/hold action. Use exactly one confidence value: "Confirmed catalyst" (a named, dated cause tied to a primary filing/press release/official statement, corroborated by 2+ independently-bylined sources -- not two outlets syndicating one wire story), "Plausible unconfirmed" (a coherent narrative resting on a single source or speculation, no primary confirmation), "No clear catalyst found" (the search results don\'t support a defensible driver -- a legitimate outcome, never fabricate a reason to avoid it), or "Source error" (the provided search context is unusable, e.g. empty or irrelevant). Reason: 1-2 sentences. Sources: the actual URLs/headlines you used, semicolon-separated, kept even for "No clear catalyst found".',
      },
      {
        role: 'user',
        content: `Ticker: ${ticker}\nDate: ${dateStr}\n\nSearch results:\n${context}`,
      },
    ];
    const raw = await callWorkersAI(messages);
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed || !VALID_CATALYST_CONFIDENCE.has(parsed.confidence)) {
      return { confidence: 'Source error', reason: 'Model response did not match the expected schema.', sources: `(raw: ${JSON.stringify(raw).slice(0, 300)})` };
    }
    return {
      confidence: parsed.confidence,
      reason: parsed.reason || '(no reason returned)',
      sources: parsed.sources || '(no sources returned)',
    };
  } catch (err) {
    return { confidence: 'Source error', reason: `Catalyst search failed: ${err.message}`, sources: '(none — request error, see Reason)' };
  }
}

async function writeNotionRows(passed, dateStr) {
  const token = need('NOTION_TOKEN');
  const dataSourceId = need('NOTION_SCREENER_POOL_DATA_SOURCE_ID');
  const alreadyCaught = await fetchAlreadyCaughtToday(dateStr);
  const previouslyRemoved = await fetchPreviouslyRemovedTickers();
  const priorCatches = await fetchPriorCatchDates(dateStr);
  let ok = 0, failed = 0, skippedDupes = 0;
  for (const p of passed) {
    if (alreadyCaught.has(p.ticker)) {
      skippedDupes++;
      console.log(`Skipping ${p.ticker} — already has a row for ${dateStr}`);
      continue;
    }
    p.wasRemoved = previouslyRemoved.has(p.ticker);
    p.priorCatchDate = priorCatches.get(p.ticker) || null;
    p.repeated = p.priorCatchDate !== null;
    p.catalyst = await findCatalyst(p.ticker, dateStr);
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
            'Company Name': { rich_text: [{ text: { content: p.companyName || 'Unknown' } }] },
            'Date Caught': { date: { start: dateStr } },
            Status: { select: { name: 'New' } },
            'Filters Passed': { rich_text: [{ text: { content: filtersPassed } }] },
            'Catch Price': { number: p.close },
            'Previously Removed': { checkbox: p.wasRemoved },
            Repeated: { checkbox: p.repeated },
            'Catalyst Confidence': { select: { name: p.catalyst.confidence } },
            'Catalyst Reason': { rich_text: [{ text: { content: p.catalyst.reason.slice(0, 2000) } }] },
            'Catalyst Sources': { rich_text: [{ text: { content: p.catalyst.sources.slice(0, 2000) } }] },
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
  const cols = '| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |\n|---|---|---|---|---|---|---|\n';
  const rows = passed.map((p) => {
    const fund = `change +${p.changePct.toFixed(1)}%, mktcap ~$${(p.marketCap / 1e9).toFixed(2)}B, close $${p.close.toFixed(2)}, vol ${(p.volume / 1e6).toFixed(2)}M`;
    const tech = `${p.hugging ? 'hugging 8EMA' : `${p.dips} recovered-dips (within range)`}, above ${p.smaUsed}SMA ($${p.smaVal.toFixed(2)})`;
    return `| ${p.ticker} | ${p.companyName || 'Unknown'} | $${p.close.toFixed(2)} | ${fund} | ${tech} | ${configSource} | OK |`;
  }).join('\n');
  const note = passed.length === 0
    ? `\n\n**0 tickers caught this run.** ${skipped.length} Stage-1 survivors processed, none cleared Stage 2.`
    : `\n\n${passed.length} tickers caught. ${skipped.length} Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: ${notionResult.ok} ok, ${notionResult.failed} failed, ${notionResult.skippedDupes || 0} already logged today (skipped as duplicates).`;
  const block = header + cols + (rows || '| — | — | — | — | — | — | — |') + note + '\n';

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

const CATALYST_MARK = {
  'Confirmed catalyst': '✅',
  'Plausible unconfirmed': '🟡',
  'No clear catalyst found': '⚪',
  'Source error': '⚠️',
};

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

// Mockup 1: Quantitative + Catalyst, the two sections this pipeline actually
// has real data for on catch day (Fundamentals/Qualitative/Technical are
// /level2's job — see stock-screener/CLAUDE.md). Reason/Sources are
// truncated harder here than in their Notion storage (2000 chars there) —
// Telegram doesn't need the full audit trail, Notion is where that lives.
function formatMockup1(p) {
  const badges = [];
  if (p.repeated) badges.push(`🔁 REPEATED — first caught ${p.priorCatchDate}`);
  if (p.wasRemoved) badges.push('⚠️ previously Removed — check why before re-chasing');
  const badgeLine = badges.length ? `\n${badges.join(' · ')}` : '';
  const mark = CATALYST_MARK[p.catalyst.confidence] || '❔';
  return (
    `📋 ${p.ticker} — ${p.companyName || 'Unknown'}${badgeLine}\n\n` +
    `📊 QUANTITATIVE\n` +
    `Close $${p.close.toFixed(2)} | Vol ${(p.volume / 1e6).toFixed(2)}M | Mkt Cap $${(p.marketCap / 1e9).toFixed(2)}B | Change +${p.changePct.toFixed(1)}%\n\n` +
    `🎯 CATALYST — ${mark} ${p.catalyst.confidence}\n` +
    `${truncate(p.catalyst.reason, 400)}\n` +
    `Sources: ${truncate(p.catalyst.sources, 300)}`
  );
}

// Telegram's sendMessage caps text at 4096 UTF-16 code units; a full day's
// catches (up to ~50 on a heavy day) needs chunking, same approach already
// proven in notify-tracking.js.
const CHUNK_BODY_LIMIT = 3400;

function buildScreenMessages(dateStr, s1, s2) {
  if (s2.passed.length === 0) {
    return [`📊 Stock Screen — ${dateStr}\n0 caught today (${s1.totalCount} passed the broad market filter, none passed the technical check). This is a confirmed clean run, not a failure.`];
  }
  const entries = s2.passed.map(formatMockup1);
  const chunks = [];
  let current = '';
  for (const entry of entries) {
    const piece = current ? `\n\n${entry}` : entry;
    if (current && current.length + piece.length > CHUNK_BODY_LIMIT) {
      chunks.push(current);
      current = entry;
    } else {
      current += piece;
    }
  }
  if (current) chunks.push(current);

  const total = s2.passed.length;
  return chunks.map((body, i) => {
    const part = chunks.length > 1 ? ` (part ${i + 1}/${chunks.length})` : '';
    const header = `📈 Stock Screen — ${dateStr}${part}\n${total} caught (out of ${s1.totalCount} that passed the broad market filter)\n\n`;
    return header + body;
  });
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

  // Fail fast on missing config before any Notion/Telegram writes happen —
  // a lesson from this project's own history: a missing secret checked only
  // inside a per-row error handler once mis-tagged real rows as a false
  // per-row failure state instead of stopping the run. See CLAUDE.md.
  need('NOTION_TOKEN');
  need('NOTION_SCREENER_POOL_DATA_SOURCE_ID');
  need('NOTION_SCREENER_CONFIG_DATA_SOURCE_ID');
  need('TELEGRAM_BOT_TOKEN');
  need('TELEGRAM_CHAT_ID');
  need('CLOUDFLARE_ACCOUNT_ID');
  need('CLOUDFLARE_API_TOKEN');
  need('TAVILY_API_KEY');

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

    const messages = buildScreenMessages(dateStr, s1, s2);
    for (const msg of messages) {
      await sendTelegram(msg);
    }
    console.log(`Done. Sent ${messages.length} Telegram message(s).`);
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
