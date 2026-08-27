# Lessons Learned — Ticker Lifecycle Synthesis & Pattern Ledger

Two things live in this file, both populated by the "§11 Ticker Lifecycle Synthesis &
Pattern Promotion" process in `factor-guide.md`, run once a tracked ticker's window
fully closes (T+5 done, `Window closed?` = Yes in `watch-window.md`):

1. **Ticker Lifecycle Summaries** — one consolidated narrative per closed ticker,
   pulling together its Tier score, setup read, §8 gate result, full Confirmation Gate
   journey, Drift Classification vs. actual outcome, and both 5W1H retrospective
   conclusions into a single story — "how it went, start to finish."
2. **The Pattern Ledger** — a running tally of candidate patterns first flagged in
   individual 5W1H retrospectives (`retrospective-log.md`), tracked across every
   closed ticker until one earns enough supporting evidence to be **promoted**: turned
   from a logged hypothesis into an actual edit to `factor-guide.md`. This is the
   mechanism that closes the loop between "we noticed something" and "the model
   actually changed" — a single retrospective never edits the guide (n=1 discipline),
   but this ledger is what tracks whether a pattern recurs enough to justify one.

**Promotion threshold:** 3+ distinct tickers/prints supporting the same candidate
pattern with no contradicting case, or 2 supporting + explicit reasoning for why it
should generalize. A contradicting case is logged too — if contradictions start
outweighing support, the hypothesis gets explicitly retired, not left to linger.

**No separate "porting to new research" step needed:** once a pattern is promoted and
written into `factor-guide.md`, every future `/earnings-report` run and every future
routine firing reads the current file automatically — the improvement applies to new
stocks the moment it's written, not as a manual follow-up.

---

## Pattern Ledger

| Pattern candidate | First flagged | Supporting cases | Contradicting cases | Status |
|---|---|---|---|---|
| Red §8 flag + **mixed** print (not a clean miss) → muted/ambiguous T+0 reaction, not the full "expect continued weakness" magnitude | PDD, 2026-08-25 | 1 (PDD) | 0 | Watching — needs 2 more supporting cases |
| Red §8 flag + a positive **QoQ inflection** or **maintained/increased capital return** (dividend/buyback) embedded in an otherwise-Red picture → can still produce a positive T+0 reaction despite the Red flag | XYF, 2026-08-25 | 1 (XYF) | 0 | Watching — needs 2 more supporting cases |
| **Litigation-implicated beat driver** — active litigation directly targets the specific metric cited as driving the current beat (not just generic litigation overhang) → fast intraday fade despite a headline beat, as the market discounts the hyped figure back toward the real (non-hyped) beat magnitude within the same session | PLAB, 2026-08-27 | 1 (PLAB) | 0 | Watching — needs 2 more supporting cases |
| **Reset-effect dominance** — Yellow/Green fundamental trend flag + a one-time item that is a *minority* share of the beat + broad-based multi-region/segment reacceleration + a deeply skeptical starting valuation (well off highs, compressed multiple, long growth streak) → an **outsized** (not muted) T+0 reaction that holds through T+1, because the "reset effect" (§3) fully dominates the one-time-item discount rather than partially offsetting it | ANF, 2026-08-27 | 1 (ANF) | 0 | Watching — needs 2 more supporting cases |

*(No patterns promoted yet — all four candidates above are at n=1.)*

---

## Ticker Lifecycle Summaries

*No tickers have completed their full T+5 window yet as of 2026-08-25 — the earliest
closures in this batch will be PDD/XPEV/XYF (reported 2026-08-24, T+5 window closes
2026-08-31).*
