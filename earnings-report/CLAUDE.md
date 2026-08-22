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

**Terminology note:** the eligibility gate (§0) still uses a binary "SCREENED OUT" —
that step is about whether a name has enough real data to analyze at all, and stays
binary. Everything that survives §0 gets scored/ranked, not binary-flagged — no name
that clears the eligibility gate should be labeled "eliminated" solely for scoring low;
a low score is a low-conviction result, not a screen-out.

## Trading account context
[Optional — fill in if you want Claude Code to track your actual positions/watchlist
across sessions, e.g. current holdings, cost basis, risk tolerance, position sizing
rules. Leave blank if you'd rather keep this stateless.]
