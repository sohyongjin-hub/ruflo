# TradingView MCP tool — symbol switching: RESOLVED (was a usage error, not a tool bug)

## Final status: working correctly. No further action needed on the core issue.

This closes out the earlier bug report of the same name. Root cause turned out to be a
CLI usage mistake on the reporting session's part, not a defect in the tool.

## Timeline

1. **First report** (this file's original version): `symbol set "NYSE:BJ"` always
   returned `success: true` but the chart never changed, stuck on `CBOE_DLY:SET`.
   Filed for investigation.
2. **First fix** (separate session, see
   `C:\Users\sohyo\AppData\Local\Temp\claude\C--Claude-ruflo\d433c71e-75ee-4a01-911a-c3671f896677\scratchpad\tradingview-mcp-handoff.md`):
   found `setSymbol()` in `src/core/chart.js` was hardcoding `success: true` instead of
   checking the actual result. Added a readback (`chart.symbol()` after the attempt) and
   a `matched` check, changed `success` to `ready && matched`.
3. **Live re-verification (this session):** re-ran the exact same command,
   `node src/cli/index.js symbol set "NYSE:BJ"` — still showed the chart stuck on
   `CBOE_DLY:SET`, but now with an added wrinkle: `success: true` was reported even
   though `actual_symbol` clearly didn't match. Looked like the fix hadn't fully worked,
   or had a new bug in the `matched` logic.
4. **Actual root cause found:** re-reading `src/cli/commands/chart.js`:
   ```js
   register('symbol', {
     description: 'Get or set the chart symbol',
     handler: async (opts, positionals) => {
       const sym = positionals[0];
       if (sym) return core.setSymbol({ symbol: sym });
       ...
   ```
   The CLI command is `tv symbol <TICKER>` — the ticker is `positionals[0]` directly.
   There is **no `set` subcommand**. Every invocation across both the original bug
   report and this session's re-verification used `symbol set "NYSE:BJ"`, which means
   `positionals[0]` was the literal string `"set"`, not `"NYSE:BJ"` — so the tool was
   being asked to switch the chart to a nonexistent instrument called "set" the entire
   time. That's why it always failed, and why `discover`'s limited `chartApi` method
   list (which was the original report's root-cause hypothesis) was in fact a red
   herring, exactly as the first fix session suspected.
5. **Corrected invocation, verified live:**
   ```bash
   node "C:\Claude\tools\tradingview-mcp\src\cli\index.js" symbol "NYSE:BJ"
   # → {"success": false, "symbol": "NYSE:BJ", "actual_symbol": "BATS:BJ", "chart_ready": false}
   node "C:\Claude\tools\tradingview-mcp\src\cli\index.js" state
   # → {"success": true, "symbol": "BATS:BJ", ...}   ← chart genuinely switched
   ```
   The chart **did** switch correctly to BJ's Wholesale Club. It landed on the `BATS`
   listing rather than `NYSE` (both are legitimate US exchanges quoting the same stock),
   which is why the newly-added `matched` string check reported `false` (`"BATS:BJ"`
   doesn't contain the substring `"NYSE:BJ"`) even though the switch itself worked.

## What's still worth a small polish (not urgent, not blocking)

The `matched` check in `src/core/chart.js`'s `setSymbol()`:
```js
const matched = !!actual && actual.toUpperCase().includes(String(symbol).toUpperCase());
```
is stricter than it needs to be — it requires the *exact* exchange prefix requested to
appear in the actual symbol. If a caller requests `NYSE:BJ` and TradingView resolves it
to `BATS:BJ` (a different, valid US exchange for the same instrument), this reports
`success: false` even though the switch worked correctly. A more useful check would
compare just the ticker portion (after the `:`) rather than the full exchange-qualified
string, e.g. matching on `BJ` regardless of whether the exchange came back as `NYSE`,
`BATS`, `BOATS`, etc. Low priority — doesn't block real usage, just makes `success`
slightly pessimistic when TradingView auto-routes to a different (correct) exchange.

## Correct usage going forward

```bash
node "C:\Claude\tools\tradingview-mcp\src\cli\index.js" symbol "NYSE:BJ"
```
**Not** `symbol set "NYSE:BJ"` — there is no `set` subcommand for `symbol`
(`timeframe` and `type` follow the same pattern: `tv timeframe 1D`, `tv type Candles`,
no `set`).
