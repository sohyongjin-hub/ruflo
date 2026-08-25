# Stock Screener — Project Memory

## Purpose
Automates the user's existing manual daily screen: a fundamental scan for US-market
momentum names, followed by a technical qualification pass (8EMA/200SMA relationship).
Survivors accumulate into a persistent pool bucketed by the date each ticker was caught
— this is a research/filtering aid to help a beginner swing trader narrow down what's
worth a closer look, not a signal generator and never a buy/sell recommendation.

## Screen rules
These are the tunable parameters — read live values from the Notion "Screener Config"
database at the start of every run (see "Config source of truth" below); the numbers
here are the v1 defaults only.

**Stage 1 — Fundamental screen** (US market):
- Change: ≥ 3%
- Market cap: > $1B
- Price: ≥ $1
- Volume: ≥ 500K

**Stage 2 — Technical screen** (for every Stage 1 survivor):
- 8EMA: pass if the daily chart is currently hugging the 8EMA. If the candle is below
  the 8EMA, look back through the stock's own history for prior below-8EMA dips that
  recovered — pass if that has happened at least twice, up to 3-4 times.
- 200SMA: must be trading above it. If the stock doesn't have enough trading history for
  a 200SMA, fall back to the 100SMA.
- Toggle between daily and weekly charts as needed to confirm the pattern; monthly is
  the maximum zoom-out.

A ticker only enters the pool if it clears both stages.

## Notion databases (live)
- **Screener Pool**: https://app.notion.com/p/1d107223596d410a8e4ed0069cb00bf3 (data source `2a722d47-ff3a-4a0b-90ae-0da599a238b8`)
- **Screener Config**: https://app.notion.com/p/3ee0315fe5c54839ba2c3341eefa934b (data source `f3deaad1-d937-4cea-a3b0-1d5c652d6d2a`), pre-populated with the 10 v1 default thresholds below.

## Config source of truth
The Notion "Screener Config" database holds the live values for every threshold above
(change %, market cap floor, price floor, volume floor, EMA length, SMA length + fallback
length, min/max bounce-count, timeframe list). `/stock-screen` reads this at the start of
each run instead of hardcoding the numbers — editing a value in Notion changes next run's
behavior with no code change. If the config database is unreachable, fall back to the
defaults listed above and flag that fallback explicitly in the run's output — never
silently screen with unconfirmed thresholds.

## Output / pool accumulation
Every ticker that clears both stages on a given run gets three writes, all from the same
run so they never disagree on count:
1. A new row in the Notion "Screener Pool" database: Ticker, Date Caught, Status=New,
   which filters it passed, catch price. Duplicates of the same ticker caught on
   different dates are separate rows, never merged/deduped.
2. A new dated batch appended to `references/pool-log.md` (git-tracked, append-only —
   this is the audit trail, never the surface you edit by hand).
3. A Telegram push: catch count + top-ranked ticker(s) on a normal day, or an explicit
   confirmation message on a zero-catch or FAILED day (dead-man's-switch — silence must
   never be the only signal that something went wrong).

**Precedence rule, also pinned as a legend on the Notion board itself:** Notion is
today's truth; the markdown log is history only. If they ever disagree, Notion wins and
the discrepancy should be investigated, not silently resolved in the log's favor.

## Review workflow (user-facing)
The user reviews and triages the pool in Notion, grouped by Date Caught, with a
Status field (New / Watching / Accepted / Removed). Moving a ticker from Watching to
Accepted when its price has moved from the original catch price (a "re-chase") requires
filling in a short rationale field — every other status change stays one-tap/frictionless
by design. A passive "previously Removed, back on list" badge (Notion formula/rollup)
warns before re-chasing a name that already failed the setup once. A "last successful
run" timestamp is shown directly on the board so stale data is visible even if a push
notification is missed.

**Explicitly out of scope for v1** (deferred, not forgotten): automated re-chase
dedupe/lookback logic, and mandatory rationale on every status change — both were
rejected as scope creep for a beginner's first build. Full reasoning captured in the
approved plan this project was built from.

## Scheduling
Runs weekdays at 11am ET via a cloud `RemoteTrigger` scheduled routine (same mechanism as
the `earnings-report/` pilot — see that project's CLAUDE.md for the known push gotcha:
cloud routine checkouts are detached-HEAD, so scheduled firings must
`git push origin HEAD:master`, not plain `git push`).

## Data source
**Verified 2026-08-25 — both stages run entirely on public HTTP APIs, no TradingView
Desktop dependency:**
- **Stage 1 (fundamental)**: TradingView's public scanner API,
  `POST https://scanner.tradingview.com/america/scan` — no auth required. Confirmed live:
  a query for change>3%, market cap>$1B, close>=$1, volume>=500K returned 97 real
  US-market tickers.
- **Stage 2 (technical)**: Yahoo Finance's public chart API,
  `GET https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}?range=1y&interval=1d`
  (needs a `User-Agent` header) — confirmed live, returns ~252 daily OHLCV bars, enough
  for a real 200SMA. 8EMA/200SMA/100SMA and the recovered-dip count are computed directly
  from these bars, not read off a chart.

This is a deliberate improvement over the interactive-session-only TradingView MCP
approach originally planned: it means the 11am ET scheduled routine can run fully
unattended in the cloud, unlike `earnings-report`'s pilot routine, which is permanently
blocked from live TradingView access for exactly this reason (see that project's
CLAUDE.md). The TradingView MCP (desktop) remains available for interactive
spot-checking/backtesting a run's output against the user's own manual chart read, but
is never a hard dependency for the scheduled run itself.

## Trading account context
[Optional — fill in if you want Claude Code to track actual positions/watchlist across
sessions. Leave blank if you'd rather keep this stateless.]
