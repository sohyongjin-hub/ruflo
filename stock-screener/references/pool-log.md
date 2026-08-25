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
