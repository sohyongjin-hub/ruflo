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

**T+2 update for the 2026-08-20 batch (due 2026-08-24; attempted 2026-08-24):**

| Ticker | Reference (8/20 print-date) close | Actual T+2 close (8/24) | Actual T+2 % move | Drift class predicted | Drift class hit? |
|---|---|---|---|---|---|
| NTES | [Unavailable — could not confirm] | [Unavailable — could not confirm] | [Unavailable — could not confirm] | Repair | Unavailable — not attempted |
| BABA | [Unavailable — could not confirm] | [Unavailable — could not confirm] | [Unavailable — could not confirm] | Continuation-of-damage | Unavailable — not attempted |
| FUTU | [Unavailable — could not confirm] | [Unavailable — could not confirm] | [Unavailable — could not confirm] | Confirmation | Unavailable — not attempted |
| RERE | [Unavailable — could not confirm] | [Unavailable — could not confirm] | [Unavailable — could not confirm] | Continuation-of-damage (tentative) | Unavailable — not attempted |

**Why unavailable:** an extensive WebSearch cross-check (20+ queries spanning both dates
and multiple source combinations — stockanalysis.com, macrotrends.net, Yahoo Finance,
marketwatch-style sources) could not produce a reliable end-of-day closing print for any
of the 4 tickers on either 2026-08-20 or 2026-08-24. Results repeatedly conflated
intraday/pre-market/"at time of publication" quotes with actual closes, and in BABA's
case produced two directly contradictory numbers for the same date (one search returned
$130.57, up; another returned $116.72, down, for what was represented as the same 8/21
close) — a flat contradiction, not rounding noise, so no number surfaced for these
tickers should be trusted even provisionally. Per the logging rule (never guess or
fabricate a price when sources disagree or can't be confirmed), every cell above is
marked unavailable rather than filled with the closest-looking figure. Retry via a live
data terminal/brokerage feed or a direct read of a historical-price table (e.g.
stockanalysis.com's `/history` pages) rather than WebSearch synthesis, which is not
producing trustworthy exact closing prints for these specific dates right now.

---

## 2026-08-24 batch — §8 Stock Quality × Trade Quality Matrix (pilot watch-window run)

First real use of §8/the Multi-Quarter Fundamental Trend Check, from the 2026-08-24 to
2026-08-28 scan batch. Per §8's required sequencing, both names below flagged Red on
the fundamental-trend axis, so the trade-quality axis (technicals) was **not**
evaluated — stopping at "speculative trade only" is the correct behavior per spec, not
a shortcut.

| Ticker | Multi-Quarter Trend | Fundamental flag | Evidence | §8 quadrant | Trade-quality axis |
|---|---|---|---|---|---|
| PDD | Revenue growth decelerating across 6+ quarters (Q4'24 +24% → Q1'25 +10% → Q2'25 +7% → Q3'25 +9% → Q4'25 +12% → Q1'26 +11% → Q2'26 +8%); Q2 2026 revenue (RMB112.4B) **missed** the RMB115.4B estimate; net income beat a lowered estimate but was still **down 12% YoY**, consistent with margin compression flagged separately by analysts pre-print | **Red** | Multi-quarter deceleration + a revenue miss + declining net income together, not a single-quarter blip | Bad stock / not evaluated | Not evaluated — stop per §8 sequencing |
| XPEV | 2025 showed real improvement (gross margin 15.6%→21.3% Q1→Q4, first-ever quarterly profit in Q4 2025), but **the trend inflected in 2026**: Q1 2026 guidance already signaled a sharp slowdown (deliveries guide -down, revenue guide -16% to -23%), and Q2 2026 actuals confirmed it — revenue (RMB19.74B) missed the $20.57B estimate, net loss **widened** to RMB1.34B (vs. RMB0.48B a year earlier), adjusted EPS missed badly (-$1.29 vs. -$0.29 est.), stock fell to near its 52-week low on the print | **Red** | A genuine trend break (improving → deteriorating), not a continuation of prior weakness — worth flagging as a different failure mode than PDD's for the eventual §9 retrospective | Bad stock / not evaluated | Not evaluated — stop per §8 sequencing |

### TUYA — §8 gate deferred, not run (2026-08-24 routine firing)

TUYA was the third 2026-08-24 reporter in the watch window, but unlike PDD and XPEV
(both before-market-open) it releases Q2 2026 **after** the close, with the call at
8:30 PM ET. The routine fired at ~2:45 PM ET, so no press release existed. Per the
Attribution Gate Extension, the §8 gate was **deferred, not run** — its cell stays `No`
and the next firing picks it up. No fundamental flag is assigned below; the numbers are
a pre-print baseline only.

| Ticker | Status | Pre-print baseline (through Q1 2026, no Q2 data) | Fundamental flag |
|---|---|---|---|
| TUYA | §8 deferred — print not yet released at firing time | Revenue growth decelerating: Q1'25 $74.7M **+21.1%** YoY → Q1'26 $80.9M **+8.3%** YoY. Gross margin drifting down across the window: 48.5% (Q1'25) → 48.4% → 48.3% → 47.6% (Q4'25) → **46.9%** (Q1'26, -1.6pp YoY). Net margin moving the other way: 14.8% → 15.7% → 18.2% → 22.9%. Q1'26 mix: PaaS +9.8%, AI applications +16.9%, smart home/robot hardware **-6.9%** | **Not assigned** — requires the Q2 print |

The baseline is genuinely mixed (decelerating top line and eroding gross margin against
a steadily improving net margin), which is exactly why the flag needs the Q2 print to
resolve rather than being guessed from trailing data.

**Process note:** these two entries were originally produced by the pilot
`RemoteTrigger` routine's first scheduled/manual firing (2026-08-24), but that run's
commit was lost when its `git push` failed (GitHub App not authorized for this repo —
see `earnings-report/CLAUDE.md`). Reproduced here with fresh research in an interactive
session that has working push access, once the authorization is fixed.

## 2026-08-24 second firing — XYF §8 gate run; TUYA re-checked, still deferred

**TUYA:** re-checked at this firing (~6 PM ET). No press release found yet (call is
8:30 PM ET) — `§8 gate` correctly stays deferred at `No` for a later firing to pick up.
No new baseline data collected this pass; see the TUYA entry above for the pre-print
baseline.

**XYF — Multi-Quarter Fundamental Trend Check + §8 Matrix**

Press release confirmed (BMO, 8:30 AM ET, 2026-08-24) — Attribution Gate cleared.

| Quarter | Revenue (YoY) | Revenue (QoQ) | Net income (YoY) | Notes |
|---|---|---|---|---|
| FY2024 | RMB5.87B | — | RMB1,539.9M | — |
| FY2025 | RMB7.64B (+30.1%) | — | RMB1,464.6M (-4.8%) | operating margin 31.9%→21.3% |
| Q3 2025 | +23.9% | -13.7% | +12.1% (RMB421.2M) | still growing |
| Q4 2025 | -14.1% | -25.1% | -85.2% (RMB57.2M) | 31-60dpd 1.17%→2.90%; 91-180dpd 2.48%→6.31% |
| Q1 2026 | -39.3% | -19.9% | RMB37.9M | margin compression, bearish earnings quality (SimplyWall St) |
| Q2 2026 | **-56.3%** (RMB993.6M) | up sequentially vs. Q1 | RMB47M (seq. up, but EPS RMB1.26 vs RMB12.6 YoY, ~-90%) | loan facilitation fees -78.2% YoY; **no forward guidance given** |

Confidence tag: **[Sourced]** for FY-level operating margin and Q2'26 EPS-vs-prior-year;
**[Unavailable]** for a clean quarterly margin/EPS series across all 8 trailing quarters
(macrotrends.net / stockanalysis.com unreachable this pass) — trend synthesis leans on
the revenue/net-income cadence plus the cited margin/delinquency data points rather than
a complete 8-quarter table.

Revenue growth decelerated for four consecutive quarters, flipping from +23.9% YoY
(Q3'25) to -56.3% YoY (Q2'26) — an accelerating breakdown, not a one-off. Net income fell
85-90% YoY in three of the last four quarters. Delinquencies rose in parallel (91-180dpd
up ~2.5x YoY as of Q4'25). Management gave no forward guidance this quarter, citing
"limited visibility" and a "difficult and uncertain" fintech listing environment.

§7 lens cross-check: **Moat — Weak** (commoditized Chinese online consumer-lending
model, no switching costs/network effects/pricing power). **Competitive advantage —
Weak** (revenue collapse + delinquency spike indicate weakening, not resilience).
**Management — Weak/Unconfirmed** (conservative underwriting is defensible, but
withholding all guidance is a caution signal; insider Form-4 activity not checked —
[Unconfirmed]). **Industry position — Weak** (China online consumer-finance/fintech
lending remains in a multi-year regulatory-tightening/contraction phase, no sector
tailwind offset found). All four lenses read Weak, consistent with the numeric trend.

| Ticker | Multi-Quarter Trend | Fundamental flag | §8 quadrant | Trade-quality axis |
|---|---|---|---|---|
| XYF | Revenue growth decelerating 4 straight quarters into a -56.3% YoY Q2'26 print, net income down 85-90% YoY in 3 of last 4 quarters, rising delinquencies, no forward guidance, all four §7 lenses Weak | **Red** | Speculative trade only / avoid | Not evaluated — stop per §8 sequencing |

**Read:** XYF is not a fundamentals-thesis hold right now. Any post-print interest
should be framed strictly as a short-horizon speculative trade with a tight
invalidation, never a size-up or hold-through-weakness position. No Drift
Classification, Confirmation Gate, or Swing-Timing Overlay run — those require at least
a Yellow gate.

---

## 2026-08-25 firing — PDD/XPEV/XYF T+0/T+1 price action; TUYA §8 gate run

**Data-quality note:** WebFetch to primary quote sources (Yahoo Finance, CNBC,
stockanalysis.com) was proxy-blocked this pass; all figures below are WebSearch-snippet
sourced, cross-checked across 2+ independent snippets where possible. Conflicting
figures are marked [Unreliable] rather than resolved by guessing.

| Ticker | Pre-print close (8/21) | T+0 (8/24) actual reaction | T+1 (8/25) actual reaction | Notes |
|---|---|---|---|---|
| PDD | $88.38 | **~-1.5%** (close $87.07) — initial +3-5% premarket pop on an adj.-EPS beat fully reversed intraday on the revenue miss/margin pressure | [Unreliable — one snippet shows $88.58 with a "$89.52 previous close" that doesn't reconcile with the corroborated $87.07 T+0 close; directionally suggests a round-trip back near/above the pre-print level, not deepening weakness, but not independently confirmed] | Red flag (deterioration direction) was right; reaction magnitude was muted, not the sustained punishment a Red flag implies — see retrospective-log.md |
| XPEV | $12.19 | **-7.6% to -8.5%** to ~$11.15-11.40, near 52-wk low — revenue miss, GAAP net loss nearly tripled YoY, soft Q3 guidance | **Continued weakness — invezz.com (2026-08-25): "sinks 10%," China Renaissance downgrade Hold from Buy, PT cut $40.50→$11.30; Citi/BofA also cut targets** | Clean hit — Red flag, direction, and magnitude all confirmed; see retrospective-log.md |
| XYF | ~$5.39 | **+2.0% to +2.4%** to ~$5.50-5.52 — driven by QoQ net-income improvement (RMB47M vs RMB37.9M Q1) + maintained $0.28/ADS semiannual dividend, despite -56.3% YoY revenue and no guidance | [Low confidence, single source — $5.07, suggesting most/all of the T+0 pop reversed by T+1, converging late toward the Red flag's implied direction; not independently cross-verified] | Directional miss at T+0 (popped despite being the most severely Red-flagged of the three) — see retrospective-log.md for the proposed model-gap note (QoQ inflection / capital-return signal not currently weighed by the Red-flag logic) |

**Cross-ticker read:** all three were Red-flagged the same day via the same section
(Multi-Quarter Fundamental Trend Check) and produced three different outcomes — a clean
hit (XPEV), a magnitude miss (PDD), and a directional miss (XYF). Per the framework's
own discipline, no single one of these justifies a factor-guide.md edit; the spread
itself is logged as a pattern to watch for recurrence across future Red-flagged prints.

### TUYA — §8 gate run (Attribution Gate cleared, 2026-08-25)

Q2 2026 release confirmed via PR Newswire + SEC 6-K, published 2026-08-24 after close;
call held 8:30 PM ET 2026-08-24, transcript available. Attribution Gate clears.

| Metric | Q1'26 (baseline) | Q2'26 (new) | Read |
|---|---|---|---|
| Revenue growth (YoY) | +8.3% (decelerating from +21.1% Q1'25) | **+16.0%** | Breaks the deceleration trend — positive |
| Gross margin (YoY chg) | 46.9% (-1.6pt) | 46.3% (**-2.1pt**) | Erosion continues and worsens — negative, structural (semiconductor cost pressure cited) |
| Net margin (YoY) | 22.9% (+8.1pt YoY) | 20.0% (+4.3pt YoY, but down sequentially from 22.9%) | Still improving YoY, pace decelerating |
| PaaS segment growth | +9.8% | +16.9% | Accelerating — positive |
| Smart home/robot hardware | -6.9% | +23.2% | Sharp reversal to growth |
| AI applications | +16.9% | **+3.9%** | Sharp deceleration — in tension with management's AI-first strategic narrative (new "Cobuilder" tool) |

Balance sheet: ~$976.1M cash vs. ~$1.5B market cap — fortress-like cushion. Revenue
$92.9M (+16.0% YoY, +14.8% QoQ). No explicit numeric forward guidance issued (company
does not appear to issue formal guidance).

**Multi-Quarter Fundamental Trend Check flag: YELLOW.** Revenue re-acceleration and a
still-improving (if decelerating) net margin trend, against continued/worsening gross
margin erosion and a sharp deceleration in the one segment (AI applications) management
is publicly building its strategy around — mixed enough to avoid Red, not clean enough
for Green.

Technicals (§8 gate cleared to run since Yellow, not Red): RSI ~25-36 (oversold-to-weak,
source range), MACD negative (-0.05 to -0.017, no confirmed turn), price below both the
50-day (~$2.42) and 200-day (~$2.36) moving averages — an established downtrend
structure. Stock price ~$1.81 (8/21) → ~$1.84 (8/25), a modest ~+1.7% drift, not a
sharp pop.

| Ticker | Multi-Quarter Trend | Fundamental flag | §8 quadrant | Confirmation Gate | Drift Classification |
|---|---|---|---|---|---|
| TUYA | Revenue re-accelerated 8.3%→16.0% YoY and net margin still improving YoY, but gross margin erosion continued/worsened (-1.6pt→-2.1pt) and AI-applications growth decelerated sharply (+16.9%→+3.9%) against a heavy AI-first narrative | **Yellow** | Not cleanly either quadrant — mixed stock quality, trade timing unresolved | **Awaiting confirmation** (fundamentals mildly constructive, technicals still bearish — price below both MAs, MACD negative) | **Repair (unconfirmed)** [Unvalidated — n<10 cases] — broad-based genuine improvement argues against Continuation-of-damage, but reaction size was small and technical backdrop hasn't turned; re-check in 3-5 sessions |

**Read:** TUYA is a "wait for confirmation" case, not a clean buy or avoid signal — the
fundamental print was good enough to clear the Red-flag bar but not clean enough, and
paired with a still-bearish chart, to act on with size yet.
