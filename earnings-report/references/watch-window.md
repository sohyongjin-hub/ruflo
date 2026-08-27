# Watch Window — 2026-08-24 to 2026-08-28 Batch Pilot

Tracks 30 names (14 Tier 1 + 4 flagged Tier 3 complacent cases + 16 Tier 2) from the
2026-08-24 to 2026-08-28 full-market scan, split into **two tracks** (added
2026-08-24, per the Tier 2 Monitor-and-Escalate Protocol in `factor-guide.md`):

- **Full Deep-Dive Track** — the 18 names that already warranted the full §7/§8/§9
  treatment (14 Tier 1 + the 4 flagged Tier 3 complacent "priced for perfection"
  cases). Unchanged process from before the split.
- **Monitor-Only Track** — the 16 remaining Tier 2 names. Cheap daily price-check
  against an options-implied-move (or fallback) baseline, report date through T+5
  business days; only escalates into the full Step 2 treatment if the reaction moves
  sharply against what was expected. Full rule: "Tier 2 Monitor-and-Escalate Protocol"
  section of `factor-guide.md`.

Read by the scheduled pilot routine (`RemoteTrigger` cron `0 22 * * 1-5`) each weekday
to determine which tickers are in-window that day. Pilot ends 2026-09-03 (5 business
days after the last reporter) — the routine is manually disabled after that date
rather than self-terminating (cron can't cleanly bound a range crossing the Aug/Sep
boundary — see `earnings-report/CLAUDE.md`'s pointer section for the full explanation).

---

## Full Deep-Dive Track (18 names)

**Columns:**
- **Ticker / Report date**
- **Market cap (band)** — captured 2026-08-24 via WebSearch, cross-checked across 2+
  sources; band per the "Market Cap & Volatility Calibration" section of
  `factor-guide.md` (Mega >$200B / Large $10B-$200B / Mid $2B-$10B / Small
  $300M-$2B / Micro <$300M). A one-time snapshot, not live-updating — re-check before
  relying on it for a trade made much later.
- **Window** — [T-2 business days, T+5 business days] around the report date
- **Pre-print re-check done?** — light §1/§2 re-check during T-2/T-1
- **§8 gate run?** — multi-quarter fundamental Green/Yellow/Red flag, run once after
  the print (not daily)
- **5W1H retrospective (§9) done?** — run at T+1 and again at T+5
- **Confirmation Gate (post-print)** — None (pre-print) / Awaiting confirmation /
  Confirmed / Contradicted. For any name at "Awaiting confirmation," re-checked daily
  per the "Confirmation Gate Daily Re-Check" section of `factor-guide.md` until it
  resolves or T+5 arrives — not a one-time snapshot.
- **Window closed?** — Yes once T+5 has passed; routine skips closed tickers

| Ticker | Market cap (band) | Report date | Window (T-2 .. T+5) | Pre-print re-check | §8 gate | 5W1H (T+1) | 5W1H (T+5) | Confirmation Gate | Window closed? |
|---|---|---|---|---|---|---|---|---|---|
| PDD | ~$129B (Large) | 2026-08-24 | 2026-08-20 .. 2026-08-31 | N/A (reported today) | **Yes — Red** | **Yes** | No | N/A (§8 stopped at Red, no technicals run) | No |
| XPEV | ~$11B (Large) | 2026-08-24 | 2026-08-20 .. 2026-08-31 | N/A (reported today) | **Yes — Red** | **Yes** | No | N/A (§8 stopped at Red, no technicals run) | No |
| TUYA | ~$1.5B (Small) | 2026-08-24 (after close) | 2026-08-20 .. 2026-08-31 | No | **Yes — Yellow** | **Yes (catch-up, run 2026-08-26 — see retrospective-log.md)** | No | **Awaiting confirmation** (re-checked 2026-08-27 — price ~$1.78, essentially unchanged from 8/26; MACD still negative (-0.051/-0.0165, no crossover); RSI ~36.1 (one source 25.3); price still below both 50-day (~$2.42) and 200-day (~$2.36) MAs; no discrete resolution trigger fired for a 3rd straight recheck; daily re-check active) | No |
| PLAB | ~$2.0B (Mid/Small border) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | **Yes — Yellow (leaning Red boundary)** | **Yes** | No | **[Unavailable — retried 2026-08-27, still contaminated/inconsistent across sources (price quotes ranged $23.28-$30.94, RSI split 38 vs 63); settled T+0 move confirmed ~+4-4.7% after the +27.1% intraday fade, consistent across 4 outlets — the fade itself read as the signal]** | No |
| ANF | ~$4.8B (Mid) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | **Yes — Yellow** | **Yes** | No | **Confirmed** (2026-08-27 — MACD +5.93 bullish, RSI 79.06 overbought [elevated pullback/bounce risk flag], price $147.75 above both 50-day (~$102.01) and 200-day (~$94.43) MAs; the +30-42% T+0 pop has held through T+1, not reversed) | No |
| SJM | ~$13B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | **Yes — Yellow (leaning Green)** | **Yes** | No | **Confirmed** (unchanged from 2026-08-26 — T+1 exact price/technicals [Unavailable, conflicting sources] but circumstantial signal (5 sell-side PT hikes issued alongside/after the print, JPM $149/RBC $150/TD Cowen $136/Stifel $132/BofA $132) points away from reversal) | No |
| BBW | ~$0.45B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Red** | No | No | N/A (§8 stopped at Red, no technicals run) | No |
| DG | ~$27B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Green** | No | No | **Confirmed** (2026-08-27 — T+0 move positive, ~+5-7% per most sources though exact figure disputed [$2.5%-12.4% range across sources]; price gapped through both 50-/200-day MAs on the beat-and-raise) | No |
| BBAR | ~$3.9B (Mid) | 2026-08-27 (after close; call 2026-08-28) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| PD | ~$0.9B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Red** | No | No | N/A (§8 stopped at Red, no technicals run) | No |
| ULTA | ~$22.5B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Yellow** | No | No | **Awaiting confirmation** (reported AMC 2026-08-27; only a preliminary AH move +2% available vs. a 7.5% [Sourced] pre-print implied move — regular-session T+0 technicals not yet formed, re-check at T+1) | No |
| WDAY | ~$50.5B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Yellow** | No | No | **Confirmed** (bearish — reported AMC 2026-08-27, fell ~7.0% AH on subscription-guide deceleration concerns despite an EPS beat, matching the Yellow caution; MACD/RSI [Unavailable — unreliable sources]) | No |
| HQY | ~$8.8B (Mid) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Green** | No | No | **[Non-standard — doesn't fit the Confirmed/Awaiting/Contradicted taxonomy cleanly]** fell ~13.6-14.1% despite a clean Green (margin-accretive) beat, purely because the guide raise was too small (~$1M nudge) to clear an already-rich, near-52wk-high bar — the KEYS "priced for perfection" pattern, not a fundamental deterioration story; price almost certainly broke both MAs on the drop but exact RSI/MACD [Unavailable] | No |
| BURL | ~$22B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Yellow** | No | No | **Confirmed** (bearish — fell 6.8% on the tariff-refund-to-pricing decision + comp deceleration (6%→2%) + rare revenue miss; price broke below both 50-day (~$273.56) and 200-day (~$257.36) MAs same-day; RSI/MACD [Unavailable — conflicting/stale]) | No |
| GAP | ~$7.7B (Mid) | 2026-08-27 (corrected — was 2026-08-26) | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Yellow** | No | No | **[Unavailable — same-day precise RSI/MACD not confirmed independent of stale/generic sources]** T+0 +11-12% on real volume (22.55M vs ~6.05M avg), price now above pre-print 50-/200-day MAs ($18.88/$20.87) | No |
| IREN | ~$15B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Red** | No | No | N/A (§8 stopped at Red, no technicals run) | No |
| RBRK | ~$14.9B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Yellow** | No | No | **Confirmed** (bearish — reported AMC 2026-08-27, fell ~9.3-9.7% AH despite a broad beat-and-raise (4th straight EPS beat, ARR +33%), as 5 straight quarters of decelerating growth (51%→37.9%) + margin softening outweighed the headline; validates the PT-hike-cluster "priced for perfection" flag; exact RSI/MACD [Unavailable — inconsistent sources]) | No |
| S | ~$7B (Mid) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **Yes** | **Yes — Yellow** | No | No | **[Unavailable]/Awaiting confirmation** (reported AMC 2026-08-27, fell ~6.4% AH on a 2nd-straight-quarter Street-disappointing EPS guide despite an EPS beat + margin inflection (non-GAAP op margin 2%→10%); pre-print technicals were firmly bullish (fresh 52-wk high, RSI 60, MACD +0.23) — no post-move regular-session technicals exist yet, re-check at T+1) | No |

**Reading the calibration:** the 4 flagged Tier 3 complacent cases span a wide range
(HQY $8.8B Mid, BURL $22B Large, RBRK $14.9B Large, S $7B Mid) — market cap size alone
doesn't correlate with the "priced for perfection" risk flag, so don't assume larger
caps in this batch are automatically safer reads. BBW and PD sit near the Small/Micro
boundary — expect materially higher baseline volatility on their prints than the
Large-cap names in this same track.

---

## Monitor-Only Track (16 names)

**Columns:**
- **Ticker / Market cap (band) / Report date**
- **Window** — [T-2 business days, T+5 business days]
- **Baseline (options-implied move)** — captured once, before/at report date; feeds
  the escalation comparison
- **Daily moves logged (T+0..T+5)** — running cumulative % move from print-date close
- **Escalated?** — No / **Yes — [date, trigger]** once escalated, a name stays
  escalated and moves to full §7/§8/§9 treatment for its remaining window
- **Window closed?**

| Ticker | Market cap (band) | Report date | Window (T-2 .. T+5) | Baseline (implied move) | Daily moves logged | Escalated? | Window closed? |
|---|---|---|---|---|---|---|---|
| XYF | ~$0.2B (Micro) | 2026-08-24 | 2026-08-20 .. 2026-08-31 | N/A | N/A | **Yes — already completed full §8 (Red) under pre-split process, 2026-08-24; T+1 5W1H retrospective also run 2026-08-25, see retrospective-log.md (note: Monitor-track table has no 5W1H tracking columns — logged as a note here since this row stays on the full-dive track for its remaining window per protocol)** | No |
| BBY | ~$18.1B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **±8.32%** [Sourced, options-implied — TipRanks, captured 2026-08-25] | **T+0 (8/27, BMO): -4.5% to -4.9%** [Sourced] — beat both lines (EPS $1.48 vs $1.37 est.; rev $9.78B vs $9.56B est.; comp +4.1%) and raised FY guide, but fell on margin concern (adj. op. income rate 4.3%, below expectations on comp costs/Marketplace-Ads spend) | No — well inside the ~12.5% (1.5x) trigger; down-move despite a beat is explained by a known margin-quality issue, not an unexplained contradiction | No |
| BZUN | ~$0.17B (Micro) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — retried 2026-08-27, still no reliable earnings-specific options-implied move; a Q1 2026 +11.7% premarket data point is too thin to use as a historical baseline] | **Reported 2026-08-27** (rev +7% YoY; non-GAAP profit/ADS improved YoY to RMB0.42 from -RMB0.31 loss) — **T+0 % move [Unavailable — WebSearch budget exhausted before confirming]**; one EPS figure found ($0.05 vs $1.68 est.) looks internally inconsistent/unit-mismatched, flagged for manual check | **Not escalated (insufficient data to apply the trigger, not a real trigger)** — retry price + baseline next firing | No |
| CM | ~$108B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — retried 2026-08-27, still no earnings-specific options-implied move sourced before search budget ran out] | **T+0 (8/27): ~flat to -0.6%** [Sourced, low-confidence] — beat (adj. EPS C$2.73 vs C$2.50 est., +9.2%; rev C$8.37B vs C$7.25B YoY) offset by CET1 -19bps q/q and a C$232M Caribbean charge | No — negligible move against any reasonable Large-cap threshold, mild pullback matches the known offsetting items, no contradiction | No |
| HRL | ~$13.1B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **~5.59%** [Sourced, options-implied — Barchart via secondary citation, captured 2026-08-25; vs. stated 4.73% avg Day-0 move] | **T+0 (8/27, BMO): ~-10.2%** [Sourced] (close ~$21.28 from ~$23.69) — adj. EPS $0.37 beat but revenue $2.96B missed ($3.04B est.), FY sales guide cut to $12.1-12.2B (from $12.2-12.5B), volumes -7.4% | **Yes — escalated 2026-08-27.** Actual move ~1.8-1.9x the 5.59% baseline, past the ~8.4% (1.5x) Large-cap trigger, direction matches the miss/guide-cut. Full §7/§8/§9 treatment to begin next firing; stays escalated for the remainder of its window per protocol | No |
| LOT | ~$0.7B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — retried 2026-08-27, still no real earnings-specific baseline found] | **Reported 2026-08-27** (EPS -$0.12 vs -$0.18 est., beat/narrower loss; rev $134.05M vs $139.65M est., miss) — **T+0 % move [Unavailable — mutually inconsistent price snapshots, could not reconcile before search budget exhausted]** | **Undetermined — insufficient reliable price data.** Flagged for manual verification / retry next firing | No |
| RY | ~$293B (Mega) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **±2.12%** [Sourced, options-implied — TipRanks, captured 2026-08-25] | **T+0 (8/27): -0.8% to -2.3%** [Sourced but inconsistent range] — record net income CAD $6.0B (+11% YoY), adj. EPS $4.28 vs $4.04 est. and revenue both beat, yet shares fell | No — even the higher -2.3% estimate stays under the ~3.2% (1.5x) trigger; note the mild magnitude/direction disconnect (beat on both lines, still fell) as a footnote, not a trigger | No |
| TD | ~$195B (Large, near Mega boundary) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — retried 2026-08-27, source pages proxy-blocked again, no baseline sourced] | **T+0 (8/27, BMO): ~+1.5%** [Sourced, low-confidence — one conflicting source showed flat/slightly down] — beat: EPS C$2.77 vs C$2.47 est., record net income ~C$4.6-4.7B, revenue C$16.9B vs ~C$15.1B est., all segments up | No — modest positive move matching the beat direction, no contradiction even under a rough unsourced fallback | No |
| ADSK | ~$53B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **±8.9%** [Sourced, options-implied — Yahoo Finance/Zacks (85% of ATM straddle), captured 2026-08-25; vs. ±4.3% avg over last 16 reports] | **Reported 2026-08-27, AMC** (rev $2.05B vs $2.01B est., beat) — **T+0 post-earnings move [Unavailable — reports after close, actual reaction not yet formed as of this firing; today's +4.75%/+6.23% intraday moves were pre-print positioning, not the print reaction]** | **Cannot determine yet — pending AH/next-day close vs. ~13.4% (1.5x) trigger.** Retry next firing. Beat + heavy pre-print rally is consistent with, not yet confirming, the upside-watch thesis | No |
| ESTC | ~$7.3B (Mid) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **10.7%** [Sourced, options-implied — TheFly/TipRanks, captured 2026-08-27, same-day; supersedes prior [Unavailable] read; note historical avg post-earnings move over last 8 qtrs is ~14%, so implied move looks light vs. history] | **Reported 2026-08-27, AMC** (rev $478M +15% YoY, beat guidance; current RPO +21%, total RPO +27%) — **T+0 post-earnings move [Unavailable — reports after close; today's +22.37% intraday move was attributed to a pre-print AI-deal headline/PT hikes, not the print reaction]** | **Cannot determine yet — pending AH/next-day close vs. ~16-21% (1.5-2x) trigger zone.** Retry next firing | No |
| NVDA | ~$5.05T (Mega — by far the largest name tracked) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | **5.27%** [Sourced, options-implied — captured 2026-08-24, confirmed via original scan + cross-checked ~5.3% via WebSearch] | **T+0 (8/26, AMC print): ~-1.3% to -3% after-hours** — clean beat-and-raise but guidance assumes zero China data-center revenue. **T+1 (8/27) cumulative move: [Unconfirmed/conflicting]** — one pre-market snapshot implied +4% to +7.4% cumulative off the pre-print close, straddling the 5.27% baseline and possibly nearing the ~7.9% (1.5x) trigger; sources disagreed by ~$7/share | **Cannot confirm — flagged for priority re-check next firing** before ruling escalation in or out | No |
| DY | ~$12B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — no reliable options-implied move ever found for DY] | **Escalated 2026-08-26 (-12.9% on a guide miss).** First Multi-Quarter Fundamental Trend Check run 2026-08-27: **Yellow** — accelerating trailing revenue/EPS/margin trend (Q4FY26 +34.4%→Q2FY27 +45.6% YoY; EPS $2.03→$5.29) broken by a forward guide miss (Q3 EPS guide $4.56 vs $4.72-4.79 Street), driven substantially by ~$150M of wireless-program revenue **deferred to FY28** (timing, not lost demand) plus margin-investment costs; record backlog $12.24B (+53.2% YoY). T+1 price/technicals **[Unavailable — conflicting sources]**; Cantor Fitzgerald cut its PT to $476 (from $654) same-day while keeping Overweight. Tentative Drift Classification: **Continuation-of-damage (leaning)** — guide miss is forward/structural-timing, not a one-time trailing item, though "deferral not lost demand" leaves Repair plausible pending confirmation. Confirmation Gate: [Unavailable]. (Monitor-track table has no §8/Confirmation-Gate columns — logged as a note here since this row stays on the full-dive track for its remaining window per protocol, same pattern as XYF below) | No |
| JKS | ~$0.85B (Small) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — no reliable baseline ever found] | **T+0 (8/26, BMO): ~-11.8%** — wider-than-expected Q2 net loss on solar-sector oversupply. **T+1 (8/27) cumulative move: [Unavailable — only stale/mismatched-date quotes found before search budget exhausted]** | **Cannot assess T+1 — retry next firing.** T+0 was well under the Small-cap "20%+ is routine" threshold, direction matched the miss, no contradiction as of that reading | No |
| DCI | ~$10.6B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — no reliable baseline ever found] | **T+0 (8/26, BMO): +2.31%** to $95.41 — clean beat, first-ever $1B+ quarter, textbook routine move. **T+1 (8/27) cumulative move: [Unavailable — not retrieved before search budget exhausted]** | **Cannot assess T+1 — retry next firing.** T+0 was well below the Large-cap band's typical range, no escalation as of that reading | No |
| MRVL | ~$208B (Mega) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **±12.4%** [Sourced, options-implied — GuruFocus + TipRanks, two independent sources converge, captured 2026-08-25; ref. price ~$251] | **T+0 (8/27, AMC): ~-4.3% after-hours** [Sourced, magnitude imprecise] — double beat (rev ~$2.74B +37% YoY; EPS beat, $12.2B Google custom-chip deal in focus) but gave back gains on margin-expectation/chip-tariff concerns | No — well under the ~18.6% (1.5x, Mega-band) trigger; a post-beat pullback is consistent with the prior "complacent/expensive" read, not contradictory | No |
| DLTR | ~$24.7B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **±13.2%** [Sourced, options-implied — Schaeffer's Investment Research, captured 2026-08-25 (dated 2026-08-24); vs. 8.9% avg reaction over last 8 quarters] | **T+0 (8/27, BMO): ~-3.9%** to $127.00 (range -3% to -5% across sources) — beat on sales ($4.9B) and EPS ($2.70) and raised FY guide, but a cautious Q3 outlook (comp 3-4%, EPS $0.80-0.95) weighed on shares | No — well under the ~19.8% (1.5x) trigger; no pre-print directional setup read to test contradiction against | No |

**Escalation-threshold implication:** per the Market Cap & Volatility Calibration
section, this track spans Micro (XYF, BZUN) all the way to Mega (RY, NVDA, MRVL) —
apply the escalation multiplier at the **tighter end (~1.5x)** for RY/TD/ADSK/CM/BBY/
HRL/DY/DCI/DLTR/NVDA/MRVL, and the **looser end (~2x+)** for XYF/BZUN/LOT/JKS, since a
routine large swing is normal for the latter group and would otherwise trigger false
escalations.

**Note on the pre-split period:** XYF, NVDA, DY, JKS, and DCI each got processing done
before this track split existed (XYF got a full §8 run; NVDA/DY/JKS/DCI got a pre-print
re-check). None of that work is wasted or wrong — it's simply grandfathered in. XYF is
marked escalated (its full analysis is already done); NVDA/DY/JKS/DCI's pre-print
re-checks stand as-is and don't need to be redone under the new Monitor track's own
(lighter) pre-print process.

---

## Notes carried forward from the pre-split single-table period

**Tier 2 expansion (2026-08-24, user-requested):** added the 16 Monitor-Only Track
names, not in the original 18-ticker pilot scope.

**Date-verification caveat:** BBY, BZUN, CM, HRL, LOT, RY, TD, ADSK, and ESTC were all
originally scanned as Tuesday 2026-08-25 reporters — the exact batch where **9 of 12
checked names in the Full Deep-Dive Track turned out to have the wrong date**. All 9 of
these Monitor-track names were subsequently re-checked against their own IR
page/press release and **confirmed to actually report 2026-08-27** — corrected above,
no longer flagged [UNVERIFIED]. XYF (8/24), NVDA/DY/JKS/DCI (8/26), and MRVL/DLTR
(8/27) came from days/sources that tested clean, so were never flagged.

**Date correction (Full Deep-Dive Track, found 2026-08-24):** BBW, DG, BBAR, PD, ULTA,
WDAY, HQY, BURL, and GAP were originally scanned with the wrong report date (8/25 or
8/26); each actually reports **2026-08-27** per its own IR page — corrected above. This
means 21 of the 30 total tracked names across both tracks now report on 2026-08-27.

**AMC-reporter timing constraint (found 2026-08-24):** TUYA's §8 gate was deliberately
deferred rather than run on its report date — TUYA reports after the U.S. market close
(call 8:30 PM ET) and the routine fires at ~6 PM ET, before the release exists on the
report date itself. This is a standing routine-design rule, not a one-off: "today ≥
report date" only reliably means "has reported" for before-market-open reporters —
after-close reporters need the Attribution Gate's press-release check before grading,
every time, treating "report date, no release yet" as *defer to tomorrow*, never a
skip or a Red.

**XYF full write-up (2026-08-24, pre-split):** Multi-Quarter Fundamental Trend Check
flagged **Red** — revenue growth decelerated for four straight quarters (Q3'25 +23.9%
YoY → Q2'26 -56.3% YoY), net income down 85-90% YoY in 3 of the last 4 quarters, rising
delinquencies, no forward guidance given, and all four §7 lenses read Weak. §8 stopped
at speculative-trade-only/avoid without running technicals, per the required
sequencing. Full write-up in `outcome-log.md`.

**NVDA/DY/JKS/DCI pre-print re-check (2026-08-24, pre-split):** all four came back "no
material change" vs. the original scan. JKS's live price data was noisy across sources
this pass — worth a manual spot-check before its 2026-08-26 print if sized
meaningfully.

**2026-08-24 third firing:** TUYA re-checked (Attribution Gate) — still no press release as
of this firing (call scheduled 8:30 PM ET, checked ~7:33 PM ET); §8 gate left at "No",
deferred again to a later firing, per the standing AMC-reporter rule above. Monitor-Only
Track baseline captured for NVDA (5.27%, [Sourced]); attempted for DY/JKS/DCI but no
reliable earnings-specific options-implied figure was found via WebSearch for any of the
three (JKS's only hit was a non-earnings-aligned 24-DTE figure, DCI's only hit was a stale
June average) — left [Unavailable] with a note to retry nearer each ticker's 2026-08-26
report date. All other rows were either outside their window (not yet open) or already
up to date for today; no other columns changed.

**2026-08-25 firing:** PDD, XPEV, and XYF (escalated) all hit T+1 (5W1H) today — full write-ups in `retrospective-log.md`; net finding across the three: a clean hit (XPEV — continued weakness on fresh analyst downgrades), a magnitude miss (PDD — Red flag right on direction of deterioration, but the market's actual reaction was a muted round-trip, not sustained punishment), and a directional miss (XYF — popped ~2% on the print despite being the most severely Red-flagged of the three, likely on a QoQ net-income inflection + maintained dividend the flag doesn't currently weigh). None individually warrants a factor-guide.md change per the n=1 discipline — logged as a pattern to watch. TUYA's Q2 2026 release confirmed and graded: Multi-Quarter Fundamental Trend Check came back **Yellow** (revenue re-accelerated 8.3%→16.0% YoY, but gross margin erosion continued/worsened and the AI-applications segment decelerated sharply even as management leans on it rhetorically) — cleared the §8 gate to run technicals: Confirmation Gate **Awaiting confirmation** (price below both 50- and 200-day MAs, MACD negative, but RSI oversold and the print itself was mildly constructive), tentative Drift Classification **Repair (unconfirmed)**. Full write-up in `outcome-log.md`. 12 pre-print re-checks completed (all names reporting 2026-08-27) — 11 of 12 came back "no material change"; **RBRK** (one of the four flagged Tier 3 complacent names) is worth a flag: it's continued grinding to fresh all-time highs (~$100-106) on a cluster of bullish sell-side PT hikes (Oppenheimer/Cantor to $120, Goldman to $106) clustered Aug 19-21, which if anything makes its "priced for perfection" setup tighter than when originally flagged — not treated as disqualifying, just noted for the eventual print read. BBAR's price data was unusually inconsistent across sources this pass (likely ADR vs. local Buenos Aires listing conflation) — flagged for a manual quote check before its print, not treated as a material change. 11 Monitor-track baselines captured/attempted: BBY (±8.32%), HRL (~5.59%), RY (±2.12%), ADSK (±8.9%), MRVL (±12.4%), and DLTR (±13.2%) all [Sourced]; CM, TD, BZUN, LOT, and ESTC remain [Unavailable] after a real search attempt; DY/JKS/DCI retried at T-1 and still came back [Unavailable] (each specific rejected-figure reason re-verified, not just re-stated).

**2026-08-25 second firing (scheduled cron, 22:00 UTC):** everything else due today (pre-print
re-checks, §8 gates, T+1 retrospectives) had already been completed at an earlier
same-day manual firing (~14:04 UTC) — see the note above. This firing's only substantive
action was the new Confirmation Gate Daily Re-Check (added between the two firings) for
TUYA, still **Awaiting confirmation** with fresh end-of-day technicals (see the table
row above) — no resolution yet. No Monitor-Only Track tickers have reached their report
date yet (earliest is 2026-08-26), so Step 2b's daily price-check does not apply to any
of them today. Also ran a first Upside Watch (§1/§2 skeptical+cheap) screen across all
30 still-pre-print names, since the prior firing's digest entry predated the Upside
Watch requirement being added to the daily-digest spec — see `daily-digest.md` for the
full breakdown; candidates worth carrying forward: BBW, PLAB, ANF, ADSK, HRL, DCI, ULTA
(clear skeptical+cheap reads), plus JKS (cheap but earnings-quality caveat). HQY, BURL,
RBRK, S, CM, RY, TD, and MRVL corroborated as complacent/expensive (not candidates).

**2026-08-26 firing:** three Full Deep-Dive reporters today (PLAB, ANF, SJM) all cleared
the §8 gate at **Yellow** — none Red, none Green. PLAB: choppy trend, YoY EPS decline
despite a beat vs. a lowered bar, active securities-fraud litigation on the exact
"record high-end IC demand" claim driving today's print — Confirmation Gate
[Unavailable], WebSearch technicals unreliable/cross-contaminated. ANF: broad-based
revenue reacceleration but underlying (ex-tariff-refund) margin still trails last year,
T+0 move (~+30-42%) unusually large for its Mid-cap band — Confirmation Gate
[Unavailable], only a pre-print technicals baseline found. SJM: cleanest of the three
(new 52-week high, +4.3-5%, beat-and-raise) but ~26% of the EPS beat is a one-time
tariff refund and FY guide still implies a revenue decline — Confirmation Gate
**Confirmed** on price-trend evidence. Full write-ups in `outcome-log.md`.

TUYA's Confirmation Gate Daily Re-Check ran again — still **Awaiting confirmation**,
technicals essentially unchanged from yesterday (no MACD crossover, price still ~24-26%
below both MAs). TUYA's T+1 5W1H retrospective was also run today as a **catch-up** —
it was nominally due 2026-08-25 (report date 2026-08-24 AMC) but got skipped that day
because the §8 gate itself only cleared same-day via the Attribution Gate deferral,
leaving no separate pre-print prediction to test T+1 against until today; see
`retrospective-log.md`.

On the Monitor-Only Track, four names reported today: **NVDA** (clean beat-and-raise,
~-1.3% to -3% after-hours on a zero-China-revenue guidance assumption — well under its
5.27% baseline and the Mega-band ~7.9% escalation trigger, no escalation), **DCI**
(clean beat, +2.31%, textbook routine move, no escalation), **JKS** (miss, -11.8%,
well under the Small-cap band's routine-volatility range, no escalation), and **DY**
(beat-but-guide-miss, -12.9%, no [Sourced] baseline to compute a formal multiple but at
or past the Large-cap band's typical range on a genuine forward-guidance cut —
**escalated to the full deep-dive track**, judgment call per Market Cap Calibration;
full §7/§8/§9 treatment to begin next firing, stays escalated for the rest of its
window per protocol regardless of subsequent calm days).

**2026-08-27 firing:** the single busiest day of the pilot — 21 of 30 tracked names touched something today. **12 Full Deep-Dive reporters** cleared the §8 gate: **BBW (Red)**, **PD (Red)**, **IREN (Red)** — all three stopped at Red, no technicals run; **DG (Green)**; **ULTA, WDAY, HQY, BURL, GAP, RBRK, S (all Yellow)**. Full write-ups in `outcome-log.md`. Notably, of the 4 flagged Tier 3 "priced for perfection" complacent names, **3 reported today and all 3 sold off** despite decent-to-strong prints — HQY -13.6/-14.1% (clean Green beat, guide raise too small for the bar), RBRK -9.3/-9.7% AH (broad beat-and-raise, but 5 straight quarters of decelerating growth), S -6.4% AH (EPS beat + margin inflection, but 2nd straight quarter of Street-disappointing guidance) — a strong same-day corroboration of the KEYS "priced for perfection" pattern this project was built around, though not itself a §11 promotion candidate (that mechanism requires full window closure, not a same-day read). BURL (not a Tier 3 flag but Yellow) also fell 6.8% on comp deceleration + a tariff-refund-to-pricing decision. **BBAR did not report as scheduled** — release is after-close today with the call tomorrow (8/28); re-check next firing. **3 T+1 5W1H retrospectives** ran (PLAB, ANF, SJM — full write-ups in `retrospective-log.md`); two new Pattern Ledger candidates logged in `lessons-learned.md` (PLAB: litigation-implicated beat driver → fast intraday fade; ANF: one-time item as minority driver + broad reacceleration + deep skepticism → outsized not muted reaction), both n=1. **TUYA's Confirmation Gate** re-checked for a 3rd straight day — still unresolved (Awaiting confirmation), technicals essentially unchanged. On the **Monitor-Only Track**, 9 names reported today (BBY, BZUN, CM, HRL, LOT, RY, TD, ADSK, ESTC) plus MRVL/DLTR — **HRL escalated** (-10.2% vs. a 5.59% baseline, ~1.8x the trigger, on a revenue miss + guide cut); BBY, CM, RY, TD, MRVL, DLTR all stayed within normal range, no escalation; BZUN and LOT hit WebSearch-budget data gaps (T+0 move unconfirmed) and are flagged for retry rather than escalated on missing data; ADSK and ESTC report AMC and hadn't posted an actual post-print reaction as of this firing (ESTC did get a fresh 10.7% [Sourced] baseline today, replacing the prior [Unavailable] read). DY (escalated 2026-08-26) got its first Multi-Quarter Fundamental Trend Check: **Yellow** (accelerating trailing trend broken by a forward guide miss substantially driven by ~$150M revenue deferred to FY28, not lost demand) — tentative Drift Classification Continuation-of-damage (leaning), T+1 price/technicals unavailable. NVDA/JKS/DCI's T+1 cumulative-move re-checks hit the same WebSearch-budget wall (NVDA's own read came back conflicting/unconfirmed, straddling its escalation trigger — flagged for priority re-check) — none of the three data gaps changes yesterday's no-escalation calls, they just remain unconfirmed at T+1 pending retry. No ticker's window closed today (earliest closures remain PDD/XPEV/XYF at 2026-08-31), so §11 Ticker Lifecycle Synthesis did not run this firing.

**Pilot end:** 2026-09-03. After that date, disable `RemoteTrigger` routine
`trig_01SAdNQQrkWcUvqr9ff4Wfc6` (https://claude.ai/code/routines/trig_01SAdNQQrkWcUvqr9ff4Wfc6)
— do not rely on the cron to stop itself. (Note: this is a **new routine ID** — the
original pilot routine, `trig_017ntWk4CYhKuCCZkcWgY72P`, was accidentally deleted by
the user on 2026-08-24 and recreated with the same configuration under this new ID.)
