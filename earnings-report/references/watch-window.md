# Watch Window — 2026-08-24 to 2026-08-28 Batch Pilot

Tracks the **30 names** (14 Tier 1 + 4 flagged Tier 3 complacent cases + 16 Tier 2,
added 2026-08-24 on user request) from the 2026-08-24 to 2026-08-28 full-market scan
through their pre-print check window and 5-business-day post-print retrospective
window. Read by the scheduled pilot routine
(`RemoteTrigger` cron `0 22 * * 1-5`) each weekday to determine which tickers are
in-window that day. Pilot ends 2026-09-03 (5 business days after the last reporter,
IREN/RBRK/S on 2026-08-27) — the routine is manually disabled after that date rather
than self-terminating (cron can't cleanly bound a range crossing the Aug/Sep boundary —
see `earnings-report/CLAUDE.md`'s §8/§9 pointer section for the full explanation).

**Columns:**
- **Ticker / Report date**
- **Window** — [T-2 business days, T+5 business days] around the report date
- **Pre-print re-check done?** — light §1/§2 re-check during T-2/T-1 (confirms nothing
  material changed since the original scan)
- **§8 gate run?** — multi-quarter fundamental Green/Yellow/Red flag, run once after the
  print (not daily)
- **5W1H retrospective (§9) done?** — run at T+1 and again at T+5
- **Window closed?** — Yes once T+5 has passed; routine skips closed tickers

| Ticker | Report date | Window (T-2 .. T+5) | Pre-print re-check | §8 gate | 5W1H (T+1) | 5W1H (T+5) | Window closed? |
|---|---|---|---|---|---|---|---|
| PDD | 2026-08-24 | 2026-08-20 .. 2026-08-31 | N/A (reported today) | **Yes — Red** | No | No | No |
| XPEV | 2026-08-24 | 2026-08-20 .. 2026-08-31 | N/A (reported today) | **Yes — Red** | No | No | No |
| TUYA | 2026-08-24 | 2026-08-20 .. 2026-08-31 | No | No | No | No | No |
| BBW | 2026-08-27 (corrected 2026-08-24 — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| DG | 2026-08-27 (corrected 2026-08-24 — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| BBAR | 2026-08-27 (corrected 2026-08-24 — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| PD | 2026-08-27 (corrected 2026-08-24 — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| ULTA | 2026-08-27 (corrected 2026-08-24 — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| WDAY | 2026-08-27 (corrected 2026-08-24 — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| HQY | 2026-08-27 (corrected 2026-08-24 — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| BURL | 2026-08-27 (corrected 2026-08-24 — was 2026-08-25) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| GAP | 2026-08-27 (corrected 2026-08-24 — was 2026-08-26) | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| PLAB | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | No | No | No | No |
| ANF | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | No | No | No | No |
| SJM | 2026-08-26 | 2026-08-24 .. 2026-09-02 | Yes | No | No | No | No |
| IREN | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| RBRK | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| S | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| XYF | 2026-08-24 | 2026-08-20 .. 2026-08-31 | No | No | No | No | No |
| BBY | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| BZUN | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| CM | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| HRL | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| LOT | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| RY | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| TD | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| ADSK | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| ESTC | 2026-08-25 [UNVERIFIED] | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| NVDA | 2026-08-26 | 2026-08-24 .. 2026-09-02 | No | No | No | No | No |
| DY | 2026-08-26 | 2026-08-24 .. 2026-09-02 | No | No | No | No | No |
| JKS | 2026-08-26 | 2026-08-24 .. 2026-09-02 | No | No | No | No | No |
| DCI | 2026-08-26 | 2026-08-24 .. 2026-09-02 | No | No | No | No | No |
| MRVL | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| DLTR | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |

**Tier 2 expansion (2026-08-24, user-requested):** added the remaining 16 Tier 1+2
names not in the original 18-ticker pilot scope. **Important caveat:** BBY, BZUN, CM,
HRL, LOT, RY, TD, ADSK, and ESTC were all originally scanned as Tuesday 2026-08-25
reporters — the *exact same batch* where 9 of 12 checked names turned out to have the
wrong date (see below). These 9 were never individually re-verified the way the
original 18 were, so their dates are marked **[UNVERIFIED]** and must be confirmed via
the Attribution Gate / a fresh date check before their §8 gate runs, not assumed
correct. XYF (8/24), NVDA/DY/JKS/DCI (8/26), and MRVL/DLTR (8/27) came from days that
tested clean or were independently confirmed already, so no flag on those.

**Date correction (found by the pilot's 2026-08-24 run):** BBW, DG, BBAR, PD, ULTA,
WDAY, HQY, BURL, and GAP were originally scanned with the wrong report date (8/25 or
8/26). Each is actually confirmed via its own IR page/press release to report
**2026-08-27** — corrected above. This means 12 of 18 tracked names now report on
2026-08-27 (BBW/DG/BBAR/PD/ULTA/WDAY/HQY/BURL/GAP/IREN/RBRK/S), not spread across
8/25-8/27 as originally scanned.

**AMC-reporter timing constraint (found by the pilot's 2026-08-24 run):** TUYA's §8 gate
was **deliberately not run** on its report date. TUYA releases Q2 2026 **after** the U.S.
market close on 2026-08-24 (call 8:30 PM ET); the routine fired at ~2:45 PM ET, so no
press release existed yet. Per the Attribution Gate Extension in `factor-guide.md`
("confirm a press release for that specific date actually exists" before running any
print-quality analysis), the gate was deferred rather than run against stale pre-print
data. TUYA's `§8 gate` cell is left at exactly `No` so the next firing re-picks it up —
it is still in-window through 2026-08-31.

This is a **routine-design gap, not a one-off**: the rule "today is on or after the
report date → the ticker has now reported" holds for before-market-open reporters
(PDD/XPEV on 2026-08-24) but is false for after-market-close reporters on their report
date itself. The cron (`0 22 * * 1-5` = 6:00 PM ET) lands after the 4 PM close but can
still precede a late AMC release. Every §8 gate run must therefore verify the press
release exists before grading, and treat "report date, no release yet" as *defer to
tomorrow*, never as a skip or a Red. Of the remaining tracked names, this affects any
AMC reporter in the 2026-08-26 and 2026-08-27 cohorts.

**Pilot end:** 2026-09-03. After that date, disable `RemoteTrigger` routine
`trig_017ntWk4CYhKuCCZkcWgY72P` (https://claude.ai/code/routines/trig_017ntWk4CYhKuCCZkcWgY72P)
— do not rely on the cron to stop itself.
