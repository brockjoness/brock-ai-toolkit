# SKILL 1: Data Quality Check & Column Mapping

## When to use

Always run first, before any analysis.

## What to do

### Step 0: Data Source Detection

Before examining columns, identify and state the data source type:

- **Google Sheets URL**: Navigate to the URL using Chrome DevTools MCP (`navigate_page`), take a snapshot (`take_snapshot`), and extract the tabular data from the rendered page. If the sheet has multiple tabs, identify which tab contains the Meta Ads data. Proceed with column mapping on the extracted data.
- **CSV/Excel Upload**: Read the file directly. This is the standard flow.
- **Pasted Data**: Parse the tabular data from the conversation. This is the standard flow.

State: `Data Source: [Google Sheets URL | CSV/Excel Upload | Pasted Data]`

### Step 1: Column Mapping

Examine the data and identify all columns present.
Map columns to standard metric names. State your interpretation explicitly:

- "Column 'Amount spent (USD)' -> Spend"
- "Column 'Link clicks' -> Link Clicks"
- "Column 'Purchases' -> Purchases"

Produce this table:

| Field | Found? | Mapped Column Name | Can Compute? | Notes |
|---|---|---|---|---|

For every standard metric in knowledge-metrics.md.

Flag hard stops:
- If Spend missing -> stop, cannot proceed
- If Impressions missing -> stop, cannot proceed
- If no conversion or proxy metric present -> flag, proceed with engagement-only analysis

State:
- "Time-series available: Yes/No" (determines whether WoW fatigue logic can run)
- "Demographic breakdowns available: Yes/No" (determines whether audience segmentation runs)
- "Attribution window: [state value if found, or 'not specified']"
- "Landing page URLs available: Yes/No" (determines whether Skill 6 runs)

**Time-series detection criteria:**
Time-series is available if the data contains a date column (e.g., "Day", "Date", "Reporting starts") with 2+ distinct date values per ad or campaign. If only one row per entity exists (aggregate export), time-series is unavailable.

**Format detection criteria:**
If no explicit format column exists (e.g., "Ad format", "Creative type"), classify ads as follows:
- Video: 3-second video plays column is present AND value > 0 for that ad
- Static: 3-second video plays column is absent OR value = 0 for that ad
- For UGC vs. polished distinction: require user input or creative asset upload -- do not infer

Note any columns that could not be mapped and will be ignored.

## Output format

Data Quality Report table + statement of time-series, breakdown, and landing page availability.

## Next step

Proceed automatically to Skill 2.
