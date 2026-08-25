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
