# SKILL 0: Parse & Validate Test Data

## When to use

First skill in the test-analyzer chain. Activated when ad performance data is provided.

## What to do

### Step 1: Identify the data source

Determine the input type:
- **CSV/XLSX file:** Read and parse the file
- **Pasted data:** Parse from conversation context
- **Manual input:** Extract metrics from Brock's description

### Step 2: Detect platform and map columns

**Meta Ads Manager columns (common names):**

| Expected Column | Aliases |
|---|---|
| Ad Name | Ad name, Ad Name, ad_name |
| Campaign Name | Campaign name, Campaign Name, campaign_name |
| Ad Set Name | Ad set name, Ad Set Name, ad_set_name |
| Spend | Amount spent (USD), Amount Spent, Spend, spend, Cost |
| Impressions | Impressions, impressions, Impr. |
| Clicks | Link clicks, Clicks (all), clicks |
| CTR | CTR (link click-through rate), CTR (all), ctr |
| Conversions | Purchases, Results, conversions, purchases |
| Revenue | Purchase ROAS (return on ad spend), Purchase conversion value, Revenue, revenue, Conv. value |
| ROAS | Purchase ROAS, ROAS, roas |
| Frequency | Frequency, frequency |
| Reach | Reach, reach |
| CPM | CPM (cost per 1,000 impressions), CPM, cpm |

**Google Ads columns (common names):**

| Expected Column | Aliases |
|---|---|
| Ad Name | Ad, Ad name, Headline 1 |
| Campaign | Campaign, Campaign name |
| Ad Group | Ad group, Ad Group |
| Cost | Cost, Spend, cost |
| Impressions | Impressions, Impr. |
| Clicks | Clicks, clicks |
| CTR | CTR, Click-through rate |
| Conversions | Conversions, Conv. |
| Conv. Value | Conv. value, Conversion value, Revenue |
| CPA | Cost / conv., CPA |

If column mapping is ambiguous, ask Brock to confirm before proceeding.

### Step 3: Validate required columns

**Minimum required:**
- Ad Name (or identifier)
- Spend
- Impressions
- Clicks

**Recommended for full analysis:**
- Conversions
- Revenue (or ROAS)
- Frequency (Meta only)

If conversions/revenue are missing, note: "Analysis limited to upper-funnel metrics (CTR, CPM). Cannot determine purchase-level winners."

### Step 4: Determine test structure

Analyze the ad names and structure to infer:
- **Test type:** Are variants testing different angles? Formats? Copy? CTAs? Or mixed?
- **Isolation:** Is one variable changing between variants, or multiple?
- **Grouping:** Are ads grouped by ad set (proper test) or scattered across campaigns (messy)?

Common ad naming conventions:
- `[Angle] - [Format] - [Version]` (e.g., "Social Proof - Static - V1")
- `[Hook] | [CTA]` (e.g., "Transform Your Skin | Shop Now")
- If no clear pattern, treat each ad as a unique variant

### Step 5: Calculate derived metrics

For each ad, compute if not already present:
- **CTR** = Clicks / Impressions * 100
- **CPC** = Spend / Clicks
- **CPM** = Spend / Impressions * 1000
- **CPA** = Spend / Conversions (if conversions > 0)
- **ROAS** = Revenue / Spend (if revenue available)
- **CVR** = Conversions / Clicks * 100 (if conversions available)

### Step 6: Determine date range and total spend

Extract from data or column headers:
- Test start date and end date
- Total spend across all variants
- Total conversions across all variants

### Step 7: Assemble TEST_CONTEXT

```
TEST_CONTEXT:
  client_name: [from context or ask]
  agency_slug: [from context or ask]
  platform: [Meta / Google / both]
  date_range: [start - end]
  total_spend: [$X]
  total_conversions: [X]
  test_type: [angle / format / copy / CTA / mixed]
  variable_isolation: [clean / mixed]
  ads: [array of normalized ad objects]
  baseline_metrics: [account averages if available from context]
```

### Step 8: Provide progress update

> "Parsed {X} ads from {platform}. ${total_spend} total spend, {date_range}. Test type: {test_type}. Moving to analysis."

## Next step

Proceed to Skill 1: Statistical Analysis.
