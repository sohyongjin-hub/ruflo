# PEAD Primer & Magnitude Surprise Design Rationale

Archived 2026-08-22. This captures reference material that was taught/derived in-chat
during the session that added the Confirmation Gate, Same-Day Primary-Source Check,
Magnitude Surprise, Attribution Gate Extension, Swing-Timing Overlay, and the Magnitude
Surprise Tiered Fallback to `factor-guide.md` — it was never itself written to a file
until now. Read this if you want the *why* behind those sections, not just the *what*
(which lives in factor-guide.md itself).

---

## 1. Post-Earnings-Announcement Drift (PEAD) — the core phenomenon

**Definition:** stocks that report a positive earnings surprise tend to keep drifting
upward for weeks after the print (and vice versa for negative surprises), rather than
the market fully repricing the news instantly as classic efficient-market theory would
predict.

**Origin:** first documented by Ball & Brown (1968); the modern framing comes from
Bernard & Thomas (1989, 1990).

**Standardized Unexpected Earnings (SUE) — the formula used to rank surprise size:**

```
SUE = (Actual EPS − Expected EPS) / σ(surprise history)
```

Dividing by the standard deviation of the company's own historical surprise size
normalizes for the fact that a $0.05 surprise means something very different for a
low-volatility mega-cap than a small-cap with a history of wild EPS swings.

**Typical magnitude:** roughly a 4-7% return spread over the ~60 trading days following
the print, between the top and bottom SUE deciles in academic long-short portfolio
studies.

**Three competing explanations for why it happens (and persists):**
1. **Investor underreaction (behavioral)** — investors anchor on prior expectations and
   update too slowly to fully price in new information at once.
2. **Analyst estimate-revision lag (mechanical)** — analysts don't instantly revise
   models; the earnings estimate itself (and thus the market's read of "cheap" vs.
   "expensive") drifts upward gradually over subsequent weeks as coverage catches up.
3. **Limits-to-arbitrage** — even if smart money sees the mispricing, transaction costs,
   short-sale constraints, and capital limits mean it isn't fully arbitraged away
   immediately, especially in small/illiquid names.

A fourth, weaker-evidence view attributes some of the drift to a risk-based
explanation (surprise correlates with a shift in systematic risk exposure) — noted as
a minority position in the literature, not a primary driver.

**What predicts a stronger or weaker drift:**
- Surprise magnitude (larger SUE → larger expected drift)
- Guidance direction (beat-and-raise drifts more than beat-and-maintain)
- Analyst coverage (thinner coverage → slower price discovery → more drift)
- Institutional ownership (lower institutional ownership → more drift, consistent with
  the underreaction/limits-to-arbitrage stories)
- Volume on the print itself (higher volume = faster incorporation, less drift left on
  the table)
- Accruals quality (cash-backed earnings drift more reliably than accrual-heavy ones)
- Market cap / liquidity (smaller, less liquid names show larger drift — same
  underlying mechanism as analyst coverage and institutional ownership)

**How it's traded:**
- **Systematic:** long the top SUE decile / short the bottom decile, held 60-90 trading
  days, rebalanced across every earnings season — a portfolio-level statistical
  strategy, not a single-stock bet.
- **Discretionary:** used as a confirmation/timing filter layered on top of an existing
  fundamental thesis, rather than the entire basis for a trade.

**Important caveat:** the anomaly has measurably weakened since the 1990s in large-cap
names as quantitative capital has crowded in and compressed the mispricing. It remains
strongest in smaller, less-covered names — which is also exactly where this project's
existing eligibility gate (§0) and confidence-flag machinery (§1) already expect data to
be thinner and readings less certain. It is a statistical, portfolio-level effect, not a
guarantee for any individual stock.

---

## 2. "Good news vs. bad news" — raw SUE isn't the whole story

A beat can be mechanically positive (SUE > 0) while still being **low-quality** —
management may have set an easy bar, the beat may not repeat, or the raise may not
match what was priced in. Two axes to separate:

- **Raw SUE** — the mechanical, narrow academic definition: did the number beat the
  statistically-normalized estimate?
- **Beat quality** — is the beat likely to persist? Assessed via:
  - **Source of the beat** — organic (revenue/margin-driven) vs. one-time/accounting
    (tax benefit, asset sale, FX swing, one-time gain)
  - **Guidance delta vs. beat size** — did the forward guide raise keep pace with the
    beat, or was it a token bump that signals management doesn't see it as repeatable?
  - **Post-print analyst estimate revision trend** — this is the real "truth serum": if
    analysts keep raising estimates in the weeks after the print, that's independent
    confirmation the beat was real; if estimates drift back down, the initial beat was
    likely lower-quality than the headline suggested.
  - **Accruals quality** — cash-backed vs. accrual-heavy earnings.
  - **The market's own near-term reaction** — a "sell the beat" reaction (stock falls
    despite a headline beat) is itself informative; sophisticated market participants
    may be pricing in the low-quality read faster than it becomes obvious from the
    numbers alone.

**Genuinely good vs. deceptively good** (comparison table, reconstructed from the
in-chat discussion):

| Dimension | Genuinely good | Deceptively good |
|---|---|---|
| Source of beat | Organic (revenue/margin) | One-time/accounting |
| Guidance vs. beat | Raise keeps pace or exceeds | Token raise, or none |
| Post-print revisions | Trend up | Flat or trend down |
| Accruals quality | Cash-backed | Accrual-heavy |
| Market's own reaction | Rallies or holds the pop | "Sells the beat" despite headline beat |

This table is the direct precursor to `factor-guide.md`'s existing §3 (Guidance
Quality) and the Drift Classification's Confirmation/Repair/Continuation-of-damage
taxonomy — those sections already operationalize this distinction; this table is why
they're built the way they are.

---

## 3. Fundamentals vs. technicals — resolving the apparent contradiction

**Is "good news" purely a technical/price phenomenon?** No — fundamentals *define*
whether news is good (SUE, beat composition, guidance delta, revision trend).
Technicals are how the market's gradual agreement or disagreement with that fundamental
read becomes *observable* in real time: volume, gap behavior, drift continuation, and a
"sell the beat" divergence as an early warning that technicals can sometimes catch
faster than the slower analyst-revision cycle can confirm it.

**Doesn't waiting on fundamentals (slow, revision-cycle-based) mean missing PEAD, which
technical/momentum traders capture faster?** Resolution: use **same-day** fundamental
data — SUE, guidance delta, and beat composition are all knowable directly from the
earnings release itself, not from weeks-later analyst revisions — as a fast filter,
cross-checked against same-day volume/price reaction for conviction. Don't wait for the
full multi-week revision-confirmation cycle to enter a position; by the time that
cycle completes, most of the drift has typically already been captured. Once positioned,
technicals then serve as ongoing risk management through the hold period (this is
essentially what the project's Drift Classification + Confirmation Gate + Same-Day
Primary-Source Check sections now formalize).

**The deeper tension the user raised:** if fundamentals say a beat is genuinely good
(which supports riding the drift upward), but a "value investor" instinct says "the
stock already ran, so it's now expensive, be cautious" — isn't that a direct
contradiction between the fundamental read and the technical/price-action read?

**Resolution — separate two different fundamental questions that get conflated:**
- **Question A: "Was this beat genuine/high quality?"** — this supports riding the
  drift; it has no real conflict with technicals, since a genuine beat and continued
  drift are the *same* underlying phenomenon observed two ways.
- **Question B: "Is the stock now overvalued given that the price already moved?"** —
  a separate valuation judgment. This is where the apparent conflict with momentum
  actually lives.

The conflict dissolves once you recognize that a genuine high-quality beat usually
raises the stock's **intrinsic** value too — so price catching up toward intrinsic
value isn't "getting expensive," it's **convergence**, not divergence. The practical
resolution: instead of treating "price already moved" as inherently bearish, ask
**"has price moved more, less, or in line with what the fundamental change actually
justifies?"**

This question — "how does the size of the move compare to what the fundamentals imply
it should be" — is the direct conceptual seed for the **Reaction-vs-Magnitude Gauge**
idea explored in the tree-of-thought below, which turned out to already exist in the
project as the **Magnitude Surprise** section of `factor-guide.md` (added in the prior
session, 2026-08-22 earlier in the day). Recognizing that overlap — rather than
building a competing new mechanism — is what the tree-of-thought below converged on.

---

## 4. Tree-of-thought: implementing this into the earnings-report model

**Ten branches considered** for how to add a "genuine vs. low-quality good news"
signal, evaluated against the model's real constraints (existing
[Sourced]/[Unavailable] tag infrastructure, the [Unvalidated — n<10 cases] status of
everything added so far, and documented real data-availability gaps):

1. **Single Composite Score** — blend fundamentals + technicals into one number.
   Rejected: collapses exactly the kind of independent-signal reasoning the project has
   repeatedly chosen *not* to do (see the standing "never collapse into a single
   verdict" rule already governing the Conditional Reaction Matrix and Drift
   Classification).
2. **Independent Multi-Tag Display** — keep each signal (beat quality, guidance delta,
   revision trend, price reaction) as separate visible tags. Matches existing model
   conventions; keeps reasoning legible instead of black-boxed. **Survivor.**
3. **Decision-Tree Classifier** — a branching if/then structure choosing an outcome
   label. Considered too rigid/brittle for the qualitative judgment calls the
   framework already makes elsewhere (e.g. §3's guidance-quality read).
4. **Reaction-vs-Magnitude Gauge** — directly operationalizes the Question A/B
   resolution above: compare actual price reaction to what the fundamental surprise
   size implies it should be. Cheap, same-day computable. **Survivor** — recognized as
   essentially identical to the existing Magnitude Surprise section.
5. **Revision-Lag Tracker (async layer)** — track analyst estimate revisions over the
   weeks following a print as an ongoing confirmation signal. **Survivor** — already
   exists in the project as the `outcome-log.md` schema plus the scheduled cloud
   routine (`trig_01HRFcDEgKhJsqevFf9DTent`) that pulls forward T+2/T+5 data.
6. **Bayesian Confidence Ladder** — formal probabilistic updating as more data arrives.
   Rejected as over-engineered relative to the project's current data volume (n<10
   cases across the board) — nothing to meaningfully update a Bayesian prior on yet.
7. **Peer/Historical Comparison** — compare a name's reaction to how peers or its own
   history reacted to similar surprises. Not adopted as a standalone branch, but
   folded into the Tiered Fallback's Tier 2/3 (see below) rather than built separately.
8. **Options Market Cross-Check** — use options positioning shifts post-print as a
   sentiment confirmation. Rejected as redundant with the existing §1 options-implied
   move / put-call shift factors, which already serve this role pre-print.
9. **Analyst Dispersion/Conviction Signal** — spread of analyst estimates as a
   confidence proxy. Not adopted — data availability for estimate dispersion
   specifically (as opposed to the point-estimate consensus already used) wasn't judged
   reliably sourceable within this project's existing tooling.
10. **Narrative/NLP Red-Flag Scan** — scan earnings-call transcript language for hedging
    or evasiveness as a red flag. Rejected as out of scope — this project doesn't
    currently ingest call transcripts, and adding that pipeline was judged a much
    larger scope increase than the rest of this exercise.

**Golden path:** layer the three survivors — Day-0 multi-tags (2, already how the
model behaves), Day-0 Reaction-vs-Magnitude Gauge (4, recognized as the existing
Magnitude Surprise section), ongoing revision-tracker (5, already the outcome-log
schema + scheduled routine) — as complementary, non-overlapping layers. **Conclusion:
formalize/extend the existing Magnitude Surprise section rather than build something
new from scratch.**

---

## 5. Three-round, three-persona competition

**Personas:** The Quant (data rigor, falsifiability) · The Fundamental Analyst
(print-quality causality, tag-based reasoning) · The Options/Market-Maker (flow,
liquidity, real-time signal availability)

**Round 1**
- *Quant:* Magnitude Surprise's formula breaks whenever options-implied-move data is
  [Unavailable] — and per the model's own §1 confidence flag, that's a frequent,
  real case (small-caps, foreign ADRs, thin-options names), not an edge case.
- *Fundamental Analyst:* Endorses keeping the multi-tag structure separate and
  unblended — don't merge Magnitude Surprise into a single composite with the
  print-quality tags.
- *Options/Market-Maker:* Wants the gauge promoted above the tags as the primary
  signal, since it's the most directly actionable, forward-looking read available.

**Round 2**
- *Fundamental Analyst* (→ Quant's gap): Proposes a same-day primary-source-check
  fallback for when options data is missing — this already exists elsewhere in the
  model as its own section (Same-Day Primary-Source Check), suggesting the fallback
  should reuse that same tiered-confidence discipline rather than invent new
  machinery.
- *Quant* (→ Options/MM): Pushes back on "promote the gauge above the tags" as the
  same naive-momentum failure mode already discussed in §3 above (price-already-moved
  read as inherently bearish/bullish without checking what justifies it) — the gauge
  should stay a peer signal to the tags, not a promoted single verdict.
- *Options/Market-Maker* (→ Fundamental Analyst): Any fallback needs a *concrete*
  non-options mechanism, not just a qualitative "check the primary source" — options
  data's value is that it's a number, not just a read; the fallback should replace it
  with another number, not a vibe.

**Round 3 — Convergence:** all three agreed on a concrete **3-tier fallback structure**
for the Magnitude Surprise formula:
- **Tier 1 [Sourced, options-implied]** — the original formula, when available.
- **Tier 2 [Sourced, historical-SUE]** — the ticker's own historical average % move per
  unit of earnings surprise, computed from its own prior entries in `outcome-log.md`
  (requires ≥3 prior logged prints for that specific ticker).
- **Tier 3 [Sourced, peer-group]** — peer-group average reaction to similarly-sized
  surprises in the same earnings season (requires ≥5 comparable peer data points).
- **Fallback of last resort:** `[Unavailable — insufficient data, no magnitude gauge
  computed]` if none of the above thresholds are met — never silently guess.

Tags stay separate from the gauge throughout — never blended into one score (settling
the Round 1 disagreement in the Fundamental Analyst's favor on structure), while the
tiered mechanics (the actual formulas) came from the Quant's and Market-Maker's Round 2
contributions.

**Winner:** the Fundamental Analyst's position on structure (keep tags separate, no
forced composite score), implemented using the Quant's and Market-Maker's mechanics
(the 3-tier fallback).

This is the design that was implemented directly into `factor-guide.md`'s "Magnitude
Surprise" section as the "Tiered fallback (added 2026-08-22, UNVALIDATED)" subsection —
see that file for the exact operative text; this document preserves only the reasoning
trail behind why that design won over the other nine branches.
