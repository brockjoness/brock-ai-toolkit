# SKILL 2: Baseline Computation

## When to use

After Skill 1 confirms data quality and column mapping.

## What to do

### Step 1: Segment campaigns into buckets

Classify every campaign into one of these buckets:

| Bucket | Rule |
|---|---|
| Search - Brand | Campaign name contains "brand", "branded", or targets brand terms |
| Search - Non-Brand | Search campaigns that are not brand campaigns |
| Shopping | Campaign type = Shopping |
| Performance Max | Campaign type = Performance Max |
| Display | Campaign type = Display |
| YouTube / Video | Campaign type = Video |
| Demand Gen | Campaign type = Demand Gen |
| App | Campaign type = App |

If campaign naming does not clearly indicate brand vs non-brand for Search, check keyword-level data for brand terms. If still unclear, ask the user for the brand name and classify manually.

### Step 2: Within-Search segmentation

For Search campaigns, further segment by match type if keyword-level data is available:
- Broad Match
- Phrase Match
- Exact Match

This enables match-type-specific baseline comparisons.

### Step 3: Compute baselines per bucket

For each bucket, compute:

| Metric | Baseline Method |
|---|---|
| CPC | Median CPC across all entities in the bucket |
| CTR | Weighted average CTR (total clicks / total impressions) |
| Conversion Rate | Weighted average (total conversions / total clicks) |
| CPA | Median CPA across entities with conversions >= 1 |
| ROAS | Weighted average (total conv value / total spend) -- only if revenue data exists |
| CPM | Weighted average (total spend / total impressions x 1000) |

**Outlier handling:** Exclude entities with spend < $10 from baseline computation to prevent low-spend outliers from skewing results.

### Step 4: Device baselines (if available)

If device-level data is present, compute separate baselines for:
- Desktop
- Mobile
- Tablet

Flag significant device-level disparities (e.g., mobile CPA 2x desktop CPA).

### Step 5: State baselines

Output a summary table:

| Bucket | Spend | CPC | CTR | Conv Rate | CPA | ROAS |
|---|---|---|---|---|---|---|

And note:
- "Baseline source: Account data (internal)"
- "Date range: [start] to [end]"
- If date range includes known promotional period: "Period baseline -- treat as directional"

## Output format

Baseline summary table per campaign bucket, with match type sub-baselines for Search.

## Next step

Proceed automatically to Skill 3.
