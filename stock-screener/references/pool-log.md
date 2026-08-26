# Screener Pool Log

Append-only audit trail for every `/stock-screen` run. This is history, not the review
surface — the Notion "Screener Pool" database is the source of truth for today's status;
never hand-edit this file to reflect a status change made in Notion.

**Columns:**
- **Ticker**
- **Catch price** — price at the moment the ticker cleared both screening stages
- **Fundamental filters passed** — change %, market cap, price, volume (the values that
  cleared Stage 1, not just a pass/fail)
- **Technical qualification** — which 8EMA condition passed (hugging / recovered-dip
  count) and which SMA (200 or 100-fallback) confirmed above
- **Config snapshot** — a pointer/note on which config values were live for this run, so
  a later change to the Notion config doesn't retroactively make an old row look wrong
- **Notion sync** — OK / FAILED (if the Notion write failed, this row is the only
  surviving record until reconciled)

---

## Run log

## 2026-08-26 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| BHVN | Biohaven Ltd. | $16.34 | change +13.6%, mktcap ~$2.47B, close $16.34, vol 6.01M | 4 recovered-dips (within range), above 200SMA ($11.45) | notion-live | OK |
| ZYME | Zymeworks Inc. | $29.36 | change +6.9%, mktcap ~$2.10B, close $29.36, vol 0.74M | 3 recovered-dips (within range), above 200SMA ($24.62) | notion-live | OK |
| PBF | PBF Energy Inc. | $70.82 | change +6.5%, mktcap ~$8.39B, close $70.82, vol 0.85M | hugging 8EMA, above 200SMA ($43.07) | notion-live | OK |
| TTMI | TTM Technologies, Inc. | $119.51 | change +6.4%, mktcap ~$12.59B, close $119.51, vol 2.01M | hugging 8EMA, above 200SMA ($118.32) | notion-live | OK |
| KMI | Kinder Morgan, Inc. | $32.24 | change +4.2%, mktcap ~$71.80B, close $32.24, vol 5.73M | hugging 8EMA, above 200SMA ($30.91) | notion-live | OK |
| BTSG | BrightSpring Health Services, Inc. | $59.63 | change +4.2%, mktcap ~$11.80B, close $59.63, vol 0.76M | hugging 8EMA, above 200SMA ($49.16) | notion-live | OK |
| SRRK | Scholar Rock Holding Corporation | $60.53 | change +3.9%, mktcap ~$7.37B, close $60.53, vol 1.09M | 2 recovered-dips (within range), above 200SMA ($46.86) | notion-live | OK |
| VSXY | Victorias Secret & Co. | $90.66 | change +3.8%, mktcap ~$7.21B, close $90.66, vol 0.57M | 3 recovered-dips (within range), above 200SMA ($61.21) | notion-live | OK |
| CVE | Cenovus Energy Inc | $31.90 | change +3.7%, mktcap ~$58.83B, close $31.90, vol 2.82M | hugging 8EMA, above 200SMA ($24.10) | notion-live | OK |
| OKE | ONEOK, Inc. | $94.85 | change +3.4%, mktcap ~$59.79B, close $94.85, vol 1.28M | hugging 8EMA, above 200SMA ($84.00) | notion-live | OK |
| PAA | Plains All American Pipeline, L.P. | $25.55 | change +3.4%, mktcap ~$18.02B, close $25.55, vol 1.23M | 3 recovered-dips (within range), above 200SMA ($21.07) | notion-live | OK |
| PGEN | Precigen, Inc. | $7.52 | change +3.3%, mktcap ~$2.69B, close $7.52, vol 3.54M | 4 recovered-dips (within range), above 200SMA ($4.55) | notion-live | OK |
| PAGP | Plains GP Holdings, L.P. | $28.00 | change +3.1%, mktcap ~$5.54B, close $28.00, vol 0.63M | 3 recovered-dips (within range), above 200SMA ($22.66) | notion-live | OK |

13 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 13 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-08-25 batch

| Ticker | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|
| ABCL | $12.38 | change +16.7%, mktcap ~$4.01B, close $12.38, vol 5.86M | 4 recovered-dips (within range), above 200SMA ($4.83) | notion-live | OK |
| KURA | $13.61 | change +9.8%, mktcap ~$1.21B, close $13.61, vol 3.06M | 3 recovered-dips (within range), above 200SMA ($9.71) | notion-live | OK |
| IMMX | $14.66 | change +7.7%, mktcap ~$1.05B, close $14.66, vol 1.52M | 3 recovered-dips (within range), above 200SMA ($8.09) | notion-live | OK |
| REPL | $15.57 | change +5.8%, mktcap ~$1.47B, close $15.57, vol 1.34M | 4 recovered-dips (within range), above 200SMA ($8.32) | notion-live | OK |
| HUT | $83.78 | change +5.3%, mktcap ~$10.33B, close $83.78, vol 1.60M | hugging 8EMA, above 200SMA ($73.42) | notion-live | OK |
| AXTI | $68.64 | change +5.0%, mktcap ~$4.50B, close $68.64, vol 3.61M | 3 recovered-dips (within range), above 200SMA ($52.62) | notion-live | OK |
| NVTS | $12.82 | change +4.9%, mktcap ~$3.35B, close $12.82, vol 8.20M | hugging 8EMA, above 200SMA ($12.78) | notion-live | OK |
| AMD | $478.04 | change +4.7%, mktcap ~$780.38B, close $478.04, vol 10.61M | hugging 8EMA, above 200SMA ($332.00) | notion-live | OK |
| FCEL | $19.59 | change +4.5%, mktcap ~$1.57B, close $19.59, vol 2.63M | hugging 8EMA, above 200SMA ($13.05) | notion-live | OK |
| SMTC | $126.28 | change +4.4%, mktcap ~$11.76B, close $126.28, vol 2.56M | hugging 8EMA, above 200SMA ($104.74) | notion-live | OK |
| DELL | $451.29 | change +4.2%, mktcap ~$292.56B, close $451.29, vol 2.05M | hugging 8EMA, above 200SMA ($239.96) | notion-live | OK |
| LITE | $861.44 | change +3.8%, mktcap ~$77.27B, close $861.44, vol 1.71M | hugging 8EMA, above 200SMA ($658.97) | notion-live | OK |
| BRUN | $18.66 | change +3.6%, mktcap ~$1.48B, close $18.66, vol 0.70M | 4 recovered-dips (within range), above 200SMA ($17.61) | notion-live | OK |
| EGO | $47.94 | change +3.4%, mktcap ~$12.53B, close $47.94, vol 1.09M | 4 recovered-dips (within range), above 200SMA ($35.30) | notion-live | OK |
| MP | $59.35 | change +3.4%, mktcap ~$10.57B, close $59.35, vol 2.55M | 3 recovered-dips (within range), above 200SMA ($57.76) | notion-live | OK |
| MRVI | $8.71 | change +3.3%, mktcap ~$2.26B, close $8.71, vol 2.22M | 4 recovered-dips (within range), above 200SMA ($4.32) | notion-live | OK |
| BHPLF | $48.26 | change +3.3%, mktcap ~$245.33B, close $48.26, vol 1.25M | 4 recovered-dips (within range), above 200SMA ($36.96) | notion-live | OK |
| NOK | $10.29 | change +3.3%, mktcap ~$55.85B, close $10.29, vol 23.06M | hugging 8EMA, above 200SMA ($9.48) | notion-live | OK |
| HPE | $54.08 | change +3.1%, mktcap ~$71.61B, close $54.08, vol 3.33M | hugging 8EMA, above 200SMA ($32.06) | notion-live | OK |
| SE | $119.17 | change +3.0%, mktcap ~$70.85B, close $119.17, vol 0.91M | hugging 8EMA, above 200SMA ($107.03) | notion-live | OK |

20 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 18 ok, 0 failed, 2 already logged today (skipped as duplicates).


## 2026-08-25 batch

| Ticker | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|
| ALVO | $5.25 | change +18.5%, mktcap ~$2.05B, close $5.25, vol 3.18M | 4 recovered-dips (within range), above 200SMA ($4.16) | notion-live | OK |
| FIVE | $262.72 | change +5.0%, mktcap ~$14.53B, close $262.72, vol 2.04M | 4 recovered-dips (within range), above 200SMA ($204.46) | notion-live | OK |
| KURA | $12.40 | change +4.3%, mktcap ~$1.10B, close $12.40, vol 2.70M | 3 recovered-dips (within range), above 200SMA ($9.71) | notion-live | OK |
| DLTR | $136.75 | change +4.0%, mktcap ~$26.28B, close $136.75, vol 2.43M | hugging 8EMA, above 200SMA ($116.09) | notion-live | OK |
| OR | $37.49 | change +3.9%, mktcap ~$6.99B, close $37.49, vol 2.63M | 3 recovered-dips (within range), above 200SMA ($36.61) | notion-live | OK |
| GO | $12.04 | change +3.8%, mktcap ~$1.19B, close $12.04, vol 2.21M | 3 recovered-dips (within range), above 200SMA ($9.23) | notion-live | OK |
| CHD | $102.53 | change +3.8%, mktcap ~$24.32B, close $102.53, vol 1.87M | hugging 8EMA, above 200SMA ($94.31) | notion-live | OK |
| BHC | $6.68 | change +3.7%, mktcap ~$2.50B, close $6.68, vol 2.71M | hugging 8EMA, above 200SMA ($5.86) | notion-live | OK |
| FIGS | $15.21 | change +3.6%, mktcap ~$2.53B, close $15.21, vol 3.00M | hugging 8EMA, above 200SMA ($12.27) | notion-live | OK |
| GDDY | $100.52 | change +3.6%, mktcap ~$12.73B, close $100.52, vol 1.32M | 4 recovered-dips (within range), above 200SMA ($97.44) | notion-live | OK |
| FIVE | $262.72 | change +5.0%, mktcap ~$14.53B, close $262.72, vol 2.04M | 4 recovered-dips (within range), above 200SMA ($204.45) | notion-live | OK |
| KURA | $12.40 | change +4.3%, mktcap ~$1.10B, close $12.40, vol 2.70M | 3 recovered-dips (within range), above 200SMA ($9.71) | notion-live | OK |
| OR | $37.49 | change +3.9%, mktcap ~$6.99B, close $37.49, vol 2.63M | 3 recovered-dips (within range), above 200SMA ($36.61) | notion-live | OK |
| GO | $12.04 | change +3.8%, mktcap ~$1.19B, close $12.04, vol 2.21M | 3 recovered-dips (within range), above 200SMA ($9.23) | notion-live | OK |
| BHC | $6.68 | change +3.7%, mktcap ~$2.50B, close $6.68, vol 2.71M | hugging 8EMA, above 200SMA ($5.86) | notion-live | OK |
| GDDY | $100.52 | change +3.6%, mktcap ~$12.73B, close $100.52, vol 1.32M | 4 recovered-dips (within range), above 200SMA ($97.43) | notion-live | OK |
| MGTX | $14.83 | change +3.4%, mktcap ~$1.42B, close $14.83, vol 0.82M | 4 recovered-dips (within range), above 200SMA ($9.49) | notion-live | OK |
| AWK | $139.91 | change +3.3%, mktcap ~$27.80B, close $139.91, vol 2.41M | hugging 8EMA, above 200SMA ($131.22) | notion-live | OK |
| EIX | $73.97 | change +3.3%, mktcap ~$28.46B, close $73.97, vol 1.80M | hugging 8EMA, above 200SMA ($68.30) | notion-live | OK |
| BHPLF | $48.26 | change +3.3%, mktcap ~$245.33B, close $48.26, vol 1.25M | 4 recovered-dips (within range), above 200SMA ($36.96) | notion-live | OK |
| ACHC | $28.72 | change +3.2%, mktcap ~$2.67B, close $28.72, vol 1.44M | hugging 8EMA, above 200SMA ($22.50) | notion-live | OK |
| VRSN | $290.79 | change +3.2%, mktcap ~$26.26B, close $290.79, vol 0.64M | 3 recovered-dips (within range), above 200SMA ($259.99) | notion-live | OK |
| ANF | $112.36 | change +3.1%, mktcap ~$4.99B, close $112.36, vol 1.29M | hugging 8EMA, above 200SMA ($94.12) | notion-live | OK |
| SRRK | $58.20 | change +3.0%, mktcap ~$7.09B, close $58.20, vol 1.22M | 2 recovered-dips (within range), above 200SMA ($46.70) | notion-live | OK |

18 tickers caught. 2 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 3 ok, 0 failed, 15 already logged today (skipped as duplicates).
| VRSN | $290.79 | change +3.2%, mktcap ~$26.26B, close $290.79, vol 0.64M | 3 recovered-dips (within range), above 200SMA ($259.98) | notion-live | OK |
| ANF | $112.36 | change +3.1%, mktcap ~$4.99B, close $112.36, vol 1.29M | hugging 8EMA, above 200SMA ($94.12) | notion-live | OK |
| SRRK | $58.20 | change +3.0%, mktcap ~$7.09B, close $58.20, vol 1.22M | 2 recovered-dips (within range), above 200SMA ($46.70) | notion-live | OK |

15 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 15 ok, 0 failed.


## 2026-08-25 batch

| Ticker | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|
| ALVO | $5.25 | change +18.5%, mktcap ~$2.05B, close $5.25, vol 3.18M | 4 recovered-dips (within range), above 200SMA ($4.16) | notion-live | OK |
| FIVE | $262.72 | change +5.0%, mktcap ~$14.53B, close $262.72, vol 2.04M | 4 recovered-dips (within range), above 200SMA ($204.45) | notion-live | OK |
| KURA | $12.40 | change +4.3%, mktcap ~$1.10B, close $12.40, vol 2.70M | 3 recovered-dips (within range), above 200SMA ($9.71) | notion-live | OK |
| OR | $37.49 | change +3.9%, mktcap ~$6.99B, close $37.49, vol 2.63M | 3 recovered-dips (within range), above 200SMA ($36.60) | notion-live | OK |
| GO | $12.04 | change +3.8%, mktcap ~$1.19B, close $12.04, vol 2.21M | 3 recovered-dips (within range), above 200SMA ($9.23) | notion-live | OK |
| BHC | $6.68 | change +3.7%, mktcap ~$2.50B, close $6.68, vol 2.71M | hugging 8EMA, above 200SMA ($5.86) | notion-live | OK |
| GDDY | $100.52 | change +3.6%, mktcap ~$12.73B, close $100.52, vol 1.32M | 4 recovered-dips (within range), above 200SMA ($97.43) | notion-live | OK |
| MGTX | $14.83 | change +3.4%, mktcap ~$1.42B, close $14.83, vol 0.82M | 4 recovered-dips (within range), above 200SMA ($9.49) | notion-live | OK |
| AWK | $139.91 | change +3.3%, mktcap ~$27.80B, close $139.91, vol 2.41M | hugging 8EMA, above 200SMA ($131.22) | notion-live | OK |
| EIX | $73.97 | change +3.3%, mktcap ~$28.46B, close $73.97, vol 1.80M | hugging 8EMA, above 200SMA ($68.30) | notion-live | OK |
| BHPLF | $48.26 | change +3.3%, mktcap ~$245.33B, close $48.26, vol 1.25M | 4 recovered-dips (within range), above 200SMA ($36.96) | notion-live | OK |
| ACHC | $28.72 | change +3.2%, mktcap ~$2.67B, close $28.72, vol 1.44M | hugging 8EMA, above 200SMA ($22.50) | notion-live | OK |
| VRSN | $290.79 | change +3.2%, mktcap ~$26.26B, close $290.79, vol 0.64M | 3 recovered-dips (within range), above 200SMA ($259.98) | notion-live | OK |
| ANF | $112.36 | change +3.1%, mktcap ~$4.99B, close $112.36, vol 1.29M | hugging 8EMA, above 200SMA ($94.12) | notion-live | OK |
| SRRK | $58.20 | change +3.0%, mktcap ~$7.09B, close $58.20, vol 1.22M | 2 recovered-dips (within range), above 200SMA ($46.70) | notion-live | OK |

15 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 15 ok, 0 failed.


## 2026-08-25 batch

| Ticker | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|
| ALVO | $5.25 | change +18.5%, mktcap ~$2.05B, close $5.25, vol 3.18M | 4 recovered-dips (within range), above 200SMA ($4.16) | notion-live | OK |
| FIVE | $262.72 | change +5.0%, mktcap ~$14.53B, close $262.72, vol 2.04M | 4 recovered-dips (within range), above 200SMA ($203.96) | notion-live | OK |
| KURA | $12.40 | change +4.3%, mktcap ~$1.10B, close $12.40, vol 2.70M | 3 recovered-dips (within range), above 200SMA ($9.69) | notion-live | OK |
| KSS | $18.30 | change +4.0%, mktcap ~$2.08B, close $18.30, vol 4.60M | hugging 8EMA, above 200SMA ($17.21) | notion-live | OK |
| OR | $37.49 | change +3.9%, mktcap ~$6.99B, close $37.49, vol 2.63M | 4 recovered-dips (within range), above 200SMA ($36.57) | notion-live | OK |
| GO | $12.04 | change +3.8%, mktcap ~$1.19B, close $12.04, vol 2.21M | 4 recovered-dips (within range), above 200SMA ($9.23) | notion-live | OK |
| BHC | $6.68 | change +3.7%, mktcap ~$2.50B, close $6.68, vol 2.71M | hugging 8EMA, above 200SMA ($5.86) | notion-live | OK |
| GDDY | $100.52 | change +3.6%, mktcap ~$12.73B, close $100.52, vol 1.32M | 4 recovered-dips (within range), above 200SMA ($97.60) | notion-live | OK |
| MGTX | $14.83 | change +3.4%, mktcap ~$1.42B, close $14.83, vol 0.82M | 4 recovered-dips (within range), above 200SMA ($9.46) | notion-live | OK |
| BHPLF | $48.26 | change +3.3%, mktcap ~$245.33B, close $48.26, vol 1.25M | 4 recovered-dips (within range), above 200SMA ($36.96) | notion-live | OK |
| ACHC | $28.72 | change +3.2%, mktcap ~$2.67B, close $28.72, vol 1.44M | hugging 8EMA, above 200SMA ($22.46) | notion-live | OK |
| VRSN | $290.79 | change +3.2%, mktcap ~$26.26B, close $290.79, vol 0.64M | 4 recovered-dips (within range), above 200SMA ($259.75) | notion-live | OK |
| CROX | $125.84 | change +3.1%, mktcap ~$6.03B, close $125.84, vol 1.06M | hugging 8EMA, above 200SMA ($101.35) | notion-live | OK |
| SRRK | $58.20 | change +3.0%, mktcap ~$7.09B, close $58.20, vol 1.22M | 2 recovered-dips (within range), above 200SMA ($46.55) | notion-live | OK |

14 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 14 ok, 0 failed.


## 2026-08-24 batch (pipeline integration test — not a scheduled run)

First end-to-end dry run, confirming the full pipeline (scanner API → Yahoo Finance
technical calc → Notion write → markdown append → Telegram push) works before the
scheduled routine goes live. Stage 1 (TradingView scanner API) returned 97 tickers
matching the default config thresholds; only the top 3 by change% were run through
Stage 2 as a spot-check, not the full 97 — this is a pipeline validation, not a real
day's complete screen.

| Ticker | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|
| NASDAQ:ALVO | $5.25 | change +18.5%, mktcap ~$2.05B, close $5.25, vol 3.18M | 4 recovered-dips below 8EMA in trailing 60d (within configured 2-4 range), close above 200SMA ($4.16) | v1 defaults (change>3%, mktcap>$1B, price>=$1, vol>=500K, EMA8, SMA200/100-fallback, dip range 2-4) | OK — row created, marked `[TEST ROW]`, safe to delete |
| NASDAQ:GENB | $17.72 | change +9.9%, mktcap ~$2.27B, close $17.72, vol 2.50M | FAILED — 6 recovered-dips in trailing 60d, exceeds max-4 bound; only 123 bars of history, used 100SMA fallback ($14.09, price above) | v1 defaults | N/A — did not clear Stage 2 |
| NYSE:SA | $33.03 | change +9.5%, mktcap ~$3.56B, close $33.03, vol 1.30M | FAILED — 7 recovered-dips in trailing 60d, exceeds max-4 bound; above 200SMA ($29.74) | v1 defaults | N/A — did not clear Stage 2 |

**Note:** GENB and SA both failing on dip-count (6 and 7, vs. the configured max of 4)
while ALVO passed with exactly 4 is a reassuring sign the recovered-dip bound is doing
real discriminating work, not trivially passing everything.

---

*Future runs append below this line, following the same dated-batch format established
in `earnings-report/references/outcome-log.md`:*

```
## YYYY-MM-DD batch

| Ticker | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |
```

## 2026-08-25 batch — FAILED (infrastructure, no screen ran)

**Stage 1 and Stage 2 never ran.** This cloud scheduled-routine environment's network
egress policy blocks all three required public hosts outright (confirmed via the agent
proxy's `/__agentproxy/status` endpoint and via `WebFetch`, both returning policy denials,
not transient errors — no retry attempted per the proxy README's guidance not to retry or
route around a 403/407 policy denial):
- `scanner.tradingview.com` (Stage 1 fundamental scan) — `EGRESS_BLOCKED`
- `query1.finance.yahoo.com` (Stage 2 technical calc) — `EGRESS_BLOCKED`
- `api.telegram.org` (alert push) — `EGRESS_BLOCKED`
- `api.notion.com` direct REST calls were also `EGRESS_BLOCKED`, but the connected Notion
  MCP tools worked fine as a substitute (config read succeeded, confirmed live v1-default
  values below) — no equivalent MCP/connector exists for TradingView, Yahoo Finance, or
  Telegram in this environment, so those three have no working path here today.

**Config read (via Notion MCP, succeeded):** change floor 3%, market cap floor $1B, price
floor $1, volume floor 500K, EMA length 8, SMA length 200 (100 fallback), recovered-dip
range 2-4, timeframes daily/weekly/monthly — all v1 defaults, matching CLAUDE.md.

No Notion Screener Pool rows were written (nothing cleared either stage because neither
stage could execute — this is not a legitimate zero-catch day). No Telegram push could be
sent through the API for the same reason; the user was alerted directly through the
session's own notification channel instead, per the dead-man's-switch principle.

**Action needed:** this is an environment/network-policy problem, not a code or
credentials problem — the CLAUDE.md "verified live" data-source check evidently ran in a
session with a more permissive egress policy than this scheduled routine's cloud
environment. Fixing it requires either allow-listing these three hosts for the routine's
environment, or provisioning MCP connectors for TradingView/Yahoo Finance/Telegram
equivalent to the existing Notion one.

## 2026-08-25 batch (re-run) — FAILED (infrastructure, same egress block persists)

**Second attempt today, ~9 hours after the first FAILED run above; explicit credentials
were supplied inline in this run's prompt (in place of the gitignored `.env`) on the
theory that the first failure might have been a missing-credentials problem. It was not.**
Re-verified via direct `curl` against all four hosts before touching any pipeline logic —
every one still returns a proxy-level `403` (`CONNECT tunnel failed`), the same
organization-egress-policy denial as before, not a credentials or code error:
- `scanner.tradingview.com` (Stage 1) — `EGRESS_BLOCKED` (403)
- `query1.finance.yahoo.com` (Stage 2) — `EGRESS_BLOCKED` (403)
- `api.telegram.org` (alert push) — `EGRESS_BLOCKED` (403)
- `api.notion.com` direct REST — `EGRESS_BLOCKED` (403), same as before

Per the agent proxy's own README, a 403 from the proxy is an organization policy denial
that must be reported, not retried or routed around — so neither stage was attempted with
the supplied credentials, since there is no working path to either data source.

**Notion MCP connector confirmed working again** (unlike the direct REST route): fetched
workspace identity, and read the live Screener Config via `notion-query-data-sources` —
all 10 values still match v1 defaults (change floor 3%, market cap floor $1B, price floor
$1, volume floor 500K, EMA length 8, SMA length 200/fallback 100, recovered-dip range
2-4, timeframes daily/weekly/monthly). No Notion Screener Pool rows were written — nothing
cleared either stage because neither stage could execute. No Telegram push could be sent
through the API for the same reason; the user was alerted directly through the session's
own notification channel instead, per the dead-man's-switch principle.

**Status: unresolved, same root cause as the first 2026-08-25 run.** This is now two
consecutive failures on the same day from the same three hosts — the environment's egress
allow-list still needs to be widened (or equivalent MCP connectors provisioned) before this
routine can run unattended.
