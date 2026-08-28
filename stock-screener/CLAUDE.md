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
and records *why* the stock moved that day. **These two steps run back-to-back in the
same GitHub Actions job (changed 2026-08-28, see below) — they used to be two separate
systems on two separate schedules/infrastructures, which is what caused the race
conditions narrated in this section's history.**

**1. Quant tracking — `stock-screener/scripts/track-pool.js`, GitHub Actions, 4:30pm ET
(21:30 UTC winter / 20:30 UTC summer) weekdays.** Deterministic, no LLM. For every Pool
ticker whose Date Caught puts it 1-5 trading days in the past, fetches that day's
close/volume from Yahoo Finance and market cap from a single-ticker TradingView scanner
lookup (`filter: [{left:"name",operation:"equal",right:TICKER}]`), computes % change vs.
the original catch price, and writes a new row to the "Daily Tracking" database with
`Catalyst Confidence = Pending` — Reason and Sources are left blank for the next step to
fill in. Has its own same-day dedup check (query for today's already-tracked tickers,
skip them), same pattern as the main screener.

**2. Reason-finding — `stock-screener/scripts/find-reasons.js`, same `track-pool.yml`
job, runs immediately as the next step after `track-pool.js`.** **Moved off the Claude
Code cloud "Pool Reason-Finder" routine entirely (2026-08-28)** — see "Scheduling and
infrastructure" below for the full rationale (cost: it was burning the account's shared
Claude Code session quota, not metered billing; correctness: it removes the cross-job
race this section used to spend most of its words on — the 15-minute-buffer incident,
then the 90-minute-buffer widening that followed it, are both moot now that there is only
one schedule to drift). It calls the Anthropic Messages API directly with **Claude Haiku
4.5** and the server-side `web_search` tool (`web_search_20250305` — Haiku 4.5 doesn't
qualify for the newer `_20260209` dynamic-filtering variant, which needs Opus/Sonnet
tier). Scans Daily Tracking for every row with `Catalyst Confidence = Pending` (this scan
is also the self-healing catch-up mechanism — it processes every pending row regardless
of age, not just today's, so a missed day gets picked up automatically on the next run
rather than staying blank forever). For each, web-searches news/financial-outlet/social
sentiment for that ticker and that specific date, synthesizes what explains the move, and
writes back:
- **Catalyst Confidence** — exactly one of four values, chosen deliberately to keep
  "the search worked and found nothing" distinguishable from "the search itself broke":
  - `Confirmed catalyst` — named, dated cause sourced to a primary filing/press
    release/official statement, cross-corroborated by 2+ *independently-bylined* sources
    (two outlets syndicating one wire story does not count as two sources).
  - `Plausible unconfirmed` — coherent narrative, but resting on a single source,
    analyst speculation, or social chatter without primary confirmation.
  - `No clear catalyst found` — a legitimate, valid outcome, not a failure. The routine
    is explicitly instructed never to fabricate a reason to avoid landing on this tag.
  - `Source error` — the API call or web search itself errored, or the model's reply
    didn't parse into the expected format. Kept strictly separate from "No clear catalyst
    found" so a quiet market session is never confused with a broken pipeline — if a
    run's own log shows more than a couple of these, that's a regression worth
    investigating, not routine noise. `find-reasons.js` retries 429/5xx once with backoff
    before giving up and tagging a row this way.
- **Reason** — 1-2 sentences.
- **Sources** — the actual URLs/headlines used, kept regardless of confidence tag
  (including on "No clear catalyst found" rows, to show what was actually checked) as
  the audit trail if a tag is ever disputed later.

**History (kept for context — the race this describes no longer exists):** this step was
originally a Claude Code cloud `RemoteTrigger` routine using the WebSearch tool, on its
own separate schedule from `track-pool.js`. That design existed only because the cloud
sandbox blocks raw HTTP to most domains except `api.anthropic.com` (confirmed by smoke
test 2026-08-25 — WebSearch worked, everything else didn't), and running reason-finding
required either an LLM session (cloud routine) or the Anthropic API directly. The
separate-schedule design caused a real incident: `track-pool.yml` fired late, the cloud
routine ran on its own schedule and correctly found an empty table (not a bug), then
`track-pool.yml` finally wrote 51 rows afterward — all stuck at `Pending` until the next
day's self-healing catch-up. The buffer between the two schedules was widened from 15 to
90 minutes to paper over this (GitHub Actions cron in this repo has shown delays up to
~100 minutes). **Replaced 2026-08-28** by moving reason-finding onto GitHub Actions as a
second step in the same job as `track-pool.js` (see "Scheduling and infrastructure") —
this removes the two-schedule race at its root instead of widening the buffer further,
and also stops the routine from consuming the account's shared Claude Code session quota
(a batch of 5 parallel cloud sub-agents hit a session rate limit mid-run on 2026-08-28
and wrote nothing, which is what prompted this move).

**Precedence rule, also pinned as a legend on the Notion board itself:** Notion is
today's truth; the markdown log is history only. If they ever disagree, Notion wins and
the discrepancy should be investigated, not silently resolved in the log's favor.

## Review workflow (user-facing)
The user reviews and triages the pool in Notion, grouped by Date Caught, with a
Status field (New / Watching / Accepted / Removed).

**Important caveat (until 2026-08-27, corrected below): Status was write-only.**
Every write path set it to `New` on insert, but nothing ever read it back — changing it
in Notion was pure bookkeeping with zero effect on automation. Two things now actually
consume it:
1. **`track-pool.js` skips any pool ticker with `Status = Removed`** when building its
   tracking-eligible list — no more spending API calls/reason-finding on a name already
   ruled out. Verified live: temporarily marked a real in-window ticker (SE) Removed, ran
   the script, confirmed it logged "Skipped 1 pool ticker(s) marked Removed" and produced
   no tracking row for it, then reverted the Status.
2. **The "previously Removed, back on list" badge is now real**, not just documented
   intent — a `Previously Removed` checkbox property on Screener Pool, set by both write
   paths (`stock-screen.js` and the interactive bot's `worker.js`) by querying for any
   prior row of that same ticker with `Status = Removed` before inserting. When true, the
   Telegram message flags it inline (⚠️) instead of leaving it as a silent checkbox only
   visible if you happen to open that row in Notion. Verified live the same way (marked
   SE Removed, confirmed the query correctly found it via the exact filter the code uses,
   reverted).

Moving a ticker from Watching to Accepted when its price has moved from the original
catch price (a "re-chase") is still meant to require filling in a short rationale field
— every other status change stays one-tap/frictionless by design — but this part remains
**unenforced**, same caveat as before: Notion doesn't have a built-in way to require a
field conditionally on another field's transition without Notion's own paid automations,
so this is currently a documented convention, not a technical guardrail. A "last
successful run" timestamp on the board (also originally planned) is likewise still not
built — both remain honest gaps, not silently-abandoned promises.

**Explicitly out of scope for v1** (deferred, not forgotten): automated re-chase
dedupe/lookback logic, and mandatory rationale on every status change — both were
rejected as scope creep for a beginner's first build. Full reasoning captured in the
approved plan this project was built from.

## Scheduling and infrastructure (current, as of 2026-08-28)
**All scheduled jobs now run on GitHub Actions — no Claude Code cloud routine left in
this pipeline.** That wasn't true until 2026-08-28: reason-finding used to require a
cloud `RemoteTrigger` routine because a Claude Code cloud sandbox's network egress proxy
blocks raw HTTP to arbitrary domains — confirmed blocked: `scanner.tradingview.com`,
`query1.finance.yahoo.com`, `api.telegram.org`, and even `*.workers.dev` (tested via an
existing live Cloudflare Worker as a reachability probe) — while only api.anthropic.com,
npm/pypi, and traffic through an attached MCP connector or an Anthropic-hosted tool call
got through. Moving reason-finding to a **direct Anthropic API call** (Claude Haiku 4.5 +
the server-side `web_search` tool) from a GitHub Actions runner sidesteps that
restriction entirely, because GitHub's runners already have open egress to everything
this pipeline needs, `api.anthropic.com` included — so there was never a reason for this
piece to be special-cased once it stopped needing an interactive Claude Code session.
Two other motivations: cost (the cloud routine drew on the account's shared Claude Code
session/plan quota rather than metered pay-per-token billing, and a batch of 5 parallel
cloud sub-agents hit a session rate limit mid-run on 2026-08-28, writing nothing) and
correctness (collapsing two separately-scheduled jobs into one job's back-to-back steps
removes the cross-schedule race condition documented at length above and in this file's
git history — see "Post-catch tracking" → History).

1. **`/stock-screen`** (the main fundamental+technical screen) — **GitHub Actions**,
   `.github/workflows/stock-screen.yml`, weekdays 11am ET (16:00 UTC winter / 15:00 UTC
   summer). Runs `stock-screener/scripts/stock-screen.js`, a standalone deterministic
   Node script — no LLM. Auto-commits `pool-log.md` and pushes.
2. **`track-pool.js` + `find-reasons.js`** (quant post-catch tracking, then reason-finding
   for every still-`Pending` row) — **GitHub Actions**, `.github/workflows/track-pool.yml`,
   weekdays 4:30pm ET (21:30 UTC winter / 20:30 UTC summer), **two steps in one job**.
   `track-pool.js` is deterministic (raw HTTP to Yahoo/TradingView, no LLM).
   `find-reasons.js` calls the Anthropic Messages API directly with `claude-haiku-4-5` and
   `web_search_20250305` (the basic web-search tool variant — Haiku 4.5 doesn't qualify
   for the newer `_20260209` dynamic-filtering variant, which needs Opus/Sonnet tier),
   parsing a fixed `CONFIDENCE:`/`REASON:`/`SOURCES:` text format out of the reply rather
   than using structured outputs, to match this repo's existing raw-HTTP/zero-dependency
   script style. Runs immediately after `track-pool.js` on the same runner — no separate
   schedule to drift out of sync with. **Replaced the "Pool Reason-Finder" cloud routine
   this same day** — see "Post-catch tracking" → History for the full incident.
3. **`notify-tracking.js`** (consolidated Telegram push for step 2's quant data + reasons)
   — **GitHub Actions**, `.github/workflows/notify-tracking.yml`, weekdays 6:30pm ET
   (23:30 UTC winter / 22:30 UTC summer), a 60-minute buffer after step 2's slot (kept
   generous even though step 2 itself no longer has an internal race — GitHub's own cron
   trigger delays, up to ~100 minutes observed on this repo, are a separate risk this
   buffer still guards against). **Self-healing since 2026-08-28** (see its own file
   header): scans for any Daily Tracking row not yet marked `Notified`, regardless of
   date, instead of an exact `Date == today` match — the latter broke outright the first
   time a delayed cron run rolled past midnight UTC, silently sending "nothing tracked
   today" while a full day's finished reason-finding sat unreported. Chunks its Telegram
   sends to stay under `sendMessage`'s 4096-character cap (a second bug the self-healing
   fix immediately exposed on its first real catch-up).

**None of these auto-adjust for DST** — cron is UTC-fixed. Each drifts by 1 hour during
EDT (roughly March-November) until manually updated; the exact adjusted cron for each is
noted above and in each workflow file's own comment.

**GitHub Actions secrets required** (repo Settings → Secrets and variables → Actions):
`NOTION_TOKEN`, `NOTION_SCREENER_POOL_DATA_SOURCE_ID`,
`NOTION_SCREENER_CONFIG_DATA_SOURCE_ID`, `NOTION_DAILY_TRACKING_DATA_SOURCE_ID`,
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and **`ANTHROPIC_API_KEY`** (added 2026-08-28
for `find-reasons.js` — a plain Anthropic API key, `sk-ant-...`, not an OAuth token; get
one from the Anthropic Console).

**Local git push note:** when pushing to this repo interactively, always `git fetch`
and check `git merge-base --is-ancestor origin/master HEAD` first — this repo has
multiple independent automated writers (this project's own GitHub Actions jobs, the
`earnings-report/` pilot's separate cloud routine, and manual interactive sessions), so
`origin/master` moving between your last fetch and your push is routine, not an error.
Merge, don't force-push.

## Interactive /screen bot (on-demand, user-initiated)
Separate from the four scheduled jobs above — this is the two-way path. A Cloudflare
Worker (`stock-screener-bot`, source in `stock-screener/telegram-bot/worker.js`, deployed
directly via the Cloudflare API since the Cloudflare MCP tools in this environment are
read-only for Workers) is registered as the Telegram bot's webhook. Conversation state
per chat lives in a Cloudflare KV namespace (`stock-screener-bot-state`,
`0079a6984ac84bc093cbb2beea0749da`), since Workers are stateless per-request.

**Flow:** user sends `/screen` → bot asks for a ticker → user types it → bot runs the
same Stage 1 (fundamental) + Stage 2 (technical) logic as the scheduled screener, ported
into the Worker, and replies with a full pass/fail breakdown per individual check
(not just overall pass/fail) → if both stages passed, asks "Add to the Screener Pool?
yes/no" → on yes, writes to Notion with the same same-day dedup guard as the scheduled
screener. Verified end-to-end 2026-08-25 (simulated the full flow via direct webhook
POSTs, confirmed dedup correctly blocked a duplicate write for a ticker already caught
that day via the scheduled screen).

Webhook is protected by a shared secret (`WEBHOOK_SECRET`, checked against Telegram's
`X-Telegram-Bot-Api-Secret-Token` header) so only real Telegram traffic is accepted.

This coexists with the scheduled jobs with no conflict — same bot token, Telegram routes
incoming messages to the webhook regardless of what else sends outgoing pushes to the
same chat.

## Trading account context
[Optional — fill in if you want Claude Code to track actual positions/watchlist across
sessions. Leave blank if you'd rather keep this stateless.]
