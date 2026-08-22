---
description: Pull the Nasdaq earnings calendar for a date/range and triage a watchlist
down to which tickers are worth a full /earnings-report deep dive.
---

Screen upcoming earnings for $ARGUMENTS (a date, date range, or an explicit ticker
list — if no argument is given, use today through the next 7 calendar days).

This is Stage A of the two-stage workflow described in CLAUDE.md. Goal: cut a large
earnings calendar down to a short list worth the full six-step deep dive, without
running that full deep dive on every name.

Steps:

1. **Pull the calendar.** Use WebSearch as the primary method: search for the target
   date(s) plus "earnings calendar" (and, if a specific watchlist was given rather than
   a date, search each ticker plus "earnings date") to identify who's reporting and
   whether it's before-open or after-close, cross-checking at least two independent
   sources per name where possible. If WebFetch is available and able to reach
   nasdaq.com/market-activity/earnings or a similar calendar aggregator, use it as an
   additional confirming source — but don't block on it. WebFetch to nasdaq.com and
   similar sites is frequently network-restricted in this environment; WebSearch alone
   is sufficient to proceed, and a full scrape of the entire market's calendar is
   usually unnecessary anyway when the target universe is a known watchlist. Flag "date
   conflict — verify" for any ticker where sources disagree or none can be found — don't
   silently pick one.

2. **Apply the eligibility gate** (§0 in references/factor-guide.md) to every ticker on
   the list. Drop any that fail it. Report dropped names as a single line each:
   "SCREENED OUT: <ticker> — <reason>". Do not spend further effort on them.

3. **Lightweight triage on the survivors** — for each remaining ticker, pull just enough
   to grade:
   - YTD run-up % and distance from 52-week high (§1)
   - Consensus estimate revision trend into the print (§1)
   - A rough valuation cushion check: P/E vs. peers/own history if readily available
     (§2) — don't do a full multi-source valuation workup here, that's Stage B's job
   This is intentionally shallower than the full /earnings-report screen — one or two
   searches per ticker, not a full six-step workup.

4. **Score the survivors** using the Pre-print Conviction Score rubric in
   factor-guide.md (4 dimensions, 0-2 each, 8 total: setup skew strength, valuation
   cushion clarity, data reliability, history/momentum support). This triage pass uses
   lighter-weight inputs than Stage B, so scores here are a first estimate — note where
   a dimension couldn't be fully checked at this depth (e.g. data reliability may need
   Stage B's fuller source cross-check to confirm).

5. **Output a ranked table**, columns: Rank | Ticker | Report date | Score (X/8) |
   Setup | Valuation | Data | History | Notes — sorted by total score descending, with
   ties broken narratively (name the specific differentiator in Notes). Group into tiers
   for readability: **Tier 1 (6-8)**, **Tier 2 (4-5)**, **Tier 3 (0-3)** — every ticker
   that cleared §0 appears somewhere in this ranking; nothing is dropped from the output
   for scoring low. §0 eligibility failures are still reported separately as one-line
   "SCREENED OUT: <ticker> — <reason>" entries, since those didn't clear the gate at all.

6. Close with one line pointing to next step: "Run /earnings-report on: [Tier 1 and Tier
   2 tickers]" for the full deep dive — Tier 3 names can be included at the user's
   discretion but aren't the default recommendation for deeper effort.

This is a triage pass, not a verdict — do not give a buy/sell/hold recommendation. A
high score describes a setup that "resembles a pattern where a good print has room to
be rewarded, with corroborating data," not "will go up." No ticker that clears §0 is
"eliminated" — every score is a data point, not a gate.

**Note:** this ranking is for cheap triage across many names only — it stays a score,
never a directional prediction. The full deep dive (`/earnings-report`) does NOT output
a score or a single lean; it outputs a Conditional Reaction Matrix instead (see
factor-guide.md), because an 11-case historical review found setup alone cannot predict
outcome sign, only its magnitude conditional on print quality. Don't let this triage
score's apparent precision be mistaken for that — it ranks setups, it doesn't forecast
reactions.
