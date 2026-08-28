#!/usr/bin/env node
// Sends one consolidated Telegram push summarizing Daily Tracking activity
// (quant data from track-pool.js + reasons from the cloud "Pool
// Reason-Finder" routine) that hasn't been pushed to Telegram yet. This
// exists because the reason-finder runs in the Claude Code cloud sandbox,
// which has api.telegram.org blocked (same egress restriction that blocks
// TradingView/Yahoo there) -- so Telegram can only be sent from here, on
// GitHub Actions' open-egress runners, never from the cloud routine itself.
// See stock-screener/CLAUDE.md "Scheduling and infrastructure".
//
// Self-healing by design (fixed 2026-08-28): this used to filter Notion by
// an exact `Date == today` match, where "today" was computed from the
// actual run time. GitHub Actions cron in this repo has shown delays over
// 100 minutes -- badly enough that one run fired after midnight UTC, so
// "today" no longer matched the date it was scheduled to cover, the date
// filter matched zero rows, and a full day's reason-finding (51 rows) never
// reached Telegram even though it was sitting right there in Notion. Now
// this scans for any row not yet marked `Notified`, regardless of what date
// it's dated -- same self-healing pattern the Reason-Finder itself uses for
// `Catalyst Confidence = Pending`. A row is marked Notified only once it has
// actually been included in a sent message, and only if its reason-finding
// is resolved (Catalyst Confidence != Pending) -- a still-Pending row is
// left unmarked so a later run reports it once the Reason-Finder catches up.

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

async function fetchUnnotified() {
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
        filter: { property: 'Notified', checkbox: { equals: false } },
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
    });
    if (!res.ok) throw new Error(`Notion tracking query HTTP ${res.status}`);
    const data = await res.json();
    for (const row of data.results) {
      rows.push({
        id: row.id,
        ticker: row.properties?.Ticker?.title?.[0]?.plain_text ?? '?',
        date: row.properties?.Date?.date?.start ?? '?',
        dayNumber: row.properties?.['Day Number']?.number ?? null,
        changePct: row.properties?.['Change vs Catch Price']?.number ?? null,
        confidence: row.properties?.['Catalyst Confidence']?.select?.name ?? 'Pending',
        reason: row.properties?.Reason?.rich_text?.[0]?.plain_text ?? '',
      });
    }
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return rows;
}

async function markNotified(pageId) {
  const token = need('NOTION_TOKEN');
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties: { Notified: { checkbox: true } } }),
  });
  if (!res.ok) throw new Error(`Notion mark-notified HTTP ${res.status} for page ${pageId}`);
}

async function sendTelegram(text) {
  const token = need('TELEGRAM_BOT_TOKEN');
  const chatId = need('TELEGRAM_CHAT_ID');
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram send failed: HTTP ${res.status} ${body}`);
  }
}

function formatLine(row) {
  const sign = row.changePct !== null && row.changePct >= 0 ? '+' : '';
  const changeStr = row.changePct !== null ? `${sign}${row.changePct.toFixed(1)}%` : '?%';
  const confMark = {
    'Confirmed catalyst': '✅',
    'Plausible unconfirmed': '🟡',
    'No clear catalyst found': '⚪',
    'Source error': '⚠️',
  }[row.confidence] || '❔';
  const reasonPart = row.reason ? ` — ${row.reason}` : '';
  return `${row.ticker} (day ${row.dayNumber}) ${changeStr} ${confMark}${reasonPart}`;
}

function groupByDate(rows) {
  const byDate = new Map();
  for (const row of rows) {
    if (!byDate.has(row.date)) byDate.set(row.date, []);
    byDate.get(row.date).push(row);
  }
  return [...byDate.entries()].sort(([a], [b]) => a.localeCompare(b));
}

async function main() {
  const runISO = new Date().toISOString().slice(0, 10);
  console.log(`Tracking notification run at ${runISO}`);

  try {
    const rows = await fetchUnnotified();
    const resolved = rows.filter((r) => r.confidence !== 'Pending');
    const stillPending = rows.filter((r) => r.confidence === 'Pending');

    if (resolved.length === 0) {
      const pendingNote = stillPending.length > 0
        ? ` (${stillPending.length} row(s) still awaiting reason-finding.)`
        : '';
      await sendTelegram(`📋 Daily Tracking (${runISO}): nothing new to report.${pendingNote}`);
      console.log(`Sent: nothing new to report. ${stillPending.length} still pending.`);
      return;
    }

    const sections = groupByDate(resolved)
      .map(([date, dateRows]) => `${date}:\n${dateRows.map(formatLine).join('\n')}`)
      .join('\n\n');
    const pendingNote = stillPending.length > 0
      ? `\n\n${stillPending.length} more row(s) still awaiting reason-finding (will be reported once resolved).`
      : '';

    const msg = `📋 Daily Tracking update (${resolved.length} newly reported):\n\n${sections}${pendingNote}`;
    await sendTelegram(msg);

    for (const row of resolved) {
      await markNotified(row.id);
    }
    console.log(`Sent tracking summary for ${resolved.length} row(s); ${stillPending.length} still pending.`);
  } catch (err) {
    console.error('FAILED:', err);
    try {
      await sendTelegram(`🚨 Daily Tracking notification (${runISO}) FAILED: ${err.message}`);
    } catch (tgErr) {
      console.error('Also failed to send Telegram failure alert:', tgErr.message);
    }
    process.exitCode = 1;
  }
}

main();
