---
description: Screen a stock's positioning, valuation, and guidance quality around an
earnings report using the six-step framework in earnings-report/CLAUDE.md and
earnings-report/references/factor-guide.md
---

Run the earnings-report deep-dive screen on $ARGUMENTS.

First, run §0 (Eligibility Gate) in earnings-report/references/factor-guide.md. If the
ticker fails the gate, report only "SCREENED OUT: <reason>" and stop — do not force the
six-step framework onto a name with no usable comparison points.

Confirm the earnings date using WebSearch as the primary method — search for the ticker
plus "earnings date" and cross-check at least two independent sources (e.g. company IR
release, Nasdaq, a earnings-calendar aggregator). If WebFetch is available and able to
reach nasdaq.com/market-activity/earnings, use it as an additional confirming source,
but don't block on it — WebFetch to nasdaq.com and similar calendar sites is frequently
network-restricted in this environment, and WebSearch alone is sufficient to proceed.
If sources disagree, or none can be found, flag "date conflict — verify" rather than
silently picking one.

Otherwise, follow the six-step framework in earnings-report/CLAUDE.md exactly. For each
step, pull current data (web search if needed for price, options, analyst targets,
financials) and grade it against the comparison point specified in
earnings-report/references/factor-guide.md — never report a raw number without its
comparison.

Output format:
1. Compact one-line verdict per step (Setup / Valuation / Guidance quality / Balance
   sheet / Macro overlay / Historical pattern)
2. A metrics table: Metric | Value | Compared to | Read — when grading the consecutive
   beat/miss streak (§1), always read it alongside PEG and forward/trailing P/E (§2) in
   the same pass; streak length alone is not the gatekeeper (see
   earnings-report/references/factor-guide.md).
3. 2-3 sentences of plain-language synthesis, ending with what would change the read
4. If pre-print: close with the **Conditional Reaction Matrix** per the
   "Conditional Reaction Matrix" section of earnings-report/references/factor-guide.md —
   three rows (clean beat / beat-with-a-catch / miss), each with the plausible reaction
   given this setup, plus an explicit [Sourced] or [Unavailable — fundamentals-only]
   confidence flag on whether options-implied move / whisper number data could sharpen
   which scenario is more likely. Do NOT collapse this into a single "worth a closer
   look / flagged" verdict — that overclaims what pre-print data can predict (see
   earnings-report/CLAUDE.md's note on what the 2026-08-20 live test changed).

If the ticker has already reported (or reports intraday during this run), also apply,
where the relevant data supports it:
- **Confirmation Gate** (three states — Confirmed / Awaiting confirmation /
  Contradicted) and **Drift Classification** (Confirmation / Repair /
  Continuation-of-damage), per the "Drift Classification" section of
  earnings-report/references/factor-guide.md — tag as [Unvalidated — n<10 cases].
- **Same-Day Primary-Source Check** — search the company's own press release/8-K
  same-day for one-time-item and margin signals before relying on secondary commentary;
  tag [Primary-source, same-day] vs. [Analyst-confirmed, T+1+].
- **Magnitude Surprise** (with its tiered fallback when options data is
  [Unavailable]) — per the "Magnitude Surprise" section of
  earnings-report/references/factor-guide.md.
- **Attribution Gate Extension** — before attributing any move to this print, confirm a
  press release actually exists for the date in question and rule out a more-plausible
  non-earnings catalyst.
- If the user is asking from a swing-trading (days-to-a-week) perspective, close with
  the **Swing-Timing Overlay** (Entry trigger / Invalidation level / Target zone /
  Expected hold-duration / Overbought-oversold caveat) per that section of
  earnings-report/references/factor-guide.md.
- **When the user asks about sizing up, holding through weakness, or researching a name
  for the first time** (not for a routine/quick post-print check), also run the
  **Business Character Assessment** (§7 of earnings-report/references/factor-guide.md):
  rate Moat / Competitive Advantage / Management / Industry Position each as
  Strong / Moderate / Weak / Unconfirmed with the specific evidence behind it, then
  apply §7's swing-timing modifier table (e.g. strong moat + bad print = often a
  buyable-dip pattern; weak moat + strong print = trade the move, don't marry it) on top
  of whatever the Confirmation Gate / Drift Classification / Swing-Timing Overlay
  already concluded. Re-run §7 before any future size-up on the same name rather than
  reusing a stale read — it decays faster than the mechanical §0-§6 checks.

Do not give a buy/sell/hold recommendation. If the ticker hasn't reported earnings yet,
run steps 0, 1, 2, 5, and 6 only (pre-print screen) and note that 3-4 will apply
post-print. If it has already reported, run all six steps plus the post-print layers
above (no matrix needed — the print has already happened; instead grade §3/§4 normally).

**After the print, once T+1 price action is known (and again at T+2/T+5 when
available):** append a row to earnings-report/references/outcome-log.md recording the
setup read, which scenario (if any) was flagged most likely, the confidence flag, the
actual print quality, the actual T+1/T+2/T+5 moves, the drift class predicted, and
whether it hit — this is how the model's evidence base grows over time instead of
staying anecdotal.
