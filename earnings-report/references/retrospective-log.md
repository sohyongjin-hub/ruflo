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

## PDD — 2026-08-25 (T+1 retrospective)

**Context:** PDD reported 2026-08-24 (BMO). No pre-print Conditional Reaction Matrix was
run for this batch (the deep dive started post-print, straight at §8) — so the
"prediction" tested here is the §8 Multi-Quarter Fundamental Trend Check's **Red** flag
(revenue growth decelerating across 6+ quarters, Q2 2026 revenue miss, net income -12%
YoY), which implies sustained/continued weakness, not a dip-buy.

- **Who** — Neither read clearly wins. Print-quality direction (a soft quarter) was
  right, but the Red flag's implied magnitude — continued/sustained punishment — was not
  borne out.
- **What** — Actual T+0: an initial +3-5% premarket pop on the adj.-EPS beat that fully
  reversed to a ~-1.5% close ($87.07 vs. $88.38 pre-print). T+1 (today) is
  [Unreliable — source conflict], but the best available read suggests a round-trip back
  toward/above the pre-print level, not deepening weakness. The discrepancy: a materially
  smaller and more ambiguous move than "punish continued deterioration" implies.
- **When** — If a punishing reaction was coming, it did not clearly show up at T+0 (net
  move within ordinary earnings-day noise for this name) and there's no reliable evidence
  it arrived by T+1 either.
- **Where** — Multi-Quarter Fundamental Trend Check / §8: the flag correctly caught real
  deterioration but doesn't currently distinguish a **clean miss** (likely punished hard)
  from a **mixed print** (bottom-line beat + top-line miss + margin compression), which
  the market can treat far more mildly.
- **Why** — Likely a genuine model gap, not a data problem: the Red flag is calibrated on
  multi-quarter trend direction, not on how "clean" vs. "mixed" the current print is (a
  distinction §3 Guidance Quality tracks separately but isn't cross-wired into what §8's
  Red flag implies about T+0 reaction *size*). PDD's cheap starting valuation may also
  have limited downside room.
- **How** — **No change warranted** — n≈0.5 (T+1 itself unverifiable) is too thin to edit
  the guide on. Logged as a watch item: if a second Red-flagged name with a genuinely
  *mixed* (not clean-miss) print also produces only a muted T+0 reaction, that's the
  trigger to add an explicit sub-case to §8's Bad-stock row distinguishing "Red flag +
  mixed print" (smaller expected reaction) from "Red flag + clean miss" (full "avoid,
  expect continued weakness" framing).

## XPEV — 2026-08-25 (T+1 retrospective)

**Context:** XPEV reported 2026-08-24 (BMO), also Red-flagged via the Multi-Quarter
Fundamental Trend Check (2025 improving trend inflected in 2026 — Q2 2026 revenue miss,
net loss nearly tripled YoY, weak Q3 guidance).

- **Who** — The §8 Red fundamental-quality flag was right, and print-quality confirmed it
  directly: revenue miss, GAAP net loss nearly tripling YoY, weak forward guidance.
- **What** — No real discrepancy. T+0: -7.6% to -8.5% to near a 52-week low. T+1:
  continued weakness compounded by fresh, more severe analyst downgrades (China
  Renaissance PT $40.50→$11.30, Citi/BofA also cut targets) — close to a clean hit, not a
  miss.
- **When** — Reaction fired immediately at T+0 as expected, and — unlike a typical
  one-day-then-fade pattern — continued into T+1 rather than reversing, on fresh
  negative guidance-driven analyst actions.
- **Where** — No section produced a miss; this is a hit for the Multi-Quarter
  Fundamental Trend Check / §8 gate.
- **Why** — N/A (hit).
- **How** — **No change warranted.** This is exactly the case §8's Red-flag/"Bad stock"
  framing is built to catch, and it worked cleanly. Useful as a contrast point against
  PDD's much more muted reaction from the same batch/day — both Red-flagged
  simultaneously, very different outcomes — supports (but doesn't yet prove) the "clean
  miss vs. mixed print" distinction flagged in PDD's entry above as a pattern to watch,
  not yet to codify.

## TUYA — 2026-08-26 (T+1 retrospective, catch-up — nominal T+1 was 2026-08-25)

**Context:** TUYA reported Q2 2026 after close 2026-08-24 (AMC reporter). Per the
standing AMC-reporter rule, the Attribution Gate deferred any analysis until the release
existed — the §8 gate (Multi-Quarter Fundamental Trend Check: **Yellow**) only cleared
2026-08-25, the same calendar day as T+1. No separate pre-print Conditional Reaction
Matrix exists for TUYA specifically: the deferral collapsed pre-print positioning and
post-print gate analysis into one same-day pass, so there is no standalone directional
prediction to test T+1 against beyond the same-day gate's own read (Yellow fundamentals,
Confirmation Gate "Awaiting confirmation" — mildly constructive story, still-bearish
chart). This retrospective is a catch-up: it should have run 2026-08-25 but was missed
that day (the §8 gate write-up consumed the firing's TUYA-specific effort with nothing
left to chain into a same-day 5W1H); caught up here on 2026-08-26 instead.

- **Who** — Not cleanly testable in the usual sense (no separate pre-print prediction
  exists for this name). The closest analog is the same-day §8 gate's own read
  ("Awaiting confirmation" — fundamentals mildly constructive, chart still bearish),
  which is what's being checked against actual T+1 price action below.
- **What** — T+1 (2026-08-25) close ~$1.76, down from an intraday ~$1.84 the same day
  and from the ~$1.81 pre-print reference — a mild net drift lower (~-2.8% vs. the
  pre-print reference), not a decisive move in either direction. Consistent with, not
  contradicting, the "Awaiting confirmation" read: no sharp reaction either confirming
  the mildly-constructive fundamental story or contradicting it outright.
- **When** — No sharp T+0/T+1 reaction and no gate resolution by end of T+1 — the "wait
  for confirmation" framing from the same-day write-up held through the entire T+1
  session; the gate remains unresolved as of today's (2026-08-26) re-check too (see
  outcome-log.md).
- **Where** — No specific factor-guide.md section produced a miss here, since no advance
  directional prediction existed to grade against.
- **Why** — Process limitation, not a model gap: the AMC-reporter deferral rule (applied
  correctly, per the standing rule) means TUYA never got a standalone pre-print
  Conditional Reaction Matrix distinct from its pre-print fundamental baseline table —
  by the time the release existed, the framework moved straight to a same-day post-print
  gate + technicals pass, leaving no separate "prediction" checkpoint before T+1 to test.
  Separately, this specific T+1 retrospective was itself late by one day (should have run
  2026-08-25) — a routine-execution gap, not a data or model problem.
- **How** — **No change warranted** to the prediction machinery — nothing was predicted
  wrong, since nothing was formally predicted pre-print for this AMC-deferred name (n=1
  case, and the underlying pattern — AMC reporters skip a standalone pre-print matrix
  when the deferral pushes analysis to same-day — is a structural feature of the
  deferral rule working as designed, not yet evidence of a gap worth a factor-guide.md
  edit). Logged as a watch item: if a future AMC-reporter name also ends up with no
  testable pre-print prediction *and* this recurs as a source of missed/late T+1
  retrospectives (as happened here), that combination would be worth a specific
  factor-guide.md note reminding the routine to schedule the AMC-deferred name's T+1
  check independently of whether its §8 gate cleared same-day or not.

## XYF — 2026-08-25 (T+1 retrospective)

**Context:** XYF reported 2026-08-24 (BMO), full §8 run pre-split — the most severely
Red-flagged of the three (revenue -56.3% YoY, net income down 85-90% YoY in 3 of last 4
quarters, no forward guidance, all four §7 lenses Weak).

- **Who** — Neither read predicted this well. The Red flag implied continued weakness
  and no dip-buy framing; instead XYF rose ~2-2.4% on the print itself — the opposite of
  what "Red implies punishment" would suggest.
- **What** — The exact discrepancy: the single most severely Red-flagged name of the
  three had a *positive* T+0 reaction. Apparent driver: sequential (QoQ) net-income
  improvement (RMB47M vs. RMB37.9M Q1) and a maintained $0.28/ADS semiannual dividend,
  neither of which the YoY-trend-only Red flag weighs. The (unverified, low-confidence)
  T+1 data suggests some/most of that pop reversed a day later — a partial, delayed
  convergence toward the predicted direction, not an immediate one.
- **When** — The divergence from the prediction happened immediately at T+0 (up move
  where down was implied), not a delayed miss. If the T+1 pullback figure holds up, the
  "predicted" direction arrived a day late and only partially.
- **Where** — Multi-Quarter Fundamental Trend Check / §8: the flag is built on YoY
  multi-quarter severity and currently has no explicit weighting for a QoQ inflection or
  a capital-return signal (dividend/buyback) — both of which the market visibly reacted
  to here.
- **Why** — Likely a genuine model gap rather than a data problem: the sequential data
  was already sitting in the Trend Check's own table, but the Red-flag logic doesn't
  currently have a rule for how a QoQ inflection or dividend continuation should modify
  the "expect continued weakness" inference.
- **How** — Thin evidence (n=1, and T+1 itself unverified) — default to **no change
  warranted**. Flag explicitly as a distinct failure mode (directional miss, vs. PDD's
  magnitude miss and XPEV's clean hit) for the pattern log. If a second Red-flagged name
  with a sequential-improvement-or-capital-return signal embedded in an otherwise-Red
  picture also pops on the print, that's the trigger to add a specific sub-note to the
  Multi-Quarter Fundamental Trend Check: *"A Red YoY trend paired with a positive QoQ
  inflection or maintained/increased capital return can still produce a positive T+0
  reaction; §8's 'Avoid entirely' framing should carry an explicit caveat that a
  speculative bounce is possible even pre-technicals, rather than assuming uniform
  punishment."* Not applied yet — logged as a watch item only.

**Cross-ticker note:** all three (PDD, XPEV, XYF) were Red-flagged the same day via the
same section and produced three different outcomes — a clean hit (XPEV), a magnitude
miss (PDD), and a directional miss (XYF). That spread is worth tracking, but per this
project's own discipline, none of these three individually justifies a factor-guide.md
edit — only a recurring pattern across future prints would.

## PLAB — 2026-08-27 (T+1 retrospective)

**Context:** PLAB reported 2026-08-26 (BMO). Multi-Quarter Fundamental Trend Check came
back Yellow, leaning toward the Red boundary — EPS beat but down YoY, Q4 guide widened
not tightened, and the "record high-end IC demand" claim driving the beat is the exact
subject of an active securities-fraud lawsuit stemming from an earlier 36% one-day
crash. T+0 opened +27.1% intraday, then fully reversed to settle ~+4-5%. Confirmation
Gate was [Unavailable] both days (technicals unreliable/cross-contaminated via
WebSearch).

- **Who** — The print-quality read (§3), via the Yellow-leaning-Red trend flag's
  implicit skepticism, was vindicated: the +27.1% pop faded to a settled ~+4-4.7% within
  20 minutes, confirmed across four independent outlets.
- **What** — The predicted outcome was "messy/unreliable, treat with skepticism"; the
  actual outcome was a fast, *clean* fade — the market discounted the hyped pop back
  toward a level roughly matching the real (non-hyped) beat magnitude within ~20
  minutes. The discrepancy: "technicals unavailable" was read as "no signal available,"
  when the speed/cleanliness of the reversal was itself a legible signal the Yellow-lean
  anticipated.
- **When** — Settled essentially at T+0 (within the first 20 minutes). T+1 data is too
  thin/contaminated to confirm further drift with confidence, but the closest available
  read (~$30.94) roughly matches the T+0 settled level — little net T+1 movement,
  [Unavailable — low confidence].
- **Where** — Two sections behaved as designed, not as a miss: the Confirmation Gate
  correctly flagged [Unavailable] rather than fabricating a false reading on both days;
  the Yellow/Red-boundary trend flag's skepticism was borne out by the fade. The fade
  pattern itself is already covered by the existing Conditional Reaction Matrix's
  "beat-with-a-catch" row — not a genuinely novel case.
- **Why** — Primarily a data problem (WebSearch technicals genuinely unreliable for this
  name on both T+0 and T+1). Secondarily a thin, unconfirmed model gap: no explicit
  sub-check exists for "litigation directly indicts the specific metric cited as the
  beat's driver" (vs. generic litigation overhang) — n=1, not yet evidenced as
  recurring.
- **How** — **No change warranted** — both triggered sections performed as designed.
  Logged as a new Pattern Ledger candidate in `lessons-learned.md`: *"litigation-
  implicated beat driver → fast intraday fade despite headline beat."* Pre-drafted diff
  if promoted: add a sub-case to §3's guidance-quality checklist flagging when active
  litigation directly targets the specific metric cited as driving the current beat, as
  a discount factor distinct from generic litigation overhang. Needs 2 more supporting
  cases (or 2 + strong reasoning) per §11's promotion threshold.

## ANF — 2026-08-27 (T+1 retrospective)

**Context:** ANF reported 2026-08-26 (BMO). Multi-Quarter Fundamental Trend Check came
back Yellow — genuine broad-based revenue reacceleration (+2%→+5% YoY, every region
positive) but the apparent margin-trend break is substantially a ~$100M one-time IEEPA
tariff refund (~790bps of the 19.9% headline operating margin); ex-refund margin
(~12.0%) still trails last year's 13.9%. T+0 move was an outsized +30% to +42%.
Confirmation Gate was [Unavailable] pre-print-baseline-only. Tentative Drift
Classification was "Repair (leaning)," unconfirmed.

- **Who** — The setup/fundamental read (§1/§2, Yellow trend flag) was directionally
  right — revenue reacceleration is genuine and broad-based, ex-refund margin still
  trails. But the tentative print-quality lean ("Repair") was wrong: actual behavior
  tracks **Confirmation**, not Repair.
- **What** — §3 implies a beat driven "substantially" by a one-time item (~790bps of a
  ~1990bps margin) should be discounted, producing a muted-to-moderate reaction. Instead
  ANF ran +30-42% at T+0 and **held through T+1** ($147.68 close → $147.75, essentially
  flat) — an order of magnitude beyond even the Mid-cap band's "unremarkable up to +20%"
  calibration.
- **When** — Held cleanly through T+1, no partial unwind. Confirmation Gate resolved
  today to **Confirmed**: MACD +5.93 (bullish), RSI 79.06 (overbought, elevated
  pullback-risk flag attached), price above both 50-day (~$102.01) and 200-day
  (~$94.43) MAs.
- **Where** — §3's "One-time vs. recurring items" and the Magnitude Surprise section:
  both frame one-off-driven beats as expecting discounting/muted reactions, with a
  "reset effect" named as a possible exception. Neither currently distinguishes a
  one-time item that's a *minority* share of a genuinely broad-based reacceleration
  story (which apparently lets the reset effect fully dominate the discount) — the
  mirror-image gap from BEKE's 2026-08-21 muted-reaction-despite-quality-beat case.
- **Why** — Genuine model gap, not a data problem or black-swan event. ANF started from
  a deeply de-rated setup (P/E ~9.3, 52-wk low $65.45 vs. new high $154.58) with 15
  consecutive quarters of growth and every region positive — the "reset effect" §3
  already names as a possible exception appears to have fully dominated the one-time-
  item discount here.
- **How** — **No change to factor-guide.md yet** (n=1 for ANF; doesn't match either
  existing Pattern Ledger candidate). Logged as a **new** candidate in
  `lessons-learned.md`: *"Yellow/Green trend flag + one-time item as minority driver +
  broad-based multi-region reacceleration + deeply skeptical starting valuation →
  outsized (not muted) reaction; reset effect can fully dominate the one-time
  discount."* Pre-drafted diff if promoted: add a sub-case to §3's one-time-vs-recurring
  reading distinguishing this combination from the default discounting expectation.
  Needs 2 more supporting cases (or 2 + strong reasoning).

## SJM — 2026-08-27 (T+1 retrospective)

**Context:** SJM reported 2026-08-26 (BMO). Multi-Quarter Fundamental Trend Check came
back Yellow, leaning Green — revenue and EPS both inflected positively, margins
expanded, but ~26% of the EPS beat is a one-time tariff refund and the full-year guide
still implies a sales decline. Confirmation Gate was already "Confirmed" T+0 (new
52-week high, +4.3-5%, clean directional agreement). Tentative Drift Classification:
"Confirmation (one-time-item caveat)," unconfirmed.

- **Who** — Both reads look correct on available evidence: the Yellow-leaning-Green
  trend flag (with its tariff caveat) and the Confirmed gate both match what actually
  printed and how the Street reacted.
- **What** — No discrepancy found between the predicted "Confirmation" drift class and
  the observed reaction. Multiple analysts raised price targets same-day despite
  explicitly noting the tariff-refund component and the still-negative FY sales guide
  (JPMorgan $149, RBC $150, TD Cowen $136, Stifel $132, BofA $132) — consistent with the
  market treating this as a genuine inflection, not fully discounting the one-off.
- **When** — Reaction occurred and held through T+0 close (new 52-wk high, +4.3-5%).
  T+1 exact price/technicals came back [Unavailable — conflicting sources across 4
  mutually inconsistent "today" quotes], but the circumstantial signal (the PT-hike
  cluster above) points away from a reversal.
- **Where** — No factor-guide.md section implicated.
- **Why** — No model gap identified. SJM was the cleanest of the three same-day
  reporters, exactly as the initial read anticipated; the only issue surfaced today is
  search-data reliability for T+1 pricing specifically, not framework logic.
- **How** — **No change warranted.** Evidence, though incomplete for exact T+1 pricing,
  does not contradict the original classification.

**Cross-ticker note (2026-08-26 batch):** PLAB, ANF, and SJM all reported the same day
and all cleared §8 at Yellow, but produced three different T+1 stories — a clean,
signal-bearing fade (PLAB), an outsized hold-not-fade reaction to a minority one-time
item (ANF), and a clean, uneventful confirmation (SJM). Two new Pattern Ledger
candidates from this batch (PLAB's litigation-implicated fade, ANF's reset-effect-
dominates-one-time-discount) — both n=1, logged in `lessons-learned.md`, not applied.
