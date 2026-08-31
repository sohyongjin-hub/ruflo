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
