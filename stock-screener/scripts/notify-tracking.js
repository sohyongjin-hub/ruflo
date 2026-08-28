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

// Telegram's sendMessage caps text at 4096 UTF-16 code units. A single day's
// worth of reason-finding (let alone a multi-day catch-up) can easily blow
// past that, so pack rows into chunks under this budget and send each as
// its own message, marking only the rows in a chunk Notified once that
// chunk actually sends -- a failure partway through leaves the remainder
// correctly unmarked for the next run to pick up, rather than needing an
// all-or-nothing retry.
const CHUNK_BODY_LIMIT = 3200; // leaves headroom for the header/footer text added around each chunk

function buildChunks(rowsSortedByDate) {
  const chunks = [];
  let text = '';
  let lastDate = null;
  let chunkRows = [];

  const flush = () => {
    if (chunkRows.length) chunks.push({ text, rows: chunkRows });
    text = '';
    lastDate = null;
    chunkRows = [];
  };

  for (const row of rowsSortedByDate) {
    const needsHeader = row.date !== lastDate;
    const headerPart = needsHeader ? `${row.date}:\n` : '';
    const separator = text ? (needsHeader ? '\n\n' : '\n') : '';
    const piece = separator + headerPart + formatLine(row);

    if (chunkRows.length > 0 && text.length + piece.length > CHUNK_BODY_LIMIT) {
      flush();
      text = `${row.date}:\n${formatLine(row)}`;
    } else {
      text += piece;
    }
    lastDate = row.date;
    chunkRows.push(row);
  }
  flush();
  return chunks;
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

    const sorted = [...resolved].sort((a, b) => a.date.localeCompare(b.date));
    const chunks = buildChunks(sorted);

    for (let i = 0; i < chunks.length; i++) {
      const partNote = chunks.length > 1 ? ` (part ${i + 1}/${chunks.length})` : '';
      const isLast = i === chunks.length - 1;
      const pendingNote = isLast && stillPending.length > 0
        ? `\n\n${stillPending.length} more row(s) still awaiting reason-finding (will be reported once resolved).`
        : '';
      const header = `📋 Daily Tracking update${partNote} — ${chunks[i].rows.length} row(s):\n\n`;
      await sendTelegram(header + chunks[i].text + pendingNote);
      for (const row of chunks[i].rows) {
        await markNotified(row.id);
      }
      console.log(`Sent part ${i + 1}/${chunks.length} (${chunks[i].rows.length} rows).`);
    }
    console.log(`Done: ${resolved.length} row(s) reported across ${chunks.length} message(s); ${stillPending.length} still pending.`);
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
