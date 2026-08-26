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
| TUYA | ~$1.5B (Small) | 2026-08-24 (after close) | 2026-08-20 .. 2026-08-31 | No | **Yes — Yellow** | **Yes (catch-up, run 2026-08-26 — see retrospective-log.md)** | No | **Awaiting confirmation** (re-checked 2026-08-26 — price ~$1.79-1.80 (prev close $1.80, +0.28%), still below both 50-day (~$2.42) and 200-day (~$2.36) MAs (~24-26% below both); MACD still negative (-0.051/-0.0165, no crossover); RSI ~36.1 neutral-weak, unchanged band; one composite technical read now "Strong Sell" (6 sell vs 1 buy signal) — consistent-to-slightly-more-bearish but no discrete resolution trigger; daily re-check active) | No |
| PLAB | ~$2.0B (Mid/Small border) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | **Yes — Yellow (leaning Red boundary)** | No | No | **[Unavailable — T+0 MACD/RSI/MA not reliably sourced via WebSearch, conflicting/cross-contaminated search results; settled T+0 move ~+4-5% after a fully-reversed intraday +27.1% spike]** | No |
| ANF | ~$4.8B (Mid) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | **Yes — Yellow** | No | No | **[Unavailable — only pre-print MACD/RSI baseline sourced, no T+0 reading found; T+0 move ~+30% to +42% (unusually large for Mid-cap band), price now far above both 50-/200-day MAs]** | No |
| SJM | ~$13B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | **Yes — Yellow (leaning Green)** | No | No | **Confirmed** (2026-08-26 — price-trend basis: new 52-week high, +4.3-5% on a beat-and-raise; exact MACD/RSI [Unreliable/conflicting] but directional agreement between fundamentals and price action is clear) | No |
| BBW | ~$0.45B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| DG | ~$27B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| BBAR | ~$3.9B (Mid) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| PD | ~$0.9B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| ULTA | ~$22.5B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| WDAY | ~$50.5B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| HQY | ~$8.8B (Mid) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| BURL | ~$22B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| GAP | ~$7.7B (Mid) | 2026-08-27 (corrected — was 2026-08-26) | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| IREN | ~$15B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| RBRK | ~$14.9B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |
| S | ~$7B (Mid) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **Yes** | No | No | No | None (pre-print) | No |

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
| BBY | ~$18.1B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **±8.32%** [Sourced, options-implied — TipRanks, captured 2026-08-25] | None yet | No | No |
| BZUN | ~$0.17B (Micro) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — no reliable earnings-specific options-implied move found (thin micro-cap ADR); a stale March 2025 TipRanks figure and "earnings-date-announcement reaction" figures (a different, unrelated metric) were both discarded. No usable historical fallback — retry nearer report date] | None yet | No | No |
| CM | ~$108B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — no earnings-specific options-implied move found for this ADR via WebSearch as of 2026-08-25 (source pages proxy-blocked, only snippets available); no historical fallback found — retry nearer report date] | None yet | No | No |
| HRL | ~$13.1B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **~5.59%** [Sourced, options-implied — Barchart via secondary citation, captured 2026-08-25; vs. stated 4.73% avg Day-0 move] | None yet | No | No |
| LOT | ~$0.7B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — a "+/-7.47%" figure found was a generic trading-range/ATR stat, not an earnings straddle, discarded; historical-fallback figures found were actually earnings-date-announcement reactions, not post-earnings moves, discarded for the same reason as BZUN — retry nearer report date] | None yet | No | No |
| RY | ~$293B (Mega) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **±2.12%** [Sourced, options-implied — TipRanks, captured 2026-08-25] | None yet | No | No |
| TD | ~$195B (Large, near Mega boundary) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — no earnings-specific options-implied move found for this ADR via WebSearch as of 2026-08-25 (source pages proxy-blocked, only snippets available); no historical fallback found — retry nearer report date] | None yet | No | No |
| ADSK | ~$53B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | **±8.9%** [Sourced, options-implied — Yahoo Finance/Zacks (85% of ATM straddle), captured 2026-08-25; vs. ±4.3% avg over last 16 reports] | None yet | No | No |
| ESTC | ~$7.3B (Mid) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | [Unavailable — multiple TheFly/TipRanks implied-move figures found (10.0-15.3%) but none could be reliably dated to the 2026-08-27 print (one traced figure dated to June 2020, a templated headline reused every quarter); one candidate figure also turned out to be an unrelated margin stat, not a move stat. No reliable historical fallback either — retry nearer report date] | None yet | No | No |
| NVDA | ~$5.05T (Mega — by far the largest name tracked) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | **5.27%** [Sourced, options-implied — captured 2026-08-24, confirmed via original scan + cross-checked ~5.3% via WebSearch] | **T+0 (8/26, AMC print): ~-1.3% to -3% after-hours** [Sourced, converging estimate] — clean beat-and-raise (rev $96.2B +106% YoY vs ~$92.3B cons.; Q3 guide $108B vs ~$104.2B cons.) but guidance assumes zero China data-center revenue, capping the pop; well under the 5.27% baseline and the ~7.9% (1.5x, Mega-band) escalation trigger | No — magnitude and direction both within the routine range the protocol is meant to filter out | No |
| DY | ~$12B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — retried 2026-08-25 (T-1), still no reliable options-implied move found via WebSearch; only a generic single-contract high-IV mention and a 30-day-style IV figure surfaced, both non-earnings-specific, discarded. Tier 2/3 fallback also unavailable, no prior DY prints logged in outcome-log.md] | **T+0 (8/26, BMO): -12.9%** [Sourced] — Q2 beat (EPS $5.29 vs. $4.68-4.72 cons.; rev $2.01B vs $1.98B cons.) but Q3 guide midpoint $4.56 came in below the $4.79 Street estimate; FY27 revenue guide raised to $7.48-7.66B, roughly in line with the $7.6B consensus (not a real beat-the-Street raise) despite record $12.2B backlog | **Yes — escalated 2026-08-26.** No [Sourced] baseline to compute a formal multiple, but -12.9% sits at/past the upper edge of the Large-cap band's typical "mid-single to low-double-digit%" range, driven by a genuine forward-guidance miss (not noise) — judgment-based escalation per Market Cap Calibration. Full §7/§8/§9 treatment to begin next firing; stays escalated for the remainder of its window per protocol | No |
| JKS | ~$0.85B (Small) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — retried 2026-08-25 (T-1), still no fresh earnings-aligned figure; the previously-discarded 14.48%-at-24-DTE figure remains the closest match and is still unusable (wrong expiry). Tier 2/3 fallback also unavailable — a single prior-quarter reaction (-3.67%) isn't a reliable average] | **T+0 (8/26, BMO): ~-11.8%** [Sourced] ($15.50→$13.67) — wider-than-expected Q2 net loss on continued solar-sector oversupply/pricing pressure; inventory turnover improved (145→125 days) but net debt rose | No — well under the Small-cap band's "20%+ moves are routine" threshold; direction matches the miss, no contradiction | No |
| DCI | ~$10.6B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — retried 2026-08-25 (T-1), same stale "5.31% average move" figure (dated 2026-06-01) re-surfaced and was discarded again; no newer options-implied or historical figure found despite multiple targeted searches] | **T+0 (8/26, BMO): +2.31%** [Sourced] to $95.41 — clean beat (adj. EPS $1.15 vs $1.13 cons.; rev $1.059B vs $1.04B cons., first-ever $1B+ quarter), Facet Filtration acquisition closed | No — textbook routine move, well below the Large-cap band's typical range; exactly what monitoring is meant to filter out | No |
| MRVL | ~$208B (Mega) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **±12.4%** [Sourced, options-implied — GuruFocus + TipRanks, two independent sources converge, captured 2026-08-25; ref. price ~$251] | None yet | No | No |
| DLTR | ~$24.7B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | **±13.2%** [Sourced, options-implied — Schaeffer's Investment Research, captured 2026-08-25 (dated 2026-08-24); vs. 8.9% avg reaction over last 8 quarters] | None yet | No | No |

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

**Pilot end:** 2026-09-03. After that date, disable `RemoteTrigger` routine
`trig_01SAdNQQrkWcUvqr9ff4Wfc6` (https://claude.ai/code/routines/trig_01SAdNQQrkWcUvqr9ff4Wfc6)
— do not rely on the cron to stop itself. (Note: this is a **new routine ID** — the
original pilot routine, `trig_017ntWk4CYhKuCCZkcWgY72P`, was accidentally deleted by
the user on 2026-08-24 and recreated with the same configuration under this new ID.)
