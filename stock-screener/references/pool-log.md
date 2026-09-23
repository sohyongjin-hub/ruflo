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

## 2026-09-23 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| NLST | Netlist, Inc. | $5.92 | change +12.5%, mktcap ~$2.24B, close $5.92, vol 2.57M | 4 recovered-dips (within range), above 200SMA ($2.43) | notion-live | OK |
| ASAN | Asana, Inc. | $9.46 | change +4.2%, mktcap ~$2.17B, close $9.46, vol 5.82M | hugging 8EMA, above 200SMA ($8.63) | notion-live | OK |
| VEEV | Veeva Systems Inc. | $271.30 | change +4.0%, mktcap ~$43.93B, close $271.30, vol 0.82M | 4 recovered-dips (within range), above 200SMA ($199.44) | notion-live | OK |
| GEO | Geo Group Inc (The) REIT | $30.91 | change +3.9%, mktcap ~$4.07B, close $30.91, vol 1.41M | hugging 8EMA, above 200SMA ($22.43) | notion-live | OK |
| AMPL | Amplitude, Inc. | $13.65 | change +3.9%, mktcap ~$1.71B, close $13.65, vol 0.88M | 4 recovered-dips (within range), above 200SMA ($9.04) | notion-live | OK |
| TEAM | Atlassian Corporation | $194.75 | change +3.2%, mktcap ~$49.30B, close $194.75, vol 1.69M | 3 recovered-dips (within range), above 200SMA ($111.38) | notion-live | OK |
| DOCU | DocuSign, Inc. | $68.90 | change +3.2%, mktcap ~$12.88B, close $68.90, vol 1.60M | hugging 8EMA, above 200SMA ($53.69) | notion-live | OK |
| FORM | FormFactor, Inc. | $129.99 | change +3.2%, mktcap ~$10.15B, close $129.99, vol 0.72M | 4 recovered-dips (within range), above 200SMA ($105.34) | notion-live | OK |
| OKTA | Okta, Inc. | $202.82 | change +3.2%, mktcap ~$35.46B, close $202.82, vol 3.40M | 4 recovered-dips (within range), above 200SMA ($107.46) | notion-live | OK |

9 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 9 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-22 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| BLLN | BillionToOne, Inc. | $117.67 | change +13.3%, mktcap ~$5.55B, close $117.67, vol 0.85M | 4 recovered-dips (within range), above 200SMA ($94.75) | notion-live | OK |
| SHOP | Shopify Inc. | $147.57 | change +7.0%, mktcap ~$189.88B, close $147.57, vol 19.38M | 4 recovered-dips (within range), above 200SMA ($130.19) | notion-live | OK |
| GME | GameStop Corporation | $24.32 | change +6.8%, mktcap ~$12.27B, close $24.32, vol 10.51M | 4 recovered-dips (within range), above 200SMA ($22.19) | notion-live | OK |
| MRNA | Moderna, Inc. | $184.15 | change +6.5%, mktcap ~$73.52B, close $184.15, vol 19.35M | 4 recovered-dips (within range), above 200SMA ($61.79) | notion-live | OK |
| SRRK | Scholar Rock Holding Corporation | $51.12 | change +6.1%, mktcap ~$6.23B, close $51.12, vol 1.82M | hugging 8EMA, above 200SMA ($48.30) | notion-live | OK |
| GLBE | Global-E Online Ltd. | $41.90 | change +5.6%, mktcap ~$7.04B, close $41.90, vol 1.36M | 4 recovered-dips (within range), above 200SMA ($35.55) | notion-live | OK |
| NTLA | Intellia Therapeutics, Inc. | $12.82 | change +5.0%, mktcap ~$1.80B, close $12.82, vol 2.72M | 4 recovered-dips (within range), above 200SMA ($12.75) | notion-live | OK |
| SLS | SELLAS Life Sciences Group, Inc. | $11.93 | change +4.9%, mktcap ~$2.41B, close $11.93, vol 4.42M | hugging 8EMA, above 200SMA ($7.39) | notion-live | OK |
| IOVA | Iovance Biotherapeutics, Inc. | $10.68 | change +4.9%, mktcap ~$4.84B, close $10.68, vol 9.98M | 4 recovered-dips (within range), above 200SMA ($4.32) | notion-live | OK |
| BOBS | Bob's Discount Furniture, Inc. | $15.13 | change +4.8%, mktcap ~$1.98B, close $15.13, vol 0.75M | hugging 8EMA, above 100SMA ($15.04) | notion-live | OK |
| NVAX | Novavax, Inc. | $10.90 | change +4.8%, mktcap ~$1.80B, close $10.90, vol 5.61M | 4 recovered-dips (within range), above 200SMA ($8.73) | notion-live | OK |
| REPL | Replimune Group, Inc. | $13.47 | change +4.7%, mktcap ~$1.27B, close $13.47, vol 0.81M | hugging 8EMA, above 200SMA ($8.80) | notion-live | OK |
| VOR | Vor Biopharma Inc. | $22.86 | change +4.4%, mktcap ~$1.35B, close $22.86, vol 1.77M | hugging 8EMA, above 200SMA ($16.44) | notion-live | OK |
| OC | Owens Corning Inc | $126.79 | change +4.3%, mktcap ~$10.02B, close $126.79, vol 0.56M | hugging 8EMA, above 200SMA ($125.91) | notion-live | OK |
| CAKE | The Cheesecake Factory Incorporated | $103.67 | change +4.2%, mktcap ~$5.16B, close $103.67, vol 0.94M | 4 recovered-dips (within range), above 200SMA ($71.64) | notion-live | OK |
| AMGN | Amgen Inc. | $409.66 | change +4.2%, mktcap ~$221.48B, close $409.66, vol 2.42M | 4 recovered-dips (within range), above 200SMA ($360.94) | notion-live | OK |
| SRPT | Sarepta Therapeutics, Inc. | $20.98 | change +4.1%, mktcap ~$2.22B, close $20.98, vol 0.90M | hugging 8EMA, above 200SMA ($19.26) | notion-live | OK |
| BBNX | Beta Bionics, Inc. | $22.92 | change +4.0%, mktcap ~$1.24B, close $22.92, vol 0.58M | 4 recovered-dips (within range), above 200SMA ($16.18) | notion-live | OK |
| ERAS | Erasca, Inc. | $15.62 | change +3.9%, mktcap ~$5.46B, close $15.62, vol 1.73M | hugging 8EMA, above 200SMA ($13.54) | notion-live | OK |
| AXTA | Axalta Coating Systems Ltd. | $33.05 | change +3.7%, mktcap ~$7.07B, close $33.05, vol 2.64M | hugging 8EMA, above 200SMA ($32.05) | notion-live | OK |
| OMDA | Omada Health, Inc. | $21.36 | change +3.6%, mktcap ~$1.31B, close $21.36, vol 0.80M | 3 recovered-dips (within range), above 200SMA ($17.11) | notion-live | OK |
| RLAY | Relay Therapeutics, Inc. | $18.84 | change +3.6%, mktcap ~$4.13B, close $18.84, vol 1.91M | hugging 8EMA, above 200SMA ($13.60) | notion-live | OK |
| PRCH | Porch Group, Inc. | $17.23 | change +3.5%, mktcap ~$1.96B, close $17.23, vol 0.50M | 4 recovered-dips (within range), above 200SMA ($10.89) | notion-live | OK |
| HMY | Harmony Gold Mining Company Limited | $19.67 | change +3.5%, mktcap ~$12.14B, close $19.67, vol 4.16M | hugging 8EMA, above 200SMA ($18.41) | notion-live | OK |
| SWK | Stanley Black & Decker, Inc. | $91.60 | change +3.3%, mktcap ~$13.83B, close $91.60, vol 0.65M | hugging 8EMA, above 200SMA ($83.16) | notion-live | OK |
| CDNA | CareDx, Inc. | $56.09 | change +3.2%, mktcap ~$2.90B, close $56.09, vol 0.80M | 4 recovered-dips (within range), above 200SMA ($27.00) | notion-live | OK |
| MOS | Mosaic Company (The) | $24.83 | change +3.2%, mktcap ~$7.89B, close $24.83, vol 3.44M | hugging 8EMA, above 200SMA ($24.57) | notion-live | OK |
| VSXY | Victorias Secret & Co. | $84.19 | change +3.1%, mktcap ~$6.72B, close $84.19, vol 0.87M | 4 recovered-dips (within range), above 200SMA ($64.99) | notion-live | OK |
| TREX | Trex Company, Inc. | $44.20 | change +3.0%, mktcap ~$4.50B, close $44.20, vol 0.91M | hugging 8EMA, above 200SMA ($41.73) | notion-live | OK |

29 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 29 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-21 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| AXTI | AXT Inc | $79.84 | change +14.0%, mktcap ~$5.24B, close $79.84, vol 10.44M | 4 recovered-dips (within range), above 200SMA ($57.44) | notion-live | OK |
| MRNA | Moderna, Inc. | $172.55 | change +12.0%, mktcap ~$68.89B, close $172.55, vol 18.50M | 4 recovered-dips (within range), above 200SMA ($61.00) | notion-live | OK |
| META | Meta Platforms, Inc. | $743.49 | change +11.7%, mktcap ~$1894.05B, close $743.49, vol 43.09M | 3 recovered-dips (within range), above 200SMA ($624.63) | notion-live | OK |
| NET | Cloudflare, Inc. | $351.50 | change +8.6%, mktcap ~$125.16B, close $351.50, vol 3.22M | 3 recovered-dips (within range), above 200SMA ($228.60) | notion-live | OK |
| RNG | RingCentral, Inc. | $77.23 | change +7.5%, mktcap ~$6.45B, close $77.23, vol 1.04M | 4 recovered-dips (within range), above 200SMA ($42.05) | notion-live | OK |
| SHOP | Shopify Inc. | $137.54 | change +7.0%, mktcap ~$176.97B, close $137.54, vol 13.50M | 4 recovered-dips (within range), above 200SMA ($130.25) | notion-live | OK |
| GLW | Corning Incorporated | $159.05 | change +5.9%, mktcap ~$137.00B, close $159.05, vol 6.02M | 4 recovered-dips (within range), above 200SMA ($147.44) | notion-live | OK |
| VSXY | Victorias Secret & Co. | $82.03 | change +5.3%, mktcap ~$6.54B, close $82.03, vol 1.17M | 4 recovered-dips (within range), above 200SMA ($64.78) | notion-live | OK |
| DUOL | Duolingo, Inc. | $149.29 | change +5.2%, mktcap ~$6.98B, close $149.29, vol 0.90M | hugging 8EMA, above 200SMA ($129.76) | notion-live | OK |
| ULCC | Frontier Group Holdings, Inc. | $6.11 | change +4.9%, mktcap ~$1.41B, close $6.11, vol 1.30M | 4 recovered-dips (within range), above 200SMA ($5.33) | notion-live | OK |
| OKTA | Okta, Inc. | $190.90 | change +4.7%, mktcap ~$33.37B, close $190.90, vol 3.00M | 4 recovered-dips (within range), above 200SMA ($106.88) | notion-live | OK |
| NTSK | Netskope, Inc. | $18.30 | change +4.6%, mktcap ~$7.48B, close $18.30, vol 6.65M | 3 recovered-dips (within range), above 200SMA ($12.93) | notion-live | OK |
| GLBE | Global-E Online Ltd. | $39.74 | change +4.5%, mktcap ~$6.68B, close $39.74, vol 1.28M | 4 recovered-dips (within range), above 200SMA ($35.54) | notion-live | OK |
| U | Unity Software Inc. | $43.13 | change +4.2%, mktcap ~$18.98B, close $43.13, vol 8.96M | 4 recovered-dips (within range), above 200SMA ($32.14) | notion-live | OK |
| PRCH | Porch Group, Inc. | $16.55 | change +4.1%, mktcap ~$1.88B, close $16.55, vol 0.71M | 4 recovered-dips (within range), above 200SMA ($10.86) | notion-live | OK |
| IMNM | Immunome, Inc. | $24.93 | change +4.0%, mktcap ~$2.83B, close $24.93, vol 0.86M | 4 recovered-dips (within range), above 200SMA ($22.65) | notion-live | OK |
| AXGN | Axogen, Inc. | $45.94 | change +3.9%, mktcap ~$2.70B, close $45.94, vol 0.87M | hugging 8EMA, above 200SMA ($38.42) | notion-live | OK |
| BRZE | Braze, Inc. | $25.33 | change +3.7%, mktcap ~$2.88B, close $25.33, vol 1.26M | hugging 8EMA, above 200SMA ($24.60) | notion-live | OK |
| TRLV | Trulieve Cannabis Corp. Subordinate Voting Shares | $11.47 | change +3.6%, mktcap ~$2.21B, close $11.47, vol 1.13M | hugging 8EMA, above 200SMA ($8.40) | notion-live | OK |

19 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 19 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-18 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| ALVO | Alvotech | $5.91 | change +10.6%, mktcap ~$2.31B, close $5.91, vol 2.02M | 4 recovered-dips (within range), above 200SMA ($4.15) | notion-live | OK |
| INSP | Inspire Medical Systems, Inc. | $76.69 | change +5.4%, mktcap ~$2.22B, close $76.69, vol 0.87M | 4 recovered-dips (within range), above 200SMA ($64.56) | notion-live | OK |
| LRCX | Lam Research Corporation | $282.19 | change +4.8%, mktcap ~$353.11B, close $282.19, vol 6.29M | hugging 8EMA, above 200SMA ($267.17) | notion-live | OK |
| AMAT | Applied Materials, Inc. | $434.70 | change +4.1%, mktcap ~$344.98B, close $434.70, vol 4.96M | hugging 8EMA, above 200SMA ($416.21) | notion-live | OK |
| TRMD | TORM plc | $38.09 | change +4.0%, mktcap ~$3.88B, close $38.09, vol 1.28M | 4 recovered-dips (within range), above 200SMA ($27.97) | notion-live | OK |
| NLST | Netlist, Inc. | $4.97 | change +4.0%, mktcap ~$1.76B, close $4.97, vol 1.16M | 4 recovered-dips (within range), above 200SMA ($2.38) | notion-live | OK |
| WDC | Western Digital Corporation | $440.64 | change +4.0%, mktcap ~$158.87B, close $440.64, vol 3.70M | hugging 8EMA, above 200SMA ($385.87) | notion-live | OK |
| OMDA | Omada Health, Inc. | $20.50 | change +3.4%, mktcap ~$1.26B, close $20.50, vol 0.63M | hugging 8EMA, above 200SMA ($17.08) | notion-live | OK |
| WT | WisdomTree, Inc. | $22.95 | change +3.2%, mktcap ~$3.48B, close $22.95, vol 2.01M | hugging 8EMA, above 200SMA ($17.52) | notion-live | OK |

9 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 9 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-17 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| BHVN | Biohaven Ltd. | $13.35 | change +11.1%, mktcap ~$2.02B, close $13.35, vol 2.72M | hugging 8EMA, above 200SMA ($11.86) | notion-live | OK |
| CRSP | CRISPR Therapeutics AG | $57.08 | change +9.3%, mktcap ~$5.52B, close $57.08, vol 2.00M | 4 recovered-dips (within range), above 200SMA ($53.29) | notion-live | OK |
| ABCL | AbCellera Biologics Inc. | $12.68 | change +8.6%, mktcap ~$4.11B, close $12.68, vol 6.16M | 4 recovered-dips (within range), above 200SMA ($5.45) | notion-live | OK |
| MRNA | Moderna, Inc. | $157.88 | change +8.4%, mktcap ~$63.03B, close $157.88, vol 15.05M | 4 recovered-dips (within range), above 200SMA ($59.60) | notion-live | OK |
| TH | Target Hospitality Corp. | $20.34 | change +8.4%, mktcap ~$2.03B, close $20.34, vol 1.61M | 3 recovered-dips (within range), above 200SMA ($13.30) | notion-live | OK |
| TXG | 10x Genomics, Inc. | $78.25 | change +7.7%, mktcap ~$10.20B, close $78.25, vol 2.09M | 3 recovered-dips (within range), above 200SMA ($31.04) | notion-live | OK |
| NEXA | Nexa Resources S.A. | $12.94 | change +7.1%, mktcap ~$1.71B, close $12.94, vol 0.93M | hugging 8EMA, above 200SMA ($12.46) | notion-live | OK |
| NEWP | New Pacific Metals Corp. | $5.93 | change +6.8%, mktcap ~$1.10B, close $5.93, vol 0.72M | hugging 8EMA, above 200SMA ($4.64) | notion-live | OK |
| MRVI | Maravai LifeSciences Holdings, Inc. | $7.29 | change +6.7%, mktcap ~$1.89B, close $7.29, vol 1.72M | 4 recovered-dips (within range), above 200SMA ($4.63) | notion-live | OK |
| EXK | Endeavour Silver Corporation | $10.15 | change +6.5%, mktcap ~$3.01B, close $10.15, vol 4.70M | hugging 8EMA, above 200SMA ($9.93) | notion-live | OK |
| CDE | Coeur Mining, Inc. | $20.13 | change +6.1%, mktcap ~$20.69B, close $20.13, vol 34.40M | hugging 8EMA, above 200SMA ($19.15) | notion-live | OK |
| ALVO | Alvotech | $5.41 | change +6.0%, mktcap ~$2.11B, close $5.41, vol 0.88M | 4 recovered-dips (within range), above 200SMA ($4.15) | notion-live | OK |
| HIMX | Himax Technologies, Inc. | $13.82 | change +5.9%, mktcap ~$2.22B, close $13.82, vol 0.54M | hugging 8EMA, above 200SMA ($12.03) | notion-live | OK |
| NUVB | Nuvation Bio Inc. | $6.12 | change +5.9%, mktcap ~$2.15B, close $6.12, vol 3.83M | hugging 8EMA, above 200SMA ($5.92) | notion-live | OK |
| SNDK | Sandisk Corporation | $1608.18 | change +5.8%, mktcap ~$235.47B, close $1608.18, vol 6.69M | hugging 8EMA, above 200SMA ($1060.32) | notion-live | OK |
| IAUX | i-80 Gold Corp. | $1.75 | change +5.8%, mktcap ~$1.51B, close $1.75, vol 9.18M | hugging 8EMA, above 200SMA ($1.59) | notion-live | OK |
| ULCC | Frontier Group Holdings, Inc. | $5.92 | change +5.6%, mktcap ~$1.36B, close $5.92, vol 1.30M | 4 recovered-dips (within range), above 200SMA ($5.32) | notion-live | OK |
| SRPT | Sarepta Therapeutics, Inc. | $20.83 | change +5.4%, mktcap ~$2.20B, close $20.83, vol 1.46M | hugging 8EMA, above 200SMA ($19.27) | notion-live | OK |
| TGB | Trekor Metals Limited | $8.37 | change +5.3%, mktcap ~$3.06B, close $8.37, vol 2.23M | hugging 8EMA, above 200SMA ($7.21) | notion-live | OK |
| KURA | Kura Oncology, Inc. | $11.79 | change +5.2%, mktcap ~$1.05B, close $11.79, vol 1.18M | hugging 8EMA, above 200SMA ($9.82) | notion-live | OK |
| BMNR | BitMine Immersion Technologies, Inc. | $23.96 | change +5.1%, mktcap ~$14.46B, close $23.96, vol 31.01M | hugging 8EMA, above 200SMA ($22.10) | notion-live | OK |
| HPK | HighPeak Energy, Inc. | $8.27 | change +5.0%, mktcap ~$1.05B, close $8.27, vol 2.14M | hugging 8EMA, above 200SMA ($6.39) | notion-live | OK |
| AXTI | AXT Inc | $67.52 | change +5.0%, mktcap ~$4.43B, close $67.52, vol 6.13M | 4 recovered-dips (within range), above 200SMA ($56.80) | notion-live | OK |
| RXO | RXO, Inc. | $20.03 | change +5.0%, mktcap ~$3.30B, close $20.03, vol 0.86M | hugging 8EMA, above 200SMA ($19.23) | notion-live | OK |
| VSXY | Victorias Secret & Co. | $77.39 | change +4.6%, mktcap ~$6.17B, close $77.39, vol 1.04M | 4 recovered-dips (within range), above 200SMA ($64.41) | notion-live | OK |
| CMBT | CMB.TECH NV | $20.57 | change +4.6%, mktcap ~$5.97B, close $20.57, vol 1.17M | 4 recovered-dips (within range), above 200SMA ($14.05) | notion-live | OK |
| SIMO | Silicon Motion Technology Corporation | $252.29 | change +4.6%, mktcap ~$8.18B, close $252.29, vol 0.56M | hugging 8EMA, above 200SMA ($191.27) | notion-live | OK |
| HBM | Hudbay Minerals Inc. | $26.43 | change +4.6%, mktcap ~$11.74B, close $26.43, vol 1.71M | hugging 8EMA, above 200SMA ($23.97) | notion-live | OK |
| MARA | MARA Holdings, Inc. | $11.54 | change +4.5%, mktcap ~$4.46B, close $11.54, vol 59.18M | hugging 8EMA, above 200SMA ($10.94) | notion-live | OK |
| EGO | Eldorado Gold Corporation | $42.36 | change +4.4%, mktcap ~$11.07B, close $42.36, vol 2.82M | hugging 8EMA, above 200SMA ($36.53) | notion-live | OK |
| BTG | B2Gold Corp | $5.37 | change +4.4%, mktcap ~$7.09B, close $5.37, vol 11.96M | hugging 8EMA, above 200SMA ($4.74) | notion-live | OK |
| CCC | CCC Intelligent Solutions Holdings Inc. | $6.61 | change +4.3%, mktcap ~$3.89B, close $6.61, vol 6.52M | 3 recovered-dips (within range), above 200SMA ($6.18) | notion-live | OK |
| RCUS | Arcus Biosciences, Inc. | $25.72 | change +4.3%, mktcap ~$3.28B, close $25.72, vol 1.10M | hugging 8EMA, above 200SMA ($24.73) | notion-live | OK |
| GLBE | Global-E Online Ltd. | $38.51 | change +4.3%, mktcap ~$6.47B, close $38.51, vol 0.69M | 4 recovered-dips (within range), above 200SMA ($35.56) | notion-live | OK |
| ITT | ITT Inc. | $202.74 | change +4.2%, mktcap ~$18.12B, close $202.74, vol 0.79M | hugging 8EMA, above 200SMA ($195.38) | notion-live | OK |

35 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 35 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-16 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| AXTI | AXT Inc | $63.36 | change +9.8%, mktcap ~$4.15B, close $63.36, vol 8.65M | 4 recovered-dips (within range), above 200SMA ($56.51) | notion-live | OK |
| LITE | Lumentum Holdings Inc. | $901.57 | change +7.5%, mktcap ~$80.87B, close $901.57, vol 4.66M | hugging 8EMA, above 200SMA ($707.73) | notion-live | OK |
| ALVO | Alvotech | $5.31 | change +5.8%, mktcap ~$2.07B, close $5.31, vol 2.52M | 4 recovered-dips (within range), above 200SMA ($4.15) | notion-live | OK |
| TRMD | TORM plc | $36.81 | change +5.4%, mktcap ~$3.75B, close $36.81, vol 1.96M | 4 recovered-dips (within range), above 200SMA ($27.81) | notion-live | OK |
| COHR | Coherent Corp. | $285.49 | change +5.3%, mktcap ~$55.91B, close $285.49, vol 4.87M | hugging 8EMA, above 200SMA ($281.51) | notion-live | OK |
| XERS | Xeris Biopharma Holdings, Inc. | $7.86 | change +4.9%, mktcap ~$1.43B, close $7.86, vol 0.93M | hugging 8EMA, above 200SMA ($7.07) | notion-live | OK |
| OMER | Omeros Corporation | $17.96 | change +4.6%, mktcap ~$1.30B, close $17.96, vol 0.80M | 4 recovered-dips (within range), above 200SMA ($12.47) | notion-live | OK |
| EAT | Brinker International, Inc. | $212.54 | change +4.5%, mktcap ~$8.88B, close $212.54, vol 0.68M | hugging 8EMA, above 200SMA ($166.45) | notion-live | OK |
| INTC | Intel Corporation | $101.37 | change +4.4%, mktcap ~$535.85B, close $101.37, vol 84.19M | hugging 8EMA, above 200SMA ($76.47) | notion-live | OK |
| IOVA | Iovance Biotherapeutics, Inc. | $9.77 | change +4.3%, mktcap ~$4.42B, close $9.77, vol 12.30M | 4 recovered-dips (within range), above 200SMA ($4.16) | notion-live | OK |
| GEV | GE Vernova Inc. | $920.92 | change +4.3%, mktcap ~$245.27B, close $920.92, vol 2.52M | hugging 8EMA, above 200SMA ($898.47) | notion-live | OK |
| LIND | Lindblad Expeditions Holdings Inc. | $27.20 | change +4.3%, mktcap ~$1.79B, close $27.20, vol 0.60M | 4 recovered-dips (within range), above 200SMA ($21.34) | notion-live | OK |
| TGTX | TG Therapeutics, Inc. | $55.28 | change +4.2%, mktcap ~$8.46B, close $55.28, vol 1.56M | hugging 8EMA, above 200SMA ($39.81) | notion-live | OK |
| VSTS | Vestis Corporation | $13.83 | change +4.2%, mktcap ~$1.83B, close $13.83, vol 0.96M | 3 recovered-dips (within range), above 200SMA ($10.25) | notion-live | OK |
| ANF | Abercrombie & Fitch Company | $140.70 | change +4.1%, mktcap ~$5.97B, close $140.70, vol 0.81M | hugging 8EMA, above 200SMA ($99.46) | notion-live | OK |
| JKHY | Jack Henry & Associates, Inc. | $160.12 | change +3.9%, mktcap ~$11.23B, close $160.12, vol 0.91M | hugging 8EMA, above 200SMA ($159.60) | notion-live | OK |
| DOCN | DigitalOcean Holdings, Inc. | $122.39 | change +3.9%, mktcap ~$14.39B, close $122.39, vol 0.97M | hugging 8EMA, above 200SMA ($99.92) | notion-live | OK |
| HUT | Hut 8 Corp. | $90.34 | change +3.7%, mktcap ~$11.14B, close $90.34, vol 2.18M | hugging 8EMA, above 200SMA ($77.06) | notion-live | OK |
| CROX | Crocs, Inc. | $115.59 | change +3.7%, mktcap ~$5.54B, close $115.59, vol 0.70M | hugging 8EMA, above 200SMA ($104.40) | notion-live | OK |
| SBH | Sally Beauty Holdings, Inc. (Name to be changed from Sally Holdings, Inc.) | $16.25 | change +3.7%, mktcap ~$1.52B, close $16.25, vol 0.54M | hugging 8EMA, above 200SMA ($14.83) | notion-live | OK |
| SN | SharkNinja, Inc. | $172.30 | change +3.1%, mktcap ~$24.27B, close $172.30, vol 1.24M | hugging 8EMA, above 200SMA ($130.92) | notion-live | OK |

21 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 21 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-15 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| TENB | Tenable Holdings, Inc. | $38.60 | change +10.0%, mktcap ~$4.25B, close $38.60, vol 4.98M | 3 recovered-dips (within range), above 200SMA ($26.29) | notion-live | OK |
| QLYS | Qualys, Inc. | $185.56 | change +7.3%, mktcap ~$6.42B, close $185.56, vol 0.69M | 3 recovered-dips (within range), above 200SMA ($125.53) | notion-live | OK |
| PBF | PBF Energy Inc. | $74.85 | change +6.3%, mktcap ~$8.87B, close $74.85, vol 7.38M | hugging 8EMA, above 200SMA ($45.47) | notion-live | OK |
| TXG | 10x Genomics, Inc. | $74.38 | change +6.1%, mktcap ~$9.69B, close $74.38, vol 1.88M | 4 recovered-dips (within range), above 200SMA ($30.48) | notion-live | OK |
| CRGY | Crescent Energy Company | $15.35 | change +5.2%, mktcap ~$5.07B, close $15.35, vol 4.48M | 4 recovered-dips (within range), above 200SMA ($11.24) | notion-live | OK |
| DINO | HF Sinclair Corporation | $112.30 | change +5.0%, mktcap ~$19.97B, close $112.30, vol 1.85M | 3 recovered-dips (within range), above 200SMA ($67.29) | notion-live | OK |
| NAVN | Navan, Inc. | $22.43 | change +4.9%, mktcap ~$5.84B, close $22.43, vol 2.76M | 3 recovered-dips (within range), above 200SMA ($18.20) | notion-live | OK |
| VOYG | Voyager Technologies, Inc. | $34.70 | change +4.8%, mktcap ~$2.12B, close $34.70, vol 0.81M | hugging 8EMA, above 200SMA ($31.30) | notion-live | OK |
| QCOM | QUALCOMM Incorporated | $188.61 | change +4.7%, mktcap ~$198.08B, close $188.61, vol 9.94M | 4 recovered-dips (within range), above 200SMA ($168.30) | notion-live | OK |
| AESI | Atlas Energy Solutions Inc. | $13.74 | change +4.6%, mktcap ~$1.72B, close $13.74, vol 1.56M | hugging 8EMA, above 200SMA ($13.20) | notion-live | OK |
| PDM | Piedmont Realty Trust, Inc. | $9.57 | change +4.0%, mktcap ~$1.20B, close $9.57, vol 11.17M | hugging 8EMA, above 200SMA ($8.49) | notion-live | OK |
| ATEN | A10 Networks, Inc. | $26.63 | change +4.0%, mktcap ~$1.93B, close $26.63, vol 0.66M | 4 recovered-dips (within range), above 200SMA ($25.07) | notion-live | OK |
| P | Everpure, Inc. | $97.43 | change +3.9%, mktcap ~$32.47B, close $97.43, vol 1.72M | hugging 8EMA, above 200SMA ($75.86) | notion-live | OK |
| MRVI | Maravai LifeSciences Holdings, Inc. | $6.95 | change +3.9%, mktcap ~$1.80B, close $6.95, vol 1.11M | hugging 8EMA, above 200SMA ($4.60) | notion-live | OK |
| MXL | MaxLinear, Inc | $67.27 | change +3.8%, mktcap ~$6.10B, close $67.27, vol 1.24M | hugging 8EMA, above 200SMA ($49.10) | notion-live | OK |
| NVGS | Navigator Holdings Ltd. | $24.36 | change +3.8%, mktcap ~$1.50B, close $24.36, vol 0.60M | 4 recovered-dips (within range), above 200SMA ($20.32) | notion-live | OK |
| LYB | LyondellBasell Industries NV | $65.08 | change +3.7%, mktcap ~$21.02B, close $65.08, vol 1.49M | hugging 8EMA, above 200SMA ($61.08) | notion-live | OK |
| HLIT | Harmonic Inc. | $11.66 | change +3.7%, mktcap ~$1.27B, close $11.66, vol 1.36M | hugging 8EMA, above 200SMA ($11.46) | notion-live | OK |
| DAR | Darling Ingredients Inc. | $67.30 | change +3.7%, mktcap ~$10.62B, close $67.30, vol 1.55M | hugging 8EMA, above 200SMA ($54.51) | notion-live | OK |
| CF | CF Industries Holdings, Inc. | $135.90 | change +3.6%, mktcap ~$20.57B, close $135.90, vol 1.24M | hugging 8EMA, above 200SMA ($109.76) | notion-live | OK |
| PSX | Phillips 66 | $265.94 | change +3.5%, mktcap ~$106.12B, close $265.94, vol 1.59M | 4 recovered-dips (within range), above 200SMA ($176.16) | notion-live | OK |
| KMTS | Kestra Medical Technologies, Ltd. | $24.89 | change +3.4%, mktcap ~$1.46B, close $24.89, vol 0.67M | hugging 8EMA, above 200SMA ($23.53) | notion-live | OK |
| FTI | TechnipFMC plc | $75.29 | change +3.3%, mktcap ~$29.53B, close $75.29, vol 1.77M | hugging 8EMA, above 200SMA ($65.35) | notion-live | OK |
| NTSK | Netskope, Inc. | $17.52 | change +3.1%, mktcap ~$7.16B, close $17.52, vol 7.37M | 3 recovered-dips (within range), above 200SMA ($12.94) | notion-live | OK |
| LH | Labcorp Holdings Inc. | $325.03 | change +3.1%, mktcap ~$26.36B, close $325.03, vol 0.51M | hugging 8EMA, above 200SMA ($277.18) | notion-live | OK |
| AXGN | Axogen, Inc. | $45.11 | change +3.0%, mktcap ~$2.43B, close $45.11, vol 0.63M | hugging 8EMA, above 200SMA ($38.09) | notion-live | OK |

26 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 26 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-14 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| NTSK | Netskope, Inc. | $17.38 | change +18.2%, mktcap ~$7.10B, close $17.38, vol 11.50M | 4 recovered-dips (within range), above 200SMA ($12.94) | notion-live | OK |
| QLYS | Qualys, Inc. | $173.03 | change +15.1%, mktcap ~$5.99B, close $173.03, vol 0.80M | 4 recovered-dips (within range), above 200SMA ($125.32) | notion-live | OK |
| TENB | Tenable Holdings, Inc. | $34.62 | change +15.0%, mktcap ~$3.81B, close $34.62, vol 9.81M | 4 recovered-dips (within range), above 200SMA ($26.23) | notion-live | OK |
| RUM | RUM Group Inc. | $8.06 | change +12.5%, mktcap ~$4.00B, close $8.06, vol 23.71M | hugging 8EMA, above 200SMA ($6.68) | notion-live | OK |
| APPN | Appian Corporation | $38.08 | change +9.6%, mktcap ~$2.73B, close $38.08, vol 0.80M | 4 recovered-dips (within range), above 200SMA ($28.24) | notion-live | OK |
| NET | Cloudflare, Inc. | $332.75 | change +8.6%, mktcap ~$118.49B, close $332.75, vol 3.45M | 4 recovered-dips (within range), above 200SMA ($225.26) | notion-live | OK |
| AMPL | Amplitude, Inc. | $13.55 | change +7.6%, mktcap ~$1.69B, close $13.55, vol 1.11M | 4 recovered-dips (within range), above 200SMA ($8.94) | notion-live | OK |
| PGY | Pagaya Technologies Ltd. | $21.48 | change +7.6%, mktcap ~$1.79B, close $21.48, vol 1.95M | hugging 8EMA, above 200SMA ($17.29) | notion-live | OK |
| IOVA | Iovance Biotherapeutics, Inc. | $9.22 | change +7.2%, mktcap ~$4.18B, close $9.22, vol 10.93M | 4 recovered-dips (within range), above 200SMA ($4.09) | notion-live | OK |
| TEAM | Atlassian Corporation | $191.72 | change +6.7%, mktcap ~$48.53B, close $191.72, vol 2.95M | 3 recovered-dips (within range), above 200SMA ($110.14) | notion-live | OK |
| PATH | UiPath, Inc. | $14.64 | change +6.5%, mktcap ~$7.63B, close $14.64, vol 49.21M | 2 recovered-dips (within range), above 200SMA ($12.91) | notion-live | OK |
| BRZE | Braze, Inc. | $25.46 | change +6.3%, mktcap ~$2.89B, close $25.46, vol 2.06M | 2 recovered-dips (within range), above 200SMA ($24.69) | notion-live | OK |
| FIGS | FIGS, Inc. | $14.19 | change +6.3%, mktcap ~$2.36B, close $14.19, vol 2.12M | hugging 8EMA, above 200SMA ($12.62) | notion-live | OK |
| CLDX | Celldex Therapeutics, Inc. | $39.08 | change +5.9%, mktcap ~$3.07B, close $39.08, vol 0.62M | hugging 8EMA, above 200SMA ($31.88) | notion-live | OK |
| PCOR | Procore Technologies, Inc. | $56.38 | change +5.9%, mktcap ~$8.57B, close $56.38, vol 1.43M | hugging 8EMA, above 200SMA ($56.57) | notion-live | OK |
| AMLX | Amylyx Pharmaceuticals, Inc. | $33.47 | change +5.8%, mktcap ~$4.20B, close $33.47, vol 1.25M | hugging 8EMA, above 200SMA ($17.33) | notion-live | OK |
| RNG | RingCentral, Inc. | $72.87 | change +5.7%, mktcap ~$6.09B, close $72.87, vol 1.35M | 4 recovered-dips (within range), above 200SMA ($40.92) | notion-live | OK |
| MDB | MongoDB, Inc. | $382.44 | change +5.6%, mktcap ~$30.81B, close $382.44, vol 1.33M | hugging 8EMA, above 200SMA ($343.33) | notion-live | OK |
| AJG | Arthur J. Gallagher & Co. | $253.38 | change +5.4%, mktcap ~$64.94B, close $253.38, vol 1.15M | hugging 8EMA, above 200SMA ($233.83) | notion-live | OK |
| TEM | Tempus AI, Inc. | $62.20 | change +5.4%, mktcap ~$11.22B, close $62.20, vol 3.89M | hugging 8EMA, above 200SMA ($56.20) | notion-live | OK |
| SN | SharkNinja, Inc. | $169.39 | change +5.3%, mktcap ~$23.86B, close $169.39, vol 1.20M | hugging 8EMA, above 200SMA ($130.18) | notion-live | OK |
| MANH | Manhattan Associates, Inc. | $212.16 | change +5.1%, mktcap ~$12.37B, close $212.16, vol 0.55M | hugging 8EMA, above 200SMA ($159.05) | notion-live | OK |
| WDAY | Workday, Inc. | $194.16 | change +4.6%, mktcap ~$46.79B, close $194.16, vol 1.98M | hugging 8EMA, above 200SMA ($159.28) | notion-live | OK |
| GO | Grocery Outlet Holding Corp. | $11.76 | change +4.5%, mktcap ~$1.17B, close $11.76, vol 1.12M | hugging 8EMA, above 200SMA ($9.27) | notion-live | OK |
| ORIC | Oric Pharmaceuticals, Inc. | $12.58 | change +4.5%, mktcap ~$1.30B, close $12.58, vol 0.85M | hugging 8EMA, above 200SMA ($10.68) | notion-live | OK |
| TLX | Telix Pharmaceuticals Limited | $11.79 | change +4.5%, mktcap ~$3.82B, close $11.79, vol 0.57M | hugging 8EMA, above 200SMA ($9.51) | notion-live | OK |
| PCTY | Paylocity Holding Corporation | $147.94 | change +4.4%, mktcap ~$7.85B, close $147.94, vol 0.54M | hugging 8EMA, above 200SMA ($125.26) | notion-live | OK |
| OMDA | Omada Health, Inc. | $20.53 | change +4.4%, mktcap ~$1.26B, close $20.53, vol 0.67M | 2 recovered-dips (within range), above 200SMA ($17.05) | notion-live | OK |
| PD | PagerDuty, Inc. | $14.70 | change +4.3%, mktcap ~$1.16B, close $14.70, vol 1.40M | 4 recovered-dips (within range), above 200SMA ($9.59) | notion-live | OK |
| PLTR | Palantir Technologies Inc. | $174.15 | change +4.1%, mktcap ~$418.49B, close $174.15, vol 23.88M | hugging 8EMA, above 200SMA ($151.58) | notion-live | OK |
| SHOP | Shopify Inc. | $134.11 | change +4.1%, mktcap ~$172.55B, close $134.11, vol 5.92M | hugging 8EMA, above 200SMA ($130.88) | notion-live | OK |
| RHHBY | Roche Holding Ltd | $54.92 | change +4.1%, mktcap ~$336.40B, close $54.92, vol 1.46M | hugging 8EMA, above 200SMA ($52.84) | notion-live | OK |
| ATEN | A10 Networks, Inc. | $25.75 | change +4.1%, mktcap ~$1.87B, close $25.75, vol 1.02M | 4 recovered-dips (within range), above 200SMA ($25.02) | notion-live | OK |
| NCNO | nCino, Inc. | $22.11 | change +4.0%, mktcap ~$2.34B, close $22.11, vol 1.57M | hugging 8EMA, above 200SMA ($19.06) | notion-live | OK |
| TOST | Toast, Inc. | $33.38 | change +3.9%, mktcap ~$19.39B, close $33.38, vol 4.81M | hugging 8EMA, above 200SMA ($30.10) | notion-live | OK |
| GEN | Gen Digital Inc. | $31.43 | change +3.8%, mktcap ~$18.81B, close $31.43, vol 3.76M | 4 recovered-dips (within range), above 200SMA ($24.71) | notion-live | OK |
| PURR | Hyperliquid Strategies Inc | $12.05 | change +3.8%, mktcap ~$2.38B, close $12.05, vol 11.34M | hugging 8EMA, above 100SMA ($8.23) | notion-live | OK |
| NWS | News Corporation | $33.89 | change +3.6%, mktcap ~$17.11B, close $33.89, vol 0.54M | hugging 8EMA, above 200SMA ($29.97) | notion-live | OK |
| EXLS | ExlService Holdings, Inc. | $36.52 | change +3.6%, mktcap ~$5.54B, close $36.52, vol 0.95M | hugging 8EMA, above 200SMA ($33.40) | notion-live | OK |
| AXGN | Axogen, Inc. | $43.67 | change +3.6%, mktcap ~$2.35B, close $43.67, vol 1.24M | 4 recovered-dips (within range), above 200SMA ($38.00) | notion-live | OK |
| TRLV | Trulieve Cannabis Corp. Subordinate Voting Shares | $11.71 | change +3.5%, mktcap ~$2.25B, close $11.71, vol 1.30M | hugging 8EMA, above 200SMA ($8.25) | notion-live | OK |
| BOX | Box, Inc. | $34.93 | change +3.5%, mktcap ~$4.79B, close $34.93, vol 1.56M | hugging 8EMA, above 200SMA ($27.51) | notion-live | OK |
| NVCR | NovoCure Limited | $16.03 | change +3.4%, mktcap ~$1.87B, close $16.03, vol 0.54M | hugging 8EMA, above 200SMA ($14.46) | notion-live | OK |
| BTSG | BrightSpring Health Services, Inc. | $60.68 | change +3.3%, mktcap ~$12.01B, close $60.68, vol 1.76M | hugging 8EMA, above 200SMA ($50.79) | notion-live | OK |
| VOR | Vor Biopharma Inc. | $23.04 | change +3.3%, mktcap ~$1.36B, close $23.04, vol 0.64M | hugging 8EMA, above 200SMA ($16.02) | notion-live | OK |

45 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 45 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-11 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| HTFL | Heartflow, Inc. | $49.63 | change +9.1%, mktcap ~$4.32B, close $49.63, vol 1.13M | 4 recovered-dips (within range), above 200SMA ($30.31) | notion-live | OK |
| MRNA | Moderna, Inc. | $148.15 | change +8.4%, mktcap ~$59.14B, close $148.15, vol 11.60M | 4 recovered-dips (within range), above 200SMA ($57.14) | notion-live | OK |
| IBRX | ImmunityBio, Inc. | $8.21 | change +6.3%, mktcap ~$8.70B, close $8.21, vol 8.82M | hugging 8EMA, above 200SMA ($6.72) | notion-live | OK |
| DSGX | The Descartes Systems Group Inc. | $75.55 | change +5.9%, mktcap ~$6.47B, close $75.55, vol 1.31M | hugging 8EMA, above 200SMA ($75.34) | notion-live | OK |
| PURR | Hyperliquid Strategies Inc | $11.65 | change +5.8%, mktcap ~$2.30B, close $11.65, vol 18.29M | hugging 8EMA, above 100SMA ($8.16) | notion-live | OK |
| SPSC | SPS Commerce, Inc. | $81.61 | change +5.7%, mktcap ~$2.94B, close $81.61, vol 1.45M | 3 recovered-dips (within range), above 200SMA ($68.80) | notion-live | OK |
| VYX | NCR Voyix Corporation | $8.48 | change +5.1%, mktcap ~$1.17B, close $8.48, vol 1.13M | hugging 8EMA, above 200SMA ($8.31) | notion-live | OK |
| NVAX | Novavax, Inc. | $9.73 | change +4.7%, mktcap ~$1.61B, close $9.73, vol 3.81M | hugging 8EMA, above 200SMA ($8.62) | notion-live | OK |
| NLST | Netlist, Inc. | $4.86 | change +4.6%, mktcap ~$1.72B, close $4.86, vol 0.77M | 4 recovered-dips (within range), above 200SMA ($2.28) | notion-live | OK |
| AFRM | Affirm Holdings, Inc. | $70.95 | change +4.4%, mktcap ~$23.94B, close $70.95, vol 3.09M | hugging 8EMA, above 200SMA ($66.62) | notion-live | OK |
| PENG | Penguin Solutions, Inc. | $50.68 | change +4.2%, mktcap ~$2.60B, close $50.68, vol 0.74M | hugging 8EMA, above 200SMA ($37.27) | notion-live | OK |
| TXG | 10x Genomics, Inc. | $69.08 | change +4.1%, mktcap ~$9.00B, close $69.08, vol 1.04M | 4 recovered-dips (within range), above 200SMA ($29.95) | notion-live | OK |
| INGM | Ingram Micro Holding Corporation | $27.41 | change +3.9%, mktcap ~$6.32B, close $27.41, vol 2.68M | hugging 8EMA, above 200SMA ($25.41) | notion-live | OK |
| QCOM | QUALCOMM Incorporated | $183.81 | change +3.9%, mktcap ~$193.04B, close $183.81, vol 6.91M | 4 recovered-dips (within range), above 200SMA ($168.11) | notion-live | OK |
| ALAB | Astera Labs, Inc. | $295.05 | change +3.7%, mktcap ~$51.19B, close $295.05, vol 1.24M | hugging 8EMA, above 200SMA ($228.17) | notion-live | OK |
| UAL | United Airlines Holdings, Inc. | $110.42 | change +3.7%, mktcap ~$35.84B, close $110.42, vol 3.90M | hugging 8EMA, above 200SMA ($108.62) | notion-live | OK |
| VNO | Vornado Realty Trust | $35.63 | change +3.7%, mktcap ~$6.65B, close $35.63, vol 0.73M | hugging 8EMA, above 200SMA ($33.44) | notion-live | OK |
| VSXY | Victorias Secret & Co. | $76.05 | change +3.6%, mktcap ~$6.07B, close $76.05, vol 0.76M | 3 recovered-dips (within range), above 200SMA ($63.71) | notion-live | OK |
| P | Everpure, Inc. | $97.47 | change +3.6%, mktcap ~$32.48B, close $97.47, vol 0.93M | hugging 8EMA, above 200SMA ($75.73) | notion-live | OK |
| DFTX | Definium Therapeutics, Inc. | $39.02 | change +3.4%, mktcap ~$5.24B, close $39.02, vol 0.63M | hugging 8EMA, above 200SMA ($25.47) | notion-live | OK |
| OPK | Opko Health, Inc. | $1.54 | change +3.4%, mktcap ~$1.15B, close $1.54, vol 2.67M | hugging 8EMA, above 200SMA ($1.30) | notion-live | OK |
| GEV | GE Vernova Inc. | $953.49 | change +3.2%, mktcap ~$253.95B, close $953.49, vol 0.78M | hugging 8EMA, above 200SMA ($893.80) | notion-live | OK |
| OC | Owens Corning Inc | $131.49 | change +3.1%, mktcap ~$10.39B, close $131.49, vol 0.56M | hugging 8EMA, above 200SMA ($125.40) | notion-live | OK |
| CARG | CarGurus, Inc. | $34.34 | change +3.1%, mktcap ~$3.06B, close $34.34, vol 0.57M | hugging 8EMA, above 200SMA ($33.95) | notion-live | OK |
| TER | Teradyne, Inc. | $381.62 | change +3.1%, mktcap ~$59.66B, close $381.62, vol 1.16M | 4 recovered-dips (within range), above 200SMA ($320.59) | notion-live | OK |
| ILMN | Illumina, Inc. | $207.32 | change +3.0%, mktcap ~$31.31B, close $207.32, vol 1.20M | hugging 8EMA, above 200SMA ($153.57) | notion-live | OK |
| HOG | Harley-Davidson, Inc. | $27.77 | change +3.0%, mktcap ~$2.89B, close $27.77, vol 0.60M | hugging 8EMA, above 200SMA ($23.10) | notion-live | OK |

27 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 27 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-10 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| NTSK | Netskope, Inc. | $15.05 | change +4.1%, mktcap ~$6.15B, close $15.05, vol 3.10M | 4 recovered-dips (within range), above 200SMA ($12.97) | notion-live | OK |
| MDB | MongoDB, Inc. | $371.95 | change +3.8%, mktcap ~$29.96B, close $371.95, vol 1.06M | 4 recovered-dips (within range), above 200SMA ($342.86) | notion-live | OK |
| F | Ford Motor Company | $13.90 | change +3.3%, mktcap ~$55.43B, close $13.90, vol 28.87M | hugging 8EMA, above 200SMA ($13.52) | notion-live | OK |
| RDW | Redwire Corporation | $11.05 | change +3.3%, mktcap ~$2.76B, close $11.05, vol 9.49M | hugging 8EMA, above 200SMA ($10.67) | notion-live | OK |
| ICLR | ICON plc | $164.69 | change +3.2%, mktcap ~$12.71B, close $164.69, vol 0.58M | hugging 8EMA, above 200SMA ($147.43) | notion-live | OK |

5 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 5 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-09 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| NET | Cloudflare, Inc. | $316.73 | change +11.4%, mktcap ~$112.78B, close $316.73, vol 3.26M | 4 recovered-dips (within range), above 200SMA ($223.38) | notion-live | OK |
| META | Meta Platforms, Inc. | $653.25 | change +6.5%, mktcap ~$1664.16B, close $653.25, vol 26.18M | 4 recovered-dips (within range), above 200SMA ($622.69) | notion-live | OK |
| SRPT | Sarepta Therapeutics, Inc. | $22.20 | change +6.0%, mktcap ~$2.34B, close $22.20, vol 3.01M | 4 recovered-dips (within range), above 200SMA ($19.23) | notion-live | OK |
| BHVN | Biohaven Ltd. | $15.40 | change +4.6%, mktcap ~$2.33B, close $15.40, vol 1.59M | hugging 8EMA, above 200SMA ($11.77) | notion-live | OK |
| ACHC | Acadia Healthcare Company, Inc. | $28.72 | change +4.4%, mktcap ~$2.67B, close $28.72, vol 0.78M | hugging 8EMA, above 200SMA ($23.08) | notion-live | OK |
| IAG | Iamgold Corporation | $20.73 | change +3.1%, mktcap ~$11.83B, close $20.73, vol 1.72M | hugging 8EMA, above 200SMA ($17.89) | notion-live | OK |

6 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 6 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-08 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| AXTI | AXT Inc | $69.64 | change +13.0%, mktcap ~$4.57B, close $69.64, vol 10.33M | 3 recovered-dips (within range), above 200SMA ($54.92) | notion-live | OK |
| CRWV | CoreWeave, Inc. | $100.80 | change +12.8%, mktcap ~$55.59B, close $100.80, vol 41.82M | 4 recovered-dips (within range), above 200SMA ($91.60) | notion-live | OK |
| GLW | Corning Incorporated | $167.94 | change +8.8%, mktcap ~$144.66B, close $167.94, vol 8.91M | 4 recovered-dips (within range), above 200SMA ($144.22) | notion-live | OK |
| AAOI | Applied Optoelectronics, Inc. | $113.61 | change +7.7%, mktcap ~$9.65B, close $113.61, vol 9.24M | 4 recovered-dips (within range), above 200SMA ($101.97) | notion-live | OK |
| RDW | Redwire Corporation | $11.14 | change +5.8%, mktcap ~$2.79B, close $11.14, vol 9.45M | 4 recovered-dips (within range), above 200SMA ($10.61) | notion-live | OK |
| HRI | Herc Holdings Inc. | $147.58 | change +4.7%, mktcap ~$4.93B, close $147.58, vol 0.80M | hugging 8EMA, above 200SMA ($141.51) | notion-live | OK |
| FSLY | Fastly, Inc. | $21.55 | change +4.7%, mktcap ~$3.43B, close $21.55, vol 4.02M | hugging 8EMA, above 200SMA ($18.70) | notion-live | OK |
| TTMI | TTM Technologies, Inc. | $131.36 | change +4.6%, mktcap ~$13.84B, close $131.36, vol 1.14M | 4 recovered-dips (within range), above 200SMA ($120.49) | notion-live | OK |
| CRGY | Crescent Energy Company | $14.39 | change +4.5%, mktcap ~$4.75B, close $14.39, vol 4.02M | 4 recovered-dips (within range), above 200SMA ($11.10) | notion-live | OK |
| TER | Teradyne, Inc. | $372.82 | change +4.4%, mktcap ~$58.29B, close $372.82, vol 1.58M | 4 recovered-dips (within range), above 200SMA ($317.33) | notion-live | OK |
| TH | Target Hospitality Corp. | $20.38 | change +4.4%, mktcap ~$2.03B, close $20.38, vol 1.02M | 2 recovered-dips (within range), above 200SMA ($12.89) | notion-live | OK |
| PBR | Petroleo Brasileiro S.A. Petrobras | $20.97 | change +4.2%, mktcap ~$124.08B, close $20.97, vol 22.11M | 4 recovered-dips (within range), above 200SMA ($17.11) | notion-live | OK |
| VOYG | Voyager Technologies, Inc. | $35.28 | change +4.0%, mktcap ~$2.15B, close $35.28, vol 0.80M | 4 recovered-dips (within range), above 200SMA ($30.95) | notion-live | OK |
| ATRC | AtriCure, Inc. | $53.44 | change +3.7%, mktcap ~$2.72B, close $53.44, vol 1.15M | 4 recovered-dips (within range), above 200SMA ($34.63) | notion-live | OK |
| BG | Bunge Limited | $122.91 | change +3.5%, mktcap ~$23.61B, close $122.91, vol 1.41M | 4 recovered-dips (within range), above 200SMA ($114.33) | notion-live | OK |
| TXG | 10x Genomics, Inc. | $64.83 | change +3.5%, mktcap ~$8.45B, close $64.83, vol 1.73M | 4 recovered-dips (within range), above 200SMA ($29.19) | notion-live | OK |
| VIK | Viking Holdings Ltd | $88.75 | change +3.4%, mktcap ~$39.60B, close $88.75, vol 2.36M | hugging 8EMA, above 200SMA ($82.55) | notion-live | OK |
| DINO | HF Sinclair Corporation | $108.87 | change +3.3%, mktcap ~$19.36B, close $108.87, vol 1.04M | 3 recovered-dips (within range), above 200SMA ($65.90) | notion-live | OK |
| KOS | Kosmos Energy Ltd. | $2.87 | change +3.2%, mktcap ~$1.71B, close $2.87, vol 5.53M | hugging 8EMA, above 200SMA ($2.20) | notion-live | OK |
| EQNR | Equinor ASA | $43.43 | change +3.2%, mktcap ~$102.56B, close $43.43, vol 2.78M | hugging 8EMA, above 200SMA ($33.54) | notion-live | OK |
| SN | SharkNinja, Inc. | $178.89 | change +3.2%, mktcap ~$25.20B, close $178.89, vol 1.22M | hugging 8EMA, above 200SMA ($128.63) | notion-live | OK |
| VSXY | Victorias Secret & Co. | $77.95 | change +3.2%, mktcap ~$6.22B, close $77.95, vol 0.98M | 3 recovered-dips (within range), above 200SMA ($63.10) | notion-live | OK |
| SRRK | Scholar Rock Holding Corporation | $56.99 | change +3.0%, mktcap ~$6.94B, close $56.99, vol 0.61M | hugging 8EMA, above 200SMA ($47.81) | notion-live | OK |

23 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 23 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-07 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| AXTI | AXT Inc | $61.64 | change +9.7%, mktcap ~$4.04B, close $61.64, vol 10.90M | hugging 8EMA, above 200SMA ($54.62) | notion-live | OK |
| TTMI | TTM Technologies, Inc. | $125.60 | change +8.8%, mktcap ~$13.23B, close $125.60, vol 2.32M | 4 recovered-dips (within range), above 200SMA ($120.15) | notion-live | OK |
| VAC | Marriott Vacations Worldwide Corporation | $106.62 | change +7.5%, mktcap ~$3.67B, close $106.62, vol 0.74M | hugging 8EMA, above 200SMA ($76.76) | notion-live | OK |
| FORM | FormFactor, Inc. | $103.90 | change +7.4%, mktcap ~$8.12B, close $103.90, vol 1.10M | hugging 8EMA, above 200SMA ($102.04) | notion-live | OK |
| KLAC | KLA Corporation | $185.60 | change +7.3%, mktcap ~$242.50B, close $185.60, vol 12.73M | 4 recovered-dips (within range), above 200SMA ($171.52) | notion-live | OK |
| ACMR | ACM Research, Inc. | $74.44 | change +7.2%, mktcap ~$5.18B, close $74.44, vol 0.64M | hugging 8EMA, above 200SMA ($63.25) | notion-live | OK |
| COHR | Coherent Corp. | $281.86 | change +6.6%, mktcap ~$55.20B, close $281.86, vol 5.04M | hugging 8EMA, above 200SMA ($276.44) | notion-live | OK |
| ONTO | Onto Innovation Inc. | $268.01 | change +6.2%, mktcap ~$13.15B, close $268.01, vol 0.72M | hugging 8EMA, above 200SMA ($241.04) | notion-live | OK |
| VSTS | Vestis Corporation | $13.26 | change +5.7%, mktcap ~$1.75B, close $13.26, vol 1.27M | 3 recovered-dips (within range), above 200SMA ($10.00) | notion-live | OK |
| TER | Teradyne, Inc. | $357.03 | change +5.4%, mktcap ~$55.82B, close $357.03, vol 2.25M | hugging 8EMA, above 200SMA ($316.29) | notion-live | OK |
| TH | Target Hospitality Corp. | $19.52 | change +5.3%, mktcap ~$1.94B, close $19.52, vol 1.43M | 2 recovered-dips (within range), above 200SMA ($12.82) | notion-live | OK |
| AAOI | Applied Optoelectronics, Inc. | $105.53 | change +5.1%, mktcap ~$8.96B, close $105.53, vol 6.84M | 4 recovered-dips (within range), above 200SMA ($101.51) | notion-live | OK |
| FIVE | Five Below, Inc. | $252.20 | change +5.1%, mktcap ~$13.88B, close $252.20, vol 1.91M | 3 recovered-dips (within range), above 200SMA ($208.35) | notion-live | OK |
| TREX | Trex Company, Inc. | $45.63 | change +4.4%, mktcap ~$4.65B, close $45.63, vol 0.96M | hugging 8EMA, above 200SMA ($41.13) | notion-live | OK |
| AMAT | Applied Materials, Inc. | $454.71 | change +4.3%, mktcap ~$360.86B, close $454.71, vol 6.02M | hugging 8EMA, above 200SMA ($407.06) | notion-live | OK |
| ACVA | ACV Auctions Inc. | $6.98 | change +4.2%, mktcap ~$1.19B, close $6.98, vol 2.67M | hugging 8EMA, above 200SMA ($6.67) | notion-live | OK |
| ASML | ASML Holding N.V. - New York Registry Shares | $1714.88 | change +4.2%, mktcap ~$650.95B, close $1714.88, vol 1.29M | hugging 8EMA, above 200SMA ($1480.53) | notion-live | OK |
| LITE | Lumentum Holdings Inc. | $881.25 | change +4.0%, mktcap ~$79.05B, close $881.25, vol 3.56M | hugging 8EMA, above 200SMA ($685.22) | notion-live | OK |
| ARHS | Arhaus, Inc. | $8.73 | change +3.9%, mktcap ~$1.24B, close $8.73, vol 0.86M | hugging 8EMA, above 200SMA ($8.53) | notion-live | OK |
| VOYG | Voyager Technologies, Inc. | $33.94 | change +3.9%, mktcap ~$2.07B, close $33.94, vol 0.99M | hugging 8EMA, above 200SMA ($30.87) | notion-live | OK |
| ULCC | Frontier Group Holdings, Inc. | $5.96 | change +3.8%, mktcap ~$1.37B, close $5.96, vol 1.95M | 3 recovered-dips (within range), above 200SMA ($5.25) | notion-live | OK |
| SKM | SK Telecom Co., Ltd. | $38.70 | change +3.8%, mktcap ~$14.43B, close $38.70, vol 2.70M | hugging 8EMA, above 200SMA ($31.11) | notion-live | OK |
| KLIC | Kulicke and Soffa Industries, Inc. | $81.61 | change +3.5%, mktcap ~$4.27B, close $81.61, vol 0.64M | hugging 8EMA, above 200SMA ($79.02) | notion-live | OK |
| MTSI | MACOM Technology Solutions Holdings, Inc. | $268.95 | change +3.5%, mktcap ~$20.54B, close $268.95, vol 1.01M | hugging 8EMA, above 200SMA ($263.58) | notion-live | OK |
| TAL | TAL Education Group | $12.40 | change +3.4%, mktcap ~$5.97B, close $12.40, vol 6.89M | 4 recovered-dips (within range), above 200SMA ($11.00) | notion-live | OK |
| RXO | RXO, Inc. | $20.66 | change +3.3%, mktcap ~$3.41B, close $20.66, vol 1.59M | hugging 8EMA, above 200SMA ($18.92) | notion-live | OK |
| SHOO | Steven Madden, Ltd. | $43.68 | change +3.3%, mktcap ~$3.20B, close $43.68, vol 1.11M | hugging 8EMA, above 200SMA ($41.14) | notion-live | OK |
| NRIX | Nurix Therapeutics, Inc. | $26.14 | change +3.2%, mktcap ~$2.71B, close $26.14, vol 1.23M | hugging 8EMA, above 200SMA ($18.91) | notion-live | OK |
| LPG | Dorian LPG Ltd. | $55.20 | change +3.0%, mktcap ~$2.36B, close $55.20, vol 0.62M | 4 recovered-dips (within range), above 200SMA ($36.21) | notion-live | OK |
| GTES | Gates Industrial Corporation Ltd. | $25.95 | change +3.0%, mktcap ~$6.57B, close $25.95, vol 1.27M | hugging 8EMA, above 200SMA ($24.97) | notion-live | OK |

30 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 30 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-04 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| AEHR | Aehr Test Systems | $84.73 | change +11.1%, mktcap ~$2.76B, close $84.73, vol 3.54M | hugging 8EMA, above 200SMA ($62.73) | notion-live | OK |
| AXTI | AXT Inc | $60.95 | change +8.5%, mktcap ~$4.00B, close $60.95, vol 8.21M | hugging 8EMA, above 200SMA ($54.62) | notion-live | OK |
| TTMI | TTM Technologies, Inc. | $124.02 | change +7.5%, mktcap ~$13.07B, close $124.02, vol 1.44M | 4 recovered-dips (within range), above 200SMA ($120.15) | notion-live | OK |
| KLAC | KLA Corporation | $185.41 | change +7.2%, mktcap ~$242.25B, close $185.41, vol 7.53M | 4 recovered-dips (within range), above 200SMA ($171.51) | notion-live | OK |
| MRVL | Marvell Technology, Inc. | $221.80 | change +6.2%, mktcap ~$194.50B, close $221.80, vol 14.33M | hugging 8EMA, above 200SMA ($151.76) | notion-live | OK |
| FORM | FormFactor, Inc. | $102.52 | change +5.9%, mktcap ~$8.01B, close $102.52, vol 0.52M | hugging 8EMA, above 200SMA ($102.03) | notion-live | OK |
| FIVE | Five Below, Inc. | $253.95 | change +5.8%, mktcap ~$14.04B, close $253.95, vol 1.12M | 3 recovered-dips (within range), above 200SMA ($208.35) | notion-live | OK |
| COHR | Coherent Corp. | $279.76 | change +5.8%, mktcap ~$54.79B, close $279.76, vol 3.78M | hugging 8EMA, above 200SMA ($276.43) | notion-live | OK |
| ACVA | ACV Auctions Inc. | $7.08 | change +5.6%, mktcap ~$1.20B, close $7.08, vol 1.27M | hugging 8EMA, above 200SMA ($6.67) | notion-live | OK |
| TER | Teradyne, Inc. | $356.06 | change +5.2%, mktcap ~$55.67B, close $356.06, vol 1.17M | hugging 8EMA, above 200SMA ($316.28) | notion-live | OK |
| VSTS | Vestis Corporation | $13.15 | change +4.9%, mktcap ~$1.74B, close $13.15, vol 0.56M | 3 recovered-dips (within range), above 200SMA ($10.00) | notion-live | OK |
| STX | Seagate Technology Holdings PLC | $834.90 | change +4.5%, mktcap ~$189.23B, close $834.90, vol 1.77M | hugging 8EMA, above 200SMA ($593.34) | notion-live | OK |
| WDC | Western Digital Corporation | $460.62 | change +4.3%, mktcap ~$166.07B, close $460.62, vol 3.55M | hugging 8EMA, above 200SMA ($372.78) | notion-live | OK |
| AMAT | Applied Materials, Inc. | $453.87 | change +4.1%, mktcap ~$360.19B, close $453.87, vol 3.71M | hugging 8EMA, above 200SMA ($407.05) | notion-live | OK |
| MXL | MaxLinear, Inc | $61.90 | change +4.1%, mktcap ~$5.61B, close $61.90, vol 1.09M | hugging 8EMA, above 200SMA ($47.44) | notion-live | OK |
| TH | Target Hospitality Corp. | $19.29 | change +4.0%, mktcap ~$1.92B, close $19.29, vol 0.71M | 2 recovered-dips (within range), above 200SMA ($12.82) | notion-live | OK |
| AAOI | Applied Optoelectronics, Inc. | $104.40 | change +4.0%, mktcap ~$8.86B, close $104.40, vol 5.16M | 4 recovered-dips (within range), above 200SMA ($101.51) | notion-live | OK |
| LRCX | Lam Research Corporation | $304.19 | change +3.9%, mktcap ~$380.64B, close $304.19, vol 4.61M | hugging 8EMA, above 200SMA ($260.87) | notion-live | OK |
| XPO | XPO, Inc. | $191.56 | change +3.7%, mktcap ~$22.43B, close $191.56, vol 0.69M | hugging 8EMA, above 200SMA ($188.87) | notion-live | OK |
| VOYG | Voyager Technologies, Inc. | $33.87 | change +3.6%, mktcap ~$2.07B, close $33.87, vol 0.54M | hugging 8EMA, above 200SMA ($30.87) | notion-live | OK |
| ASML | ASML Holding N.V. - New York Registry Shares | $1702.79 | change +3.4%, mktcap ~$632.07B, close $1702.79, vol 0.90M | hugging 8EMA, above 200SMA ($1480.47) | notion-live | OK |
| AMD | Advanced Micro Devices, Inc. | $471.77 | change +3.4%, mktcap ~$770.15B, close $471.77, vol 13.44M | hugging 8EMA, above 200SMA ($340.97) | notion-live | OK |
| ULCC | Frontier Group Holdings, Inc. | $5.93 | change +3.3%, mktcap ~$1.37B, close $5.93, vol 1.23M | 3 recovered-dips (within range), above 200SMA ($5.25) | notion-live | OK |
| TAL | TAL Education Group | $12.37 | change +3.1%, mktcap ~$5.77B, close $12.37, vol 2.22M | 4 recovered-dips (within range), above 200SMA ($11.00) | notion-live | OK |
| LITE | Lumentum Holdings Inc. | $873.37 | change +3.1%, mktcap ~$78.34B, close $873.37, vol 2.79M | hugging 8EMA, above 200SMA ($685.19) | notion-live | OK |

25 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 25 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-03 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| APPS | Digital Turbine, Inc. | $10.61 | change +8.5%, mktcap ~$1.28B, close $10.61, vol 1.73M | hugging 8EMA, above 200SMA ($6.37) | notion-live | OK |
| OBIIF | Obic Co. Ltd. | $34.14 | change +7.3%, mktcap ~$14.59B, close $34.14, vol 1.00M | 2 recovered-dips (within range), above 200SMA ($28.44) | notion-live | OK |
| LOTMY | LOTTOMATICA GROUP SPA | $27.94 | change +6.9%, mktcap ~$6.67B, close $27.94, vol 1.05M | hugging 8EMA, above 200SMA ($27.70) | notion-live | OK |
| RBRK | Rubrik, Inc. | $92.59 | change +6.2%, mktcap ~$19.20B, close $92.59, vol 2.10M | hugging 8EMA, above 200SMA ($68.80) | notion-live | OK |
| HMY | Harmony Gold Mining Company Limited | $20.65 | change +6.2%, mktcap ~$12.23B, close $20.65, vol 3.19M | hugging 8EMA, above 200SMA ($18.29) | notion-live | OK |
| RNG | RingCentral, Inc. | $76.86 | change +5.9%, mktcap ~$6.42B, close $76.86, vol 1.07M | 3 recovered-dips (within range), above 200SMA ($39.60) | notion-live | OK |
| SAIL | SailPoint, Inc. | $19.39 | change +5.9%, mktcap ~$10.99B, close $19.39, vol 1.25M | hugging 8EMA, above 200SMA ($16.01) | notion-live | OK |
| AXON | Axon Enterprise, Inc. | $535.66 | change +5.7%, mktcap ~$43.52B, close $535.66, vol 0.51M | 4 recovered-dips (within range), above 200SMA ($505.69) | notion-live | OK |
| GWRE | Guidewire Software, Inc. | $203.40 | change +5.5%, mktcap ~$16.93B, close $203.40, vol 0.98M | 3 recovered-dips (within range), above 200SMA ($157.34) | notion-live | OK |
| P | Everpure, Inc. | $97.20 | change +5.2%, mktcap ~$32.31B, close $97.20, vol 1.39M | hugging 8EMA, above 200SMA ($75.29) | notion-live | OK |
| DOCN | DigitalOcean Holdings, Inc. | $110.22 | change +5.1%, mktcap ~$12.96B, close $110.22, vol 0.98M | hugging 8EMA, above 200SMA ($96.77) | notion-live | OK |
| TEAM | Atlassian Corporation | $195.90 | change +5.1%, mktcap ~$49.59B, close $195.90, vol 1.93M | 2 recovered-dips (within range), above 200SMA ($109.06) | notion-live | OK |
| CRWD | CrowdStrike Holdings, Inc. | $213.65 | change +5.0%, mktcap ~$218.76B, close $213.65, vol 7.83M | hugging 8EMA, above 200SMA ($142.08) | notion-live | OK |
| CBRE | CBRE Group Inc | $149.00 | change +4.9%, mktcap ~$43.15B, close $149.00, vol 0.90M | hugging 8EMA, above 200SMA ($147.19) | notion-live | OK |
| NET | Cloudflare, Inc. | $285.48 | change +4.7%, mktcap ~$101.65B, close $285.48, vol 2.05M | hugging 8EMA, above 200SMA ($221.97) | notion-live | OK |
| AEM | Agnico Eagle Mines Limited | $205.44 | change +4.5%, mktcap ~$104.67B, close $205.44, vol 1.79M | hugging 8EMA, above 200SMA ($186.33) | notion-live | OK |
| NEXA | Nexa Resources S.A. | $13.93 | change +4.4%, mktcap ~$1.84B, close $13.93, vol 0.60M | hugging 8EMA, above 200SMA ($12.15) | notion-live | OK |
| IBKR | Interactive Brokers Group, Inc. | $93.03 | change +4.4%, mktcap ~$158.26B, close $93.03, vol 2.14M | hugging 8EMA, above 200SMA ($78.75) | notion-live | OK |
| NTSK | Netskope, Inc. | $14.35 | change +4.3%, mktcap ~$5.79B, close $14.35, vol 9.63M | hugging 8EMA, above 200SMA ($13.05) | notion-live | OK |
| LSEGY | London Stock Exchange Group plc | $30.08 | change +4.1%, mktcap ~$55.87B, close $30.08, vol 1.39M | hugging 8EMA, above 200SMA ($29.57) | notion-live | OK |
| MGYOY | MOL Magyar Olaj-Es Gazipari RT | $8.15 | change +3.8%, mktcap ~$12.52B, close $8.15, vol 0.65M | hugging 8EMA, above 200SMA ($6.13) | notion-live | OK |
| PYPL | PayPal Holdings, Inc. | $56.74 | change +3.8%, mktcap ~$48.54B, close $56.74, vol 9.83M | hugging 8EMA, above 200SMA ($51.05) | notion-live | OK |
| NAVN | Navan, Inc. | $27.89 | change +3.7%, mktcap ~$7.09B, close $27.89, vol 0.86M | hugging 8EMA, above 200SMA ($17.89) | notion-live | OK |
| ZS | Zscaler, Inc. | $179.01 | change +3.6%, mktcap ~$28.95B, close $179.01, vol 2.90M | hugging 8EMA, above 200SMA ($173.08) | notion-live | OK |
| WDAY | Workday, Inc. | $208.15 | change +3.6%, mktcap ~$50.16B, close $208.15, vol 1.83M | 3 recovered-dips (within range), above 200SMA ($160.33) | notion-live | OK |
| WLY | John Wiley & Sons, Inc. | $52.87 | change +3.6%, mktcap ~$2.69B, close $52.87, vol 0.67M | hugging 8EMA, above 200SMA ($39.93) | notion-live | OK |
| TEM | Tempus AI, Inc. | $64.14 | change +3.5%, mktcap ~$11.57B, close $64.14, vol 3.48M | hugging 8EMA, above 200SMA ($56.42) | notion-live | OK |
| JHX | James Hardie Industries plc. | $29.46 | change +3.5%, mktcap ~$17.11B, close $29.46, vol 2.44M | hugging 8EMA, above 200SMA ($23.12) | notion-live | OK |
| NIQ | NIQ Global Intelligence plc | $18.98 | change +3.5%, mktcap ~$5.60B, close $18.98, vol 0.67M | hugging 8EMA, above 200SMA ($12.72) | notion-live | OK |
| U | Unity Software Inc. | $42.15 | change +3.4%, mktcap ~$18.55B, close $42.15, vol 6.90M | hugging 8EMA, above 200SMA ($32.03) | notion-live | OK |
| AMT | American Tower Corporation (REIT) | $178.78 | change +3.4%, mktcap ~$83.30B, close $178.78, vol 0.91M | hugging 8EMA, above 200SMA ($177.67) | notion-live | OK |
| SAP | SAP SE | $216.77 | change +3.4%, mktcap ~$245.48B, close $216.77, vol 1.58M | hugging 8EMA, above 200SMA ($196.56) | notion-live | OK |
| WT | WisdomTree, Inc. | $24.52 | change +3.3%, mktcap ~$3.72B, close $24.52, vol 1.61M | 4 recovered-dips (within range), above 200SMA ($16.90) | notion-live | OK |
| ARM | Arm Holdings plc | $242.47 | change +3.2%, mktcap ~$250.83B, close $242.47, vol 2.39M | hugging 8EMA, above 200SMA ($201.21) | notion-live | OK |
| W | Wayfair Inc. | $97.42 | change +3.0%, mktcap ~$13.34B, close $97.42, vol 1.22M | hugging 8EMA, above 200SMA ($88.17) | notion-live | OK |
| KKR | KKR & Co. Inc. | $109.66 | change +3.0%, mktcap ~$98.43B, close $109.66, vol 2.28M | hugging 8EMA, above 200SMA ($105.71) | notion-live | OK |
| OBICY | Obic Co. Ltd. | $16.30 | change +3.0%, mktcap ~$13.25B, close $16.30, vol 7.79M | 4 recovered-dips (within range), above 100SMA ($13.30) | notion-live | OK |
| GENI | Genius Sports Limited | $7.64 | change +3.0%, mktcap ~$2.12B, close $7.64, vol 1.74M | hugging 8EMA, above 200SMA ($7.04) | notion-live | OK |

38 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 38 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-02 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| SRPT | Sarepta Therapeutics, Inc. | $23.00 | change +7.8%, mktcap ~$2.43B, close $23.00, vol 2.68M | 4 recovered-dips (within range), above 200SMA ($19.12) | notion-live | OK |
| SVM | Silvercorp Metals Inc. | $12.70 | change +6.7%, mktcap ~$2.81B, close $12.70, vol 1.38M | hugging 8EMA, above 200SMA ($10.75) | notion-live | OK |
| GGB | Gerdau S.A. | $5.00 | change +6.5%, mktcap ~$8.45B, close $5.00, vol 7.29M | 3 recovered-dips (within range), above 200SMA ($4.20) | notion-live | OK |
| VSAT | ViaSat, Inc. | $70.27 | change +6.0%, mktcap ~$9.68B, close $70.27, vol 1.06M | hugging 8EMA, above 200SMA ($56.66) | notion-live | OK |
| AUR | Aurora Innovation, Inc. | $5.78 | change +5.9%, mktcap ~$11.58B, close $5.78, vol 17.47M | hugging 8EMA, above 200SMA ($5.32) | notion-live | OK |
| XYZ | Block, Inc. | $82.25 | change +5.6%, mktcap ~$49.41B, close $82.25, vol 3.26M | hugging 8EMA, above 200SMA ($68.45) | notion-live | OK |
| ATRC | AtriCure, Inc. | $51.66 | change +5.6%, mktcap ~$2.63B, close $51.66, vol 0.70M | 4 recovered-dips (within range), above 200SMA ($34.25) | notion-live | OK |
| AFRM | Affirm Holdings, Inc. | $73.78 | change +5.5%, mktcap ~$24.89B, close $73.78, vol 4.09M | hugging 8EMA, above 200SMA ($66.47) | notion-live | OK |
| AG | First Majestic Silver Corp. | $20.91 | change +5.3%, mktcap ~$10.30B, close $20.91, vol 6.60M | hugging 8EMA, above 200SMA ($19.61) | notion-live | OK |
| GENI | Genius Sports Limited | $7.55 | change +5.2%, mktcap ~$2.10B, close $7.55, vol 2.89M | hugging 8EMA, above 200SMA ($7.06) | notion-live | OK |
| VSH | Vishay Intertechnology, Inc. | $31.05 | change +4.8%, mktcap ~$4.76B, close $31.05, vol 1.53M | hugging 8EMA, above 200SMA ($28.59) | notion-live | OK |
| PENN | PENN Entertainment, Inc. | $17.18 | change +4.8%, mktcap ~$2.30B, close $17.18, vol 1.13M | 4 recovered-dips (within range), above 200SMA ($16.50) | notion-live | OK |
| SSRM | SSR Mining Inc. | $37.40 | change +4.4%, mktcap ~$7.63B, close $37.40, vol 1.25M | hugging 8EMA, above 200SMA ($27.87) | notion-live | OK |
| IAG | Iamgold Corporation | $20.14 | change +4.4%, mktcap ~$11.50B, close $20.14, vol 2.79M | hugging 8EMA, above 200SMA ($17.72) | notion-live | OK |
| LTH | Life Time Group Holdings, Inc. | $43.62 | change +4.3%, mktcap ~$9.75B, close $43.62, vol 1.19M | hugging 8EMA, above 200SMA ($32.15) | notion-live | OK |
| NVO | Novo Nordisk A/S | $46.94 | change +4.0%, mktcap ~$200.91B, close $46.94, vol 7.36M | hugging 8EMA, above 200SMA ($46.38) | notion-live | OK |
| FSM | Fortuna Mining Corp. | $12.21 | change +3.9%, mktcap ~$3.61B, close $12.21, vol 3.56M | hugging 8EMA, above 200SMA ($10.01) | notion-live | OK |
| PGY | Pagaya Technologies Ltd. | $21.75 | change +3.8%, mktcap ~$1.81B, close $21.75, vol 0.81M | hugging 8EMA, above 200SMA ($17.32) | notion-live | OK |
| PAY | Paymentus Holdings, Inc. | $36.46 | change +3.8%, mktcap ~$4.59B, close $36.46, vol 1.37M | 4 recovered-dips (within range), above 200SMA ($28.71) | notion-live | OK |
| RUM | RUM Group Inc. | $8.85 | change +3.7%, mktcap ~$4.39B, close $8.85, vol 1.81M | hugging 8EMA, above 200SMA ($6.58) | notion-live | OK |
| FLYW | Flywire Corporation - Voting | $18.85 | change +3.7%, mktcap ~$2.29B, close $18.85, vol 0.88M | hugging 8EMA, above 200SMA ($14.67) | notion-live | OK |
| PRCH | Porch Group, Inc. | $17.98 | change +3.6%, mktcap ~$2.04B, close $17.98, vol 0.73M | 4 recovered-dips (within range), above 200SMA ($10.39) | notion-live | OK |
| GLBE | Global-E Online Ltd. | $38.31 | change +3.6%, mktcap ~$6.43B, close $38.31, vol 0.71M | hugging 8EMA, above 200SMA ($35.54) | notion-live | OK |
| BTG | B2Gold Corp | $5.38 | change +3.6%, mktcap ~$7.12B, close $5.38, vol 26.84M | hugging 8EMA, above 200SMA ($4.67) | notion-live | OK |
| SWK | Stanley Black & Decker, Inc. | $97.84 | change +3.5%, mktcap ~$14.78B, close $97.84, vol 0.81M | hugging 8EMA, above 200SMA ($81.49) | notion-live | OK |
| PYPL | PayPal Holdings, Inc. | $54.19 | change +3.4%, mktcap ~$46.36B, close $54.19, vol 6.57M | 3 recovered-dips (within range), above 200SMA ($51.08) | notion-live | OK |
| ARIS | Aris Mining Corporation | $19.49 | change +3.3%, mktcap ~$4.02B, close $19.49, vol 1.08M | 4 recovered-dips (within range), above 200SMA ($17.31) | notion-live | OK |
| ILMN | Illumina, Inc. | $213.89 | change +3.3%, mktcap ~$32.30B, close $213.89, vol 1.00M | hugging 8EMA, above 200SMA ($150.40) | notion-live | OK |
| CVNA | Carvana Co. | $74.52 | change +3.2%, mktcap ~$82.01B, close $74.52, vol 4.22M | hugging 8EMA, above 200SMA ($72.88) | notion-live | OK |

29 tickers caught. 3 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 29 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-09-01 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| MRNA | Moderna, Inc. | $149.49 | change +6.5%, mktcap ~$59.68B, close $149.49, vol 16.83M | 4 recovered-dips (within range), above 200SMA ($52.96) | notion-live | OK |
| TAL | TAL Education Group | $12.28 | change +4.6%, mktcap ~$5.65B, close $12.28, vol 1.98M | 4 recovered-dips (within range), above 200SMA ($10.98) | notion-live | OK |
| BHVN | Biohaven Ltd. | $15.92 | change +4.3%, mktcap ~$2.40B, close $15.92, vol 1.49M | 4 recovered-dips (within range), above 200SMA ($11.56) | notion-live | OK |
| JAN | Janus Living, Inc. | $30.90 | change +3.9%, mktcap ~$9.51B, close $30.90, vol 1.54M | hugging 8EMA, above 100SMA ($27.90) | notion-live | OK |
| TDW | Tidewater Inc. | $96.64 | change +3.8%, mktcap ~$4.81B, close $96.64, vol 0.52M | 4 recovered-dips (within range), above 200SMA ($72.63) | notion-live | OK |
| DLTR | Dollar Tree, Inc. | $131.03 | change +3.5%, mktcap ~$24.59B, close $131.03, vol 0.94M | hugging 8EMA, above 200SMA ($116.58) | notion-live | OK |
| CNQ | Canadian Natural Resources Limited | $51.77 | change +3.4%, mktcap ~$106.72B, close $51.77, vol 3.27M | 4 recovered-dips (within range), above 200SMA ($42.17) | notion-live | OK |
| CLOV | Clover Health Investments, Corp. | $4.29 | change +3.3%, mktcap ~$2.28B, close $4.29, vol 2.44M | hugging 8EMA, above 200SMA ($3.10) | notion-live | OK |
| WIX | Wix.com Ltd. | $91.05 | change +3.2%, mktcap ~$3.81B, close $91.05, vol 1.60M | 4 recovered-dips (within range), above 200SMA ($76.13) | notion-live | OK |
| BHC | Bausch Health Companies Inc. | $6.57 | change +3.1%, mktcap ~$2.46B, close $6.57, vol 1.71M | hugging 8EMA, above 200SMA ($5.85) | notion-live | OK |

10 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 10 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-08-31 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| HNGE | Hinge Health, Inc. | $92.56 | change +6.0%, mktcap ~$7.47B, close $92.56, vol 2.00M | 4 recovered-dips (within range), above 200SMA ($55.79) | notion-live | OK |
| HTFL | Heartflow, Inc. | $50.39 | change +5.5%, mktcap ~$4.38B, close $50.39, vol 2.59M | 4 recovered-dips (within range), above 200SMA ($29.47) | notion-live | OK |
| FJIKY | Fujikura Ltd. | $17.14 | change +5.3%, mktcap ~$58.51B, close $17.14, vol 0.54M | 4 recovered-dips (within range), above 200SMA ($14.04) | notion-live | OK |
| ALVO | Alvotech | $5.19 | change +4.8%, mktcap ~$2.03B, close $5.19, vol 1.25M | 3 recovered-dips (within range), above 200SMA ($4.15) | notion-live | OK |
| KXIAY | KIOXIA HLDGS CORP | $31.33 | change +4.8%, mktcap ~$163.99B, close $31.33, vol 1.39M | hugging 8EMA, above 200SMA ($23.68) | notion-live | OK |
| XNCR | Xencor, Inc. | $27.27 | change +4.6%, mktcap ~$2.03B, close $27.27, vol 1.81M | hugging 8EMA, above 200SMA ($14.90) | notion-live | OK |
| ZYME | Zymeworks Inc. | $29.41 | change +4.0%, mktcap ~$2.10B, close $29.41, vol 0.72M | 2 recovered-dips (within range), above 200SMA ($24.74) | notion-live | OK |
| ABSI | Absci Corporation | $9.04 | change +3.8%, mktcap ~$1.55B, close $9.04, vol 5.25M | hugging 8EMA, above 200SMA ($5.16) | notion-live | OK |
| FLOC | Flowco Holdings Inc. | $21.94 | change +3.7%, mktcap ~$1.98B, close $21.94, vol 0.77M | hugging 8EMA, above 200SMA ($21.51) | notion-live | OK |
| OMDA | Omada Health, Inc. | $24.55 | change +3.6%, mktcap ~$1.50B, close $24.55, vol 1.40M | 4 recovered-dips (within range), above 200SMA ($16.94) | notion-live | OK |
| AXTI | AXT Inc | $60.61 | change +3.4%, mktcap ~$3.97B, close $60.61, vol 6.36M | 3 recovered-dips (within range), above 200SMA ($53.68) | notion-live | OK |
| ZBIO | Zenas BioPharma, Inc. | $32.32 | change +3.4%, mktcap ~$2.11B, close $32.32, vol 0.53M | hugging 8EMA, above 200SMA ($26.05) | notion-live | OK |
| VEEV | Veeva Systems Inc. | $285.69 | change +3.3%, mktcap ~$46.26B, close $285.69, vol 2.84M | 4 recovered-dips (within range), above 200SMA ($198.82) | notion-live | OK |

13 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 13 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-08-29 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| ESTC | Elastic N.V. | $99.91 | change +19.3%, mktcap ~$10.39B, close $99.91, vol 10.11M | 4 recovered-dips (within range), above 200SMA ($63.75) | notion-live | OK |
| PD | PagerDuty, Inc. | $13.83 | change +9.5%, mktcap ~$1.09B, close $13.83, vol 3.68M | 4 recovered-dips (within range), above 200SMA ($9.66) | notion-live | OK |
| WDAY | Workday, Inc. | $204.72 | change +5.8%, mktcap ~$49.34B, close $204.72, vol 8.67M | hugging 8EMA, above 200SMA ($160.96) | notion-live | OK |
| DAR | Darling Ingredients Inc. | $64.32 | change +4.8%, mktcap ~$10.15B, close $64.32, vol 2.97M | 4 recovered-dips (within range), above 200SMA ($52.58) | notion-live | OK |
| NOW | ServiceNow, Inc. | $144.71 | change +4.5%, mktcap ~$149.63B, close $144.71, vol 29.03M | 4 recovered-dips (within range), above 200SMA ($119.41) | notion-live | OK |
| GFL | GFL Environmental Inc. Subordinate voting shares, no par value | $42.83 | change +4.4%, mktcap ~$15.46B, close $42.83, vol 4.02M | hugging 8EMA, above 200SMA ($41.02) | notion-live | OK |
| CLMT | Calumet, Inc | $47.75 | change +4.3%, mktcap ~$4.20B, close $47.75, vol 1.26M | 4 recovered-dips (within range), above 200SMA ($30.66) | notion-live | OK |
| GO | Grocery Outlet Holding Corp. | $12.17 | change +4.0%, mktcap ~$1.21B, close $12.17, vol 2.99M | hugging 8EMA, above 200SMA ($9.23) | notion-live | OK |
| VSNT | Versant Media Group, Inc. | $41.02 | change +3.9%, mktcap ~$5.69B, close $41.02, vol 1.44M | hugging 8EMA, above 100SMA ($39.03) | notion-live | OK |
| SPOT | Spotify Technology S.A. | $547.51 | change +3.8%, mktcap ~$112.72B, close $547.51, vol 1.39M | hugging 8EMA, above 200SMA ($509.93) | notion-live | OK |
| NPPXF | NTT Inc. | $1.02 | change +3.8%, mktcap ~$86.94B, close $1.02, vol 1.12M | hugging 8EMA, above 200SMA ($0.96) | notion-live | OK |
| UMC | United Microelectronics Corporation (NEW) | $19.79 | change +3.8%, mktcap ~$51.51B, close $19.79, vol 19.85M | hugging 8EMA, above 200SMA ($13.88) | notion-live | OK |
| CHEF | The Chefs' Warehouse, Inc. | $115.00 | change +3.4%, mktcap ~$4.69B, close $115.00, vol 0.88M | hugging 8EMA, above 200SMA ($75.87) | notion-live | OK |
| BEKE | KE Holdings Inc | $18.32 | change +3.3%, mktcap ~$20.64B, close $18.32, vol 14.14M | hugging 8EMA, above 200SMA ($16.76) | notion-live | OK |
| COTY | Coty Inc. | $2.85 | change +3.3%, mktcap ~$2.51B, close $2.85, vol 6.89M | hugging 8EMA, above 200SMA ($2.62) | notion-live | OK |
| SONY | Sony Group Corporation | $24.85 | change +3.2%, mktcap ~$145.98B, close $24.85, vol 4.81M | hugging 8EMA, above 200SMA ($22.92) | notion-live | OK |
| HQY | HealthEquity, Inc. | $96.37 | change +3.2%, mktcap ~$7.97B, close $96.37, vol 2.26M | 4 recovered-dips (within range), above 200SMA ($89.48) | notion-live | OK |
| ADM | Archer-Daniels-Midland Company | $81.54 | change +3.1%, mktcap ~$39.30B, close $81.54, vol 3.61M | hugging 8EMA, above 200SMA ($71.35) | notion-live | OK |
| MMED | MiniMed Group, Inc. | $20.10 | change +3.0%, mktcap ~$5.66B, close $20.10, vol 1.33M | hugging 8EMA, above 100SMA ($15.07) | notion-live | OK |
| HPQ | HP Inc. | $30.52 | change +3.0%, mktcap ~$27.52B, close $30.52, vol 15.85M | hugging 8EMA, above 200SMA ($22.66) | notion-live | OK |

20 tickers caught. 1 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 20 ok, 0 failed, 0 already logged today (skipped as duplicates).


## 2026-08-28 batch

| Ticker | Company | Catch price | Fundamental filters passed | Technical qualification | Config snapshot | Notion sync |
|---|---|---|---|---|---|---|
| VEEV | Veeva Systems Inc. | $282.13 | change +15.2%, mktcap ~$45.83B, close $282.13, vol 6.41M | 4 recovered-dips (within range), above 200SMA ($198.98) | notion-live | OK |
| TH | Target Hospitality Corp. | $18.96 | change +13.0%, mktcap ~$1.89B, close $18.96, vol 2.58M | 3 recovered-dips (within range), above 200SMA ($12.45) | notion-live | OK |
| TENB | Tenable Holdings, Inc. | $37.62 | change +11.8%, mktcap ~$4.14B, close $37.62, vol 8.24M | 4 recovered-dips (within range), above 200SMA ($25.80) | notion-live | OK |
| SRPT | Sarepta Therapeutics, Inc. | $21.59 | change +10.9%, mktcap ~$2.28B, close $21.59, vol 7.92M | 4 recovered-dips (within range), above 200SMA ($19.06) | notion-live | OK |
| BRZE | Braze, Inc. | $34.09 | change +10.6%, mktcap ~$3.84B, close $34.09, vol 3.15M | 2 recovered-dips (within range), above 200SMA ($24.58) | notion-live | OK |
| AMPL | Amplitude, Inc. | $14.28 | change +10.2%, mktcap ~$1.78B, close $14.28, vol 2.08M | 3 recovered-dips (within range), above 200SMA ($8.78) | notion-live | OK |
| TEAM | Atlassian Corporation | $185.62 | change +10.2%, mktcap ~$46.99B, close $185.62, vol 6.07M | 2 recovered-dips (within range), above 200SMA ($108.17) | notion-live | OK |
| UMAC | Unusual Machines, Inc. | $26.30 | change +10.1%, mktcap ~$1.31B, close $26.30, vol 3.07M | hugging 8EMA, above 200SMA ($16.91) | notion-live | OK |
| NOW | ServiceNow, Inc. | $138.43 | change +10.0%, mktcap ~$143.14B, close $138.43, vol 27.82M | 4 recovered-dips (within range), above 200SMA ($119.41) | notion-live | OK |
| PATH | UiPath, Inc. | $18.33 | change +9.4%, mktcap ~$9.50B, close $18.33, vol 72.07M | 2 recovered-dips (within range), above 200SMA ($12.78) | notion-live | OK |
| NTSK | Netskope, Inc. | $15.12 | change +8.6%, mktcap ~$6.11B, close $15.12, vol 7.62M | 3 recovered-dips (within range), above 200SMA ($13.21) | notion-live | OK |
| NCNO | nCino, Inc. | $23.32 | change +8.4%, mktcap ~$2.47B, close $23.32, vol 5.32M | 4 recovered-dips (within range), above 200SMA ($19.20) | notion-live | OK |
| NET | Cloudflare, Inc. | $308.23 | change +8.2%, mktcap ~$109.75B, close $308.23, vol 4.25M | 3 recovered-dips (within range), above 200SMA ($220.35) | notion-live | OK |
| INTA | Intapp, Inc. | $43.70 | change +8.2%, mktcap ~$3.34B, close $43.70, vol 0.72M | 4 recovered-dips (within range), above 200SMA ($30.87) | notion-live | OK |
| FIVN | Five9, Inc. | $34.57 | change +8.0%, mktcap ~$2.58B, close $34.57, vol 1.60M | 4 recovered-dips (within range), above 200SMA ($20.85) | notion-live | OK |
| BTU | Peabody Energy Corporation | $29.44 | change +7.8%, mktcap ~$3.59B, close $29.44, vol 3.14M | 4 recovered-dips (within range), above 200SMA ($28.99) | notion-live | OK |
| ASAN | Asana, Inc. | $10.17 | change +7.7%, mktcap ~$2.34B, close $10.17, vol 5.51M | 4 recovered-dips (within range), above 200SMA ($8.90) | notion-live | OK |
| APPN | Appian Corporation | $41.40 | change +7.7%, mktcap ~$2.97B, close $41.40, vol 0.82M | 3 recovered-dips (within range), above 200SMA ($28.46) | notion-live | OK |
| ZM | Zoom Communications, Inc. | $100.27 | change +6.9%, mktcap ~$29.40B, close $100.27, vol 4.46M | 4 recovered-dips (within range), above 200SMA ($90.02) | notion-live | OK |
| NTNX | Nutanix, Inc. | $69.84 | change +6.8%, mktcap ~$18.88B, close $69.84, vol 8.01M | 3 recovered-dips (within range), above 200SMA ($48.83) | notion-live | OK |
| QLYS | Qualys, Inc. | $188.59 | change +6.7%, mktcap ~$6.52B, close $188.59, vol 0.94M | 3 recovered-dips (within range), above 200SMA ($123.76) | notion-live | OK |
| CXM | Sprinklr, Inc. | $7.94 | change +6.3%, mktcap ~$1.86B, close $7.94, vol 4.89M | 3 recovered-dips (within range), above 200SMA ($6.20) | notion-live | OK |
| TNK | Teekay Tankers Ltd. | $88.20 | change +6.0%, mktcap ~$3.06B, close $88.20, vol 0.71M | hugging 8EMA, above 200SMA ($69.99) | notion-live | OK |
| FSLY | Fastly, Inc. | $24.64 | change +5.8%, mktcap ~$3.93B, close $24.64, vol 4.22M | hugging 8EMA, above 200SMA ($18.35) | notion-live | OK |
| ESTC | Elastic N.V. | $83.74 | change +5.7%, mktcap ~$8.70B, close $83.74, vol 5.25M | 4 recovered-dips (within range), above 200SMA ($63.75) | notion-live | OK |
| TWLO | Twilio Inc. | $241.34 | change +5.6%, mktcap ~$37.06B, close $241.34, vol 2.04M | 4 recovered-dips (within range), above 200SMA ($160.03) | notion-live | OK |
| DHT | DHT Holdings, Inc. | $19.35 | change +5.6%, mktcap ~$3.12B, close $19.35, vol 3.16M | hugging 8EMA, above 200SMA ($16.47) | notion-live | OK |
| APPS | Digital Turbine, Inc. | $11.44 | change +5.5%, mktcap ~$1.38B, close $11.44, vol 3.35M | 4 recovered-dips (within range), above 200SMA ($6.25) | notion-live | OK |
| GGB | Gerdau S.A. | $4.70 | change +5.4%, mktcap ~$8.20B, close $4.70, vol 16.79M | 3 recovered-dips (within range), above 200SMA ($4.18) | notion-live | OK |
| GWRE | Guidewire Software, Inc. | $201.09 | change +5.2%, mktcap ~$16.74B, close $201.09, vol 1.09M | 2 recovered-dips (within range), above 200SMA ($157.80) | notion-live | OK |
| AVGO | Broadcom Inc. | $371.54 | change +4.5%, mktcap ~$1767.63B, close $371.54, vol 21.33M | hugging 8EMA, above 200SMA ($369.33) | notion-live | OK |
| GENI | Genius Sports Limited | $7.96 | change +4.5%, mktcap ~$2.21B, close $7.96, vol 5.75M | hugging 8EMA, above 200SMA ($7.11) | notion-live | OK |
| ATEN | A10 Networks, Inc. | $27.03 | change +4.4%, mktcap ~$1.96B, close $27.03, vol 1.53M | 4 recovered-dips (within range), above 200SMA ($24.58) | notion-live | OK |
| INTC | Intel Corporation | $92.09 | change +4.4%, mktcap ~$483.89B, close $92.09, vol 100.55M | hugging 8EMA, above 200SMA ($72.53) | notion-live | OK |
| TK | Teekay Corporation Ltd. | $12.77 | change +4.2%, mktcap ~$1.12B, close $12.77, vol 0.60M | hugging 8EMA, above 200SMA ($11.33) | notion-live | OK |
| WIX | Wix.com Ltd. | $85.76 | change +4.2%, mktcap ~$3.59B, close $85.76, vol 1.05M | 4 recovered-dips (within range), above 200SMA ($76.56) | notion-live | OK |
| WK | Workiva Inc. | $77.60 | change +4.2%, mktcap ~$4.22B, close $77.60, vol 1.01M | 4 recovered-dips (within range), above 200SMA ($66.00) | notion-live | OK |
| CCC | CCC Intelligent Solutions Holdings Inc. | $7.60 | change +4.1%, mktcap ~$4.48B, close $7.60, vol 9.26M | 4 recovered-dips (within range), above 200SMA ($6.20) | notion-live | OK |
| PCTY | Paylocity Holding Corporation | $158.15 | change +4.0%, mktcap ~$8.39B, close $158.15, vol 0.60M | 4 recovered-dips (within range), above 200SMA ($125.03) | notion-live | OK |
| RNG | RingCentral, Inc. | $68.53 | change +3.7%, mktcap ~$5.72B, close $68.53, vol 1.60M | 3 recovered-dips (within range), above 200SMA ($38.49) | notion-live | OK |
| NAT | Nordic American Tankers Limited | $6.76 | change +3.7%, mktcap ~$1.43B, close $6.76, vol 7.54M | hugging 8EMA, above 200SMA ($5.16) | notion-live | OK |
| VET | Vermilion Energy Inc. | $12.71 | change +3.7%, mktcap ~$1.94B, close $12.71, vol 1.24M | 4 recovered-dips (within range), above 200SMA ($10.71) | notion-live | OK |
| MANH | Manhattan Associates, Inc. | $223.76 | change +3.6%, mktcap ~$13.05B, close $223.76, vol 0.68M | 2 recovered-dips (within range), above 200SMA ($156.85) | notion-live | OK |
| MUR | Murphy Oil Corporation | $35.95 | change +3.6%, mktcap ~$5.15B, close $35.95, vol 1.45M | hugging 8EMA, above 200SMA ($35.18) | notion-live | OK |
| VSH | Vishay Intertechnology, Inc. | $31.74 | change +3.5%, mktcap ~$4.87B, close $31.74, vol 4.42M | hugging 8EMA, above 200SMA ($28.35) | notion-live | OK |
| STNG | Scorpio Tankers Inc. | $77.44 | change +3.5%, mktcap ~$3.88B, close $77.44, vol 0.51M | hugging 8EMA, above 200SMA ($70.61) | notion-live | OK |
| STM | STMicroelectronics N.V. | $51.34 | change +3.4%, mktcap ~$44.02B, close $51.34, vol 8.11M | hugging 8EMA, above 200SMA ($44.49) | notion-live | OK |

47 tickers caught. 0 Stage-1 survivors skipped (insufficient history or fetch error) — see run log. Notion writes: 47 ok, 0 failed, 0 already logged today (skipped as duplicates).


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
