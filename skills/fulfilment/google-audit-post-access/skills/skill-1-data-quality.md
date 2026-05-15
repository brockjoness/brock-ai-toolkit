# SKILL 1: Data Quality Check & Column Mapping

## When to use

Always run first, before any analysis.

## What to do

### Step 0: Data Source Detection

Before examining columns, identify and state the data source type:

- **Google Sheets URL**: Navigate to the URL using Chrome DevTools MCP (`navigate_page`), take a snapshot (`take_snapshot`), and extract the tabular data from the rendered page. If the sheet has multiple tabs, identify which tab contains the Google Ads data. Proceed with column mapping on the extracted data.
- **CSV/Excel Upload**: Read the file directly. This is the standard flow.
- **Pasted Data**: Parse the tabular data from the conversation. This is the standard flow.

State: `Data Source: [Google Sheets URL | CSV/Excel Upload | Pasted Data]`

### Step 1: Identify Data Files & Granularity

If multiple files are provided, identify each file's granularity:
- **Campaign-level**: One row per campaign
- **Ad group-level**: One row per ad group
- **Ad-level**: One row per ad (RSA, image ad, video ad)
- **Keyword-level**: One row per keyword (Search only)
- **Search term-level**: One row per search term (Search only)
- **Product-level**: One row per product (Shopping only)
- **Asset group-level**: One row per asset group (PMax only)

State the granularity of each file before proceeding.

### Step 2: Column Mapping

Examine the data and identify all columns present. Map columns to standard metric names. State your interpretation explicitly:

- "Column 'Cost' -> Spend"
- "Column 'Impr.' -> Impressions"
- "Column 'Clicks' -> Clicks"
- "Column 'Conv.' -> Conversions"
- "Column 'Conv. value' -> Revenue"
- "Column 'Search impr. share' -> Search Impression Share"

Produce this table:

| Field | Found? | Mapped Column Name | Can Compute? | Notes |
|---|---|---|---|---|

For every standard metric in knowledge-metrics.md.

### Step 3: Flag Hard Stops and Availability

Flag hard stops:
- If Spend (Cost) missing -> stop, cannot proceed
- If Impressions missing -> stop, cannot proceed
- If Clicks missing -> stop, cannot proceed (Google Ads always includes this)
- If no conversion or proxy metric present -> flag, proceed with engagement-only analysis

State:
- "Campaign types present: [Search / Shopping / PMax / Display / YouTube / Demand Gen / App]"
- "Search term data available: Yes/No" (determines depth of Skill 4)
- "Quality Score data available: Yes/No" (determines QS analysis in Skill 4)
- "Shopping/PMax data available: Yes/No" (determines whether Skill 5 runs)
- "Demographic breakdowns available: Yes/No" (determines audience analysis in Skill 6)
- "Impression share data available: Yes/No" (determines budget/competitive analysis in Skill 6)
- "Landing page URLs available: Yes/No" (determines whether Skill 7 runs)
- "Attribution model: [state value if found, or 'not specified']"
- "Conversion window: [state value if found, or 'not specified']"

**Campaign type detection criteria:**
- Search: Campaign type contains "Search" or keyword/search term data is present
- Shopping: Campaign type contains "Shopping" or product data columns exist
- PMax: Campaign type contains "Performance Max" or asset group data exists
- Display: Campaign type contains "Display" or placement data exists
- YouTube/Video: Campaign type contains "Video" or view rate/CPV columns exist
- Demand Gen: Campaign type contains "Demand Gen"

Note any columns that could not be mapped and will be ignored.

## Output format

Data Quality Report table + statement of campaign types, data availability flags, and attribution model.

## Next step

Proceed automatically to Skill 2.
