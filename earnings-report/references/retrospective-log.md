# 5W1H Retrospective Log

Separate from `outcome-log.md`, which holds raw predicted-vs-actual data. This file
holds the **structured 5W1H analysis** (§9 of `factor-guide.md`) run once T+1 (and
again at T+5) outcome data is known for a name already deep-dived pre-print — the goal
is a specific, traceable correction proposal, not just a logged outcome.

**Entry format per ticker/date:**

```
## TICKER — YYYY-MM-DD (T+N retrospective)

- **Who** — which read was right: setup (§1/§2), print-quality (§3), or neither?
- **What** — what specifically differed between the predicted Conditional Reaction
  Matrix row and the actual outcome?
- **When** — did the reaction happen at T+0, or unfold later (T+2/T+5) as predicted
  (or not)?
- **Where** — which specific factor-guide.md section produced the miss, if any?
- **Why** — root cause: data problem, model gap, or genuinely unpredictable event?
- **How** — proposed model change, or explicit "no change warranted, evidence too thin."
```

Every entry must end in either a concrete diff proposal to `factor-guide.md` (spelled
out enough to implement, even if not yet applied) or an explicit statement that no
change is warranted — never left open-ended.

---

*No entries yet — this file is populated by the pilot routine (`RemoteTrigger`
`0 22 * * 1-5`, 2026-08-24 through 2026-09-03) and by manual `/earnings-report` runs on
already-reported tickers, per the "5W1H Post-Print Retrospective" section of
`factor-guide.md`.*
