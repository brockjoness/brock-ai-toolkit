# SKILL 3: Next Round Brief

## When to use

After Skill 2 has extracted winning and losing elements. Generates iteration recommendations and briefs for the next round of creative testing.

## Inputs

- `EXTRACTION_OUTPUT` from Skill 2 (winning/losing patterns, elements to carry forward)
- `ANALYSIS_OUTPUT` from Skill 1 (classification results, confidence levels)
- `TEST_CONTEXT` from Skill 0 (client info, platform)

## What to do

### Step 1: Determine iteration strategy

Based on the test results, select the appropriate next step:

| Result | Strategy |
|---|---|
| Clear winner (High confidence) | Scale winner + iterate with new variants on winning angle |
| Clear winner (Moderate confidence) | Extend test for more data + begin iteration variants |
| No clear winner (all similar) | Test new angles entirely -- current angles may be exhausted |
| All underperforming vs. account baseline | Revisit offer/audience/landing page before more creative tests |
| Fatigue detected on winner | Refresh execution (new visuals, same angle) |

### Step 2: Generate iteration recommendations

Create 3 specific, actionable recommendations:

**Recommendation format:**
```
{Number}. {Action} -- {Rationale}
   Test: {What specifically to test}
   Variant count: {How many variants}
   Priority: {High / Medium / Low}
```

**Iteration hierarchy (test in this order):**
1. **Angle iteration** -- winning angle, new executions (highest impact)
2. **Format expansion** -- winning angle in new formats (e.g., static winner -> video version)
3. **Copy iteration** -- winning angle + format, new headlines/hooks
4. **CTA optimization** -- winning everything else, test CTA variants (lowest impact)

### Step 3: Generate iteration briefs

For each recommendation, produce a mini creative brief:

```
--- ITERATION BRIEF {N} ---

Based on: {Winning ad name} (ROAS {X}, CPA ${X})
Iteration type: {angle iteration / format expansion / copy iteration / CTA test}

KEEP (from winner):
  - {Element 1 to preserve}
  - {Element 2 to preserve}

CHANGE:
  - {What to change and why}

VARIANTS TO PRODUCE:
  1. {Variant description}
  2. {Variant description}
  3. {Variant description}

AVOID (from losers):
  - {Element that underperformed}

SUCCESS CRITERIA:
  - Beat current winner's {metric}: {target value}
  - Minimum test: ${spend} over {days} days
```

### Step 4: Budget recommendation for next round

Based on current test spend and results:

```
NEXT ROUND BUDGET:
  Recommended: ${X} over {X} days
  Split: {X} variants x ${X}/variant minimum
  Monitor: Daily check, call at ${spend threshold} or {conversion threshold}
```

### Step 5: Present final output

Combine all outputs and present:

```
--- CREATIVE TEST RESULTS ---

Test: {test_type} for {Client Name}
Period: {date_range} | Total Spend: ${X}
Platform: {platform}

WINNERS:
  {Ranked winner list with metrics and confidence}

MIDDLE:
  {Middle ads with recommendation: extend or cut}

LOSERS:
  {Ranked loser list with reason}

KEY INSIGHT: {one-sentence takeaway}

WINNING ELEMENTS:
  {Bulleted list of elements to carry forward}

NEXT ROUND RECOMMENDATIONS:
  1. {Recommendation with brief}
  2. {Recommendation with brief}
  3. {Recommendation with brief}

BUDGET: ${X} over {X} days

Options:
  a) Generate full iteration briefs -- feed into creative-brief-generator for production
  b) View detailed per-ad breakdown
  c) Export summary for client reporting
```

## Routing

If Brock selects option (a):
- Package the iteration briefs and feed them to the `creative-brief-generator` skill at `3-fulfilment/skills/creative-brief-generator/`
- The creative brief generator accepts this as `manual_input` with the winning elements as context
- From there, the chain continues: creative-brief-generator -> creative-generator -> HTML mockups

If Brock selects option (b):
- Present the full per-ad analysis table with all metrics

If Brock selects option (c):
- Format findings in a client-friendly summary (no internal jargon, no "Skill" references)
