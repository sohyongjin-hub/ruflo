#!/usr/bin/env node
// Post-catch tracking: for every Screener Pool ticker still within its 5
// US-market-trading-day window, records that session's close/%change/mktcap/
// volume into the "Daily Tracking" Notion database. Runs on GitHub Actions
// (open egress) shortly after market close. This script does NOT find the
// "reason" behind a move — that requires WebSearch + LLM synthesis, which
// only works from a Claude Code session (see stock-screener/CLAUDE.md for
// the reason-finding routine). This script only writes quantitative rows
// with Catalyst Confidence = "Pending", leaving Reason/Sources blank for
// the reason-finding step to fill in later.

const fs = require('fs');
const path = require('path');

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

// Trading-day count between two ISO dates, weekdays only (doesn't account for
// market holidays — acceptable approximation for a 5-day window).
function tradingDaysBetween(fromISO, toISO) {
  const from = new Date(fromISO + 'T00:00:00Z');
  const to = new Date(toISO + 'T00:00:00Z');
  let count = 0;
  const cur = new Date(from);
  while (cur < to) {
    cur.setUTCDate(cur.getUTCDate() + 1);
    const day = cur.getUTCDay();
    if (day !== 0 && day !== 6) count++;
  }
  return count;
}

async function fetchPoolTickersInWindow(todayISO) {
  const token = need('NOTION_TOKEN');
  const poolId = need('NOTION_SCREENER_POOL_DATA_SOURCE_ID');
  const res = await fetch(`https://api.notion.com/v1/data_sources/${poolId}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_size: 100 }),
  });
  if (!res.ok) throw new Error(`Notion pool query HTTP ${res.status}`);
  const data = await res.json();
  const inWindow = [];
  let skippedRemoved = 0;
  for (const row of data.results) {
    const ticker = row.properties?.Ticker?.title?.[0]?.plain_text;
    const catchPriceProp = row.properties?.['Catch Price']?.number;
    const dateCaught = row.properties?.['Date Caught']?.date?.start;
    const status = row.properties?.Status?.select?.name;
    if (!ticker || !dateCaught || catchPriceProp === null || catchPriceProp === undefined) continue;
    if (status === 'Removed') { skippedRemoved++; continue; }
    const daysSince = tradingDaysBetween(dateCaught, todayISO);
    if (daysSince >= 1 && daysSince <= 5) {
      inWindow.push({ ticker, catchPrice: catchPriceProp, dateCaught, dayNumber: daysSince });
    }
  }
  if (skippedRemoved > 0) console.log(`Skipped ${skippedRemoved} pool ticker(s) marked Removed`);
  return inWindow;
}

async function fetchAlreadyTrackedToday(dateStr) {
  const token = need('NOTION_TOKEN');
  const trackingId = need('NOTION_DAILY_TRACKING_DATA_SOURCE_ID');
  const already = new Set();
  const res = await fetch(`https://api.notion.com/v1/data_sources/${trackingId}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: { property: 'Date', date: { equals: dateStr } },
      page_size: 100,
    }),
  });
  if (!res.ok) throw new Error(`Notion tracking query HTTP ${res.status}`);
  const data = await res.json();
  for (const row of data.results) {
    const t = row.properties?.Ticker?.title?.[0]?.plain_text;
    if (t) already.add(t);
  }
  return already;
}

async function fetchTodayQuote(ticker, retried = false) {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=5d&interval=1d`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  );
  if (!res.ok) {
    if (!retried) return fetchTodayQuote(ticker, true);
    throw new Error(`Yahoo HTTP ${res.status}`);
  }
  const data = await res.json();
  const result = data.chart.result && data.chart.result[0];
  if (!result) throw new Error(data.chart.error ? JSON.stringify(data.chart.error) : 'no result');
  const quote = result.indicators.quote[0];
  const lastIdx = quote.close.length - 1;
  return {
    close: quote.close[lastIdx],
    volume: quote.volume[lastIdx],
  };
}

// Market cap fallback via the same scanner API used by Stage 1, filtered to
// this exact ticker. Verified working: filter [{left:"name",operation:"equal",right:TICKER}].
async function fetchMarketCap(ticker) {
  const res = await fetch('https://scanner.tradingview.com/america/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filter: [{ left: 'name', operation: 'equal', right: ticker }],
      options: { lang: 'en' },
      markets: ['america'],
      symbols: { query: { types: [] }, tickers: [] },
      columns: ['name', 'market_cap_basic'],
      range: [0, 5],
    }),
  }).catch(() => null);
  if (!res || !res.ok) return null;
  try {
    const data = await res.json();
    const row = data.data?.find((r) => r.d[0] === ticker);
    return row ? row.d[1] : null;
  } catch {
    return null;
  }
}

async function writeTrackingRow(item, quote) {
  const token = need('NOTION_TOKEN');
  const trackingId = need('NOTION_DAILY_TRACKING_DATA_SOURCE_ID');
  const changeVsCatch = ((quote.close - item.catchPrice) / item.catchPrice) * 100;
  const marketCap = await fetchMarketCap(item.ticker);

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { type: 'data_source_id', data_source_id: trackingId },
      properties: {
        Ticker: { title: [{ text: { content: item.ticker } }] },
        Date: { date: { start: item.today } },
        'Day Number': { number: item.dayNumber },
        Close: { number: quote.close },
        'Change vs Catch Price': { number: Number(changeVsCatch.toFixed(2)) },
        'Market Cap': marketCap !== null ? { number: marketCap } : undefined,
        Volume: { number: quote.volume },
        'Catalyst Confidence': { select: { name: 'Pending' } },
      },
    }),
  });
  return res.ok;
}

async function main() {
  const todayISO = new Date().toISOString().slice(0, 10);
  console.log(`Tracking run for ${todayISO}`);

  const inWindow = await fetchPoolTickersInWindow(todayISO);
  console.log(`${inWindow.length} pool tickers in their 5-day tracking window`);

  const alreadyTracked = await fetchAlreadyTrackedToday(todayISO);
  let ok = 0, failed = 0, skippedDupes = 0;

  for (const item of inWindow) {
    if (alreadyTracked.has(item.ticker)) {
      skippedDupes++;
      console.log(`Skipping ${item.ticker} — already tracked for ${todayISO}`);
      continue;
    }
    try {
      const quote = await fetchTodayQuote(item.ticker);
      const success = await writeTrackingRow({ ...item, today: todayISO }, quote);
      if (success) { ok++; console.log(`Tracked ${item.ticker}: day ${item.dayNumber}, close $${quote.close.toFixed(2)}`); }
      else { failed++; console.error(`Notion write failed for ${item.ticker}`); }
    } catch (err) {
      failed++;
      console.error(`Tracking failed for ${item.ticker}:`, err.message);
    }
  }

  console.log(`Done. ok=${ok} failed=${failed} skippedDupes=${skippedDupes}`);
  if (failed > 0 && ok === 0 && inWindow.length > 0) {
    process.exitCode = 1; // signal a bad run to the workflow, distinct from "nothing to track today"
  }
}

main();
