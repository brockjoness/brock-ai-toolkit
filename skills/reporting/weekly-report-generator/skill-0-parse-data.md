# SKILL 0: Parse & Validate Data

## What to do

### Step 1: Identify the client

Extract client name from command or conversation context. Load CRM data and client context file if available.

### Step 2: Identify the data source

The user will provide data in one of these ways:
- **File upload:** CSV/XLSX/TSV file pasted or referenced
- **Pasted data:** Raw table data pasted into conversation
- **File path:** Path to a local file

### Step 3: Parse the data

Read the data and identify columns. Map platform-specific column names to standard metrics:

**Meta Ads Manager column mapping:**

| Platform Column | Standard Metric |
|---|---|
| Amount spent | Spend |
| Impressions | Impressions |
| Reach | Reach |
| Link clicks | Link Clicks |
| CTR (link click-through rate) | CTR |
| CPC (cost per link click) | CPC |
| CPM (cost per 1,000 impressions) | CPM |
| Purchases | Purchases |
| Purchase ROAS | ROAS |
| Website purchases conversion value | Revenue |
| Frequency | Frequency |
| Video plays at 25% / 50% / 75% / ThruPlay | Hold Rate |
| 3-second video plays | 3s Video Plays |
| Cost per purchase | CPA |

**Google Ads column mapping:**

| Platform Column | Standard Metric |
|---|---|
| Cost | Spend |
| Impressions | Impressions |
| Clicks | Clicks |
| CTR | CTR |
| Avg. CPC | CPC |
| Conversions | Purchases |
| Conv. value | Revenue |
| Conv. value / cost | ROAS |
| Cost / conv. | CPA |

### Step 4: Validate required columns

**Hard required:** Spend AND Impressions. If either is missing, stop:
> "Cannot generate report -- missing required columns. Please export with at least Spend and Impressions."

**Soft required (enrich report when present):**
- Link Clicks / Clicks (needed for CTR, CPC, CVR)
- Purchases (needed for CPA, ROAS, CVR)
- Revenue (needed for ROAS)
- Reach (needed for Frequency)

Note which optional columns are available and which are missing.

### Step 5: Determine reporting period

Extract date range from the data. If dates are present in the data, compute:
- Reporting week (Monday-Sunday)
- Prior week (for WoW comparison, if prior week data is available)

If no dates in data, ask:
> "What date range does this data cover?"

### Step 6: Load budget context

From CRM or client context file, get:
- Monthly budget
- Weekly budget (monthly / 4.33)
- ROAS target
- CPA target

If not available, note "Budget targets not set -- reporting actuals only."

### Step 7: Assemble REPORT_CONTEXT

Package everything for downstream skills.

## Next step

Proceed to Skill 1: Analyze Performance.
