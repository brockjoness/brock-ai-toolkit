# SKILL 2: Schedule Recommendations

## When to use

After Skill 1 has completed daypart and day-of-week analysis.

## Inputs

- `DAYPART_ANALYSIS_OUTPUT` from Skill 1
- `ENGAGEMENT_CONTEXT` from Skill 0
- Client context (current schedule, budget, platform)

## What to do

### Step 1: Generate hourly bid adjustments (Google Ads)

Google Ads supports ad schedule bid adjustments. Translate daypart analysis to bid modifiers:

```
GOOGLE ADS SCHEDULE:
| Time Block | Days | Bid Adjustment | Rationale |
|------------|------|----------------|-----------|
| {peak start}-{peak end} | Mon-Fri | +{X}% | Peak performance window |
| {secondary start}-{secondary end} | Mon-Fri | +{X}% | Strong secondary window |
| {off-peak start}-{off-peak end} | All | -{X}% | CPA {X}% above average |
| All day | {best day} | +{X}% | Best ROAS day |
| All day | {worst day} | -{X}% | Worst CPA day |
```

Bid adjustment formula:
- Peak hours (CPA 25%+ below avg): +15% to +30%
- Strong hours (CPA 10-25% below avg): +5% to +15%
- Average hours: no adjustment
- Weak hours (CPA 10-25% above avg): -10% to -20%
- Off-peak hours (CPA 25%+ above avg): -20% to -40%

### Step 2: Generate Meta scheduling recommendations

Meta doesn't support granular bid adjustments by hour, but supports:

**Option A: Budget scheduling (CBO with schedule)**
```
META BUDGET SCHEDULE:
  Campaign budget: ${daily total}
  Peak hours ({start}-{end}): Allow delivery (primary)
  Off-peak hours ({start}-{end}): Consider pausing or reducing

  Note: Meta's algorithm auto-optimizes delivery timing with CBO.
  Only apply manual scheduling if CPA data strongly supports it (>25% variance).
```

**Option B: Separate campaigns by daypart**
- Campaign A: "Peak Hours" -- scheduled {start}-{end}, higher budget
- Campaign B: "Off-Peak" -- remaining hours, lower budget

Only recommend Option B if peak/off-peak CPA variance is >30%.

### Step 3: Generate day-of-week budget weighting

```
WEEKLY BUDGET DISTRIBUTION:
| Day | Current % | Recommended % | Change | Rationale |
|-----|-----------|---------------|--------|-----------|
| Mon | {X}% | {X}% | {+/-X}% | {reason} |
| Tue | {X}% | {X}% | {+/-X}% | {reason} |
| Wed | {X}% | {X}% | {+/-X}% | {reason} |
| Thu | {X}% | {X}% | {+/-X}% | {reason} |
| Fri | {X}% | {X}% | {+/-X}% | {reason} |
| Sat | {X}% | {X}% | {+/-X}% | {reason} |
| Sun | {X}% | {X}% | {+/-X}% | {reason} |
```

Rules:
- No single day should exceed 20% of weekly budget (unless data strongly supports it)
- No day should be below 8% (need minimum delivery for learning)
- Weekend vs. weekday split should reflect actual performance, not assumptions

### Step 4: Generate implementation checklist

```
IMPLEMENTATION STEPS:
  1. [ ] {Platform}: Set ad schedule for {peak hours}
  2. [ ] {Platform}: Apply bid adjustments ({specific percentages})
  3. [ ] Adjust daily budgets for day-of-week weighting
  4. [ ] Set calendar reminder: review schedule performance in 2 weeks
  5. [ ] Run this analysis again after 2 weeks to validate patterns hold
```

### Step 5: Caveats and monitoring

```
IMPORTANT NOTES:
  - These patterns are based on {X} days of data. Validate with 4+ weeks before hard-committing.
  - Seasonal shifts (holidays, events) will change patterns -- re-run quarterly.
  - Algorithm delivery optimization (Meta CBO, Google Smart Bidding) already accounts for some timing patterns. Manual overrides should only be applied when the data shows strong, consistent variance.
  - If performance degrades after schedule changes, revert within 48 hours.
```

### Step 6: Present final output

```
--- ENGAGEMENT ANALYSIS ---

Client: {Client Name}
Platform: {platform}
Period: {date_range}

PEAK HOURS: {start}:00 - {end}:00 -- CPA ${X} ({X}% below avg)
SECONDARY: {start}:00 - {end}:00 -- CPA ${X} ({X}% below avg)
OFF-PEAK: {start}:00 - {end}:00 -- CPA ${X} ({X}% above avg)

BEST DAYS: {Day1} ({X}% of weekly conv), {Day2}
WORST DAYS: {Day1} (CPA ${X}, {X}% above avg)

ESTIMATED CPA IMPROVEMENT: {X}% (from ${current} to ~${optimized})

SCHEDULE RECOMMENDATIONS:
  {Platform-specific bid/budget adjustments}

WEEKLY BUDGET WEIGHTING:
  {Day-by-day table}

Options:
  a) Export schedule as campaign settings guide
  b) Include in weekly report as engagement section
  c) View full hourly heatmap
```

## Routing

Option (a): Format as a clean implementation checklist for campaign setup
Option (b): Package as a section for the weekly-report-generator at `4-reporting/skills/weekly-report-generator/`
Option (c): Present the full 24x7 heatmap
