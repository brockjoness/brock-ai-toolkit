# SKILL 0: Parse & Segment Audience Data

## When to use

First skill in the audience-analyzer chain. Activated when audience data is provided.

## What to do

### Step 1: Identify data sources

Determine what data is available:
- **Ad set-level export:** Contains audience names + performance metrics
- **Demographic report:** Age/gender/location breakdown
- **Customer list:** Email, purchase history, RFM data
- **Multiple sources:** Combine for richer analysis

### Step 2: Parse ad set-level data (if available)

Map columns to standard fields:

**Meta Ad Set columns:**
| Expected | Aliases |
|---|---|
| Ad Set Name | Ad set name, Ad Set Name, ad_set_name |
| Campaign Name | Campaign name, campaign_name |
| Audience Type | (infer from ad set name or campaign name) |
| Spend | Amount spent, Spend, Cost |
| Impressions | Impressions |
| Reach | Reach |
| Clicks | Link clicks, Clicks (all) |
| Conversions | Purchases, Results |
| Revenue | Purchase conversion value, Conv. value |
| Frequency | Frequency |

**Google Ad Group columns:**
| Expected | Aliases |
|---|---|
| Ad Group | Ad group, Ad Group |
| Audience Segment | Audience segment, Audience |
| Campaign | Campaign, Campaign name |
| Cost | Cost, Spend |
| Impressions | Impressions |
| Clicks | Clicks |
| Conversions | Conversions, Conv. |
| Conv. Value | Conv. value, Revenue |

### Step 3: Infer audience types from names

Parse ad set / ad group names to categorize:

| Name Pattern | Audience Type |
|---|---|
| "LAL", "Lookalike", "LLA" | Lookalike |
| "Interest", "Int:" | Interest-based |
| "Broad", "Open", "No targeting" | Broad/Advantage+ |
| "RT", "Retarget", "WCA", "Website" | Retargeting |
| "Customer", "CRM", "Email" | Customer list |
| "ATC", "Add to Cart" | Retargeting (mid-funnel) |
| "DPA", "Catalog" | Dynamic product ads |
| "ASC", "Advantage+" | Advantage+ Shopping |
| Percentage (1%, 3%, 5%) | Lookalike (note seed %) |

### Step 4: Parse demographic data (if available)

Normalize demographic breakdowns:
- Age brackets: 18-24, 25-34, 35-44, 45-54, 55-64, 65+
- Gender: Male, Female, All/Unknown
- Location: Country, State/Region, City (as available)

For each demographic cell, compute:
- Spend, Impressions, Clicks, CTR, CPC, Conversions, CPA, Revenue, ROAS

### Step 5: Parse customer list (if available)

If a customer list with purchase history is provided, build RFM segments:

| Segment | Recency | Frequency | Monetary |
|---|---|---|---|
| **Champions** | Purchased in last 30 days | 4+ orders | Top 20% by revenue |
| **Loyal** | Purchased in last 60 days | 3+ orders | Above average revenue |
| **Recent** | Purchased in last 30 days | 1-2 orders | Any revenue |
| **At-Risk** | Last purchase 60-120 days ago | Any frequency | Any revenue |
| **Lapsed** | Last purchase 120+ days ago | Any frequency | Any revenue |
| **High-Value One-Time** | Any recency | 1 order | Top 30% by order value |

### Step 6: Calculate derived metrics

For each segment:
- CTR = Clicks / Impressions * 100
- CPC = Spend / Clicks
- CPM = Spend / Impressions * 1000
- CPA = Spend / Conversions (if conversions > 0)
- ROAS = Revenue / Spend (if revenue available)
- CVR = Conversions / Clicks * 100
- Frequency = Impressions / Reach (if reach available)

### Step 7: Calculate baselines

- **Account baseline:** Weighted average of all segments combined
- **By type baseline:** Weighted average within each audience type (all lookalikes, all interest, etc.)

### Step 8: Assemble AUDIENCE_CONTEXT

Package normalized data for downstream skills.

> "Parsed {X} audience segments from {platform}. ${total_spend} total, {date_range}. Types: {list audience types found}. Moving to analysis."

## Next step

Proceed to Skill 1: Segment Performance Analysis.
