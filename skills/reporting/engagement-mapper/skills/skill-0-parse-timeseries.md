# SKILL 0: Parse Time-Series Data

## When to use

First skill in the engagement-mapper chain. Activated when hourly or daily breakdown data is provided.

## What to do

### Step 1: Identify data granularity

Determine what breakdown is available:
- **Hourly:** Data has an hour/time column (0-23 or 12:00 AM - 11:00 PM)
- **Daily:** Data has a date or day-of-week column
- **Both:** Hourly data that spans multiple days (can derive both views)

### Step 2: Map columns

**Meta hourly breakdown columns:**
| Expected | Aliases |
|---|---|
| Hour | Time of day (ad account time zone), Hour, hour |
| Spend | Amount spent, Spend, Cost |
| Impressions | Impressions |
| Clicks | Link clicks, Clicks (all) |
| Conversions | Purchases, Results |
| Revenue | Purchase conversion value |
| CPM | CPM |
| CTR | CTR (link click-through rate) |

**Google Hour of Day columns:**
| Expected | Aliases |
|---|---|
| Hour | Hour of day, Hour |
| Cost | Cost, Spend |
| Impressions | Impressions |
| Clicks | Clicks |
| Conversions | Conversions |
| Conv. Value | Conv. value |

### Step 3: Normalize hourly data

If hourly data spans multiple days, aggregate by hour across all days:

For each hour (0-23):
- Sum: Spend, Impressions, Clicks, Conversions, Revenue
- Compute: CTR, CPC, CPM, CPA, ROAS, CVR
- Count: number of days contributing data (for confidence)

### Step 4: Normalize daily data

If raw dates are provided, map to day-of-week:

For each day (Monday-Sunday):
- Sum: Spend, Impressions, Clicks, Conversions, Revenue
- Compute: CTR, CPC, CPM, CPA, ROAS, CVR
- Count: number of weeks contributing data (for confidence)

### Step 5: Calculate baselines

- **Hourly baseline:** Average across all 24 hours (weighted by impressions)
- **Daily baseline:** Average across all 7 days (weighted by impressions)
- **Period baseline:** Total period averages

### Step 6: Flag data quality

- Hours with <$10 spend: "Low confidence" (may be delivery artifacts)
- Days with <$50 spend: "Low confidence"
- If data covers <7 days: note that day-of-week patterns are unreliable
- If data covers <14 days: note that patterns should be validated with more data

### Step 7: Assemble ENGAGEMENT_CONTEXT

Package normalized time-series data for downstream skills.

> "Parsed {granularity} data: {X} hours / {X} days, {date_range}. ${total_spend} total. Moving to analysis."

## Next step

Proceed to Skill 1: Daypart & Day-of-Week Analysis.
