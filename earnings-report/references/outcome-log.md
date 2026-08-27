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
| 2026-08-21 | BJ | Tier 2 (5/8) | Not scored | Clean beat, raised FY guide | +5.61% | Confirmation (lower confidence — bearish MACD divergence, -0.42) | [Unavailable — could not confirm] | Not yet known | Pending — T+2 unavailable, reassess at T+5 (due 2026-08-28) |
| 2026-08-21 | BEKE | Tier 2 (5/8) | Not scored | High-quality beat, margin expansion, revenue declined 5.7% on mix | +4.47% | Confirmation | [Unavailable — could not confirm] | Not yet known | Pending — T+2 unavailable, reassess at T+5 (due 2026-08-28) |
| 2026-08-21 | WALD | Tier 2 (4/8) | Not scored | **No confirmed earnings print found for this date** — likely date-assumption error in Stage A screen (see factor-guide.md Drift Classification, Step 1) | -3.70% | Unavailable — drift classification not attempted (thin volume 635K, no options data, no confirmed print) | N/A | N/A | N/A — screen error, not a model failure |

**T+2 update for the 2026-08-21 batch (due 2026-08-25; attempted 2026-08-25):** WebSearch
(15+ queries spanning stockanalysis.com, macrotrends.net, Yahoo Finance, CNBC, Benzinga,
and general market-recap coverage) could not produce a reliable confirmed closing price
for BJ or BEKE on either 2026-08-24 or 2026-08-25. Results repeatedly returned
premarket/intraday/"trading at" quotes instead of confirmed end-of-day closes, and in
some cases directly conflicting numbers for the same window (BEKE surfaced as both
~$15.84 and in the high-$17/low-$18 range; BJ surfaced as $93.39 premarket on 8/21,
~$94.72 and ~$99.71 at ambiguous/unconfirmed timestamps) — none independently
cross-checked as an actual closing print, so per the logging rule both **Actual T+2**
cells above are marked unavailable rather than guessed. One data point did cross-check
cleanly: BEKE's 8/21 close of $17.75 vs. an 8/20 previous close of $16.99 is a +4.47%
move — which exactly matches the figure already logged above as "Actual T+1." That
raises the possibility the existing T+1 cells for BJ/BEKE are actually the *same-day*
(T+0) earnings-reaction move rather than a full trading day later — the identical
mislabeling already caught and corrected for the 2026-08-20 batch below. Flagging this
for review, not correcting it here — out of scope for this firing, which is limited to
the currently-due T+2 cells; if confirmed on a later pass, the T+1/T+2/T+5 offsets for
this batch may need relabeling together. Retry via a live data terminal/brokerage feed
or a direct historical-price table read rather than WebSearch synthesis, same conclusion
already reached for the 2026-08-20 batch's T+2 attempt below.

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

---

## 2026-08-26 firing — TUYA Confirmation Gate re-check; PLAB/ANF/SJM §8 gate run; NVDA/DY/JKS/DCI Monitor-track daily check

### TUYA — Confirmation Gate Daily Re-Check (still unresolved)

Re-checked technicals-only (MACD, price vs. 50-/200-day MA, RSI) via WebSearch:

| Metric | 2026-08-25 EOD | 2026-08-26 | Changed? |
|---|---|---|---|
| Price | ~$1.76 close | ~$1.79-1.80 (prev close $1.80, +0.28%) | Modest bounce, no directional break |
| MACD | Negative, ~-0.02 to -0.05 | Negative, -0.051 / -0.0165 (two sources), no crossover | No change |
| 50-day MA (~$2.42) | Below | Below (~26% below) | No change — not reclaimed |
| 200-day MA (~$2.36) | Below | Below (~24% below) | No change — not reclaimed |
| RSI | ~25-36 | ~36.1, neutral-weak | No change |

No qualifying resolution trigger fired (no MACD crossover, no MA reclaim, no RSI-extreme
reversal). One source's composite technical rating reads "Strong Sell" (6 sell vs. 1 buy
signal) — consistent-to-slightly-more-bearish, but not a discrete, nameable event.
**Confirmation Gate stays "Awaiting confirmation."** Daily re-check continues tomorrow
per the standing rule.

### PLAB (Photronics) — §8 gate run (Attribution Gate cleared same-day, 2026-08-26)

Press release (GlobeNewswire) + Form 8-K confirmed same-day, before-market-open, 8:30am
ET call. Attribution Gate clears cleanly.

| Quarter | Revenue | Rev YoY | Gross margin | Op margin | Non-GAAP EPS |
|---|---|---|---|---|---|
| Q4 FY25 | $216.0M | -3% | 35.0% | 24.0% | $0.60 |
| Q1 FY26 | $225.1M | +6% | 35.0% | 24.4% | $0.61 |
| Q2 FY26 | $209.9M | ~flat | 31.3% | 20.1% | $0.42 (missed guided $0.49-0.55 low end) |
| **Q3 FY26 (today)** | **$216.0M** | **+2.7%** | **33.2%** | **21.1%** | **$0.50 non-GAAP** ($0.49 GAAP) |

Beat vs. consensus: revenue $216.0M vs. $208.7-208.8M; EPS $0.50 vs. $0.4033 (~24-25%
beat) — but EPS was still down YoY vs. Q3 FY25's $0.51. Q4 FY26 guide range **widened**
(rev $207-227M, op margin 19-24% — low end below today's actual 21.1%), explicitly
attributed to "increased uncertainty." FY26 capex guide cut $330M→$255-305M ("vendor
delivery timing," not demand, per company). Segment: IC revenue $154.7M +5% YoY, record
high-end-node mix (44%, 28/22/14nm); FPD revenue $61.4M -2% YoY but near all-time highs
on OLED/G8.6 AMOLED demand.

**Critical context:** Q2 FY26 (reported 2026-05-28) was a severe miss (EPS $0.42 vs.
guided $0.49-0.55, IC revenue -11% sequentially) that erased $1.1B of market cap in a
single day (-36%) and triggered an active securities class-action lawsuit (class period
Dec 10, 2025-May 27, 2026; lead-plaintiff deadline Sept 4, 2026) alleging management
misled investors specifically about high-end IC photomask demand/outlook — **the exact
segment today's "record" 44% mix claim is built on.**

**Multi-Quarter Fundamental Trend Check flag: YELLOW, leaning toward the Red boundary.**
Choppy (not monotonic) revenue/margin/EPS trend; today's beat is against a bar reset low
after the Q2 crash and EPS is still down YoY; guide widened rather than tightened; the
"record high-end IC" narrative driving the beat is the subject of active fraud
litigation — a direct qualitative-vs-numeric tension, not a clean confirmation.

**T+0 technicals:** opened +27.1% (~$29.32→$37.26) immediately on the release, faded to
a settled **~+4-5%** within ~20 minutes — a largely-reversed spike smaller than what a
25% EPS beat would typically produce, itself informative (market not treating this as an
unambiguous strong quarter). MACD/RSI/MA: **[Unreliable/Unavailable]** — WebSearch
results were internally inconsistent and cross-contaminated with unrelated tickers: no
trustworthy T+0 reading could be sourced (a known cloud-routine limitation — no
TradingView access).

**Confirmation Gate: [Unavailable — technicals not reliably sourced].** Cannot resolve
to Confirmed/Awaiting confirmation/Contradicted without a trustworthy T+0 MACD/RSI/MA
reading; retry at T+1.

**Tentative Drift Classification:** does not cleanly fit any of the three labels —
closest to a low-confidence, qualified "Confirmation" (sequential IC recovery is real
operating performance, not a one-time item), undercut by the still-negative YoY EPS
comp, widened guide, and the active litigation on the exact claim driving the "record"
framing. **[Unvalidated — n<10 cases]**, flagged as lower-confidence than a typical
Yellow case given the technicals data gap.

| Ticker | Multi-Quarter Trend | Fundamental flag | §8 quadrant | Confirmation Gate | Drift Classification |
|---|---|---|---|---|---|
| PLAB | Choppy trend, still-negative YoY EPS on today's beat, guide widened not tightened, active securities-fraud suit on the exact "record high-end IC" claim driving the print | **Yellow (near Red boundary)** | Not fully evaluated — technicals unreliable; provisionally "wait, don't chase / re-check" | [Unavailable — technicals not reliably sourced] | Weak/low-confidence lean toward "Confirmation," not cleanly gated |

### ANF (Abercrombie & Fitch) — §8 gate run (2026-08-26)

Press release (GlobeNewswire) confirmed same-day, before-market-open (~7:30am ET). High
first-minute volume (643K shares) confirms a real, informationally-driven move.
Attribution Gate clears.

| Quarter | Revenue | Rev YoY | Op margin (GAAP) |
|---|---|---|---|
| Q2 FY25 | $1.2B | +7% | — |
| Q3 FY25 | $1.3B | +7% | — |
| Q4 FY25 | $1.67B | +5% | 14.1% (vs. 16.2% PY — compression) |
| Q1 FY26 | $1.114B | +2% (sharp deceleration) | 8.0% (vs. 9.3% PY — compression) |
| **Q2 FY26 (today)** | **$1.27B** | **+5%** (15th straight growth qtr) | **19.9% headline** |

Revenue reaccelerated broadly: Abercrombie brand +8%, APAC +19%, Americas +5%, EMEA +2%.
**Critical caveat:** the 19.9% headline op margin includes a ~790bps benefit from a
~$100M pre-tax IEEPA tariff refund booked as a reduction of cost of sales (one-time).
Ex-refund: ~12.0% underlying op margin — **still below** last year's 13.9% adjusted
margin, meaning the two-quarter compression trend does **not** actually break this
quarter on an underlying basis; the headline number masks it. Adjusted EPS $2.32→$2.42
(+4% YoY, real but modest) vs. reported EPS $2.91→$4.17 (headline +43%, inflated by the
tariff refund, a ~24% beat vs. $1.95 consensus on the adjusted basis). FY26 guide raised
(sales growth to ~5%, op margin to 14.5-15%, EPS to $13.10-13.60 vs. prior $10.20-11.00)
but ~$120M of cumulative FY26 tariff refunds is embedded in that guide (220bps of the
margin-guide upgrade attributed directly to it per RTTNews) — the raise is real but
partly one-time-inflated, not a pure structural re-rate.

**Multi-Quarter Fundamental Trend Check flag: YELLOW.** Genuine, broad-based revenue
reacceleration against a margin/EPS trend whose apparent "break" is substantially a
one-time item — underlying margin still trails last year.

**T+0 technicals:** move accelerated through the day, roughly **+30% to +42%** by the
afternoon session (best estimate, exact close [Unavailable] — no single authoritative
closing print found, but the trajectory across independent sources converges toward the
high end). Unusually large for ANF's Mid-cap band (~$4.8-4.89B) — the guide's own
calibration treats up to +20% as unremarkable for Mid-caps; this is 1.5-2x+ beyond that,
explained by the unusually large EPS-beat magnitude and a guide reset that materially
repriced FY26 EPS estimates, not by any non-earnings catalyst. MACD/RSI: only a
pre-print baseline found (MACD -1.090 Sell, RSI ~35-41); **no T+0 reading sourced**.

**Confirmation Gate: [Unavailable — no T+0 MACD/RSI sourced].** Directionally
consistent with a technically strong reaction (price now far above both 50-/200-day
MAs) but not a substitute for a sourced gate read; retry at T+1.

**Tentative Drift Classification: Repair (leaning)** — the T+0 magnitude is
substantially driven by a large one-time item (tariff refund ≈ 42% of headline EPS,
~220bps of the guide raise) layered on genuine-but-modest underlying improvement (adj.
EPS +4% YoY, margin still below last year ex-refund) — closer to "beat driven
substantially by one-time items, core business intact" than a clean broad-based
Confirmation. **[Unvalidated — n<10 cases]**.

| Ticker | Multi-Quarter Trend | Fundamental flag | §8 quadrant | Confirmation Gate | Drift Classification |
|---|---|---|---|---|---|
| ANF | Broad-based revenue reacceleration (+2%→+5%) but underlying ex-refund op margin (~12.0%) still trails last year's 13.9% — the "break" in the margin-compression trend is substantially a one-time tariff refund | **Yellow** | Not fully evaluated — Confirmation Gate unresolved; T+0 move (+30-42%) unusually large for its cap band | [Unavailable — no T+0 technicals sourced] | Repair (leaning), unconfirmed |

### SJM (J.M. Smucker) — §8 gate run (2026-08-26)

Press release (PR Newswire) confirmed same-day, before-market-open (7:00am ET). No
concurrent non-earnings catalyst found. Attribution Gate clears.

| Quarter | Net sales YoY (reported) | Adj. EPS | Adj. EPS YoY |
|---|---|---|---|
| Q1 FY26 | -1% | $1.90 | -22% |
| Q2 FY26 | +3% | $2.10 | -24% |
| Q3 FY26 | +7% | $2.38 | -9% (beat $2.27 est.) |
| Q4 FY26 | +6% | $2.77 | +20% |
| **Q1 FY27 (today)** | **+5%** | **$3.24** | **+71%** vs. $2.22 consensus (beat by $1.02) |

Revenue $2.22B; adjusted gross margin 42.8% (+~760bps YoY); adjusted operating income
+46% to $540.7M. **Caveat:** ~$115M gross tariff-refund benefit = $0.84/share of the
$3.24 adjusted EPS — ex-tariff EPS ≈ $2.40, still a genuine ~8% beat vs. $2.22
consensus, so the beat is real but roughly a quarter of the headline number is one-time.
Full-year guide implies only ~38.75% gross margin (well below Q1's 42.8%) — Q1's margin
print is not the run-rate. Segment: Coffee strong (+13% revenue, segment profit +124%
on pricing pass-through); Sweet Baked Snacks weak (-7% revenue, -13% profit). Guidance
raised: EPS $9.75-10.25→$10.50-11.00 (Street-beating), but full-year revenue guide still
implies a **decline** (-1% to -2%) despite Q1's +5% growth — company attributes this to
planned coffee-cost pricing pass-through later in the year, not demand deceleration, but
still a real tension against the "everything accelerating" read.

**Multi-Quarter Fundamental Trend Check flag: YELLOW, leaning Green.** Revenue trend
accelerated from -1% to a sustained +3-7% and held +5% this quarter; EPS trend inflected
from consecutive declines to a large beat; margins expanded meaningfully; guide raised —
but ~26% of the EPS beat and part of the full-year raise are one-time tariff items, the
full-year sales guide still implies a decline, and Sweet Baked Snacks continues to
deteriorate.

**T+0 technicals:** +4.3-5% to $130.81, a **new 52-week high** (stock now +35.4% YTD).
By implication of the new high, price is above both 50-/200-day MAs. RSI/MACD:
[Unreliable] — conflicting/stale figures across sources (one dated a full month before
today's print). Given the fresh 52-week high after a 35% YTD run, an elevated
(possibly-overbought) RSI is plausible but not confirmed to a specific value — flagged
as a soft elevated pullback/bounce risk without asserting a number.

**Confirmation Gate: Confirmed** (basis: [Sourced] price-trend evidence — new 52-week
high, clean directional agreement between the beat/raise and price action — not based
on the [Unreliable] RSI/MACD numbers specifically).

**Tentative Drift Classification: Confirmation**, with a one-time-item caveat — maps to
"broad-based, margin-accretive beat with guide keeping pace," but the ~26% one-time-item
share of the beat and the still-declining full-year sales guide keep this from being a
pristine case; worth re-checking once the market fully digests the one-time-item share
rather than assuming pure extension. **[Unvalidated — n<10 cases]**.

| Ticker | Multi-Quarter Trend | Fundamental flag | §8 quadrant | Confirmation Gate | Drift Classification |
|---|---|---|---|---|---|
| SJM | Revenue trend inflected from -1% to a sustained +3-7% (held +5% today); EPS inflected from declines to a +71% headline beat (~+8% ex-tariff); margins expanded — but ~26% of the beat is a one-time tariff refund and FY guide still implies a sales decline | **Yellow (leaning Green)** | Good stock (with caveat) / Good trade — strongest quadrant, with the "good stock" side resting partly on a one-time item | **Confirmed** | Confirmation (one-time-item caveat), unconfirmed |

**Cross-ticker read (PLAB/ANF/SJM, same-day):** all three cleared the §8 gate at
Yellow, none Red or Green — a useful data point on how common a clean Green read
actually is versus a mixed one, worth tracking as this dataset grows. All three also
carry a meaningful one-time-item component in their headline beat (PLAB: bounce off a
self-inflicted crash quarter; ANF: ~42% of headline EPS from a tariff refund; SJM: ~26%
of the beat from a tariff refund) — not itself a pattern conclusion (n=3 same-day
cluster, possibly a tariff-refund-timing coincidence across unrelated names this
particular week), but worth watching whether other names report similar one-time tariff
items this same reporting season.

### NVDA — Monitor-track daily check, T+0 (2026-08-26, AMC print)

Reported after close 2026-08-26 (Q2 FY2027). 8-K/press release confirmed — Attribution
Gate clears. Clean beat-and-raise: revenue $96.2B (+106% YoY) vs. ~$92.2-92.4B
consensus; Data Center $89.0B (+117% YoY); adj. EPS $2.22 vs. ~$2.08 consensus; Q3
FY2027 guide $108B ±2% vs. ~$104.2B consensus (raised ~$3.8-4B above Street). One soft
spot: guidance assumes **zero** data-center compute revenue from China. ~$26B returned
via buybacks/dividends in the quarter.

**Actual reaction:** best-supported estimate **~-1.3% to -3% after-hours** (multiple
sources converge; one outlier +5% figure discounted as likely stale/cross-quarter
contamination). This continues NVDA's established pattern of the last 4-5 quarters
(beat-and-raise, sell the news anyway on an already-priced-for-perfection setup) — not
a surprise given the project's own background notes on this name.

**Tier 2 protocol application:** baseline ±5.27% [Sourced] × 1.5 (Mega-cap tighter
multiplier) ≈ 7.9% escalation threshold. Actual move (~1.3-3%) is well under both the
raw baseline and the escalation threshold. Direction (modest sell-the-news dip on a
beat-and-raise) matches the setup read, not a contradiction. **No escalation** — stays
Monitor-Only.

**Magnitude Surprise:** actual move meaningfully smaller than the ±5.27% implied, and a
negative-direction give-back despite a strong headline beat — capping factor named: the
explicit zero-China-data-center-revenue guidance assumption, not print quality.

### DY, JKS, DCI — Monitor-track daily check, T+0 (2026-08-26)

All three reported today; baselines were [Unavailable] for all three going in (see
2026-08-25 entries). Magnitude Surprise Tiered fallback attempted for each — none
reached the ≥3-prior-print (Tier 2) or ≥5-peer-point (Tier 3) threshold, so all three
stay formally **[Unavailable — insufficient data, no magnitude gauge computed]**;
informal peer/historical context is reported below but not presented at scored
confidence, per the tiering discipline.

| Ticker | Reported | T+0 move | Vs. consensus | Informal peer/historical context | Escalate? |
|---|---|---|---|---|---|
| DY | [Sourced] premarket, 8-K + press release confirmed | **-12.9%** | EPS/rev beat, but Q3 guide ($4.33-4.79, mid $4.56) below Street ($4.79); FY27 guide roughly in line, not a real raise | MasTec -18.5% (guidance-driven), Quanta Services -3.6% (priced-for-perfection digest) — 2 points, short of Tier 3 threshold | **Yes — escalated** (see below) |
| JKS | [Sourced] premarket, 6-K confirmed | **~-11.8%** ($15.50→$13.67) | Wider-than-expected net loss, sector oversupply/pricing pressure continues; inventory turnover improved (145→125 days), net debt rose | One prior JKS print (-3.7%, insufficient for Tier 2); no usable peer figures found | No |
| DCI | [Sourced] 6am ET, 8-K confirmed | **+2.31%** to $95.41 | Clean beat (adj. EPS $1.15 vs $1.13; rev $1.059B vs $1.04B, first-ever $1B+ quarter); Facet Filtration acquisition closed | Emerson Electric +2.6% (beat-and-raise), IDEX ~flat (beat) — 2-3 partial points, short of Tier 3 threshold | No |

**DY escalation:** -12.9% sits at/past the upper edge of the Large-cap band's typical
"mid-single to low-double-digit%" range (Market Cap Calibration), with no [Sourced]
baseline to compute a formal multiple. This is a judgment call, not a hard-threshold
trigger — flagged because the move is driven by a genuine forward-guidance miss (Q3
guide below Street despite a Q2 beat), which is exactly the kind of "genuinely doesn't
fit the pre-print picture" case the protocol is designed to catch, not routine
earnings-day noise. **Escalated to the full deep-dive track effective 2026-08-26** —
full §7/§8/§9 Multi-Quarter Fundamental Trend Check to be run at the next firing (not
enough trailing-quarter data was gathered this pass to complete it same-day); DY stays
on the full-dive track for the remainder of its window per protocol regardless of
subsequent calmer days.

**JKS and DCI:** both moves are within routine volatility for their respective
market-cap bands (JKS well under the Small-cap "20%+ routine" range; DCI far below the
Large-cap typical range) and direction matches each name's own print quality (miss→down,
beat→up) — no contradiction. **No escalation for either** — logged and monitoring
continues.

---

## 2026-08-27 batch — 12 Full Deep-Dive §8 gates, DY's first Trend Check, 9 Monitor-track reporters

The single busiest day of the pilot: 21 of 30 tracked names touched. Full context and
evidence for every line below lives in `watch-window.md`'s 2026-08-27 firing note; this
table is the compact predicted-vs-actual record.

### Full Deep-Dive Track — §8 gate results (2026-08-27 reporters)

| Ticker | Trend flag | Evidence (compressed) | T+0 move | Confirmation Gate | Drift class (tentative) |
|---|---|---|---|---|---|
| BBW | **Red** | Revenue growth negative 5 straight quarters (+11.1%→-7.2%), EPS down YoY in 3 of 4 quarters, 2nd guidance cut this FY | ~-15.6% (premarket) to ~-28.4% (intraday, sources disagree) | N/A | N/A |
| DG | **Green** | Revenue growth accelerating (4.2%→5.2%), EPS growth accelerating (12.4%→33.3%), margin expanding 3 straight quarters, guide raised 2 straight reports | ~+5-7% (sources range 2.5-12.4%) | Confirmed | Confirmation |
| PD | **Red** | Revenue growth decelerating 5 straight quarters (6.4%→0.8%), NRR fell 106%→98% (net customer-base contraction) | -1.7% | N/A | N/A |
| ULTA | **Yellow** | Margin/EPS/guidance Green-quality, but comp growth decelerating 3 straight quarters (6.7%→3.8%) | AH +2% (preliminary; vs. 7.5% implied) | Awaiting confirmation | — |
| WDAY | **Yellow** | Margin/EPS beat streak intact, but subscription growth decelerating 2 straight quarters, backlog growth cratered 17-20%→8.0% | AH ~-7.0% | Confirmed (bearish) | Continuation-of-damage (low confidence) |
| HQY | **Green** | Consistent 7-9% revenue growth, margin expanding, EPS beat continues the trend, no deterioration found | ~-13.6% to -14.1% | [Non-standard — Green fundamentals, guide raise too small for the bar] | Doesn't fit taxonomy — closest analog: KEYS priced-for-perfection |
| BURL | **Yellow** | EPS beat/raise + margin expansion intact, but comp growth decelerated sharply (6%→2%) and 1st revenue miss in the streak | -6.8% | Confirmed (bearish) | Confirmation (of downside repricing) |
| GAP | **Yellow** | Comp streak (9 quarters positive) broke to -1%; mixed by brand (Gap/Banana Republic strong, Old Navy/Athleta weak); full-year sales guide narrowed even as EPS guide raised | ~+11-12% | [Unavailable] | Confirmation-leaning [Unvalidated] |
| IREN | **Red** | Revenue declining 3 straight quarters, adj. EBITDA declining 4 straight quarters, GAAP net loss widened to -$684M (Q4) | -6.23% (pre-print) then AH +3.21% (post-release) | N/A | N/A |
| RBRK | **Yellow** | Beat-and-raise, ARR +33%, but 5 straight quarters of decelerating growth (51%→37.9%) + margin softening | AH -9.3% to -9.7% | Confirmed (bearish) | Confirmation (downside) |
| S (SentinelOne) | **Yellow** | Revenue stable-to-mild-decel, margin inflection (op margin 2%→10%), but 2nd straight quarter of Street-disappointing guidance | AH -6.4% | [Unavailable]/Awaiting confirmation | Continuation-of-damage (leaning) |
| BBAR | Not reported | Release after-close 2026-08-27, call scheduled 2026-08-28 — deferred to next firing per the standing AMC-reporter rule | — | — | — |

**Notable same-day pattern:** 3 of the 4 flagged Tier 3 "priced for perfection"
complacent names (HQY, RBRK, S) reported today and all 3 sold off (-14%, -9.5%, -6.4%
respectively) despite decent-to-strong prints — a strong same-day corroboration of the
KEYS pattern, though logged as observation only; §11 promotion requires full window
closure per-ticker, not a same-day cross-ticker read.

### DY (Monitor-track, escalated 2026-08-26) — first Multi-Quarter Fundamental Trend Check

**Yellow** — trailing revenue/EPS/margin trend accelerating (Q4FY26 +34.4%→Q2FY27
+45.6% YoY revenue; EPS $2.03→$5.29), but the current print's forward guide missed
(Q3 EPS guide $4.56 vs. $4.72-4.79 Street), substantially explained by ~$150M of
wireless-program revenue deferred to FY28 (timing, not lost demand) plus margin-
investment costs; record backlog $12.24B (+53.2% YoY). Tentative Drift Classification:
Continuation-of-damage (leaning) — T+1 price/technicals [Unavailable]; Cantor Fitzgerald
cut its PT to $476 (from $654) same-day, kept Overweight.

### Monitor-Only Track — daily checks, 2026-08-27 reporters

| Ticker | T+0 move | Baseline | Multiple | Escalate? |
|---|---|---|---|---|
| BBY | -4.5% to -4.9% | 8.32% | ~0.55-0.59x | No |
| BZUN | [Unavailable — budget exhausted] | [Unavailable] | — | Not escalated (no data ≠ a trigger); retry |
| CM | ~flat to -0.6% | [Unavailable] | — | No |
| HRL | ~-10.2% | 5.59% | ~1.8-1.9x | **Yes — escalated** |
| LOT | [Unavailable — conflicting quotes] | [Unavailable] | — | Undetermined; retry |
| RY | -0.8% to -2.3% | 2.12% | ~0.4-1.1x | No |
| TD | ~+1.5% (low confidence) | [Unavailable] | — | No |
| ADSK | [Unavailable — reports AMC, no reaction yet] | 8.9% | — | Cannot determine; retry |
| ESTC | [Unavailable — reports AMC, no reaction yet] | 10.7% (newly sourced) | — | Cannot determine; retry |
| MRVL | ~-4.3% (AH) | 12.4% | ~0.35x | No |
| DLTR | ~-3.9% | 13.2% | ~0.30x | No |

**HRL escalation:** -10.2% vs. a 5.59% [Sourced] baseline is ~1.8-1.9x, past the ~8.4%
(1.5x, Large-cap) trigger, driven by a genuine revenue miss + guide cut — the exact
"genuinely doesn't fit the pre-print picture" case the protocol is designed to catch.
**Escalated to the full deep-dive track effective 2026-08-27** — full §7/§8/§9 Multi-
Quarter Fundamental Trend Check to be run at the next firing.

**NVDA/JKS/DCI T+1 re-checks:** all three hit the same WebSearch-budget wall as
BZUN/LOT/ADSK/ESTC above — NVDA's own T+1 cumulative move came back conflicting/
unconfirmed (~+4% to +7.4%, straddling its 5.27% baseline and possibly nearing the
7.9% trigger) and is flagged for priority re-check; JKS and DCI simply have no T+1 data
point yet. None of these gaps changes the prior no-escalation calls — they remain
unconfirmed at T+1 pending retry, not re-opened.
