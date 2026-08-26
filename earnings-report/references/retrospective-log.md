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
