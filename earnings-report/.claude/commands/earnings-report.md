---
description: Screen a stock's positioning, valuation, and guidance quality around an
earnings report using the six-step framework in CLAUDE.md and references/factor-guide.md
---

Run the earnings-report deep-dive screen on $ARGUMENTS.

First, run §0 (Eligibility Gate) in references/factor-guide.md. If the ticker fails the
gate, report only "SCREENED OUT: <reason>" and stop — do not force the six-step
framework onto a name with no usable comparison points.

Confirm the earnings date using WebSearch as the primary method — search for the ticker
plus "earnings date" and cross-check at least two independent sources (e.g. company IR
release, Nasdaq, a earnings-calendar aggregator). If WebFetch is available and able to
reach nasdaq.com/market-activity/earnings, use it as an additional confirming source,
but don't block on it — WebFetch to nasdaq.com and similar calendar sites is frequently
network-restricted in this environment, and WebSearch alone is sufficient to proceed.
If sources disagree, or none can be found, flag "date conflict — verify" rather than
silently picking one.

Otherwise, follow the six-step framework in CLAUDE.md exactly. For each step, pull
current data (web search if needed for price, options, analyst targets, financials) and
grade it against the comparison point specified in references/factor-guide.md — never
report a raw number without its comparison.

Output format:
1. Compact one-line verdict per step (Setup / Valuation / Guidance quality / Balance
   sheet / Macro overlay / Historical pattern)
2. A metrics table: Metric | Value | Compared to | Read — when grading the consecutive
   beat/miss streak (§1), always read it alongside PEG and forward/trailing P/E (§2) in
   the same pass; streak length alone is not the gatekeeper (see factor-guide.md).
3. 2-3 sentences of plain-language synthesis, ending with what would change the read
4. If pre-print: close with the **Conditional Reaction Matrix** per the
   "Conditional Reaction Matrix" section of factor-guide.md — three rows (clean beat /
   beat-with-a-catch / miss), each with the plausible reaction given this setup, plus an
   explicit [Sourced] or [Unavailable — fundamentals-only] confidence flag on whether
   options-implied move / whisper number data could sharpen which scenario is more
   likely. Do NOT collapse this into a single "worth a closer look / flagged" verdict —
   that overclaims what pre-print data can predict (see CLAUDE.md's note on what the
   2026-08-20 live test changed).

Do not give a buy/sell/hold recommendation. If the ticker hasn't reported earnings yet,
run steps 0, 1, 2, 5, and 6 only (pre-print screen) and note that 3-4 will apply
post-print. If it has already reported, run all six steps (no matrix needed — the print
has already happened; instead grade §3/§4 normally).

**After the print, once T+1 price action is known:** append a row to
references/outcome-log.md recording the setup read, which scenario (if any) was flagged
most likely, the confidence flag, the actual print quality, and the actual T+1 move —
this is how the model's evidence base grows over time instead of staying anecdotal.
