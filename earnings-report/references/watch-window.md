# Watch Window — 2026-08-24 to 2026-08-28 Batch Pilot

Tracks the 18 names from the 2026-08-24 to 2026-08-28 full-market scan (14 Tier 1 +
4 flagged Tier 3 complacent cases) through their pre-print check window and 5-business-
day post-print retrospective window. Read by the scheduled pilot routine
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
| PDD | 2026-08-24 | 2026-08-20 .. 2026-08-31 | No | No | No | No | No |
| XPEV | 2026-08-24 | 2026-08-20 .. 2026-08-31 | No | No | No | No | No |
| TUYA | 2026-08-24 | 2026-08-20 .. 2026-08-31 | No | No | No | No | No |
| BBW | 2026-08-25 | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| DG | 2026-08-25 | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| BBAR | 2026-08-25 | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| PD | 2026-08-25 | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| ULTA | 2026-08-25 | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| WDAY | 2026-08-25 | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| HQY | 2026-08-25 | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| BURL | 2026-08-25 | 2026-08-21 .. 2026-09-01 | No | No | No | No | No |
| GAP | 2026-08-26 | 2026-08-24 .. 2026-09-02 | No | No | No | No | No |
| PLAB | 2026-08-26 | 2026-08-24 .. 2026-09-02 | No | No | No | No | No |
| ANF | 2026-08-26 | 2026-08-24 .. 2026-09-02 | No | No | No | No | No |
| SJM | 2026-08-26 | 2026-08-24 .. 2026-09-02 | No | No | No | No | No |
| IREN | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| RBRK | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |
| S | 2026-08-27 | 2026-08-25 .. 2026-09-03 | No | No | No | No | No |

**Pilot end:** 2026-09-03. After that date, disable `RemoteTrigger` routine
`trig_<pilot-id>` (recorded in `earnings-report/CLAUDE.md` once created) — do not rely
on the cron to stop itself.
