#!/usr/bin/env node
// Reason-finding via a direct Anthropic API call (Claude Haiku 4.5 + Anthropic's
// server-side web_search tool), run from GitHub Actions right after
// track-pool.js in the same job -- not a separate Claude Code cloud routine.
//
// Moved off the cloud routine (2026-08-28) for two reasons:
// 1. Cost/quota: the cloud routine burns the account's shared Claude Code
//    session/plan pool, not metered per-token billing. A batch of 5 parallel
//    sub-agents hit "session limit, resets 3am UTC" mid-run and wrote nothing,
//    forcing a manual recovery. A direct API call bills per token on Haiku 4.5
//    (far cheaper than the model that pool was running on) and is fully
//    decoupled from that shared quota.
// 2. The race condition this project fought for days: the cloud routine and
//    track-pool.js were on separate cron schedules across separate infra
//    (Claude Code cloud vs. GitHub Actions), so a delayed trigger on either
//    side could have the reason-finder run before track-pool.js had written
//    anything, or after notify-tracking.js had already sent its digest --
//    see the 15-min-buffer and 90-min-buffer incidents in this file's git
//    history / CLAUDE.md. Running find-reasons.js as the *next step in the
//    same job* as track-pool.js removes that race entirely: whenever this
//    job's trigger fires (however late GitHub's cron runs it), reason-finding
//    always happens immediately after that same run's quant tracking, on the
//    same runner, with no second schedule to drift out of sync.
// The only reason the reason-finder was ever a cloud routine in the first
// place was that Claude Code's cloud sandbox blocks raw HTTP to most domains
// except api.anthropic.com -- but GitHub Actions runners already have open
// egress to everything (TradingView, Yahoo, Telegram, and now
// api.anthropic.com too), so nothing about this move requires special-casing.
//
// Self-healing, same as the routine it replaces: scans for every row with
// Catalyst Confidence = Pending regardless of date, so a missed day is picked
// up automatically on the next run rather than staying blank forever.

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

const VALID_CONFIDENCE = new Set([
  'Confirmed catalyst',
  'Plausible unconfirmed',
  'No clear catalyst found',
  'Source error',
]);

async function fetchPending() {
  const token = need('NOTION_TOKEN');
  const trackingId = need('NOTION_DAILY_TRACKING_DATA_SOURCE_ID');
  const rows = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${trackingId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Catalyst Confidence', select: { equals: 'Pending' } },
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
    });
    if (!res.ok) throw new Error(`Notion pending query HTTP ${res.status}`);
    const data = await res.json();
    for (const row of data.results) {
      rows.push({
        id: row.id,
        ticker: row.properties?.Ticker?.title?.[0]?.plain_text ?? '?',
        date: row.properties?.Date?.date?.start ?? '?',
      });
    }
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return rows;
}

async function updateReasonRow(pageId, { confidence, reason, sources }) {
  const token = need('NOTION_TOKEN');
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        'Catalyst Confidence': { select: { name: confidence } },
        Reason: { rich_text: [{ text: { content: reason.slice(0, 2000) } }] },
        Sources: { rich_text: [{ text: { content: sources.slice(0, 2000) } }] },
      },
    }),
  });
  if (!res.ok) throw new Error(`Notion update HTTP ${res.status} for page ${pageId}`);
}

const promptFor = (ticker, date) => `You are researching why the US-listed stock ${ticker} moved on its trading session dated ${date}. Use web search to find news, financial-outlet coverage, and social/Twitter sentiment specific to ${ticker} on or immediately around ${date} (try queries like "${ticker} stock news ${date}" and "why did ${ticker} stock move ${date}"). Read what you find and synthesize what actually explains that day's price move. This is for a research/documentation purpose only for a beginner swing trader's own reference -- never suggest a buy/sell/hold action.

Classify your finding with exactly one confidence tag:
- "Confirmed catalyst" -- a named, dated cause sourced to a primary filing/press release/official statement, cross-corroborated by 2+ independently-bylined sources (two outlets syndicating the same wire story does not count as two sources).
- "Plausible unconfirmed" -- a coherent narrative but resting on a single source, analyst speculation, or social chatter without primary confirmation.
- "No clear catalyst found" -- you searched and found no defensible driver. This is a legitimate, valid outcome, not a failure -- do not fabricate a reason to avoid this tag.
- "Source error" -- your web search itself errored or returned nothing usable. Distinct from "No clear catalyst found" (search worked, revealed nothing) -- only use this if search itself failed.

Respond with ONLY this exact three-line format, nothing else before or after:
CONFIDENCE: <one of the four exact tag strings above>
REASON: <1-2 sentences synthesizing what you found>
SOURCES: <the actual URLs/headlines you used, semicolon-separated -- keep this populated even for "No clear catalyst found", showing what you checked>`;

function parseModelReply(text) {
  const confMatch = text.match(/CONFIDENCE:\s*(.+)/i);
  const reasonMatch = text.match(/REASON:\s*(.+)/i);
  const sourcesMatch = text.match(/SOURCES:\s*([\s\S]+)/i);
  const confidence = confMatch?.[1]?.trim();
  if (!confidence || !VALID_CONFIDENCE.has(confidence)) return null;
  return {
    confidence,
    reason: reasonMatch?.[1]?.trim() || '(no reason text returned)',
    sources: sourcesMatch?.[1]?.trim() || '(no sources returned)',
  };
}

async function callAnthropic(body) {
  const apiKey = need('ANTHROPIC_API_KEY');
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });
    if (res.ok) return res.json();
    if ((res.status === 429 || res.status >= 500) && attempt < maxAttempts) {
      const backoffMs = attempt * 2000;
      console.log(`  Anthropic API HTTP ${res.status}, retrying in ${backoffMs}ms (attempt ${attempt}/${maxAttempts})`);
      await new Promise((r) => setTimeout(r, backoffMs));
      continue;
    }
    const errBody = await res.text();
    throw new Error(`Anthropic API HTTP ${res.status}: ${errBody.slice(0, 300)}`);
  }
}

async function findReason(ticker, date) {
  try {
    const data = await callAnthropic({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
      messages: [{ role: 'user', content: promptFor(ticker, date) }],
    });
    const textBlocks = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n');
    const parsed = parseModelReply(textBlocks);
    if (!parsed) {
      return {
        confidence: 'Source error',
        reason: 'Model response did not match the expected CONFIDENCE/REASON/SOURCES format.',
        sources: `(raw response, truncated: ${textBlocks.slice(0, 300)})`,
      };
    }
    return parsed;
  } catch (err) {
    return {
      confidence: 'Source error',
      reason: `Request to the Anthropic API failed: ${err.message}`,
      sources: '(none -- request error, see Reason)',
    };
  }
}

async function main() {
  const pending = await fetchPending();
  console.log(`Found ${pending.length} pending row(s).`);

  const tally = { 'Confirmed catalyst': 0, 'Plausible unconfirmed': 0, 'No clear catalyst found': 0, 'Source error': 0 };
  for (const row of pending) {
    console.log(`Researching ${row.ticker} (${row.date})...`);
    const result = await findReason(row.ticker, row.date);
    await updateReasonRow(row.id, result);
    tally[result.confidence] = (tally[result.confidence] || 0) + 1;
    console.log(`  -> ${result.confidence}`);
  }

  console.log(`Done. ${pending.length} row(s) resolved:`, tally);
  if (tally['Source error'] > 2) {
    console.log(`WARNING: ${tally['Source error']} Source errors -- possible API/search regression, investigate.`);
  }
}

main().catch((err) => {
  console.error('FAILED:', err);
  process.exitCode = 1;
});
