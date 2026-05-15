# Audience Analyzer -- Workflow

## Trigger

Activated by:
- "Audience analysis for [Client]" | "Analyze audiences for [Client]"
- "Which audiences are performing best?" | "Audience breakdown"
- "Build targeting recommendations for [Client]"
- Upload of ad set-level performance data or customer list

## Skill Chain

```
Skill 0: Parse & Segment Data
    |
Skill 1: Segment Performance Analysis
    |
Skill 2: Targeting Recommendations
```

## Before Starting

Confirm scope:
> "Analyzing audiences for **{Client Name}**. Data sources: {list}. Running: segment analysis, overlap check, targeting recommendations."

## Input Sources

| Source | How It Arrives | What It Provides |
|---|---|---|
| Ad set-level performance export | CSV/XLSX from Meta/Google | Audience name, spend, impressions, clicks, conversions, revenue per ad set |
| Meta Audience Insights | Screenshot or text description | Demographics, interests, behaviors of a custom audience |
| Google Analytics audience report | CSV/XLSX or pasted data | Audience segments with session, conversion, revenue data |
| Customer list | CSV with purchase history | Email, purchase count, total revenue, last purchase date |
| Demographic breakdown | Meta/Google age/gender/location report | Performance by demographic cell |
| Client context | CRM + context.md | Target audience description, current targeting approach |

## Context Flow

`AUDIENCE_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug`
- `platform` (Meta / Google / both)
- `data_type` (ad set performance / customer list / demographic / mixed)
- `segments[]` (array of audience segment objects with normalized metrics)
- `demographics[]` (array of demographic breakdowns if available)
- `customer_cohorts[]` (array of RFM segments if customer list provided)
- `baseline_metrics` (account-level averages for comparison)

## Final Output

```
--- AUDIENCE ANALYSIS ---

Client: {Client Name}
Platform: {platform}
Data: {date range, total spend, total audiences analyzed}

TOP SEGMENTS:
  1. {Audience Name} -- ROAS {X}, CPA ${X}, ${spend} spent [Scale]
  2. {Audience Name} -- ROAS {X}, CPA ${X}, ${spend} spent [Scale]

AVERAGE SEGMENTS:
  {List with metrics and actions}

WEAK SEGMENTS:
  {List with metrics and actions}

OVERLAP ALERTS:
  {Audience A} x {Audience B}: ~{X}% overlap -- {recommendation}

DEMOGRAPHIC HIGHLIGHTS:
  Best: {Age/Gender} -- ROAS {X}, CPA ${X}
  Worst: {Age/Gender} -- ROAS {X}, CPA ${X}

TARGETING RECOMMENDATIONS:
  1. {Recommendation with rationale}
  2. {Recommendation with rationale}
  3. {Recommendation with rationale}

LOOKALIKE STRATEGY:
  {Seed audience} -> {1%/3%/5% recommendation with budget}

Options:
  a) Generate creative briefs by segment -- tailored messaging per audience
  b) Export targeting plan for campaign setup
  c) View full demographic breakdown
```

## Error Handling

- If no conversion data: analyze by CTR/CPM only, note limitation
- If only one audience in data: present individual analysis, cannot rank
- If customer list provided without purchase data: segment by email domain/source only, note limitation
