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
- **Screener Pool**: https://app.notion.com/p/1d107223596d410a8e4ed0069cb00bf3 (data source `2a722d47-ff3a-4a0b-90ae-0da599a238b8`) — Ticker, Company Name, Date Caught, Status, Filters Passed, Catch Price, Rationale, Notes.
- **Screener Config**: https://app.notion.com/p/3ee0315fe5c54839ba2c3341eefa934b (data source `f3deaad1-d937-4cea-a3b0-1d5c652d6d2a`), pre-populated with the 10 v1 default thresholds below.
- **Daily Tracking**: https://app.notion.com/p/3a8c3c5dc9fb487f83abc398af75a625 (data source `f92e73ad-6e87-4f98-baac-e5c75853847f`) — the 5-trading-day post-catch tracking table, see "Post-catch tracking" below.

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
1. A new row in the Notion "Screener Pool" database: Ticker, Company Name (from
   TradingView's `description` field, no extra API call), Date Caught, Status=New,
   which filters it passed, catch price. Duplicates of the same ticker caught on
   different dates are separate rows, never merged.
2. A new dated batch appended to `references/pool-log.md` (git-tracked, append-only —
   this is the audit trail, never the surface you edit by hand).
3. A Telegram push: catch count + top-ranked ticker(s) on a normal day, or an explicit
   confirmation message on a zero-catch or FAILED day (dead-man's-switch — silence must
   never be the only signal that something went wrong).

**Same-day dedup (fixed 2026-08-25):** the write step first queries Notion for tickers
already logged for today's date and skips them. This exists because the first live run
was accidentally fired multiple times before the fix landed, writing most tickers 2-3x
at different intraday prices — never assume a run is safe to re-fire without this check
in place, and never remove it.

## Post-catch tracking (5-trading-day window)
For every Screener Pool ticker, for the 5 US-market trading days after it was caught,
the system records that session's close/%-change/market-cap/volume, and separately finds
and records *why* the stock moved that day. This is two deliberately separate systems on
two separate schedules, not one combined job — they need different infrastructure (see
"Data source" below for why) and a timing offset avoids a race condition between them.

**1. Quant tracking — `stock-screener/scripts/track-pool.js`, GitHub Actions, 4:30pm ET
(21:30 UTC winter / 20:30 UTC summer) weekdays.** Deterministic, no LLM. For every Pool
ticker whose Date Caught puts it 1-5 trading days in the past, fetches that day's
close/volume from Yahoo Finance and market cap from a single-ticker TradingView scanner
lookup (`filter: [{left:"name",operation:"equal",right:TICKER}]`), computes % change vs.
the original catch price, and writes a new row to the "Daily Tracking" database with
`Catalyst Confidence = Pending` — Reason and Sources are left blank for the next step to
fill in. Has its own same-day dedup check (query for today's already-tracked tickers,
skip them), same pattern as the main screener.

**2. Reason-finding — cloud `RemoteTrigger` routine "Pool Reason-Finder (post-tracking)",
weekdays 4:45pm ET (21:45 UTC winter / 20:45 UTC summer)**, 15 minutes after the quant
tracker to avoid reading before that day's data exists. Scans Daily Tracking for every
row with `Catalyst Confidence = Pending` (this scan is also the self-healing catch-up
mechanism — it processes every pending row regardless of age, not just today's, so a
missed day gets picked up automatically on the next run rather than staying blank
forever). For each, WebSearches news/financial-outlet/social sentiment for that ticker
and that specific date, synthesizes what explains the move, and writes back:
- **Catalyst Confidence** — exactly one of four values, chosen deliberately to keep
  "the search worked and found nothing" distinguishable from "the search itself broke":
  - `Confirmed catalyst` — named, dated cause sourced to a primary filing/press
    release/official statement, cross-corroborated by 2+ *independently-bylined* sources
    (two outlets syndicating one wire story does not count as two sources).
  - `Plausible unconfirmed` — coherent narrative, but resting on a single source,
    analyst speculation, or social chatter without primary confirmation.
  - `No clear catalyst found` — a legitimate, valid outcome, not a failure. The routine
    is explicitly instructed never to fabricate a reason to avoid landing on this tag.
  - `Source error` — WebSearch itself errored or returned nothing usable. Kept strictly
    separate from "No clear catalyst found" so a quiet market session is never confused
    with a broken tool — if this run's own summary shows more than a couple of these,
    that's a WebSearch regression worth investigating, not routine noise.
- **Reason** — 1-2 sentences.
- **Sources** — the actual URLs/headlines used, kept regardless of confidence tag
  (including on "No clear catalyst found" rows, to show what was actually checked) as
  the audit trail if a tag is ever disputed later.

**Verified 2026-08-25 before this was scheduled:** WebSearch does work from this cloud
sandbox despite its otherwise strict egress block — confirmed with two live test
searches (NVIDIA, a mega-cap, and SRRK, a deliberately obscure small-cap) both returning
real, differentiated results. This was not assumed; it was explicitly smoke-tested first,
because everything else in this project's egress-blocked cloud sandbox (raw HTTP to
TradingView/Yahoo/Telegram/`*.workers.dev`) had already turned out blocked. If WebSearch
ever regresses, the documented fallback is calling the Anthropic Messages API directly
via HTTPS from `track-pool.js` itself (server-side `web_search` tool), keeping
reason-finding inside the already-working deterministic GitHub Actions script instead of
the cloud routine — not yet built, since the primary path tested clean.

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

## Scheduling and infrastructure (current, as of 2026-08-25)
Three separate scheduled jobs, on two different infrastructures, because of a real
constraint discovered by testing (not assumed): a Claude Code cloud `RemoteTrigger`
routine's sandbox has a strict network egress proxy that blocks raw HTTP to arbitrary
domains — confirmed blocked: `scanner.tradingview.com`, `query1.finance.yahoo.com`,
`api.telegram.org`, and even `*.workers.dev` (tested via an existing live Cloudflare
Worker as a reachability probe). Only api.anthropic.com/npm/pypi and traffic through an
attached MCP connector (Notion works) or an Anthropic-hosted tool call (WebSearch works,
confirmed by smoke test) get through. This is why the architecture is split:

1. **`/stock-screen`** (the main fundamental+technical screen) — **GitHub Actions**,
   `.github/workflows/stock-screen.yml`, weekdays 11am ET (16:00 UTC winter / 15:00 UTC
   summer). Runs `stock-screener/scripts/stock-screen.js`, a standalone deterministic
   Node script — no LLM, no Claude Code session, because it needs raw HTTP to TradingView
   and Yahoo Finance, and GitHub's runners have open egress. Auto-commits `pool-log.md`
   and pushes.
2. **`track-pool.js`** (quant post-catch tracking) — **GitHub Actions**,
   `.github/workflows/track-pool.yml`, weekdays 4:30pm ET (21:30 UTC winter / 20:30 UTC
   summer). Same reasoning: needs raw HTTP to Yahoo/TradingView.
3. **"Pool Reason-Finder (post-tracking)"** (WebSearch synthesis) — **Claude Code cloud
   `RemoteTrigger` routine**, `trig_011fTgySCCMhqQQDBRVPcCTe`, weekdays 4:45pm ET (21:45
   UTC winter / 20:45 UTC summer). This one genuinely needs an LLM session (WebSearch +
   reasoning/synthesis, not just an API call), which GitHub Actions can't provide — this
   is the one piece of the whole project that actually fits the cloud-routine model.
4. **`notify-tracking.js`** (consolidated Telegram push for steps 2+3) — **GitHub
   Actions**, `.github/workflows/notify-tracking.yml`, weekdays 5:00pm ET (22:00 UTC
   winter / 21:00 UTC summer). Exists because `api.telegram.org` is one of the domains
   confirmed blocked in the cloud sandbox — the reason-finder (step 3) cannot send its
   own Telegram push, so this reads back today's Daily Tracking rows (both the quant
   data from step 2 and the reasons from step 3) and sends one combined summary, timed
   to run after both upstream steps have had time to finish.

**None of these auto-adjust for DST** — cron is UTC-fixed. Each drifts by 1 hour during
EDT (roughly March-November) until manually updated; the exact adjusted cron for each is
noted above and in each workflow file's own comment.

**GitHub Actions secrets required** (repo Settings → Secrets and variables → Actions):
`NOTION_TOKEN`, `NOTION_SCREENER_POOL_DATA_SOURCE_ID`,
`NOTION_SCREENER_CONFIG_DATA_SOURCE_ID`, `NOTION_DAILY_TRACKING_DATA_SOURCE_ID`,
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

**Local git push note:** when pushing to this repo interactively, always `git fetch`
and check `git merge-base --is-ancestor origin/master HEAD` first — this repo has
multiple independent automated writers (this project's own GitHub Actions jobs, the
`earnings-report/` pilot's separate cloud routine, and manual interactive sessions), so
`origin/master` moving between your last fetch and your push is routine, not an error.
Merge, don't force-push.

## Trading account context
[Optional — fill in if you want Claude Code to track actual positions/watchlist across
sessions. Leave blank if you'd rather keep this stateless.]
