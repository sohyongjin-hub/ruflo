# Earnings Report Factor Guide

Every factor below follows the same structure: **what it is → what to compare it against
→ what different readings mean.** A number without its comparison point is not a
finding — always report the comparison, not just the value.

---

## §0 — Eligibility Gate (screen before you grade)

Run this before spending effort on any factor below. If a ticker fails here, report one
line — "SCREENED OUT: <reason>" — instead of a full table. The rest of the framework
depends on real comparison points existing; forcing it onto a name that has none
produces fabricated-looking precision, not signal.

**Screen out if any of these hold:**
- **Pre-combination SPAC / blank-check shell.** No operating business, no revenue, no
  guidance — "earnings" is just trust-account interest. Steps 2, 3, and 6 are
  structurally undefined. Report deal-completion status instead if relevant, but don't
  run the six-step framework on it.
- **No options market AND no analyst coverage AND market cap under ~$50M.** Without at
  least one of options pricing or analyst estimates, there's no independent market view
  to compare setup/positioning against — the framework's core method (compare to what's
  priced in) has nothing to check against.
- **No confirmed earnings date.** If the Nasdaq calendar and secondary sources disagree
  or neither has a listed date, say so rather than guessing — a screen run against the
  wrong date range is worse than no screen.
- **Sub-$1 penny stock with unreliable/inconsistent filings.** Flag rather than grade —
  P/E, PEG, and margin figures on these are frequently distorted by share-count
  volatility or inconsistent reporting and will misstate the read.

**Borderline cases** (thin but not zero data — e.g. options exist but open interest is
near-zero, or only 1-2 analysts cover the name): proceed, but flag every affected metric
as low-confidence rather than silently treating it as equivalent to a liquid, widely
covered name.

---

## §1 — Expectations & Positioning (what's already priced in)

### YTD / pre-earnings run-up %
- **Compare against:** the sector/index return over the same period; the stock's own
  average annual return historically.
- **Reading:** A stock up 77% YTD against a sector up 20% has ~57 points of "excess
  enthusiasm" that a single quarter needs to justify. Large positive gaps raise the bar
  for the print; gaps near zero or negative mean less is priced in, so disappointment is
  more forgiving and a beat has more room to be rewarded.

### Distance from 52-week high
- **Compare against:** itself, historically, at past earnings dates (was it also near
  highs before past prints, and how did those go?).
- **Reading:** Within 1-2% of the high going into earnings = the market has priced in
  "nothing bad happens." Downside risk on any disappointment is asymmetric because
  nothing bad is in the price. Well off the highs = a beat has more room to be rewarded.
  **Important correction (backed by NFLX Apr 2022 and ZM Aug 2022, both already well off
  their highs going in and both still fell 16-25% on a genuine miss):** being off the
  highs provides **upside asymmetry on a genuine beat only — it does not provide
  downside protection on a genuine miss.** The market punishes real deterioration
  regardless of starting valuation. Never phrase this factor as "a miss has less room to
  punish further" — the evidence doesn't support that half of the claim.

### Options-implied move %
- **Compare against:** the stock's own historical average earnings-day move (not a
  generic benchmark — every stock has a different baseline volatility).
- **Reading:** Implied move roughly in line with historical average = the options market
  sees this as a "normal" print. Implied move well above historical average = something
  unusual (macro event, rumor, sector stress, make-or-break guidance) is being priced in
  beyond routine earnings uncertainty — treat as a signal to dig for what that is.
- **Confidence flag (required):** options and whisper-number data are the only genuinely
  *forward-looking* signals in this framework — everything else (P/E, run-up, streak) is
  descriptive of the past. When this data is actually sourced, mark it **[Sourced]** and
  let it weigh more heavily than descriptive factors. When it can't be found (common for
  small-caps, foreign ADRs, or thin-options names), mark it explicitly **[Unavailable —
  fundamentals-only]** in the output — never silently proceed as if its absence were
  equivalent to a neutral reading. A missing forward-looking signal is a real reduction
  in confidence, not a non-event.

### Put/call ratio shift into the print
- **Compare against:** the stock's own baseline put/call ratio (absolute levels vary
  wildly by name; the *shift* is what matters).
- **Reading:** A move toward more puts right before earnings signals hedging/defensive
  positioning from sophisticated options traders — not necessarily a bearish view on the
  company, but a "protect against a bad outcome" signal. Read this alongside the setup:
  defensive positioning after a huge run-up is a stronger caution flag than defensive
  positioning on a stock that hasn't moved much.

### Short interest % of float
- **Compare against:** the stock's own historical short interest range, and peer average.
- **Reading:** Low (<5%) = little skepticism priced in; a miss has room to fall without
  short-covering support underneath it. High (>15-20%) = either real fundamental
  skepticism (miss confirms the bears, extends the drop) or squeeze fuel (beat forces
  covering, amplifies the pop). Rising into the print = growing skepticism; falling =
  capitulation/short-covering already underway.

### Consecutive beat/miss streak
- **Compare against:** nothing external — this is about how the *market* extrapolates it.
  Treat beat streaks and miss streaks symmetrically: a persistent pattern in either
  direction should be read as **likely to continue absent a specific catalyst that would
  reverse it**, not as automatically bullish (reset expectations) or automatically
  bearish (fatigue). INTC's multi-quarter miss streak in 2022 kept missing — a miss
  streak is not, by itself, a reason to expect the next print breaks the pattern.
- **Reading — but streak length alone is NOT the real gatekeeper.** NVDA's beat streak
  continued through 2023 despite a rich 38.5x P/E, while KEYS's 8-quarter streak ended in
  a "sell the news" drop despite a strong beat and raised guide — both had long streaks
  and strong guides, so streak length didn't differentiate them. **What did: PEG /
  guide-trajectory (§2).** NVDA's guide *accelerated* faster than its multiple expanded
  (low PEG despite a high raw P/E); KEYS's guide raise didn't keep pace with its
  valuation on a growth-adjusted basis. **Always check §2's PEG and forward/trailing P/E
  gap alongside the streak — the streak tells you the bar is high, PEG tells you whether
  the growth trajectory actually clears that bar.**

### Whisper number vs. published consensus
- **Compare against:** the official consensus EPS/revenue estimate — look for Street
  chatter, trader positioning commentary, or whisper-number trackers that diverge from
  the published number, particularly for serial beaters where the "real" bar sits above
  the official one.
- **Reading:** If the whisper number sits meaningfully above official consensus, the
  stock needs to beat the *whisper*, not just the headline estimate, to register as a
  genuine surprise — a headline "beat" against consensus can still sell off if it missed
  the whisper. This is a distinct check from the estimate-revision trend below: revisions
  track how the *official* number has moved over time, whisper number tracks the gap
  between the official number and what the market is *actually* pricing in right now.

### Analyst target revision timing
- **Compare against:** whether targets moved before/alongside the price move, or only
  after it.
- **Reading:** Targets rising ahead of or in step with price = genuine analyst conviction
  building independently. Targets rising only in the days right before earnings, chasing
  a stock that already ran — as seen with TGT, where eight firms raised targets in the
  week before the print — signals the sell-side playing catch-up, which is a weaker,
  more herd-driven signal. It doesn't mean it's wrong, just that it carries less
  independent information content.

### Consensus estimate revision trend into the print
- **Compare against:** the direction of revisions (up/down/flat) over the 30-90 days
  before the print, and how that compares to the stock's own revision-trend history
  around past prints.
- **Reading:** Estimates trending up into the print means the sell-side is already
  seeing improving fundamentals independently of the stock price — a beat against a
  rising bar is a stronger signal of real momentum. Estimates flat or trending down
  means the bar is low, so even an in-line print can read as a "beat," and a genuine
  beat has more surprise value. Watch for divergence from price action specifically:
  price running up while estimates stay flat is a warning that the move is
  sentiment-driven, not fundamentals-driven — the more fragile setup of the two.

**Step 1 synthesis:** if most of the above point toward complacency (near highs, big
run-up, low implied hedging, long beat streak with no signs of slowing, estimates flat
while price ran up), the setup favors a "sell the news" outcome even on a genuinely good
print. If most point toward skepticism (targets chasing price, moderate run-up,
defensive-but-not-extreme options positioning, estimates trending up alongside price), a
**genuine beat** has real room to be rewarded — but skepticism buys upside asymmetry
only, not downside protection on a genuine miss (see the corrected reading under
"Distance from 52-week high" above). Never describe a skeptical setup as making a miss
"less punishing" — describe it only as making a beat more rewarding.

---

## §2 — Valuation Context

### P/E vs. peer average / sector average
- **Compare against:** direct sub-industry peers first (broad "sector" comparisons can
  mask big sub-industry differences — see the us-sector-screen skill's note that
  within-sector spread often exceeds across-sector spread).
- **Reading:** Trading meaningfully above peer average means the market is pricing in
  superior growth or quality that must be continuously re-earned. A 52x vs. 37x "fair"
  multiple gap (as with KEYS pre-earnings) means a stumble anywhere reverts the multiple
  toward peers — that alone can be a 20-30%+ price move with zero change in earnings.

### P/E vs. own historical range
- **Compare against:** the stock's own 3-5 year P/E range (25th/50th/75th percentile if
  available).
- **Reading:** This isolates company-specific stretch from sector-wide stretch. Trading
  at the top of its own 5-year range, even if roughly in line with peers, still means
  less margin of safety than usual for this specific name.

### Forward P/E vs. trailing P/E
- **Compare against:** the stock's own trailing P/E, and the size of the gap relative to
  its own historical forward/trailing spread.
- **Reading:** A forward P/E much lower than trailing means the market has already
  priced in a meaningful earnings ramp — the growth is already "spent" from a valuation
  standpoint, so the print needs to deliver on that already-discounted acceleration, not
  just grow. A forward P/E close to trailing means less growth is baked in yet, leaving
  more room for a genuine acceleration to be rewarded.

### PEG ratio
- **Compare against:** 1.0 as a rough fair-value anchor; peer PEGs for context.
- **Reading:** PEG under 1 = growth priced cheaply relative to the multiple. PEG over 2 =
  paying a lot per point of growth — the growth story needs to *accelerate*, not just
  continue, to justify the price; deceleration from here is punished hard. **This is the
  primary gatekeeper for beat-streak risk (§1)** — a long beat streak with a low,
  growth-justified PEG (the NVDA pattern: guide accelerating faster than the multiple
  expands) is a fundamentally different risk than a long streak with a stretched PEG
  (the KEYS pattern: guide raised, but not enough to justify the growth-adjusted price).
  Always read streak length and PEG together, never streak length alone.

### Price vs. intrinsic/fair value estimate
- **Compare against:** treat any single DCF-style estimate as one input among several,
  not a verdict — these are highly sensitive to growth/discount-rate assumptions.
- **Reading:** A large gap above fair value doesn't mean "sell tomorrow" (growth stocks
  can stay "overvalued" by such models for years), but it does mean thinner margin of
  safety — more vulnerable to any negative surprise, worse reward/risk for a *new*
  position specifically.

### EV/EBITDA vs. peers
- **Compare against:** direct peers, especially when comparing companies with different
  debt loads or buyback activity (which distort P/E).
- **Reading:** If P/E looks reasonable but EV/EBITDA looks stretched, buybacks may be
  flattering the per-share earnings number while the underlying enterprise-level
  valuation tells a pricier story. Always check both, not just P/E.

**Step 2 synthesis:** valuation context is independent of whether the print itself is
good — it tells you the price at which "good" already stops being enough.

---

## §3 — Guidance Quality (post-print)

### Beat size vs. guide-raise size
- **Compare against:** the ratio between the two, and how that ratio compares to the
  company's own past quarters' ratios.
- **Reading:** A large current-quarter beat paired with only a token forward raise
  signals management itself doesn't see the beat as fully repeatable — the market
  listens to what guidance implies about *durability* more than the size of the number
  just reported. A raise that keeps pace with (or exceeds) the beat size is a stronger,
  higher-quality signal.

### One-time vs. recurring items
- **Compare against:** strip these out and recompute a "clean" beat/miss for comparison.
- **Reading:** A beat driven substantially by one-offs (tax benefits, refunds, asset
  sales, FX swings — e.g., TGT's tariff refunds) should be discounted when judging
  whether the *core* business improved. Markets sometimes still reward it if sentiment
  was already skeptical (the "reset" effect), but always separately track how much of
  the headline number was one-time vs. organic.

### Gross / operating margin trend
- **Compare against:** same quarter last year (y/y) and the immediately prior quarter
  (q/q), plus peer margins.
- **Reading:** Revenue beat + margin expansion = high-quality beat (pricing power,
  efficiency gains). Revenue beat + margin compression = lower-quality beat (possible
  discounting, or costs outrunning sales) — often a leading indicator the beat pattern
  won't repeat, even if this quarter's headline number looked fine.

### Segment concentration
- **Compare against:** each segment's share of total revenue/growth this quarter vs.
  prior quarters.
- **Reading:** If most of the beat comes from one segment (e.g., 43% growth in one unit
  driving the whole story, as with KEYS's Communications Solutions Group), the growth
  narrative is fragile — a slowdown in that one end-market unwinds the whole multiple.
  Broad-based growth across segments is structurally more durable and deserves less of a
  "priced for perfection" discount.

### Book-to-bill ratio (hardware/industrial names)
- **Compare against:** 1.0x as the key threshold.
- **Reading:** Above 1.0x = orders arriving faster than shipments, meaning backlog (and
  future revenue) is building — a genuine forward indicator independent of the quarter
  just reported. Below 1.0x = orders lagging shipments, a signal that growth may slow
  even off a strong current print.

### FCF growth vs. EPS growth
- **Compare against:** the growth rate of each over the same trailing period.
- **Reading:** EPS growing meaningfully faster than FCF can signal lower earnings
  quality (non-cash items, working-capital strain, aggressive accounting). FCF growing
  in line with or ahead of EPS is the healthier pattern.

**Step 3 synthesis:** two companies can report the identical headline "beat," and one is
a high-quality signal (broad-based, margin-accretive, guide keeps pace) while the other
is a low-quality one (narrow, margin-diluting, one-off-driven, tepid guide) — the
headline number alone never tells you which.

---

## §4 — Balance Sheet & Capital Return

### Net debt/EBITDA
- **Compare against:** peer average; general risk bands — under 1x conservative, 1-3x
  normal for most industrials, over 4-5x elevated (especially sensitive in a rising-rate
  environment).
- **Reading:** Tells you how self-funded the growth story is vs. reliant on continued
  access to cheap capital — directly relevant to the macro/rate backdrop (see §5).

### Buyback pace vs. FCF
- **Compare against:** % of FCF being returned via buybacks; EPS growth rate vs. net
  income growth rate.
- **Reading:** If EPS is growing noticeably faster than net income, buybacks (falling
  share count) are doing some of the work — always sanity-check the "growth" story
  against net income growth, not just per-share figures.

### Insider buying/selling
- **Compare against:** the same insiders' own historical trading pattern (note: trading
  blackout windows around earnings mean recent activity usually reflects the period just
  before the blackout, not real-time sentiment).
- **Reading:** Consistent selling with zero buying isn't automatically bearish
  (diversification, taxes, scheduled 10b5-1 plans are common reasons) but is a mild
  caution flag *when paired with other stretched signals* from §1-§2 — it tells you the
  people with the most information aren't adding at current prices.

---

## §5 — Macro & Sector Overlay

### Sector multiple vs. its own long-run average
- **Compare against:** the sector index's own 5-10yr average multiple.
- **Reading:** If the whole sector trades rich to its own history, even a stock that
  looks "fairly valued vs. peers" carries sector-wide compression risk — a rising tide
  lifts all boats, a receding one strands all of them together.

### Rate environment
- **Compare against:** where rates were when the stock was last considered "fairly
  priced."
- **Reading:** High-multiple growth names are mechanically longer-duration cash-flow
  streams (more value sits far in the future), making them more sensitive to discount
  rate changes. A hawkish Fed backdrop or rising yields makes any high-multiple stock
  more fragile to disappointment, independent of company-specific news — this connects
  directly to Fed policy/OIS/yield-curve material (see the macro-trading reference).

### Peer read-throughs
- **Compare against:** what peers who already reported this earnings season said about
  demand trends in the same end-market.
- **Reading:** If peers already flagged softening demand, your stock's beat may get
  discounted as "one company executing well in a softening market" rather than
  "the whole sector accelerating" — this changes how durable the market judges the beat
  to be, independent of the numbers themselves.

---

## §6 — Stock-Specific Historical Pattern

### Average and range of past post-earnings moves
- **Compare against:** nothing external — this is the stock's own base rate.
- **Reading:** Sets a realistic expectation for volatility. A historical range of, say,
  -3% to +23% means you should never plan around the average alone — size any position
  around the full distribution, including the downside tail.

### Behavior in past "beat + raise after a big run-up" setups
- **Compare against:** the 3-4 most recent instances of a similar setup for *this specific
  stock*.
- **Reading:** This is the single highest-signal, most underused check. If a stock has a
  documented pattern of selling off on beats after large run-ups, that is a specific,
  repeatable behavior for that name — more predictive for the next print than any
  generic valuation rule. Always check this before entering a position ahead of a
  scheduled report.

---

## §7 — Business Character Assessment (post-print, qualitative — added 2026-08-23)

**Source:** adapted from "The Moat Ledger" (a swing-trader-focused qualitative-analysis
reference), which itself draws on Morningstar's Economic Moat methodology, Porter's Five
Forces, and standard capital-allocation/management-quality analysis. Full attribution at
the end of this section.

**Purpose:** §0-§6 answer "is the business doing well right now and is that priced in."
This section answers a different question: **is this specific price move — and this
print's reaction — one you can trust with real size, or is it riding something that
could reverse for reasons the numbers alone won't show you.** A chart can't distinguish
"temporary panic in a durable business" from "the beginning of the end." This section is
how you tell those apart.

**When to run this:** after a print, when deciding whether to size up beyond a starter
position, hold through a post-print gap, or add to a name you haven't researched
before — not required for every Stage B run, but required before trusting any of this
section's four lenses' output with real position size. Re-run before adding size again
later, not just once — a moat erodes, management changes, industries flip; treat this as
a live read, never a permanent label carried forward untouched from the first pass.

**The four lenses — each requires named evidence, not a vibe:**

### Moat
The structural reason competitors *can't* copy what's working, even when they can see
the profits and want in. Five recognized families (Morningstar's framework): intangible
assets (brand, patents, licenses), switching costs, network effects, cost advantage,
efficient scale.
- **Signals of a real moat:** pricing power holding through inflation; gross margins
  stable or rising for years; market share sticky even when rivals cut price.
- **False moat:** a "loved brand" with commodity margins; growth that only exists
  because of discounting or ad spend; an advantage that's really just a temporary tech
  lead.
- **Test:** would competitors copy this easily if they tried? If yes — no real moat.

### Competitive advantage
If the moat is the structural wall, this is *today's read on how high that wall actually
is* versus the field right now — more tactical and time-bound than a moat; it can erode
over quarters, not just decades. Cost position, differentiation, execution edge.
- **Read it in the numbers:** gross/operating margin vs. direct peers; market share
  trend over 4-8 quarters; R&D/capex productivity (dollars in vs. share gained).
- **Where it misleads:** a current edge (e.g. a hot product cycle) can look identical to
  a moat on a 2-quarter chart. Ask: would this survive a strong new competitor entering
  next year?

### Management
Capital allocation, incentive alignment, and candor — not charisma. A great business run
by undisciplined capital allocators is a worse investment than a good business run well.
- **Good tells:** specific, numbers-based answers on earnings calls; buybacks paused
  when the stock is expensive; insiders buying with their own money after a selloff.
- **Red flags:** constant non-GAAP adjustments that flatter results; serial
  value-destroying acquisitions; executive pay detached from performance; heavy insider
  selling into strength; buybacks at highs funded by new debt right before a guide-down.
- **Source:** last two earnings calls (tone on misses, specificity, any shift in
  guidance language — read two years of transcripts, not one), and Form 4 insider
  transaction filings (SEC EDGAR, publicly searchable per ticker).

### Industry position
Even a great company sinks in a structurally bad industry, and a mediocre one can look
brilliant riding a sector tailwind — which then gets mistaken for company-specific
skill. Porter's Five Forces: supplier power, buyer power, threat of new entrants, threat
of substitutes, rivalry intensity.
- **Key questions:** where is the industry in its cycle (early growth / consolidating /
  mature / structural decline)? Who holds pricing power — the company, its suppliers, or
  its customers? How high are entry barriers? What's the substitute risk?
- **Test:** compare the stock's move to its sector ETF over the same window. Flat
  margins while the whole sector re-rates together means you're mostly holding sector
  beta, not a company-specific edge — that changes how the stock would react to
  sector-wide bad news, regardless of its own execution.

**Confidence discipline (same pattern as the rest of this guide):** report each lens as
one of **Strong / Moderate / Weak / Unconfirmed** with the specific evidence behind it —
never a bare label. "Unconfirmed" means the evidence wasn't found or checked this pass,
not "assume neutral."

**How this modifies the swing-timeframe read** (ties directly into the Confirmation Gate
and Swing-Timing Overlay sections above — this is a modifier on those, not a replacement
for either):

| Combination | Swing-timing implication |
|---|---|
| Strong moat + a genuinely bad print/week | Often a **buyable dip pattern**, not a reason to exit — the structural wall around the profits didn't disappear because of one bad quarter |
| Weak/no moat + a strong print/pop | **Trade the move, don't marry it** — take profits into strength; nothing structural is anchoring the price, so it can give it back just as fast |
| Improving industry position (consolidation, new regulatory barriers) | A genuine multi-month tailwind — can justify a longer hold and larger size than a pure technical setup alone would |
| Management red flag surfacing mid-position (insider-selling clusters, evasive earnings-call answers, a surprise dilutive raise) | Tighten the stop or trim — even if the chart still looks clean, this is the one lens that can override a clean technical setup fastest |

**Common trap to avoid:** running this once and treating it as permanent. Re-check
before every meaningful size-up, not just on the first pass — this section decays faster
than §0-§6's more mechanical checks.

**Suitable starting sources:** Morningstar's Economic Moat methodology; Michael Porter's
"Competitive Strategy" (Five Forces); the company's own 10-K "Competition" and "Risk
Factors" sections plus earnings-call transcripts; SEC EDGAR Form 4 filings for insider
transactions; Warren Buffett's Berkshire Hathaway shareholder letters for a
plain-language treatment of moats and capital allocation.

---

## Using this guide

No single factor above should carry a verdict alone. The value of the full screen is in
the combination: a stretched valuation (§2) paired with complacent positioning (§1) is a
different risk profile than the same valuation paired with skeptical positioning. A
high-quality beat (§3) into a stock that was already priced for perfection (§1+§2) can
still fall, exactly as KEYS did in August 2026 — while a lower-quality, partly one-off
beat (§3) into a skeptically-priced stock can still rally, exactly as TGT did the same
week. The setup and the valuation context determine how the market *reads* the guidance
quality — report all three together, never one in isolation.

## Pre-print Conviction Score (for screening, §0+§1+§2+§5+§6 only, no §3/§4 yet)

Once a ticker clears §0, don't binary-flag it — score it. A binary pass/fail throws away
real information: a name with one offsetting caution signal and three strong factors is
very different from one with no redeeming signal at all, and both would just say
"eliminated" under a binary rule. Score instead, across four dimensions, 0-2 each
(8 total):

1. **Setup skew strength (§1)** — 2 = cleanly skeptical/off-highs with *no* offsetting
   caution signal (no long beat streak, no unusual options/short spike, no stretched
   PEG working against the read). 1 = skeptical but with a real offsetting signal
   present. 0 = complacent/near-highs (the KEYS pattern) with nothing counterbalancing it.
2. **Valuation cushion clarity (§2)** — 2 = genuinely cheap vs. peers/own history on
   multiple metrics (not just one cherry-picked ratio), and the underlying data is
   solid. 1 = some cushion, but only one metric, or data incomplete/unconfirmed on the
   others. 0 = no cushion, or unprofitable with no valuation anchor at all.
3. **Data reliability** — 2 = figures consistent across independent sources, adequate
   analyst coverage (3+ analysts, or a liquid options market). 1 = some inconsistency or
   thin coverage (1-2 analysts). 0 = actively conflicting figures across sources (e.g.
   two sources giving materially different P/E, or disputed profitability).
4. **History/momentum support (§5+§6)** — 2 = no negative precedent in the stock's own
   post-earnings history, and macro/peer read-throughs don't contradict the setup. 1 =
   no data either way (silent, not contradicting). 0 = a documented negative precedent
   exists (e.g. the stock sold off on a similarly-favorable setup last time) or macro
   actively contradicts the setup.

**Tiers** (for grouping in output, not for elimination):
- **Tier 1 (6-8):** strongest, most corroborated cases
- **Tier 2 (4-5):** real case, but with a specific named caution or data gap
- **Tier 3 (0-3):** the price-based asymmetry alone, with little or nothing else
  corroborating it — still worth listing, just clearly the most speculative

Report the full per-dimension breakdown, not just the total — the score is only useful
if the reasoning behind it stays visible. This is a description of which historical
pattern the current setup resembles and how well-corroborated that read is, not a
prediction or a recommendation: plenty of high-scoring setups still miss, and plenty of
low-scoring ones still run. No ticker that clears §0 should be called "eliminated" for
scoring low — a low score is a low-conviction result, worth surfacing, not a screen-out.

**Use this score for Stage A (`/earnings-screen`) triage and ranking only** — it's a
cheap way to rank many names against each other. It is not the final output of a full
Stage B deep dive; see the Conditional Reaction Matrix below for that.

---

## Conditional Reaction Matrix (Stage B — `/earnings-report` final output)

An eleven-case illustrative review spanning 2021-2026 (NFLX, META, TGT x2, ZM, NVDA,
CVNA, INTC, PTON, KEYS) found **zero exceptions** to one pattern: setup (§1+§2) reliably
predicted the *size* of the reaction, but never reliably predicted its *sign* — sign was
dominated every time by print quality (§3/§4), which is unknowable before the print
happens. A single pre-print "lean" therefore claims more than the framework can actually
deliver. Replace it with a matrix that states this honestly.

**Required closing output for every pre-print `/earnings-report` run:**

| If the print turns out to be... | Plausible reaction given this setup | Confidence |
|---|---|---|
| **Clean beat** (beats + guide keeps pace, no margin/comp/guidance catch) | [describe, grounded in §1/§2] | [Sourced/Unavailable — see options flag] |
| **Beat-with-a-catch** (headline beats, but margin compression, comp miss, or soft guide) | [describe] | |
| **Miss** (genuine deterioration, not just conservative guidance) | [describe] | |

Below the matrix, state which scenario the **options-implied move and whisper number**
(when [Sourced]) suggest is more likely — this is the one genuinely forward-looking
input available, so let it break the tie between scenarios when it exists. When
[Unavailable], say so explicitly and do not imply a lean toward any scenario.

**What NOT to do:** do not collapse the matrix back into a single "worth a closer look /
flagged" verdict — that reintroduces the exact overconfidence the eleven-case review
disproved. The Stage A conviction score is allowed to rank/triage; the Stage B matrix is
not allowed to predict a direction.

**Outcome logging (required):** after the print happens and next-day (T+1) price action
is known, append a row to `references/outcome-log.md` — see that file's format. This is
how the eleven-case illustrative review becomes a real, growing dataset instead of
staying anecdotal.

---

## Drift Classification (T+1..T+5, swing-timeframe extension — UNVALIDATED, n<10)

**Status: hypothesis, not a validated rule.** Built from a 2026-08-21 tree-of-thought +
persona simulation on 6 usable cases (BJ, BEKE, NTES, BABA, FUTU, RERE — WALD excluded,
see below). Every output using this section must carry the **[Unvalidated — n<10
cases]** tag until `outcome-log.md` accumulates enough T+2/T+5 entries per class to drop
it. This is a separate, additional output layer — it does not replace or modify the
Conditional Reaction Matrix above, which stays the required T+0 output.

**Purpose:** the Conditional Reaction Matrix predicts the *immediate* (T+0) reaction.
Swing-timeframe positioning (days to a week) needs a second, separate read on whether
that T+0 reaction is likely to **extend, reverse, or repair** over the following days —
this is a distinct mechanism, not a continuation of the same one.

**Step 1 — Volume/data gate (reuses the existing [Sourced]/[Unavailable] flag, §1):**
Before attempting a drift classification, check T+0 volume against the stock's own
average daily volume and check whether options/whisper data was [Sourced] or
[Unavailable] for this name. If volume is materially below average AND no
options/whisper data exists, mark **[Unavailable — drift classification not
attempted]** and stop — don't force a read onto a thin, low-information move. (This is
exactly the case that should have screened out WALD's 2026-08-21 move: no confirmed
earnings print found for that date despite a Stage A screen assuming one, thin volume,
and no options data — see outcome-log.md note on WALD.)

**Step 2 — Classify using the existing print-quality taxonomy (§3), not a new one:**
The one-time-vs-structural and margin-trend distinctions already in §3 are drift
*causes*, not just T+0 causes. Classify the print into one of three drift labels:

| Drift class | What drove T+0 | Expected T+1..T+5 behavior |
|---|---|---|
| **Confirmation** | Broad-based, margin-accretive beat with guide keeping pace (§3) | T+0 direction extends as the market keeps digesting genuine strength |
| **Repair** | Miss/beat driven substantially by one-time items (§3), core business intact | T+0 move partially unwinds as one-off noise gets priced back out and the core read reasserts |
| **Continuation-of-damage** | Structural deterioration — margin compression, capex outrunning revenue, segment concentration risk (§3) | T+0 direction continues or worsens as the market keeps re-rating the structural concern |

**Step 2 examples from the 2026-08-21 dataset** (illustrative, not validated):
NTES's T+0 miss was driven by a one-time equity-investment loss with core games revenue
+9.7% — tentatively **Repair**. BABA's T+0 decline was driven by capex outpacing cloud
revenue growth 4.5:1, a structural concern — tentatively **Continuation-of-damage**.
FUTU's clean broad-based beat — tentatively **Confirmation**.

**Step 3 — Confirmation Gate (technical-divergence and RSI-extremity modifiers;
confidence only, never direction):**

Report an explicit three-state **Confirmation Gate** alongside the drift label — this
directly answers "does the chart agree with the story, and is now a moment where a
reasonable process would wait for more evidence":

| Gate state | Condition | What it means |
|---|---|---|
| **Confirmed** | T+0 MACD/RSI trend agrees with the Step 2 drift label | Technicals and fundamentals point the same direction — the read has two independent supports, not one |
| **Awaiting confirmation** | T+0 MACD histogram or RSI trend **disagrees** with the Step 2 drift label (e.g. BJ's 2026-08-21 print: clean beat, +5.61% T+0, but MACD histogram -0.42) | The fundamental story is intact but momentum hasn't caught up to it yet — this is a pattern where, historically, waiting for the next 1-2 sessions' technical confirmation (or a specific one, once logged) reduces the odds of buying into a stall. Report this as what the pattern shows, not as instruction. |
| **Contradicted** | Technicals actively point the opposite direction from the fundamental read with no plausible reconciling explanation | Treat as a flag to re-examine the fundamental read itself before trusting either signal |

If T+0 RSI is extreme (>70 overbought or <30 oversold — e.g. FUTU at 72.65 after its
T+0 pop), flag **elevated pullback/bounce risk** as a separate tag alongside the gate
state. This dampens expected *magnitude*, never direction — never merge it into the
drift label or gate state itself (echoes the standing "don't collapse into a single
verdict" rule above).

**Required output format when this section is used:**

| Drift class | Confirmation Gate | Confidence | Technical modifier |
|---|---|---|---|
| Confirmation / Repair / Continuation-of-damage / [Unavailable] | Confirmed / Awaiting confirmation / Contradicted | [Sourced/Unavailable basis] | [RSI-extreme flag / none] |

Always prefixed with **[Unvalidated — n<10 cases]** until logged evidence says
otherwise. Log every drift classification and its actual T+2/T+5 outcome to
`outcome-log.md`'s drift columns (see that file) — this is the only way this section
graduates from hypothesis to evidence-backed.

---

## Same-Day Primary-Source Check (T+0 speed — added 2026-08-22, UNVALIDATED)

**Purpose:** the one-time-vs-structural distinction (§3) is usually knowable *the day of
the print*, not the day after. NTES's one-time equity-investment loss and BABA's
capex-vs-cloud-revenue ratio were both disclosed in the earnings release/8-K itself —
the lag in this project's earlier analysis was in when *analyst commentary* about it got
written, not in when the underlying fact became public. A process waiting for secondary
analyst write-ups to appear is a day slower than it needs to be.

**Rule:** immediately after a print, before relying on any secondary commentary, search
for the company's own press release / 8-K / investor-relations filing directly (not news
aggregator summaries) and check it against the §3 checklist (one-time items, margin
trend, segment concentration) yourself. Tag this read **[Primary-source, same-day]**.

**Confidence tiering (do not treat these as equivalent):**
- **[Primary-source, same-day]** — read directly from the company's own release, same
  day as the print. Real, but preliminary — a company's own framing of a one-time item
  can itself be optimistic; this tier is a faster first read, not a final one.
- **[Analyst-confirmed, T+1+]** — corroborated by independent analyst commentary or
  follow-up reporting. Higher confidence, but arrives later.

Report both tiers when available, and explicitly note when only the same-day tier
exists yet — never present a same-day primary-source read with the same confidence as
an analyst-confirmed one. This tiering, not blind speed, is what lets the framework
catch a same-day mispriced reaction (a "genuine miss" sell-off that's actually a
one-time item, or a "clean beat" pop that's actually structural) without overclaiming
certainty it doesn't have yet.

---

## Magnitude Surprise (why a "clean beat" sometimes barely moves — added 2026-08-22)

**Purpose:** the Conditional Reaction Matrix predicts *direction and quality*; it never
explained cases like BEKE's 2026-08-21 print — a genuinely high-quality beat (margin
expansion, EPS +30.1%) that still only rallied +4.47%, well under what a clean beat of
that quality might suggest. This metric names that gap explicitly instead of leaving it
unexplained.

**Formula:** `Magnitude Surprise = actual T+0 % move − options-implied % move` (only
computable when the options-implied move is [Sourced], per §1).

**Reading:**
- **Large positive gap** (actual move well exceeds what was priced in) — the market was
  caught off guard by the strength; e.g. FUTU's +9.68% (T+1, retroactive dataset)
  against a 5.4% implied threshold.
- **Near-zero or negative gap on an objectively strong print** (BEKE-type case) — print
  quality alone didn't explain the muted reaction. Check for a capping factor before
  concluding the market "under-reacted" for no reason: revenue *decline* optics even
  amid margin expansion, a sector/ADR-specific discount (e.g. China-ADR risk premium),
  broader market or sector caution on the print day, or the setup (§1) already having
  priced in most of the good news pre-print. Report which of these applies, don't just
  flag the gap and stop.

This is a description of what happened, not a prediction of what happens next — read it
alongside the Drift Classification above, since a capped-but-genuine beat can still
belong in the "Confirmation" drift class even if T+0 magnitude was underwhelming.

### Tiered fallback (added 2026-08-22, UNVALIDATED)

**Problem this solves:** the formula above only computes when the options-implied move
is [Sourced] — per §1's own confidence flag, that's frequently [Unavailable] (small-caps,
foreign ADRs, thin-options names), which are exactly the names where a magnitude read is
most needed since they get the least analyst/media scrutiny to catch a mispriced
reaction. Rather than silently skipping the metric on those names, fall through a
tiered set of comparison points, in this order:

| Tier | Comparison point | Requires |
|---|---|---|
| **Tier 1 [Sourced, options-implied]** | actual T+0 % move − options-implied % move | Options-implied move is [Sourced] per §1 |
| **Tier 2 [Sourced, historical-SUE]** | actual T+0 % move − this ticker's own average historical % move per unit of earnings surprise, drawn from its prior entries in `outcome-log.md` | ≥3 prior logged prints for this specific ticker |
| **Tier 3 [Sourced, peer-group]** | actual T+0 % move − peer-group average reaction to similarly-sized surprises this same earnings season | ≥5 peer data points with comparable surprise magnitude |
| **[Unavailable — insufficient data, no magnitude gauge computed]** | — | None of the above thresholds met |

Always report which tier produced the number — never present a Tier 2 or Tier 3 read
with the same confidence as a Tier 1 [Sourced, options-implied] one, same tiering
discipline as the Same-Day Primary-Source Check section above. This is what lets the
Magnitude Surprise metric stay usable on exactly the thin-coverage names where it
matters most, instead of going silent whenever options data is missing.

---

## Attribution Gate Extension (does this move actually belong to the print? — added
2026-08-22)

**Purpose:** generalizes the WALD 2026-08-21 lesson (a stock moved during earnings
season on a date the screen assumed was its report date, but no report was found) into
a standing rule, since earnings-season price action is not always earnings-*caused*
price action — thin liquidity, sector-wide moves, activist filings, and unrelated
corporate news (delayed filings, strategic reviews, leadership changes) all cluster
around the same calendar window and get misread as print reactions if not checked.

**Before attributing any move to an earnings print, confirm:**
1. A press release / 8-K for that specific date actually exists (don't assume the
   calendar date the screen pulled is correct — verify it same-day).
2. No concurrent non-earnings catalyst is more plausibly responsible (trading halts,
   activist stakes, M&A rumors, leadership departures, sector-wide macro moves on the
   same day, delisting/compliance news).
3. Volume is consistent with a real, informationally-driven move (thin volume + no
   confirmed press release, as with WALD's 635K, is a strong signal the move isn't
   print-driven at all).

If any of these fail, **do not run print-quality (§3) or drift-classification (above)
analysis on the move** — report what evidence *does* exist (e.g. "delayed earnings
release, strategic review announced") and stop there, same treatment WALD received.

---

## Swing-Timing Overlay (tradeswing perspective — added 2026-08-22, UNVALIDATED)

**Purpose:** every section above answers "is the business doing well" and "will the
reaction persist" from an investor's multi-quarter perspective. A swing trader asks a
narrower question: given the current setup, what would define a legible entry trigger,
invalidation point, target zone, and expected hold-duration for *this* move — not
whether the company is a good long-term holding. This section describes that pattern; it
is not a recommendation to enter, and clearing it does not mean a name is a buy — it's
what a trader would be watching for, framed as a data pattern, same restriction as the
rest of this framework.

**Required output format when swing-timeframe framing is requested:**

| Field | What it describes |
|---|---|
| **Entry trigger (pattern)** | The technical/fundamental condition that would upgrade the Confirmation Gate from "Awaiting confirmation" to "Confirmed" (e.g. MACD histogram crossing positive, price reclaiming a specific prior resistance level) — not "buy now," but "this is the condition the setup is waiting on" |
| **Invalidation level** | The price/technical level at which the drift-classification read (Confirmation / Repair / Continuation-of-damage) would be considered wrong — typically a recent swing low/high or a MACD/RSI reversal back through the level that triggered the current read |
| **Target zone (pattern)** | Where the move would plausibly stall based on the stock's own §6 historical post-earnings range, prior resistance/support, or the magnitude the options-implied move suggested was "priced for" |
| **Expected hold-duration** | Read off the drift-classification horizon itself — Confirmation/Continuation-of-damage patterns typically play out over the T+1..T+5 window this framework already tracks; Repair patterns may take longer as one-time noise gets fully priced out |
| **Overbought/oversold caveat** | Explicit RSI-extreme flag (§ Drift Classification Step 3) — an extreme reading doesn't invalidate the setup, but changes how aggressively a trader would expect to chase the current price vs. wait for a pullback into the setup |

**What NOT to do:** never phrase any field above as an instruction ("buy at X," "sell at
Y") — describe the pattern a swing trader would be watching, and let the reader decide
whether the setup (as described) is worth their own entry. This section is explicitly
**[Unvalidated — n<10 cases]** on the same basis as the Drift Classification section
above, since it's built on the same 6-case dataset.
