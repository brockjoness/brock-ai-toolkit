# Budget Pacing Monitor -- Workflow

## Trigger

Activated by:
- "Check budget pacing for [Client]"
- "Budget check for [Client]"
- "Pacing report for [Client]"
- "Are we on pace for [Client]?"
- "How's spend looking for [Client]?"
- Upload of daily spend CSV with budget context

## Skill Chain

```
Skill 0: Parse Daily Spend Data & Budget Target
    |
Skill 1: Compute Pacing Metrics & Projections
    |
Skill 2: Assess Alert Level & Generate Recommendations
    |
Skill 3 (optional): Generate HTML Alert Card
```

## Before Starting

Confirm scope:
> "Checking budget pacing for **{Client}** -- {Month, Year}. Monthly budget: ${X,XXX}. Data through: {latest date}."

If monthly budget is not provided in the request or client context, ask:
> "What is the monthly budget target for {Client}? (Total, or broken down by platform if applicable.)"

## Input

| Source | Format | Required Columns |
|---|---|---|
| Daily spend export | CSV/XLSX | Date, Spend (minimum) |
| Budget target | Manual input or client context.md | Monthly total budget |

Optional columns: Platform (Meta/Google), Campaign Name, Impressions, Clicks, Conversions, Revenue.

Platform-level budget splits (optional): if provided, pacing is computed per-platform. If not provided, pacing is computed on the total only.

## Context Flow

`PACING_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug`, `client_slug`
- `report_month`, `days_in_month`
- `monthly_budget` (total and per-platform if available)
- `daily_spend_data[]` (date + spend per row, optionally segmented by platform)
- `latest_data_date`
- `days_elapsed`

## Step-by-Step Execution

### Step 0: Parse & Validate
1. Identify file format and map columns (Date, Spend minimum)
2. Confirm date range falls within a single calendar month
3. Determine if data is platform-segmented or aggregate
4. Load monthly budget from client context or request from user
5. Count days elapsed and days remaining

### Step 1: Compute Pacing Metrics
1. Sum actual spend through latest data date
2. Compute expected spend: (days elapsed / days in month) x budget
3. Compute pace variance: ((actual - expected) / expected) x 100
4. Compute daily run rate: actual spend / days elapsed
5. Project month-end spend: daily run rate x days in month
6. Compute projected variance vs. budget
7. If multi-platform: repeat calculations per platform

### Step 2: Assess & Recommend
1. Apply alert thresholds from rules.md
2. Determine overall status: On Track / Warning / Critical
3. If Warning or Critical:
   - Compute remaining budget and remaining days
   - Calculate required daily spend for remaining days
   - Draft specific budget adjustment recommendation
   - If Critical: add URGENT label and recommend notifying Brock
4. If multi-platform: identify which platform is driving the variance

### Step 3 (Optional): HTML Alert Card
1. If requested, generate HTML alert card per rules.md formatting
2. Apply color coding based on alert level
3. Include agency branding if agency context is available

## Final Output

Present pacing status directly in conversation:
> **Budget Pacing -- {Client} -- {Month, Year}**
> **Status: {ON TRACK / WARNING / CRITICAL}**
>
> {Pacing status card per rules.md format}
>
> Options:
> 1. **Generate HTML alert card** -- visual card for sharing
> 2. **Check another client** -- run pacing for a different account
> 3. **Deep dive** -- break down spend by campaign or day

## Cadence

- Can be run at any time (on-demand)
- Recommended: daily check for active clients, especially in the last 10 days of the month
- Integrates with weekly report workflow as a supporting data point

## Error Handling

- Missing Date or Spend columns: stop and ask for correct export
- Data spans multiple months: ask which month to analyze, or split and report both
- Budget not provided and not in client context: ask user for monthly budget target
- Only 1-2 days of data: note "Insufficient data for reliable pacing projection -- run rate based on {X} day(s) only"
- Spend data is $0 for all days: flag "No spend recorded -- verify ad account is active and delivering"
- Weekend/holiday gaps in data: note gaps and compute run rate on active days only
