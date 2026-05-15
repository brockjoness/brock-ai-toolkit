# Test Analyzer -- Workflow

## Trigger

Activated by:
- "Analyze this creative test" | "Test results for [Client]"
- "Which ads are winning?" | "Creative test analysis"
- Upload of CSV/XLSX with ad-level performance data
- Chained from weekly report when test data is detected

## Skill Chain

```
Skill 0: Parse & Validate Data
    |
Skill 1: Statistical Analysis (winner/loser classification)
    |
Skill 2: Element Extraction (what made the winner win)
    |
Skill 3: Next Round Brief (iteration recommendations)
```

## Before Starting

Confirm scope:
> "Analyzing creative test for **{Client Name}**. {X} ads, {date range}, ${total spend}. Checking for winners."

## Input Sources

| Source | Format | What It Provides |
|---|---|---|
| Meta Ads Manager export | CSV/XLSX | Ad Name, Spend, Impressions, Clicks, CTR, Conversions, Revenue, ROAS, Frequency |
| Google Ads export | CSV/XLSX | Ad Name, Cost, Impressions, Clicks, CTR, Conversions, Conv. Value, CPA |
| Manual input | Conversational | Ad names + key metrics provided by Brock |

## Context Flow

`TEST_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug`
- `platform` (Meta / Google / both)
- `date_range` (start and end dates of the test)
- `test_type` (angle test / format test / copy test / CTA test / mixed)
- `ads[]` (array of ad objects with normalized metrics)
- `baseline_metrics` (account-level averages for comparison, if available)

## Final Output

Present in conversation:

```
--- CREATIVE TEST RESULTS ---

Test: {test_type} for {Client Name}
Period: {date_range} | Total Spend: ${X}
Platform: {platform}

WINNERS:
  {Ad Name} -- ROAS {X}, CPA ${X}, CTR {X}% [Confidence: High/Moderate]
  Winning elements: {specific elements}

MIDDLE:
  {Ad Name} -- ROAS {X}, CPA ${X}, CTR {X}% [extend test / cut]

LOSERS:
  {Ad Name} -- ROAS {X}, CPA ${X}, CTR {X}% [Confidence: High/Moderate]

NEXT ROUND:
  1. {Iteration recommendation}
  2. {Iteration recommendation}
  3. {Iteration recommendation}

Options:
  a) Generate iteration briefs -- feed winners into creative-brief-generator
  b) View detailed breakdown -- full per-ad analysis
  c) Export summary -- formatted for client reporting
```

## Error Handling

- If CSV has no spend/conversion columns: ask Brock to confirm column mapping
- If all ads have <$200 spend: note insufficient sample, recommend extending the test
- If only 1 ad in the data: this is not a test -- present individual ad analysis instead
