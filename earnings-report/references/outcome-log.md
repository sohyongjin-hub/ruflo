# Outcome Log

Every `/earnings-report` pre-print run gets a row appended here after the print happens
and T+1 price action is known. This is what turns the illustrative 11-case backtest
(2026-08-20 session) into a real, growing dataset instead of staying anecdotal — see the
"Conditional Reaction Matrix" section of factor-guide.md.

**Columns:**
- **Date** — earnings date
- **Ticker**
- **Setup read (§1)** — skeptical / neutral / complacent
- **PEG/guide-trajectory (§2)** — cheap / stretched / n/a
- **Scenario predicted most likely** — which row of the Conditional Reaction Matrix was
  flagged as most likely pre-print (or "no lean — data unavailable")
- **Options/whisper confidence** — Sourced / Unavailable
- **Actual print quality** — clean beat / beat-with-a-catch / miss (fill in post-print)
- **Actual T+1 reaction** — % move (fill in post-print)
- **Matrix hit?** — did the actual outcome match the row flagged as most likely
  pre-print? Yes / No / No lean was given
- **Drift class predicted** — Confirmation / Repair / Continuation-of-damage /
  Unavailable (see "Drift Classification" section of factor-guide.md; added
  2026-08-21, applies going forward only)
- **Actual T+2 reaction** — % move, cumulative from print date
- **Actual T+5 reaction** — % move, cumulative from print date
- **Drift class hit?** — did the T+2/T+5 behavior match the predicted drift class? Yes /
  No / Unavailable — not attempted

---

## 2026-08-20 batch (retroactively logged — pre-dates the matrix format, single-lean era)

| Date | Ticker | Setup | PEG/guide | Scenario predicted | Confidence | Actual print quality | Actual T+1 | Matrix hit? |
|---|---|---|---|---|---|---|---|---|
| 2026-08-20 | NTES | Skeptical | Not scored (pre-rework) | "Worth a closer look" (single-lean era) | Unavailable | Beat rev, miss EPS | Fell | N/A — single-lean era |
| 2026-08-20 | BABA | Skeptical (miss-streak reset) | Not scored | "Worth a closer look" | Unavailable | 7th consecutive miss, capex-driven | Fell ~4-5% | N/A — single-lean era |
| 2026-08-20 | RERE | Skeptical | Not scored | "Worth a closer look" | Unavailable | Beat revenue, profit growth decelerated + weak guide | Fell ~11% | N/A — single-lean era |
| 2026-08-20 | FUTU | Skeptical | Not scored | "Worth a closer look" (flagged negative §6 precedent) | Sourced (short interest only) | Clean beat, all metrics | Rose modestly | N/A — single-lean era |
| 2026-08-20 | WMT | Mixed | Not scored | "Worth a closer look" (flagged options/short spike caution) | Sourced | Beat headline, comps miss | Fell ~9% | N/A — single-lean era |
| 2026-08-20 | AAP | Neutral | Not scored | "Worth a closer look" (flagged PEG stretch) | Sourced | EPS beat, revenue miss, weak comps | Fell ~16-24% | N/A — single-lean era |
| 2026-08-20 | DE | Complacent-leaning | Not scored | Not run (Stage A only) | — | Clean beat, raised outlook | Rose ~7-9% | N/A — Stage A only |
| 2026-08-20 | ROST | Complacent | Not scored | Not run (Stage A only) | — | Clean beat, raised guide | Rose ~4% | N/A — Stage A only |
| 2026-08-20 | SCSC | Data conflict | Not scored | Not run (Stage A only) | — | Large beat both lines | Rose sharply, new ATH | N/A — Stage A only |
| 2026-08-20 | LYTS | Neutral | Not scored | Not run (Stage A only) | — | Beat, margin compression | Fell ~12.5% | N/A — Stage A only |
| 2026-08-20 | OSIS | Complacent (extreme run-up) | Not scored | Not run (Stage A only) | — | Revenue miss, weak guide | Fell ~11.6% | N/A — Stage A only |
| 2026-08-20 | FLO | Skeptical (but deteriorating) | Not scored | Not run (Stage A only) | — | Revenue/EBITDA miss | Fell ~4.8% | N/A — Stage A only |
| 2026-08-20 | HOV | Skeptical (but deteriorating) | Not scored | Not run (Stage A only) | — | EPS/revenue miss | Fell ~12% | N/A — Stage A only |
| 2026-08-20 | CAN | Skeptical | Not scored | Not run (Stage A only) | — | No surprise, routine update | Flat | N/A — Stage A only |

**Note on this batch:** every row above predates the matrix format and the PEG/streak
rework — these were single-lean predictions ("worth a closer look" vs. "flagged") made
before this session's redesign. They're logged here as the founding evidence for *why*
the redesign happened, not as matrix-format entries. The first true matrix-format
entries begin with the next `/earnings-report` run after 2026-08-20.

---

## 2026-08-21 batch (first matrix-format Stage B runs; first drift-classification pass)

| Date | Ticker | Setup | PEG/guide | Actual print quality | Actual T+1 | Drift class predicted | Actual T+2 | Actual T+5 | Drift class hit? |
|---|---|---|---|---|---|---|---|---|---|
| 2026-08-21 | BJ | Tier 2 (5/8) | Not scored | Clean beat, raised FY guide | +5.61% | Confirmation (lower confidence — bearish MACD divergence, -0.42) | Not yet known | Not yet known | Pending |
| 2026-08-21 | BEKE | Tier 2 (5/8) | Not scored | High-quality beat, margin expansion, revenue declined 5.7% on mix | +4.47% | Confirmation | Not yet known | Not yet known | Pending |
| 2026-08-21 | WALD | Tier 2 (4/8) | Not scored | **No confirmed earnings print found for this date** — likely date-assumption error in Stage A screen (see factor-guide.md Drift Classification, Step 1) | -3.70% | Unavailable — drift classification not attempted (thin volume 635K, no options data, no confirmed print) | N/A | N/A | N/A — screen error, not a model failure |

**T+1 update for the 2026-08-20 batch** (reported 2026-08-20; today is 2026-08-21, i.e.
only 1 trading day elapsed — corrected from an earlier mislabeling as "T+2." Drift class
assigned retroactively — pre-dates the Drift Classification section, so treat as
illustrative only, same caveat as the batch above):

| Ticker | Actual T+1 | Drift class predicted (retroactive) | Drift class hit? |
|---|---|---|---|
| NTES | Fell (miss driven by one-time equity-investment loss, core games +9.7%) | Repair | Too early to call — this *is* T+1, not a later data point |
| BABA | Fell ~4-5% (capex 4.5:1 vs. cloud revenue growth) → +6.98% figure previously logged is this same T+1 print's move, not a later drift point | Continuation-of-damage | Too early to call |
| FUTU | Rose modestly (clean beat, all metrics) → +9.68%/RSI 72.65 previously logged is this same T+1 move | Confirmation | Too early to call |
| RERE | Fell ~11% (profit deceleration, weak guide) → +1.96%/MACD -0.035 previously logged is this same T+1 move | Continuation-of-damage (tentative) | Too early to call |

**Open — confirmed via live TradingView check (2026-08-21):** the most recent available
bar for every ticker in this log is dated 2026-08-21 (today) — meaning **no T+2 or T+5
data exists yet for any name in this log**, including the 8/20 batch. The %-move figures
previously logged under "T+2" for NTES/BABA/FUTU/RERE were actually T+1 moves (1 trading
day after their 8/20 print) and have been relabeled above. Re-check this file on or
after 2026-08-24 (T+2 for the 8/21 batch) and 2026-08-27+ (T+5 for the 8/20 batch,
2026-08-28+ for the 8/21 batch) once real trading days have actually elapsed. WALD's row
is excluded from any drift-model conclusions per the Step 1 volume/data gate; if the
user later confirms WALD did report earnings on a different date, re-run Stage B
properly against the correct date before drawing any drift conclusions from this name.
