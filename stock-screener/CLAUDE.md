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
- **Screener Pool**: https://app.notion.com/p/1d107223596d410a8e4ed0069cb00bf3 (data source `2a722d47-ff3a-4a0b-90ae-0da599a238b8`) — Ticker, Company Name, Date Caught, Status, Filters Passed, Catch Price, Rationale, Notes, plus (added 2026-08-28) `Repeated` (checkbox), `Catalyst Confidence` (select), `Catalyst Reason` (rich text), `Catalyst Sources` (rich text) — see "Lane 1 — Mockup 1 + Repeated badge" below — and `Tracked` (checkbox, also added 2026-08-28) — see "Lane 2 — /track and /untrack" below. These `Catalyst *` properties are separate from Daily Tracking's own `Catalyst Confidence`/Reason/Sources — Screener Pool's are the same-day catch-time verdict, Daily Tracking's are the post-catch-day verdict.
- **Screener Config**: https://app.notion.com/p/3ee0315fe5c54839ba2c3341eefa934b (data source `f3deaad1-d937-4cea-a3b0-1d5c652d6d2a`), pre-populated with the 10 v1 default thresholds below.
- **Daily Tracking**: https://app.notion.com/p/3a8c3c5dc9fb487f83abc398af75a625 (data source `f92e73ad-6e87-4f98-baac-e5c75853847f`) — the 5-trading-day post-catch tracking table, see "Post-catch tracking" below.
- **Company Research** (added 2026-08-28): https://app.notion.com/p/31396f5e1de540798ac881aaceab47a6 (data source `c86c475d-3c49-41ee-9a05-f98abb4e750c`) — Ticker (title), Fundamentals, Qualitative, Sources (rich text), Last Researched (date). One row per company, keyed by Ticker — not per catch event, unlike Screener Pool. This is the `/level2` cache, see "Lane 3 — Company Research cache" below. `Qualitative` is written by the still-to-be-built `/level2` Worker command (Step 3); only `Fundamentals`/`Sources`/`Last Researched` are populated so far, by `fetch-fundamentals.js`.

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
   which filters it passed, catch price, plus (added 2026-08-28) `Repeated` and the
   catch-time `Catalyst Confidence`/Reason/Sources — see "Lane 1 — Mockup 1" below.
   Duplicates of the same ticker caught on different dates are separate rows, never
   merged.
2. A new dated batch appended to `references/pool-log.md` (git-tracked, append-only —
   this is the audit trail, never the surface you edit by hand).
3. A Telegram push, either the structured Mockup 1 digest (see below) on a normal day, or
   an explicit confirmation message on a zero-catch or FAILED day (dead-man's-switch —
   silence must never be the only signal that something went wrong).

**Same-day dedup (fixed 2026-08-25):** the write step first queries Notion for tickers
already logged for today's date and skips them. This exists because the first live run
was accidentally fired multiple times before the fix landed, writing most tickers 2-3x
at different intraday prices — never assume a run is safe to re-fire without this check
in place, and never remove it.

## Lane 1 — Mockup 1 + Repeated badge (added 2026-08-28)
First piece of a larger, agreed redesign of the whole post-catch pipeline: three lanes —
this automatic same-day Lane 1, an opt-in `/track`+`/untrack` for continued 5-day quant
monitoring, and an opt-in `/level2` for on-demand deep research. Only Lane 1 has landed so
far; the "Post-catch tracking" section below still documents the *current*, always-on
5-day tracker, which Lane 2 is going to replace once it lands (this section will be
rewritten then — don't read it as final).

Folded directly into `stock-screen.js`'s existing run, no new schedule or workflow file.
For every ticker that clears both stages, same run, before the Notion write:

- **`Repeated` badge**: queries Screener Pool for any prior row of the same ticker (any
  status, any date) — the same query pattern already used for the "Previously Removed"
  badge (see "Review workflow" below), just broadened from status to catch history. If
  found, sets `Repeated` (checkbox) and surfaces it in the Telegram message (`🔁 REPEATED
  — first caught <date>`). This is the deliberate, cheaper replacement for automatic
  passive tracking of every catch: a name that re-qualifies for the full screen on a later
  day is flagged with no background tracking infrastructure at all. Known, accepted
  limitation: a ticker that moves without re-clearing the full screen won't show as
  repeated.
- **Catalyst search**: one reason-finding pass per caught ticker, answering "why did this
  move enough to get caught today" — same size/shape of call the post-catch reason-finder
  already makes, just moved up to catch day. `stock-screen.js` is a deterministic GitHub
  Actions script with no LLM/Claude Code session access (unlike the cloud `RemoteTrigger`
  routine used for post-catch reason-finding), so this calls two free external APIs
  directly over HTTP, same zero-npm-dependency raw-`fetch` style as the rest of the
  script:
  - **Tavily Search** (`api.tavily.com/search`, free tier 1,000 credits/month, no card
    required) for news context — `TAVILY_API_KEY`.
  - **Cloudflare Workers AI** (`@cf/meta/llama-3.1-8b-instruct-fp8-fast`, JSON-schema
    mode) to synthesize Tavily's results into a `{confidence, reason, sources}` verdict —
    `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN`, called via Workers AI's plain REST
    API (`POST .../ai/run/<model>`) rather than through the Cloudflare Worker/webhook —
    confirmed this works standalone from any HTTP client, no Worker needed. This is the
    same Workers AI backend already chosen for the still-to-be-built `/level2` (Lane 3);
    using it here too keeps the pipeline on one LLM backend and $0 marginal cost.
  - Same 4-tier confidence scale as the post-catch reason-finder (`Confirmed catalyst` /
    `Plausible unconfirmed` / `No clear catalyst found` / `Source error`), for consistency
    between Mockup 1 and the deeper post-catch write-ups.
  - Degrades safely: zero Tavily results → `No clear catalyst found` without ever calling
    the model; a Workers AI call that errors or returns something off-schema →
    `Source error`, never a fabricated reason.
- **Telegram message** rebuilt as a structured per-ticker block (Quant: price/change%/
  volume/market cap; Catalyst: confidence tag + reason + sources; `🔁 REPEATED` flag when
  set) in place of the old catch-count/top-ticker-only digest, batched for the whole run
  and chunked under the 4096-char `sendMessage` cap the same way `notify-tracking.js`
  already does (reused pattern) — `buildScreenMessages()` returns an array of chunks and
  `main()` sends each in sequence.
- **Fail-fast config check**: `main()` checks all 8 required env vars (`NOTION_TOKEN`,
  `NOTION_SCREENER_POOL_DATA_SOURCE_ID`, `NOTION_SCREENER_CONFIG_DATA_SOURCE_ID`,
  `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `CLOUDFLARE_ACCOUNT_ID`,
  `CLOUDFLARE_API_TOKEN`, `TAVILY_API_KEY`) at the very top, before any Notion write —
  the same fail-fast-before-any-mutation pattern adopted after a real incident with
  `find-reasons.js` (see git history / prior session notes), never inside a per-row
  handler.

**New required secrets**: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `TAVILY_API_KEY`
— added to GitHub 2026-08-29.

**Verified live 2026-08-29** via `workflow_dispatch`: 64 tickers screened, 20 passed both
stages, all 20 got real `Catalyst Confidence`/`Reason`/`Sources` written to Screener Pool
(Tavily + Workers AI both reachable and working from GitHub Actions), `Repeated` correctly
flagged `true` for the 3 tickers with a prior catch (ESTC, GO, NOW) and `false` for the
other 17, and 4 chunked Telegram messages sent. One row (HPQ) landed `Source error` —
Workers AI returned malformed JSON that failed `JSON.parse` — confirming the degrade-safely
path works as designed rather than crashing or fabricating a reason; worth watching if this
becomes frequent (1/20 on a first run isn't concerning on its own). Lane 1 is fully live.

## Lane 3 — Company Research cache (in progress, added 2026-08-28)
Second piece of the redesign (Step 2 of 4 in the build order). This lands the data store
and the SEC EDGAR fetch/format logic only — the actual `/level2` Telegram command that
reads/writes this cache from the bot is not built yet (Step 3, next).

**`stock-screener/scripts/fetch-fundamentals.js`** — standalone, zero-dependency Node
script, same `need()`-fail-fast-before-any-write style as `stock-screen.js`/
`track-pool.js`. `node fetch-fundamentals.js TICKER`:
1. Looks up the ticker's SEC CIK number from the free public mapping file
   (`sec.gov/files/company_tickers.json`) — no key required.
2. Fetches that CIK's structured XBRL data from SEC EDGAR's free `companyfacts` API
   (`data.sec.gov/api/xbrl/companyfacts/CIK##########.json`) — real numbers straight from
   filings, no LLM needed to extract them.
3. Pulls a curated set of us-gaap concepts (Revenue, Gross Profit, Operating Income, Net
   Income, Diluted EPS, Assets, Liabilities, Stockholders' Equity, Cash) preferring the
   most recent annual (10-K) figure over quarterly, formats them into a short readable
   summary, and upserts (not inserts — one row per company) into the "Company Research"
   Notion database.
- **SEC requires a descriptive `User-Agent` on every request** identifying the requester,
  or it will rate-limit/block. Read from a new required env var, `SEC_CONTACT_EMAIL` —
  deliberately not hardcoded to any real address in source, so nothing gets sent to a
  third party (SEC's servers) without an explicit, visible choice of what to send.
- **Tested against synthetic SEC-shaped data only so far** (13/13 checks: number
  formatting, annual-over-quarterly preference, fallback tag names, missing-concept and
  empty-facts degradation) — this session's sandbox has the same blocked egress to
  external data domains already documented under "Scheduling and infrastructure" below
  (confirmed: `data.sec.gov` is blocked here too, same as `query1.finance.yahoo.com` and
  `scanner.tradingview.com` already were), so a live SEC EDGAR call could only be smoke-
  tested from GitHub Actions or the Cloudflare Worker, not this interactive session. Not
  yet run against a live ticker.
- **This script is a tested prototype, not (yet) wired into anything live.** No new
  GitHub Actions workflow was added for it — the actual `/level2` command ported this
  same fetch+format logic inline into `stock-screener/telegram-bot/worker.js` in Step 3
  (done, see "Interactive /level2 command" below), since a Cloudflare Worker can't
  `require()` a separate Node script. The `company_tickers.json` caching gap noted here
  when this script first landed is now closed in that port (7-day KV cache) — this
  standalone script itself still refetches it every run, since it's a one-shot CLI tool
  where that doesn't matter.
- **New required env var**, not yet added anywhere (no workflow references it yet, since
  nothing calls this script automatically): `SEC_CONTACT_EMAIL`. `NOTION_TOKEN` and
  `NOTION_COMPANY_RESEARCH_DATA_SOURCE_ID` (`c86c475d-3c49-41ee-9a05-f98abb4e750c`) are
  also required — same Notion token already used everywhere else in this project.

## Post-catch tracking (5-trading-day window, opt-in via /track since 2026-08-28)
**Changed 2026-08-28 (Step 4 of the pipeline redesign): this used to run automatically for
every Screener Pool ticker. It no longer does.** Lane 1's same-day Mockup 1 + `Repeated`
badge (see above) replaced blanket tracking as the default "did I miss something" signal,
at zero background cost. What's below now only runs for a ticker once the user opts it in
with `/track` (see "Interactive /track and /untrack commands" below) — for the 5 US-market
trading days after it was caught, the system records that session's close/%-change/
market-cap/volume, and separately finds and records *why* the stock moved that day. This
is two deliberately separate systems on two separate schedules, not one combined job —
they need different infrastructure (see "Data source" below for why) and a timing offset
avoids a race condition between them.

**1. Quant tracking — `stock-screener/scripts/track-pool.js`, GitHub Actions, 4:30pm ET
(21:30 UTC winter / 20:30 UTC summer) weekdays.** Deterministic, no LLM. For every Pool
ticker with `Tracked = true` whose Date Caught puts it 1-5 trading days in the past
(**trading-day math is now market-holiday-aware, not just weekend-aware** — see the
`tradingDaysBetween()` note below), fetches that day's close/volume from Yahoo Finance and
market cap from a single-ticker TradingView scanner lookup
(`filter: [{left:"name",operation:"equal",right:TICKER}]`), computes % change vs.
the original catch price, and writes a new row to the "Daily Tracking" database with
`Catalyst Confidence = Pending` — Reason and Sources are left blank for the next step to
fill in. Has its own same-day dedup check (query for today's already-tracked tickers,
skip them), same pattern as the main screener.

**Market-holiday-aware trading-day math (fixed 2026-08-28):** `tradingDaysBetween()`
used to only skip Saturday/Sunday — a known, documented approximation from when tracking
was blanket and a stray extra day barely mattered. Now that `/track` makes tracking a
deliberate per-ticker choice with a hard 5-session cutoff, an off-by-one from an
unaccounted NYSE holiday (e.g. Thanksgiving, Independence Day observed on a Friday) could
silently extend or shrink someone's tracking window by a real day. Fixed with a proper US
market holiday calendar (New Year's, MLK Day, Washington's Birthday, Good Friday —
computed from Easter Sunday via the Anonymous Gregorian algorithm — Memorial Day,
Juneteenth, Independence Day, Labor Day, Thanksgiving, Christmas, with the standard
Saturday→Friday / Sunday→Monday observance shift), duplicated identically in
`track-pool.js` and `worker.js` (same "Worker can't `require()` another script"
constraint as the SEC fundamentals code). Tested against 15 hand-verified 2026 dates and
two holiday-spanning windows (15/15 checks) — not yet exercised against a real multi-year
boundary (e.g. does the Set-per-year cache handle a window crossing Dec 31 → Jan 1
correctly); worth a live sanity check whenever that case is convenient to hit.

**Materiality pre-filter (added 2026-08-28), same script, same step:** the Yahoo fetch
already pulls 5 days of daily bars (`range=5d`) but only used the most recent one — the
prior day's close was sitting in the same response, unused. Reading it out costs zero
extra API calls, so `track-pool.js` now also computes each row's actual same-session %
move (today's close vs. prior close — distinct from `Change vs Catch Price`, which is
cumulative since the original catch) and, if `|move| < 3%` (the same catch bar Stage 1
already uses, see "Screen rules" — reused here to keep "worth explaining" consistent
across the pipeline), tags the row `Catalyst Confidence = Below materiality threshold`
directly and never hands it to reason-finding at all, instead of `Pending`. This exists
purely to cut how much the reason-finder (and its Claude usage) has to touch, without
changing the reason-finder itself — it's a fifth, honestly-distinct tag from the four
below (a small day genuinely wasn't searched, which is different from "searched and
found nothing"), added as a new Notion select option rather than repurposing "No clear
catalyst found" for it. Degrades safely: if a prior close isn't available (e.g. a very
recently listed ticker), the row is left `Pending` as before rather than guessing.

**2. Reason-finding — cloud `RemoteTrigger` routine "Pool Reason-Finder (post-tracking)",
weekdays 6:00pm ET (23:00 UTC winter / 22:00 UTC summer)**, a 90-minute buffer after the
quant tracker's 4:30pm ET slot. **Moved from a 15-minute buffer (2026-08-27)** after a
real same-day race: `track-pool.yml` (GitHub Actions) fired late, this routine ran on
schedule and correctly found an empty Daily Tracking table (nothing to do, not a bug),
then `track-pool.yml` finally wrote 51 rows afterward — all stuck at `Pending` until the
next day's self-healing catch-up run. GitHub Actions cron in this repo has shown delays
up to ~100 minutes (the same day's `stock-screen.yml` fired ~101 minutes late), so a
15-minute buffer was never going to be reliably enough; 90 minutes is a deliberate
margin, not a guess. Scans Daily Tracking for every
row with `Catalyst Confidence = Pending` (this scan is also the self-healing catch-up
mechanism — it processes every pending row regardless of age, not just today's, so a
missed day gets picked up automatically on the next run rather than staying blank
forever — and now also excludes any row the materiality pre-filter above already tagged
`Below materiality threshold`, since those were never set to `Pending`). For each,
WebSearches news/financial-outlet/social sentiment for that ticker and that specific
date, synthesizes what explains the move, and writes back:
- **Catalyst Confidence** — one of four values the routine itself can choose (a fifth,
  `Below materiality threshold`, is set upstream by `track-pool.js` before this routine
  ever sees the row — see above), chosen deliberately to keep "the search worked and
  found nothing" distinguishable from "the search itself broke":
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
   `RemoteTrigger` routine**, `trig_011fTgySCCMhqQQDBRVPcCTe`, weekdays 6:00pm ET (23:00
   UTC winter / 22:00 UTC summer). This one genuinely needs an LLM session (WebSearch +
   reasoning/synthesis, not just an API call), which GitHub Actions can't provide — this
   is the one piece of the whole project that actually fits the cloud-routine model.
   **Widened from 4:45pm to 6:00pm ET (2026-08-27)** — see the timing-race note above.
4. **`notify-tracking.js`** (consolidated Telegram push for steps 2+3) — **GitHub
   Actions**, `.github/workflows/notify-tracking.yml`, weekdays 6:30pm ET (23:30 UTC
   winter / 22:30 UTC summer). Exists because `api.telegram.org` is one of the domains
   confirmed blocked in the cloud sandbox — the reason-finder (step 3) cannot send its
   own Telegram push, so this reads back today's Daily Tracking rows (both the quant
   data from step 2 and the reasons from step 3) and sends one combined summary, timed
   to run after both upstream steps have had time to finish. **Moved from 5:00pm to
   6:30pm ET (2026-08-27)**, same reason as step 3's move.

**None of these auto-adjust for DST** — cron is UTC-fixed. Each drifts by 1 hour during
EDT (roughly March-November) until manually updated; the exact adjusted cron for each is
noted above and in each workflow file's own comment.

**GitHub Actions secrets required** (repo Settings → Secrets and variables → Actions):
`NOTION_TOKEN`, `NOTION_SCREENER_POOL_DATA_SOURCE_ID`,
`NOTION_SCREENER_CONFIG_DATA_SOURCE_ID`, `NOTION_DAILY_TRACKING_DATA_SOURCE_ID`,
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, plus (added 2026-08-28, for `stock-screen.yml`'s
Lane 1 catalyst search — see "Lane 1 — Mockup 1" above; **not yet added to GitHub as of
this write-up**) `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `TAVILY_API_KEY`.

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

## Interactive /level2 command (added 2026-08-28, deployed and verified live 2026-08-29)
Step 3 of the pipeline redesign, in the same `worker.js` as `/screen` above. `/level2
TICKER` (or bare `/level2`, which then prompts for one) replies with a combined report in
a fixed order — Fundamentals, Qualitative, Quantitative, Catalyst, Technical:

- **Fundamentals + Qualitative are cached** in the "Company Research" Notion database
  (see "Notion databases (live)" above), one row per company. Cache-fresh (< 90 days
  old, `RESEARCH_STALE_DAYS`) → replies immediately from Notion, no research run, $0. On
  a miss or stale row, runs research and upserts the result before replying:
  - **Fundamentals**: SEC EDGAR, same logic as `fetch-fundamentals.js` (see "Lane 3 —
    Company Research cache" above), duplicated inline in `worker.js` rather than
    imported (a Worker deployed as a single file can't `require()` another script —
    keep the two copies in sync if either changes). The SEC ticker→CIK mapping file
    (multi-MB, every US filer) is cached in the same `SCREENER_STATE` KV namespace used
    for conversation state, 7-day TTL, so it isn't re-fetched on every call — the
    caching gap flagged as unsolved when `fetch-fundamentals.js` landed is now closed.
  - **Qualitative** (moat / competitive position / management / industry position, only
    fields with real signal, never padded): Tavily search + **Workers AI binding**
    (`env.AI.run(...)`), not the REST API `stock-screen.js` uses from GitHub Actions —
    this code already runs inside the Worker, so no HTTP round-trip is needed. This is
    the Option-C decision locked in during design (see the handover doc this was built
    from).
- **Quantitative, Catalyst, and Technical are always fetched live, never cached** — cheap
  and time-sensitive, and mostly reused code already in this file: Quantitative reuses
  `fetchTickerFundamentals()` (the same TradingView scanner call `/screen` already
  makes), Technical reuses `fetchTechnicals()` (the same EMA/SMA logic `/screen` already
  runs), and Catalyst reads the most recent Screener Pool row's catch-day
  `Catalyst Confidence`/Reason/Sources (Lane 1's output) — no new research for any of
  the three.
- Reply is sent via a new `sendTelegramChunked()` helper (4096-char cap, same
  chunking convention as `notify-tracking.js`/`stock-screen.js`) since a full 5-section
  report is the one reply from this bot long enough to risk the limit.

**Tested locally (11/11 unit tests) then deployed and confirmed live 2026-08-29**: this
session had no Cloudflare API credentials, so deployment was manual (user pasted the code
via the dashboard's Edit Code view, added a Workers AI binding named `AI`, and added the
three new env vars — `SEC_CONTACT_EMAIL`, `TAVILY_API_KEY`,
`NOTION_COMPANY_RESEARCH_DATA_SOURCE_ID`). First live `/level2 ESTC` call failed with
`Notion Company Research query HTTP 404` — **root cause: the "Company Research" database,
created via the Notion MCP connection during this build, was never shared with the same
Notion integration `NOTION_TOKEN` belongs to** (unlike Screener Pool/Config/Daily Tracking,
which already had that integration connected from earlier setup). Fixed by the user adding
that integration under the database's Connections menu — **remember this for any future
Notion database created by Claude via MCP: it needs to be explicitly connected to the
integration the scripts/Worker actually authenticate as, it doesn't inherit access
automatically.** After that fix, `/level2` completed successfully. Not yet independently
confirmed: which exact shape the Workers AI binding returns for JSON-schema mode
(`synthesizeQualitative()` still defensively checks both `result.response` and `result`
itself) — a successful run doesn't by itself prove which branch fired; check a live
Qualitative section's actual content (not just "no signal found") to confirm which shape
is correct and simplify the code once known.

## Interactive /track and /untrack commands (added 2026-08-28, deployed and verified live 2026-08-29)
Step 4 (last step) of the pipeline redesign, same `worker.js` deploy as `/level2` above —
no new binding or secrets required for these two commands specifically, they only need
`NOTION_TOKEN` and `NOTION_SCREENER_POOL_DATA_SOURCE_ID`, both already configured on the
Worker today.

**Usage note (real user confusion, worth flagging): the command needs a literal space**
— `/track NOW` works, `/tracknow` (no space) does not match either the bare-`/track` or
the `/track `-prefix branch and silently falls through to the generic help reply. Not a
bug, but confusing enough on a live test that it's worth documenting here.

- **`/track TICKER`** (or bare `/track`, which then prompts for one, same UX pattern as
  `/screen` and `/level2`): looks up the ticker's most recent Screener Pool row and sets
  `Tracked = true` on it. If the ticker was never caught, says so and suggests `/screen`
  instead of silently no-op'ing. If the 5-trading-day window (from the row's Date Caught,
  using the same holiday-aware `tradingDaysBetween()` described above) has already
  elapsed, says so explicitly rather than turning the flag on and letting it quietly do
  nothing — `/track` can't backfill days that have already passed.
- **`/untrack TICKER`**: clears `Tracked` back to `false` immediately, ending monitoring
  before the 5 sessions are up. Only touches the `Tracked` checkbox — the row's Ticker,
  Date Caught, Catch Price, Status, and every other field (including the Lane 1 catalyst
  fields) are untouched, and the row itself is never deleted. If the ticker isn't
  currently tracked, says so rather than silently succeeding.
- `track-pool.js` (the 4:30pm ET quant tracker) now skips any pool row where
  `Tracked !== true`, logging a count of how many it skipped for that reason — see
  "Post-catch tracking" above. This is the actual mechanism that makes tracking opt-in;
  `/track`/`/untrack` only ever flip that one checkbox.
- Every screened ticker's Screener Pool row stays permanent regardless of track/untrack
  state, same as before this redesign — rows are never deleted or merged, and duplicate
  catches on different dates remain separate rows.

**Tested locally (15/15 holiday-calendar checks) then verified live 2026-08-29**: real
`/track` round trip on a same-day catch confirmed the `Tracked` checkbox write works
correctly against a live Screener Pool row.

## Trading account context
[Optional — fill in if you want Claude Code to track actual positions/watchlist across
sessions. Leave blank if you'd rather keep this stateless.]
