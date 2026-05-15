# SKILL 2: Targeting Recommendations

## When to use

After Skill 1 has analyzed and classified all audience segments.

## Inputs

- `SEGMENT_ANALYSIS_OUTPUT` from Skill 1
- `AUDIENCE_CONTEXT` from Skill 0
- Client context (current targeting setup, goals, budget)

## What to do

### Step 1: Generate budget reallocation plan

Based on segment tiers, recommend budget shifts:

```
BUDGET REALLOCATION:
| Segment | Current % | Recommended % | Change | Rationale |
|---------|-----------|---------------|--------|-----------|
| {Top segment} | {X}% | {X}% | +{X}% | Scale -- best ROAS |
| {Weak segment} | {X}% | {X}% | -{X}% | Cut -- CPA too high |
```

Rules:
- Shift budget FROM Weak/Cut segments TO Top/Strong segments
- Never recommend >50% of budget in a single audience (concentration risk)
- Retargeting should be 10-20% of total budget (not more)
- Keep at least 20% in broad/prospecting for new customer acquisition

### Step 2: Generate lookalike recommendations

For each Top/Strong segment, recommend lookalike strategy:

```
LOOKALIKE STRATEGY:
| Source Audience | Seed Size | Recommended LALs | Budget | Priority |
|----------------|-----------|-------------------|--------|----------|
| {Top segment} | {X} | 1% (first), then 3% | ${X}/day | High |
| {Strong segment} | {X} | 1% test | ${X}/day | Medium |
```

Platform-specific:
- **Meta:** Custom Audience -> Lookalike. Recommend 1% first, expand to 3%/5% after validation.
- **Google:** Customer Match -> Similar Audiences. Or use Optimized Targeting with seed audience signals.

### Step 3: Generate interest/behavior targeting recommendations

Based on top-performing audience characteristics:

```
INTEREST TARGETING:
| Interest Stack | Rationale | Platform | Priority |
|----------------|-----------|----------|----------|
| {Interest 1 + Interest 2} | Maps to top segment profile | Meta | High |
| {In-market: category} | Aligns with buyer demographics | Google | Medium |
```

Only recommend interests that are:
- Supported by demographic data (the top-performing age/gender maps to this interest)
- Relevant to the product/service
- Specific enough to be actionable (not "Shopping" but "Luxury Skincare Shoppers")

### Step 4: Generate daypart/geo recommendations (if data supports)

If hourly or geographic breakdowns are available:

```
DAYPART OPTIMIZATION:
  Best hours: {X}:00 - {X}:00 (CPA ${X} vs. ${X} average)
  Best days: {day1}, {day2}
  Recommendation: {Increase bids during peak / Use ad scheduling}

GEOGRAPHIC HIGHLIGHTS:
  Top regions: {list with CPA/ROAS}
  Underperforming: {list}
  Recommendation: {Geo-specific budget weighting}
```

### Step 5: Generate audience-specific creative recommendations

Map top audiences to creative approaches:

```
AUDIENCE x CREATIVE MATRIX:
| Audience | Messaging Angle | Why |
|----------|-----------------|-----|
| {Top segment: LAL Purchasers} | Social proof + results | They mirror existing buyers -- show proof |
| {Top segment: Interest Stack} | Education + pain point | Cold audience -- need awareness first |
| {Retargeting: ATC} | Urgency + discount | Already showed intent -- close the deal |
```

If Brock selects option (a) from the final output, feed this matrix to `creative-brief-generator` to produce segment-specific briefs.

### Step 6: Generate exclusion recommendations

```
EXCLUSION LIST:
| Exclude | From | Reason |
|---------|------|--------|
| Recent purchasers (7-14 days) | All prospecting | Waste prevention |
| {Weak demographic} | All campaigns | CPA {X}% above average |
| {Overlapping audience} | {Competing campaign} | Auction overlap |
```

### Step 7: Present final output

Combine all analysis and recommendations:

```
--- AUDIENCE ANALYSIS ---

Client: {Client Name}
Platform: {platform}
Data: {date range}, ${total spend}, {X} segments analyzed

TOP SEGMENTS:
  {Ranked list with metrics and tier}

AVERAGE/WEAK/CUT SEGMENTS:
  {With specific actions}

OVERLAP ALERTS:
  {Pairs with consolidation recs}

DEMOGRAPHIC HIGHLIGHTS:
  Best: {segment} -- ROAS {X}
  Worst: {segment} -- CPA ${X}

BUDGET REALLOCATION:
  {Table with current vs. recommended}

LOOKALIKE STRATEGY:
  {Seed -> LAL recommendations}

TARGETING RECOMMENDATIONS:
  1. {With rationale and priority}
  2. {With rationale and priority}
  3. {With rationale and priority}

EXCLUSIONS:
  {List with reasons}

Options:
  a) Generate creative briefs by segment -- tailored messaging per audience
  b) Export targeting plan for campaign setup
  c) View full demographic breakdown
  d) Feed insights into weekly report
```

## Routing

Option (a): Feed audience x creative matrix to `creative-brief-generator` at `3-fulfilment/skills/creative-brief-generator/`
Option (b): Format as a clean implementation checklist
Option (c): Present full demographic heatmap
Option (d): Package key findings for inclusion in next weekly report
