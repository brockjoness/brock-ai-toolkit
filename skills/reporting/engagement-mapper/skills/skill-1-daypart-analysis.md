# SKILL 1: Daypart & Day-of-Week Analysis

## When to use

After Skill 0 has parsed and normalized the time-series data.

## Inputs

- `ENGAGEMENT_CONTEXT` from Skill 0
- Hourly and/or daily aggregated data with baselines

## What to do

### Step 1: Hourly performance analysis (if hourly data available)

For each hour (0-23), calculate performance relative to baseline:

```
HOURLY PERFORMANCE:
| Hour | Spend | CPA | vs Avg | ROAS | vs Avg | Conv | Tier |
|------|-------|-----|--------|------|--------|------|------|
| 0:00 | ${X} | ${X} | +{X}% | {X} | -{X}% | {X} | Off-peak |
| 1:00 | ... |
| ... |
| 23:00 | ... |
```

**Tier assignment:**
| CPA vs. Baseline | Tier |
|---|---|
| CPA <= 75% of baseline | **Peak** (best hours) |
| CPA 75-90% of baseline | **Strong** |
| CPA 90-110% of baseline | **Average** |
| CPA 110-125% of baseline | **Weak** |
| CPA >= 125% of baseline | **Off-peak** (worst hours) |

If no conversion data, tier by CTR:
- CTR >= 125% of baseline -> Peak
- CTR <= 75% of baseline -> Off-peak

### Step 2: Identify daypart windows

Group consecutive Peak/Strong hours into daypart windows:

```
DAYPART WINDOWS:
  Primary: {start}:00 - {end}:00 -- Avg CPA ${X} ({X}% below baseline)
  Secondary: {start}:00 - {end}:00 -- Avg CPA ${X} ({X}% below baseline)
  Off-peak: {start}:00 - {end}:00 -- Avg CPA ${X} ({X}% above baseline)
```

### Step 3: Day-of-week performance analysis (if daily data available)

For each day (Monday-Sunday):

```
DAY-OF-WEEK PERFORMANCE:
| Day | Spend | CPA | vs Avg | ROAS | vs Avg | Conv | % of Weekly Conv | Tier |
|-----|-------|-----|--------|------|--------|------|------------------|------|
| Mon | ${X} | ${X} | +{X}% | {X} | -{X}% | {X} | {X}% | ... |
| Tue | ... |
| ... |
| Sun | ... |
```

Same tier logic as hourly (CPA-based or CTR-based fallback).

### Step 4: Cross-analyze (if both hourly + daily available)

Build a heatmap of Day x Hour performance:

```
ENGAGEMENT HEATMAP (CPA index, 100 = average):
| Hour | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|------|-----|-----|-----|-----|-----|-----|-----|
| 6-9  | {X} | {X} | {X} | {X} | {X} | {X} | {X} |
| 9-12 | {X} | {X} | ... |
| 12-15| ... |
| 15-18| ... |
| 18-21| ... |
| 21-24| ... |
```

Values below 85 = strong (green), 85-115 = average, above 115 = weak (red).

### Step 5: Identify patterns

Look for recurring patterns:
- **Commute peaks:** Morning (7-9 AM) and evening (5-7 PM) engagement spikes
- **Lunch peak:** 12-1 PM engagement spike
- **Late night drop:** After 10 PM CPA typically rises
- **Weekend shift:** Different patterns on Sat/Sun vs. weekdays
- **Platform-specific:** Meta tends to peak evenings, Google tends to peak during business hours

Note which patterns match and which are unique to this client.

### Step 6: Generate insights

```
KEY FINDINGS:
  1. {Strongest daypart pattern and magnitude}
  2. {Day-of-week pattern}
  3. {Waste opportunity -- hours/days where spend is high but performance is weak}
  4. {Unexpected pattern -- anything counter to typical trends}

ESTIMATED SAVINGS:
  If budget were reallocated from off-peak to peak hours:
  Current weighted CPA: ${X}
  Optimized weighted CPA: ${X} (estimated {X}% improvement)
  Monthly savings at current spend: ~${X}
```

Store as `DAYPART_ANALYSIS_OUTPUT`.

> "Daypart analysis complete. Peak hours: {X}:00-{X}:00. Best days: {day1}, {day2}. Moving to schedule recommendations."

## Next step

Proceed to Skill 2: Schedule Recommendations.
