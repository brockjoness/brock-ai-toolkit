# Post-Access Meta Ads Audit -- Rules

## General Rules

- **Benchmarks:** Use both the account's own historical data AND relevant industry averages. Always state which you are referencing. Prefer internal data; use industry averages only when internal baseline is unavailable or to provide context.
- **Verticals:** All D2C brands. Do not restrict analysis to specific categories.
- **Data inputs:** Performance data may arrive via Google Sheets URL (read via Chrome DevTools MCP browser), CSV/Excel file upload, or pasted tabular data. Identify and state the source type before proceeding. Do not assume column names. Map columns from whatever export is provided. State your mapping before proceeding. If a column is absent, state it explicitly and apply the fallback rule for that metric (see Degraded Analysis Matrix).
- **Ad Library:** If the user provides a Facebook Ad Library URL, read it via Chrome DevTools MCP and integrate findings into the creative deep dive (Skill 4). If no Ad Library link is provided alongside performance data, prompt the user for one.
- **Baselines:** Always segment by campaign objective and lifecycle stage (prospecting vs retargeting vs ASC). Never blend across these buckets. If the provided date range includes a known promo period or spike, label the baseline "period baseline" not "account baseline."
- **Sample minimums:** Do not classify Winners or Losers below minimum thresholds. Label as "Insufficient sample" instead.
- **Causality language:** When data supports a clear conclusion, state it directly. When multiple causes are plausible, use "Likely" or "Hypothesis:" and still commit to a recommended action.
- **Attribution:** Always flag the attribution window (e.g. 7-day click / 1-day view) before reporting any revenue or ROAS figures. Note if 1-day click vs 7-day click comparison is being made.
- **Date range:** If under 7 days, label all conclusions "directional only." If WoW analysis is requested but fewer than 3 full weeks of daily data exist, disable WoW fatigue logic and state why.
- **Output format:** Client-facing report. Use plain text with clear section headers and simple tables. Formatted for direct paste into Notion or Google Docs. Percentages as % (not decimals). Currency rounded to 2 decimal places. Do not include internal Assumptions blocks in individual sections -- surface only client-relevant caveats in the Appendix.
- **Multi-file uploads:** If multiple files are provided, identify each file's granularity (ad-level, demographic, placement, time-series) and state the mapping before proceeding.
- **Zero-purchase buckets:** If a campaign bucket has zero purchases across all ads, report engagement metrics only (CPM, CTR, CPC) and note: "No conversions recorded -- analysis limited to engagement metrics. Verify pixel/event setup."

## Degraded Analysis Matrix

When fields are soft-missing, apply these specific fallbacks instead of ad hoc decisions:

| Missing Field | Impact on Workflow |
|---|---|
| Reach / Frequency | Skip fatigue frequency thresholds in Skill 5; use Thumb-Stop and ROAS signals only |
| Video metrics (3s plays, quartile views) | Skip Thumb-Stop Rate analysis; leave Thumb-Stop column blank in all tables; note "Video metrics unavailable" |
| Purchases (but ATC present) | Use Add-to-Cart as proxy; compute Cost per ATC instead of CPP; label all proxy metrics: "ATC-based proxy -- not purchase data" |
| Revenue (but purchases present) | Switch to CPP-based Winner/Loser classification (see knowledge-thresholds.md fallback); cannot compute ROAS -- leave ROAS column blank |
| Revenue AND Purchases absent | Engagement-only analysis; skip Skills 4 classification, 5 root cause purchase-rate analysis, and 7 brief KPI targets for CPP/ROAS |
| Demographics | Skip audience insights in Skill 5; state "Demographic breakdowns not available" |
| Time-series (aggregate only) | Use Snapshot mode for fatigue detection (Skill 5); disable WoW trend analysis |
| Landing page URLs | Skip Skill 6 entirely |
