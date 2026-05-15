# Post-Access Google Ads Audit -- Rules

## General Rules

- **Benchmarks:** Use both the account's own historical data AND relevant industry averages. Always state which you are referencing. Prefer internal data; use industry averages only when internal baseline is unavailable or to provide context.
- **Verticals:** All D2C and lead generation brands. Do not restrict analysis to specific categories.
- **Data inputs:** Performance data may arrive via Google Sheets URL (read via Chrome DevTools MCP browser), CSV/Excel file upload, or pasted tabular data. Identify and state the source type before proceeding. Do not assume column names. Map columns from whatever export is provided. State your mapping before proceeding. If a column is absent, state it explicitly and apply the fallback rule for that metric (see Degraded Analysis Matrix).
- **Transparency Center:** If the user provides a Google Ads Transparency Center URL, integrate findings into the diagnostics (Skill 6). If no Transparency Center link is provided, prompt the user for one.
- **Campaign type segmentation:** Always segment by campaign type: Search, Shopping, Performance Max, Display, YouTube, Demand Gen, App. Never blend metrics across campaign types. Within Search, further segment by match type where relevant.
- **Baselines:** Segment by campaign type and (for Search) by match type. Use account data first, industry averages as fallback. If the provided date range includes a known promo period or spike, label the baseline "period baseline" not "account baseline."
- **Sample minimums:** Do not classify Winners or Losers below minimum thresholds. Label as "Insufficient sample" instead.
- **Causality language:** When data supports a clear conclusion, state it directly. When multiple causes are plausible, use "Likely" or "Hypothesis:" and still commit to a recommended action.
- **Attribution:** Always flag the attribution model and conversion window (e.g., data-driven, last click, 30-day) before reporting any conversion or ROAS figures.
- **Date range:** If under 7 days, label all conclusions "directional only." If trend analysis is requested but fewer than 3 full weeks of data exist, note the limitation.
- **Output format:** Client-facing report. Use plain text with clear section headers and simple tables. Formatted for direct paste into Notion or Google Docs. Percentages as % (not decimals). Currency rounded to 2 decimal places. Do not include internal Assumptions blocks in individual sections -- surface only client-relevant caveats in the Appendix.
- **Multi-file uploads:** If multiple files are provided (e.g., campaign-level + keyword-level + search term report), identify each file's granularity and state the mapping before proceeding.
- **Zero-conversion campaigns:** If a campaign type has zero conversions across all entities, report engagement metrics only (CPC, CTR, CPM) and note: "No conversions recorded -- analysis limited to engagement metrics. Verify conversion tracking setup."

## Degraded Analysis Matrix

When fields are soft-missing, apply these specific fallbacks instead of ad hoc decisions:

| Missing Field | Impact on Workflow |
|---|---|
| Search terms report | Skip search term analysis in Skill 4; note "Search term data not provided -- cannot assess keyword waste or negative keyword gaps" |
| Quality Score | Skip QS analysis in Skill 4; use CPC and CTR as proxies for ad relevance |
| Shopping/PMax data | Skip Skill 5 entirely; note "No Shopping or Performance Max campaigns in this export" |
| Display/YouTube data | Skip Display and YouTube sections in Skill 6; note "No Display or YouTube campaigns in this export" |
| GA4 data | Skip conversion path analysis in Skill 7; note "GA4 data not available -- conversion path analysis not possible" |
| Auction Insights | Skip competitive context; note "Auction Insights not provided -- cannot assess competitive position" |
| Demographics | Skip audience insights in Skill 6; state "Demographic breakdowns not available" |
| Landing page URLs | Skip Skill 7 entirely |
| Impression Share metrics | Skip impression share analysis in Skill 6; note "Impression share data not available" |
| Conversion value (but conversions present) | Switch to CPA-based Winner/Loser classification; cannot compute ROAS -- leave ROAS column blank |
| Conversions AND conversion value absent | Engagement-only analysis; skip classification and ROAS/CPA analysis |
