# SKILL 1: Analyze Performance

## What to do

Using `REPORT_CONTEXT` from Skill 0, perform the following analyses.

### Step 1: Calculate aggregate metrics

Compute totals and averages across all campaigns:

| Metric | Calculation |
|---|---|
| Total Spend | Sum of all Spend |
| Total Impressions | Sum of all Impressions |
| Total Link Clicks | Sum of all Link Clicks |
| Total Purchases | Sum of all Purchases |
| Total Revenue | Sum of all Revenue |
| Blended ROAS | Total Revenue / Total Spend |
| Blended CPA | Total Spend / Total Purchases |
| Blended CTR | Total Link Clicks / Total Impressions |
| Blended CPM | Total Spend / Total Impressions x 1000 |
| Blended CVR | Total Purchases / Total Link Clicks |

### Step 2: Budget pacing

If budget data is available:
- Weekly spend vs. weekly budget: `(Spend / Weekly Budget) x 100`
- Monthly pacing: project current week's spend rate across remaining weeks
- Flag: overspent (>110%) or underspent (<85%)

### Step 3: Week-over-week comparison

If prior week data is available, compute WoW change for each metric:
- `WoW Change = ((This Week - Last Week) / Last Week) x 100`
- Flag significant changes: >15% swing in ROAS, CPA, or CTR

### Step 4: Rank ads by performance

**If ROAS/CPA data available:**
- Filter to ads with Spend >= $200 AND Purchases >= 3
- Rank by ROAS (descending) for top performers
- Rank by CPA (descending) for bottom performers

**If only engagement data:**
- Filter to ads with Spend >= $100
- Rank by CTR (descending) for top performers
- Note: "Ranked by engagement -- conversion data unavailable"

Select top 3-5 performers and bottom 2-3 performers.

### Step 5: Detect fatigue signals

Check each ad/ad set:
- **Frequency:** Flag if >= 3.0 (prospecting) or >= 6.0 (retargeting)
- **CTR decay:** Flag if CTR dropped >20% vs. prior week for the same ad
- **CPM inflation:** Flag if CPM increased >15% vs. prior week
- **Thumb-stop decline:** Flag if 3s video plays / impressions dropped >20%

### Step 6: Segment by campaign type

If campaign-level data is available, segment performance by:
- Prospecting vs. Retargeting
- Campaign objective (Traffic, Conversions, Catalog Sales, etc.)
- Platform (Meta vs. Google)

### Step 7: Generate strategic recommendations

Based on the analysis, generate 2-3 specific recommendations. Each must follow the format:
- **What:** Specific action
- **Why:** Data point
- **Expected impact:** What changes
- **Owner:** Who acts

Use the recommendation frameworks from `.claude/shared/recommendation-frameworks/` when applicable:
- ROAS above target → scaling playbook
- ROAS below target → diagnostic checklist
- Fatigue detected → creative refresh playbook

### Step 8: Draft next week's plan

Based on current performance:
- Which campaigns to scale (top performers with budget headroom)
- Which campaigns to cut (bottom performers past threshold)
- What creative tests to launch (based on fatigue signals or gaps)
- Any budget adjustments needed

## Next step

Proceed to Skill 2: Generate Report.
