---
description: Run the daily fundamental + technical stock screen, write survivors into
  the Notion pool, append the audit log, and fire the Telegram alert.
---

Run the full screening pipeline for $ARGUMENTS (a specific date to screen, defaulting to
today if no argument is given — useful for backfilling a missed run or dry-testing
against a known past day).

This is the only command in `stock-screener/`. Always read `stock-screener/CLAUDE.md`
first for the current screen rules, config precedence, and pool-write conventions before
running this; don't screen from memory. Never issue a buy/sell/hold recommendation from
this screen — it narrows a universe down to names worth the user's own further research,
nothing more.

## Prerequisites

Requires these environment values (`.env` at repo root, gitignored):
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NOTION_SCREENER_POOL_DATA_SOURCE_ID`,
`NOTION_SCREENER_CONFIG_DATA_SOURCE_ID`, plus a working Notion connection (the connected
Notion MCP tools) for the database writes. If any of these is missing or a write fails,
**stop and report which one failed** rather than screening with nowhere to persist or
alert — a run that silently can't write anywhere is worse than not running at all
(dead-man's-switch principle, see CLAUDE.md).

## Steps

1. **Load live config.** Query the Notion "Screener Config" database
   (`NOTION_SCREENER_CONFIG_DATA_SOURCE_ID`) for the current threshold values: change %
   floor, market cap floor, price floor, volume floor, EMA length, SMA length + fallback
   length, min/max recovered-dip count, timeframes. If this read fails, fall back to the
   defaults in `stock-screener/CLAUDE.md` and flag the fallback explicitly in this run's
   output and in the pool-log row's "Config snapshot" note — never silently screen with
   unconfirmed thresholds.

2. **Stage 1 — fundamental screen**, via TradingView's public scanner API (no auth,
   verified working):
   ```
   POST https://scanner.tradingview.com/america/scan
   Content-Type: application/json

   {
     "filter": [
       {"left":"change","operation":"greater","right":<change % floor>},
       {"left":"market_cap_basic","operation":"greater","right":<market cap floor>},
       {"left":"close","operation":"egreater","right":<price floor>},
       {"left":"volume","operation":"egreater","right":<volume floor>}
     ],
     "options": {"lang":"en"},
     "markets": ["america"],
     "symbols": {"query":{"types":[]},"tickers":[]},
     "columns": ["name","close","change","market_cap_basic","volume"],
     "sort": {"sortBy":"change","sortOrder":"desc"},
     "range": [0, <a generous cap, e.g. 200>]
   }
   ```
   Run this with `curl` via Bash (or WebFetch if it can POST JSON in this environment —
   verify which is available at run time). `totalCount` in the response is the true
   survivor count even if `range` caps how many rows come back; report both. Each row's
   `s` field is the exchange-qualified ticker (e.g. `NASDAQ:ALVO`) and `d` is
   `[name, close, change, market_cap_basic, volume]` in that column order.

3. **Stage 2 — technical screen**, for each Stage 1 survivor, via Yahoo Finance's public
   chart API (no auth, verified working):
   ```
   GET https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}?range=1y&interval=1d
   Header: User-Agent: Mozilla/5.0
   ```
   **Verified at full scale (2026-08-24, 97 tickers): 48s total runtime, 0 permanent
   failures.** One transient fetch failure occurred (network hiccup) and resolved on a
   single retry — retry once on any non-200 response or JSON parse failure before
   counting a ticker as unreachable. Tickers with fewer than ~30 daily closes (recent
   listings) cannot support any of these indicators — skip them and note the reason
   ("insufficient history: N bars"), don't error the whole run.

   Extract the daily close series from `chart.result[0].indicators.quote[0].close`
   (paired with `chart.result[0].timestamp`), filtering out `null` entries (halted/no-
   trade days). From that series, compute:
   - **8EMA** (or the configured EMA length) over the closes. Pass if the most recent
     close is within a small tolerance of the 8EMA ("hugging" — define tolerance as
     roughly within 1-1.5% of the EMA value, consistent with how the user reads it
     visually on a daily chart).
   - If not hugging (price meaningfully below the 8EMA): scan the trailing history for
     prior episodes where price closed below the 8EMA and then recovered back above it —
     count these episodes. Pass if the count is within the configured min/max range
     (default 2-4).
   - **200SMA** (or configured length) over the closes; if fewer than 200 bars exist,
     fall back to the 100SMA (or configured fallback length). Pass only if the most
     recent close is above whichever SMA was used.
   - A ticker passes Stage 2 only if the SMA condition passes AND (the hugging condition
     passes OR the dip-count condition passes) — hugging and dip-count are alternative
     paths to the same EMA qualification, not both required. Verified: names that are
     currently hugging the 8EMA can have dip-counts well outside the configured 2-4
     range and still correctly pass (the dip-count rule only applies when NOT hugging).
   - Note in the output which SMA (200 or the fallback) was actually used per ticker, and
     if a weekly/monthly re-check was needed to confirm the pattern (per the timeframe
     list in config) — this can be approximated by resampling the same daily closes to
     weekly/monthly rather than a second API call, unless the daily read is ambiguous.

4. **Write the results** — all three writes happen for the same run, so they can never
   disagree on count:
   - Insert one row per Stage-2 survivor into the Notion "Screener Pool" database
     (`NOTION_SCREENER_POOL_DATA_SOURCE_ID`) via the connected Notion tools: Ticker
     (exchange-qualified), Date Caught (today or $ARGUMENTS), Status="New", Filters
     Passed (the specific values that cleared both stages), Catch Price (the Yahoo close
     used to qualify it). Duplicates of a ticker caught on a different date are new rows,
     never merged or deduped.
   - Append a new dated batch to `stock-screener/references/pool-log.md`, following its
     existing column format exactly (Ticker | Catch price | Fundamental filters passed |
     Technical qualification | Config snapshot | Notion sync).
   - Send the Telegram push via
     `GET https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage?chat_id={TELEGRAM_CHAT_ID}&text=...`
     (URL-encode the text): on a normal day, catch count + the top-ranked ticker(s)
     (rank by margin above the change-% floor, or by volume, whichever reads more
     informative); on a zero-catch day, send an explicit "0 caught today" confirmation —
     never let silence be the only signal. If Stage 1 or Stage 2 errors out entirely,
     send an explicit FAILED message instead of nothing.

5. **Close with a one-line summary**: Stage 1 survivor count (and `totalCount` if it
   exceeded the range cap), Stage 2 survivor count, and confirmation that all three
   writes (Notion, markdown, Telegram) succeeded — or which one failed, if any, so a
   partial failure is never silent.
