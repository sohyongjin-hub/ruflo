#!/usr/bin/env node
// SEC EDGAR fundamentals fetch for the "Company Research" cache used by
// /level2 (see stock-screener/CLAUDE.md "Lane 3 — /level2"). Free, no API
// key, structured XBRL straight from filings -- no LLM needed to extract
// the numbers. Standalone and testable in isolation (Step 2 of the pipeline
// redesign); the same fetch+format logic gets ported inline into
// stock-screener/telegram-bot/worker.js for the live /level2 command in
// Step 3, since a Cloudflare Worker can't `require()` a Node script.
//
// SEC requires a descriptive User-Agent identifying the requester on every
// request (https://www.sec.gov/os/webmaster-faq#developers) -- omitting
// this is a common way to get rate-limited or blocked. The contact string
// is read from an env var rather than hardcoded, so a real person's email
// is never baked into source or sent anywhere without an explicit choice
// to do so.

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function secUserAgent() {
  return `stock-screener (contact: ${need('SEC_CONTACT_EMAIL')})`;
}

async function fetchCikForTicker(ticker) {
  const res = await fetch('https://www.sec.gov/files/company_tickers.json', {
    headers: { 'User-Agent': secUserAgent() },
  });
  if (!res.ok) throw new Error(`SEC ticker map HTTP ${res.status}`);
  const data = await res.json();
  const upper = ticker.toUpperCase();
  for (const key of Object.keys(data)) {
    const row = data[key];
    if (row.ticker === upper) return String(row.cik_str).padStart(10, '0');
  }
  return null;
}

async function fetchCompanyFacts(cik) {
  const res = await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`, {
    headers: { 'User-Agent': secUserAgent() },
  });
  if (!res.ok) throw new Error(`SEC companyfacts HTTP ${res.status}`);
  return res.json();
}

// Curated us-gaap XBRL concepts -- enough for a useful Fundamentals block
// without trying to reproduce a full financial statement. `fallbacks` are
// alternate tag names some filers use instead of the primary one (e.g. some
// companies report revenue only under the newer ASC 606 tag).
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

// Prefers the most recent annual figure (10-K, full fiscal year) over
// quarterly, since a mix of FY and quarterly numbers in the same summary
// would be misleading without call-out -- only falls back to quarterly if
// no annual figure exists at all (e.g. a company with under a year of
// public filings).
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

async function findExistingResearchPage(ticker) {
  const token = need('NOTION_TOKEN');
  const dsId = need('NOTION_COMPANY_RESEARCH_DATA_SOURCE_ID');
  const res = await fetch(`https://api.notion.com/v1/data_sources/${dsId}/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
    body: JSON.stringify({ filter: { property: 'Ticker', title: { equals: ticker } }, page_size: 1 }),
  });
  if (!res.ok) throw new Error(`Notion Company Research query HTTP ${res.status}`);
  const data = await res.json();
  return data.results[0] || null;
}

// Upsert, not insert -- Company Research is one row per company, not per
// catch event (unlike Screener Pool), so a re-research always overwrites
// the same row rather than accumulating duplicates.
async function upsertFundamentals(ticker, fundamentalsText, sourcesText, dateStr) {
  const token = need('NOTION_TOKEN');
  const dsId = need('NOTION_COMPANY_RESEARCH_DATA_SOURCE_ID');
  const existing = await findExistingResearchPage(ticker);
  // Notion rich_text blocks cap at 2000 chars each -- truncate defensively.
  const properties = {
    Fundamentals: { rich_text: [{ text: { content: fundamentalsText.slice(0, 2000) } }] },
    'Last Researched': { date: { start: dateStr } },
    Sources: { rich_text: [{ text: { content: sourcesText.slice(0, 2000) } }] },
  };
  if (existing) {
    const res = await fetch(`https://api.notion.com/v1/pages/${existing.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    });
    return res.ok;
  }
  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parent: { type: 'data_source_id', data_source_id: dsId },
      properties: { Ticker: { title: [{ text: { content: ticker } }] }, ...properties },
    }),
  });
  return res.ok;
}

async function main() {
  const ticker = process.argv[2];
  if (!ticker) {
    console.error('Usage: node fetch-fundamentals.js TICKER');
    process.exitCode = 1;
    return;
  }
  // Fail fast, before any Notion write -- same pattern as stock-screen.js
  // and track-pool.js, adopted after the find-reasons.js incident.
  need('SEC_CONTACT_EMAIL');
  need('NOTION_TOKEN');
  need('NOTION_COMPANY_RESEARCH_DATA_SOURCE_ID');

  const upper = ticker.toUpperCase();
  console.log(`Looking up CIK for ${upper}...`);
  const cik = await fetchCikForTicker(upper);
  if (!cik) {
    console.error(`No SEC CIK found for ${upper} (may not be a US-listed filer, or the ticker map needs a fresher fetch).`);
    process.exitCode = 1;
    return;
  }
  console.log(`CIK${cik}, fetching company facts...`);
  const facts = await fetchCompanyFacts(cik);
  const fundamentalsText = extractFundamentals(facts);
  const sourcesText = `SEC EDGAR companyfacts API, CIK${cik} (${facts.entityName || upper})`;
  console.log('--- Fundamentals ---');
  console.log(fundamentalsText);

  const dateStr = new Date().toISOString().slice(0, 10);
  const ok = await upsertFundamentals(upper, fundamentalsText, sourcesText, dateStr);
  console.log(ok ? `Wrote to Company Research (Notion) for ${upper}.` : `Notion write failed for ${upper}.`);
  if (!ok) process.exitCode = 1;
}

main();
