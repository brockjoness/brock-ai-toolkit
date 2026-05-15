# Engagement Mapper -- Workflow

Analyzes hourly and daily performance breakdowns to identify optimal ad scheduling, daypart weighting, and engagement patterns.

## Trigger

Activated by:
- "Engagement analysis for [Client]" | "When should we run ads?"
- "Daypart analysis for [Client]" | "Best times to advertise"
- "Schedule optimization for [Client]"
- Upload of hourly/daily breakdown data
- Integrated as a section in the weekly report (when time-series data is available)

## Skill Chain

```
Skill 0: Parse Time-Series Data
    |
Skill 1: Daypart & Day-of-Week Analysis
    |
Skill 2: Schedule Recommendations
```

## Before Starting

Confirm scope:
> "Analyzing engagement patterns for **{Client Name}**. Data: {date range}, {granularity: hourly/daily}. Running: daypart analysis, day-of-week analysis, schedule optimization."

## Input Sources

| Source | How It Arrives | What It Provides |
|---|---|---|
| Meta hourly breakdown | CSV from Ads Manager (breakdown by hour) | Hourly spend, impressions, clicks, conversions, CPA, ROAS |
| Meta daily breakdown | CSV from Ads Manager (breakdown by day) | Daily metrics for day-of-week patterns |
| Google hourly report | CSV from Google Ads (Hour of Day report) | Hourly cost, impressions, clicks, conversions |
| Google day-of-week report | CSV (Day of Week report) | Daily metrics by weekday |
| GA4 engagement data | CSV/report | Sessions, conversions by hour/day |

## Context Flow

`ENGAGEMENT_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug`, `platform`
- `date_range`, `granularity` (hourly / daily / both)
- `hourly_data[]` (24 rows, each with aggregated metrics)
- `daily_data[]` (7 rows, each with aggregated metrics for Mon-Sun)
- `baseline_metrics` (period averages for comparison)

## Final Output

```
--- ENGAGEMENT ANALYSIS ---

Client: {Client Name}
Platform: {platform}
Period: {date_range}

PEAK HOURS:
  Primary: {X}:00 - {X}:00 ({timezone}) -- CPA ${X} ({X}% below average)
  Secondary: {X}:00 - {X}:00 -- CPA ${X} ({X}% below average)

OFF-PEAK HOURS:
  {X}:00 - {X}:00 -- CPA ${X} ({X}% above average) -- consider reducing

BEST DAYS:
  1. {Day} -- ROAS {X}, CPA ${X}, {X}% of weekly conversions
  2. {Day} -- ROAS {X}, CPA ${X}

WORST DAYS:
  1. {Day} -- ROAS {X}, CPA ${X} -- consider reducing

RECOMMENDED SCHEDULE:
  {Day-by-day budget weighting table}
  {Hourly bid adjustment recommendations}

Options:
  a) Export schedule as campaign settings guide
  b) Include in weekly report as a section
  c) View full hourly heatmap
```

## Error Handling

- If only daily data (no hourly): run day-of-week analysis only, skip daypart
- If data covers <7 days: note insufficient data for day-of-week analysis, present daily trend only
- If data covers <14 days: note that patterns may not be stable, recommend extending analysis period
- If no conversion data: analyze by CTR/CPM patterns instead, note limitation
