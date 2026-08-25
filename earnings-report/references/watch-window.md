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
- **Window closed?** — Yes once T+5 has passed; routine skips closed tickers

| Ticker | Market cap (band) | Report date | Window (T-2 .. T+5) | Pre-print re-check | §8 gate | 5W1H (T+1) | 5W1H (T+5) | Window closed? |
|---|---|---|---|---|---|---|---|---|
| PDD | ~$129B (Large) | 2026-08-24 | 2026-08-20 .. 2026-08-31 | N/A (reported today) | **Yes — Red** | No | No | No |
| XPEV | ~$11B (Large) | 2026-08-24 | 2026-08-20 .. 2026-08-31 | N/A (reported today) | **Yes — Red** | No | No | No |
| TUYA | ~$1.5B (Small) | 2026-08-24 (after close) | 2026-08-20 .. 2026-08-31 | No | No (deferred — no release yet as of 2nd firing) | No | No | No |
| BBW | ~$0.45B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| DG | ~$27B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| BBAR | ~$3.9B (Mid) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| PD | ~$0.9B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| ULTA | ~$22.5B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| WDAY | ~$50.5B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| HQY | ~$8.8B (Mid) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| BURL | ~$22B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| GAP | ~$7.7B (Mid) | 2026-08-27 (corrected — was 2026-08-26) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| PLAB | ~$2.0B (Mid/Small border) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | No | No | No | No |
| ANF | ~$4.8B (Mid) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | No | No | No | No |
| SJM | ~$13B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | No | No | No | No |
| IREN | ~$15B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| RBRK | ~$14.9B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| S | ~$7B (Mid) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |

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
| XYF | ~$0.2B (Micro) | 2026-08-24 | 2026-08-20 .. 2026-08-31 | N/A | N/A | **Yes — already completed full §8 (Red) under pre-split process, 2026-08-24; not re-run** | No |
| BBY | ~$18.1B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| BZUN | ~$0.17B (Micro) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| CM | ~$108B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| HRL | ~$13.1B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| LOT | ~$0.7B (Small) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| RY | ~$293B (Mega) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| TD | ~$195B (Large, near Mega boundary) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| ADSK | ~$53B (Large) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| ESTC | ~$7.3B (Mid) | 2026-08-27 (corrected — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| NVDA | ~$5.05T (Mega — by far the largest name tracked) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | **5.27%** [Sourced, options-implied — captured 2026-08-24, confirmed via original scan + cross-checked ~5.3% via WebSearch] | None yet | No | No |
| DY | ~$12B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — no reliable options-implied move found via WebSearch as of 2026-08-24; Tier 2/3 fallback also unavailable, no prior DY prints logged in outcome-log.md — retry closer to report date] | None yet | No | No |
| JKS | ~$0.85B (Small) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — WebSearch surfaced only a 14.48% figure at 24 DTE (~Sept 17 expiry), which doesn't isolate the Aug 26 earnings move; discarded as unreliable. Tier 2/3 fallback also unavailable — retry closer to report date] | None yet | No | No |
| DCI | ~$10.6B (Large) | 2026-08-26 | 2026-08-24 .. 2026-09-02 | [Unavailable — WebSearch surfaced only a stale "5.31% average move" figure dated 2026-06-01, not the current pre-earnings implied move; discarded as unreliable. Tier 2/3 fallback also unavailable — retry closer to report date] | None yet | No | No |
| MRVL | ~$208B (Mega) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |
| DLTR | ~$24.7B (Large) | 2026-08-27 | 2026-08-25 .. 2026-09-03 | Not yet captured | None yet | No | No |

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

**Pilot end:** 2026-09-03. After that date, disable `RemoteTrigger` routine
`trig_01SAdNQQrkWcUvqr9ff4Wfc6` (https://claude.ai/code/routines/trig_01SAdNQQrkWcUvqr9ff4Wfc6)
— do not rely on the cron to stop itself. (Note: this is a **new routine ID** — the
original pilot routine, `trig_017ntWk4CYhKuCCZkcWgY72P`, was accidentally deleted by
the user on 2026-08-24 and recreated with the same configuration under this new ID.)
