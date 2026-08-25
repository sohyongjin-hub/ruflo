#!/usr/bin/env node
// Sends one consolidated Telegram push summarizing today's Daily Tracking
// activity (quant data from track-pool.js + reasons from the cloud
// "Pool Reason-Finder" routine). Runs after both have had time to finish.
// This exists because the reason-finder runs in the Claude Code cloud
// sandbox, which has api.telegram.org blocked (same egress restriction that
// blocks TradingView/Yahoo there) -- so Telegram can only be sent from here,
// on GitHub Actions' open-egress runners, never from the cloud routine
// itself. See stock-screener/CLAUDE.md "Scheduling and infrastructure".

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

async function fetchTodayTracking(dateStr) {
  const token = need('NOTION_TOKEN');
  const trackingId = need('NOTION_DAILY_TRACKING_DATA_SOURCE_ID');
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
  return data.results.map((row) => ({
    ticker: row.properties?.Ticker?.title?.[0]?.plain_text ?? '?',
    dayNumber: row.properties?.['Day Number']?.number ?? null,
    changePct: row.properties?.['Change vs Catch Price']?.number ?? null,
    confidence: row.properties?.['Catalyst Confidence']?.select?.name ?? 'Pending',
    reason: row.properties?.Reason?.rich_text?.[0]?.plain_text ?? '',
  }));
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
    Pending: '⏳',
  }[row.confidence] || '❔';
  const reasonPart = row.reason ? ` — ${row.reason}` : '';
  return `${row.ticker} (day ${row.dayNumber}) ${changeStr} ${confMark}${reasonPart}`;
}

async function main() {
  const todayISO = new Date().toISOString().slice(0, 10);
  console.log(`Tracking notification for ${todayISO}`);

  try {
    const rows = await fetchTodayTracking(todayISO);
    if (rows.length === 0) {
      await sendTelegram(`📋 Daily Tracking ${todayISO}: nothing tracked today (no pool tickers were in their 5-day window).`);
      console.log('Sent: nothing tracked today.');
      return;
    }

    const stillPending = rows.filter((r) => r.confidence === 'Pending');
    const lines = rows
      .filter((r) => r.confidence !== 'Pending')
      .map(formatLine)
      .join('\n');
    const pendingNote = stillPending.length > 0
      ? `\n\n${stillPending.length} still pending reason-finding (reason-finder may not have run yet, or is still working through them).`
      : '';

    const msg = `📋 Daily Tracking ${todayISO} (${rows.length} tracked):\n${lines || '(all pending)'}${pendingNote}`;
    await sendTelegram(msg);
    console.log('Sent tracking summary.');
  } catch (err) {
    console.error('FAILED:', err);
    try {
      await sendTelegram(`🚨 Daily Tracking notification ${todayISO} FAILED: ${err.message}`);
    } catch (tgErr) {
      console.error('Also failed to send Telegram failure alert:', tgErr.message);
    }
    process.exitCode = 1;
  }
}

main();
