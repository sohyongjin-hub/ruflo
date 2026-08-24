# Earnings Report Screening — Project Memory

## Purpose
This project screens stocks around earnings reports using a structured factor
framework, built to avoid the mistake of judging a stock purely on whether it "beat or
missed" — the framework separates (1) is the business doing well from (2) is the price
already assuming that, and grades guidance quality independently of the headline
number.

## Core principle
A number without a comparison point is meaningless. Every factor must be graded against
one of: peer average, the stock's own historical range, or the market's own implied
pricing (options, analyst target timing). Never report a bare number without its
comparison.

## Background / origin case
This framework was built after a real trade: bought KEYS at $361 pre-earnings (Aug 17,
2026) anticipating a rally on strong Q3 results. Results beat and guidance was raised
well above consensus, but the stock still fell ~7% (to ~$316) because it was already up
77% YTD, trading at 57x P/E (vs. ~37x "fair" multiple and ~52x peer average), and had
beaten estimates 8 straight quarters — the setup was priced for perfection, so a merely
excellent quarter wasn't enough. Same week, Target (TGT) beat (partly on one-time tariff
refunds) and rallied, because it went into earnings with analysts still cautious
(Hold ratings even after raising targets) despite a big prior run-up. Same "beat and
raise" playbook, opposite stock reaction — because the pre-print setup and valuation
context were opposite. This is the pattern the /earnings-report command screens for.

## What the 2026-08-20 live test changed
A 13-name live test on 2026-08-20, plus an 11-case illustrative historical review
(NFLX, META, TGT x2, ZM, NVDA, CVNA, INTC, PTON, KEYS spanning 2021-2026), found that
setup (§1+§2) reliably predicts the *size* of a reaction but never reliably predicts its
*sign* — sign is dominated by print quality (§3/§4), which cannot be known before the
print happens. Three corrections came out of this, all reflected in factor-guide.md:
1. **Output is now a Conditional Reaction Matrix, not a single lean.** Stage B no longer
   claims a direction pre-print — see "Conditional Reaction Matrix" in factor-guide.md.
2. **PEG/guide-trajectory (§2), not raw streak length (§1), is the real gatekeeper for
   beat-streak risk** — NVDA's streak kept paying off because guidance accelerated faster
   than the multiple expanded; KEYS's didn't, despite both having long streaks and strong
   guides.
3. **A skeptical setup buys upside asymmetry on a genuine beat only — not downside
   protection on a genuine miss.** NFLX and ZM were both already well off their highs and
   still fell 16-25% on real deterioration. Never phrase skepticism as making a miss
   "less punishing."

## Two-stage workflow
This project runs in two stages so a full multi-name earnings calendar can be worked
through without burning full-depth effort on names that can't produce a usable signal:

- **Stage A — Screen** (`/earnings-screen`): pull the Nasdaq earnings calendar
  (nasdaq.com/market-activity/earnings) for a date or date range, apply the eligibility
  gate (§0 of factor-guide.md) to drop names with no usable data, then run a lightweight
  triage (run-up %, distance from 52-week high, consensus estimate revision trend) on
  the rest. Output is a **conviction-score ranking** (see below), not a binary
  flag/pass and not a deep dive.
- **Stage B — Deep dive** (`/earnings-report TICKER`): the full six-step framework below,
  run only on names worth the effort (the "worth a closer look" group from Stage A, or
  named directly by the user).

## Six-step framework
0. Eligibility gate — is there enough real data (options, coverage, market cap, a
   confirmed earnings date) to make any comparison meaningful at all
1. Setup / positioning — YTD run-up, distance from 52-week high, options-implied move,
   put/call shift, short interest, consecutive beat streak, analyst target timing,
   consensus estimate revision trend into the print
2. Valuation — P/E vs. peers and own history, PEG, price vs. fair value, EV/EBITDA
3. Guidance quality (post-print) — beat size vs. guide-raise size, one-time vs. recurring
   items, margin trend, segment concentration, book-to-bill, FCF vs. EPS growth
4. Balance sheet — net debt/EBITDA, buyback pace vs. FCF, insider activity
5. Macro/sector overlay — sector multiple vs. own history, rate environment, peer
   read-throughs
6. Stock-specific history — average/range of past post-earnings moves, behavior in past
   similar "beat + run-up" setups

Full comparison logic, the eligibility gate, and interpretation guidance for every
factor lives in references/factor-guide.md — always read the relevant section before
grading, don't grade from memory.

## Output format
Compact summary table (setup / valuation / guidance quality / balance sheet / macro /
historical pattern, each with a one-word verdict), then a metrics table with columns
Metric | Value | Compared to | Read, then 2-3 sentences of plain-language synthesis
including what would change the read.

**Stage A** (`/earnings-screen`) closes with a **Pre-print Conviction Score** — four
dimensions, 0-2 each, out of 8 total (full rubric in factor-guide.md) — used only to
rank/triage many names against each other, never as a final prediction.

**Stage B** (`/earnings-report`, pre-print) closes with a **Conditional Reaction
Matrix**, not a single lean — three rows (clean beat / beat-with-a-catch / miss), each
with the plausible reaction given the setup, plus an explicit [Sourced]/[Unavailable]
confidence flag on whether options/whisper data could sharpen which scenario is more
likely. Full spec in the "Conditional Reaction Matrix" section of factor-guide.md. This
is a data-pattern characterization, not a recommendation — never issue a buy/sell/hold
recommendation, and never collapse the matrix back into a single directional call.

**After the print**, append the actual outcome to `references/outcome-log.md` — this is
how the framework's evidence base grows instead of staying anecdotal.

## Swing-timeframe extension (2026-08-21) — Drift Classification, UNVALIDATED
The Conditional Reaction Matrix above predicts only the T+0 reaction. A separate,
additive **Drift Classification** layer (Confirmation / Repair / Continuation-of-damage,
full spec in factor-guide.md) predicts whether that T+0 reaction extends, reverses, or
repairs over T+1..T+5 — for swing-timeframe (days-to-a-week) positioning, which is the
project's longer-term goal. This layer is explicitly **[Unvalidated — n<10 cases]**
until `outcome-log.md`'s new T+2/T+5 columns accumulate enough logged outcomes to
confirm it — never present a drift classification as validated. It also reuses the
existing volume/[Sourced]/[Unavailable] gate rather than adding new machinery, and
requires a separate confidence/technical-modifier tag (MACD divergence, RSI-extreme) that
never overrides the drift label's direction.

## 2026-08-22 additions — Confirmation Gate, Same-Day Check, Magnitude Surprise, Attribution Gate, Swing-Timing Overlay

Five more layers were added to `factor-guide.md`, all still **[Unvalidated — n<10
cases]** pending real T+2/T+5 outcome data from `outcome-log.md`:

1. **Confirmation Gate** (replaces the old binary divergence flag inside Drift
   Classification) — three states: Confirmed / Awaiting confirmation / Contradicted,
   describing whether T+0 technicals (MACD/RSI) agree with the fundamental drift read.
2. **Same-Day Primary-Source Check** — read the company's own press release/8-K same-day
   for one-time-item and margin signals, tagged **[Primary-source, same-day]**, distinct
   in confidence from **[Analyst-confirmed, T+1+]** commentary that arrives later.
3. **Magnitude Surprise** — `actual T+0 % move − options-implied % move`, explains cases
   where a genuinely high-quality print produces a smaller-than-expected reaction (name
   the capping factor: revenue-decline optics, ADR/sector discount, pre-priced setup,
   etc.), rather than leaving the gap unexplained. Extended 2026-08-22 with a **3-tier
   fallback** (options-implied → the ticker's own historical-SUE reaction average →
   peer-group average) for when options data is [Unavailable] — exactly the thin-coverage
   names where this signal matters most.
4. **Attribution Gate Extension** — before running any print-quality/drift analysis on a
   move, confirm a press release actually exists for that date and rule out a
   more-plausible non-earnings catalyst (delayed filing, activist stake, sector-wide
   move, thin-liquidity noise). Generalizes a real screening error caught on WALD
   (2026-08-21), where a Stage A-assumed report date had no confirmed print.
5. **Swing-Timing Overlay** — a pattern-description output (Entry trigger / Invalidation
   level / Target zone / Expected hold-duration / Overbought-oversold caveat) for
   swing-timeframe framing specifically, never an instruction to buy/sell — same
   restriction as the rest of this framework.

Full specs for all five live in `references/factor-guide.md`; this section is a pointer,
not a substitute for reading it before using any of them.

## 2026-08-23 addition — §7 Business Character Assessment (Moat / Competitive Advantage / Management / Industry Position)

Adapted from an external reference ("The Moat Ledger" — Morningstar Economic Moat
methodology + Porter's Five Forces + capital-allocation/management-quality analysis).
Answers a different question than §0-§6: not "is the business doing well and is that
priced in," but **"is this specific price move one you can trust with real size."**

Rates four lenses as Strong / Moderate / Weak / Unconfirmed, each requiring named
evidence:
1. **Moat** — the structural reason competitors can't copy what's working (five
   families: intangible assets, switching costs, network effects, cost advantage,
   efficient scale). Test: would a competitor copy this easily if they tried?
2. **Competitive advantage** — today's read on how high that wall is *right now*,
   more time-bound than a moat (cost position, differentiation, execution edge).
3. **Management** — capital allocation, incentive alignment, candor (not charisma).
   Sourced from the last two earnings calls plus SEC EDGAR Form 4 insider filings.
4. **Industry position** — how much of the story is company-specific vs. sector tide
   (Porter's Five Forces). Test: compare the stock's move to its sector ETF.

Includes a **swing-timing modifier table** on top of the existing Confirmation
Gate/Drift Classification/Swing-Timing Overlay layers — e.g. a strong moat plus a
genuinely bad print is often a buyable-dip pattern, while a weak-moat pop is a
trade-the-move-don't-marry-it setup, and a management red flag surfacing mid-position
should tighten a stop even on an otherwise clean chart. Full spec (including the
per-lens good-signal/false-signal tables and starting sources) in §7 of
`references/factor-guide.md`.

**When to run it:** per the `/earnings-report` command spec, only when the user is
asking about sizing up, holding through weakness, or researching a name for the first
time — not on every routine post-print check. **Decays faster than §0-§6** — re-run
before any future size-up rather than reusing a stale read.

## 2026-08-23 addition — §8 Stock Quality × Trade Quality Matrix, §9 5W1H Retrospective, pilot routine

Three more additions, built around one recurring question the user asks: **is this a
good stock, a good trade, both, or neither.**

1. **Multi-Quarter Fundamental Trend Check** (new subsection under §7) — trailing 4-8
   quarters of revenue/margin/EPS trend, cross-checked against §7's qualitative lenses
   (a claimed moat should show up as stable/expanding margins over that window, not
   just be asserted this quarter). Outputs a single Green/Yellow/Red flag.
2. **§8 Stock Quality × Trade Quality Matrix** — a 2×2 combining that flag (+ §7) as the
   stock-quality axis against the existing Confirmation Gate/Drift Classification/
   Swing-Timing Overlay/technicals as the trade-quality axis. **Required sequencing:**
   stock-quality is always resolved first — a Red fundamental flag means stop at
   "speculative trade only," don't spend effort on entry-timing analysis for a
   long-term-hold framing.
3. **§9 5W1H Post-Print Retrospective** — Who/What/When/Where/Why/How, run at T+1 and
   T+5 once outcome data is known, always ending in a concrete diff proposal to
   `factor-guide.md` or an explicit "no change warranted, evidence too thin." Logged to
   the new `references/retrospective-log.md` (separate from `outcome-log.md`, which
   stays raw predicted-vs-actual data only). **Discipline:** don't edit the guide on a
   single miss — most retrospectives should conclude no change is warranted unless the
   same failure mode recurs across multiple tickers.

**Pilot routine** — `trig_017ntWk4CYhKuCCZkcWgY72P`
(https://claude.ai/code/routines/trig_017ntWk4CYhKuCCZkcWgY72P), `RemoteTrigger`, cron
`0 22 * * 1-5`, weekdays 3pm Phoenix: tracks
the 18 names from the 2026-08-24 to 2026-08-28 scan through their [T-2, T+5 business
day] windows, per `references/watch-window.md`. Runs the checks above automatically and
commits updates to the repo. **Known constraint:** cloud routines can't reach the local
TradingView Desktop connection, so this routine's technicals come from WebSearch-sourced
data, not a live chart pull — live TradingView access is interactive-session-only.
**Pilot ends 2026-09-03** — the routine must be **manually disabled** after that date
(standard cron can't cleanly bound a range crossing the Aug/Sep month boundary in one
expression, so it does not self-terminate).

**RESOLVED 2026-08-24 (second firing):** the push blocker below is fixed. The
2026-08-24 scheduled firing authenticated and pushed to `origin/master` successfully —
`git push` no longer returns the 403. Scheduled firings now persist their own work; the
manual interactive-session recovery step described below is no longer needed. The
original issue is kept for context:

**~~KNOWN ISSUE~~ (resolved, see above) — blocked every firing until fixed:** the routine's first firing
(2026-08-24, manually triggered for verification) ran its research correctly but
**could not push its commit** — `git push` failed with a 403: "Claude doesn't have
GitHub access to sohyongjin-hub/ruflo for your organization." This is a different auth
path than the interactive session's local git push (which works via Windows Git
Credential Manager) — cloud `RemoteTrigger` runs push via a separate Claude GitHub App
integration that isn't yet authorized for this repo. **Fix:** install/authorize the
Claude GitHub App at https://github.com/apps/claude/installations/select_target, or
reconnect via claude.ai Settings → Connectors
(https://claude.ai/customize/connectors?auth_start=github&auth_start_force=1). Until
this is done, every scheduled firing will do real research but silently fail to persist
it — the 2026-08-24 firing's findings (PDD/XPEV both Red-flagged on the new §8 gate,
plus a 9-ticker report-date correction) were manually reproduced and committed from an
interactive session as a one-off recovery; that recovery step won't happen
automatically for future firings.

**Terminology note:** the eligibility gate (§0) still uses a binary "SCREENED OUT" —
that step is about whether a name has enough real data to analyze at all, and stays
binary. Everything that survives §0 gets scored/ranked, not binary-flagged — no name
that clears the eligibility gate should be labeled "eliminated" solely for scoring low;
a low score is a low-conviction result, not a screen-out.

## Trading account context
[Optional — fill in if you want Claude Code to track your actual positions/watchlist
across sessions, e.g. current holdings, cost basis, risk tolerance, position sizing
rules. Leave blank if you'd rather keep this stateless.]
