# QBR Generator -- Workflow

## Trigger

Activated by:
- "QBR for [Client]"
- "Quarterly review for [Client]"
- "Generate quarterly business review for [Client]"
- "Q{X} review for [Client]"
- Upload of 90 days of performance data with QBR intent

## Skill Chain

```
Skill 0: Parse & Validate 90-Day Data
    |
Skill 1: Compute Quarterly Metrics & QoQ Comparison
    |
Skill 2: Platform Deep Dives (Meta, Google, Klaviyo)
    |
Skill 3: Creative & Audience Analysis
    |
Skill 4: Identify Achievements & Diagnose Challenges
    |
Skill 5: Build Next Quarter Strategy
    |
Skill 6: Generate Strategic Narrative & HTML Report
    |
Skill 7: Deploy to Vercel
```

## Before Starting

Confirm scope:
> "Generating QBR for **{Client}** ({Agency}) -- **Q{X} {Year}** ({Start Date} to {End Date}). Platforms: {Meta / Google / Klaviyo / combination}. Prior quarter data available: {Yes / No}. Client notes/context available: {Yes / No}."

Gather additional context if not provided:
> "To build the strongest QBR, I need:"
> 1. "Performance data covering the full quarter (CSV/XLSX from Meta, Google, Klaviyo)"
> 2. "Agreed targets for the quarter (ROAS, CPA, revenue, spend)"
> 3. "Key wins or milestones to highlight (optional -- I can identify from data)"
> 4. "Known challenges or client concerns to address"
> 5. "Any strategic context for next quarter (budget changes, new products, seasonal events)"

## Input

| Source | Format | What It Provides |
|---|---|---|
| Meta Ads data | CSV/XLSX (90 days) | Spend, impressions, clicks, conversions, revenue, creative performance |
| Google Ads data | CSV/XLSX (90 days) | Cost, impressions, clicks, conversions, revenue by campaign type |
| Klaviyo data | CSV/XLSX (90 days, optional) | Email/SMS revenue, open rates, click rates, flow vs. campaign |
| Client context | `brands/{slug}/clients/{slug}/context.md` | Targets, contract details, historical notes |
| Prior quarter data | Previous QBR or CSV (optional) | QoQ comparison baseline |
| Brock's notes | Manual input | Key wins, challenges, strategic context |

### Minimum Required
- At least one platform's performance data covering 60+ days of the quarter
- Spend and impressions columns minimum

## Context Flow

`QBR_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug`, `client_slug`
- `quarter` (e.g., "Q1 2026"), `date_range`
- `platforms` (Meta, Google, Klaviyo, or combination)
- `quarterly_budget`, `quarterly_targets` (ROAS, CPA, revenue)
- `current_quarter_data{}` (per-platform parsed data)
- `prior_quarter_data{}` (if available)
- `monthly_breakdowns[]` (Month 1, Month 2, Month 3 aggregates)
- `client_context` (from context.md)
- `qualitative_notes` (wins, challenges, strategic context from Brock)

## Step-by-Step Execution

### Step 0: Parse & Validate
1. Identify all data files and their platform sources
2. Map columns to standard metric names per platform (state mapping)
3. Validate date range covers the quarter (flag if partial, note coverage percentage)
4. Parse into monthly segments (Month 1, Month 2, Month 3)
5. Load client context and targets from context.md
6. If prior quarter data available, parse for QoQ comparison

### Step 1: Quarterly Metrics & QoQ
1. Aggregate quarterly totals: spend, revenue, ROAS, CPA, CTR, CPM, conversions
2. Compute monthly progression within the quarter (Month 1 > Month 2 > Month 3 trajectory)
3. If prior quarter data: compute QoQ change (absolute and percentage) for all headline metrics
4. Compare actuals to quarterly targets, compute variance
5. Identify the headline: what is the single most important number from this quarter?

### Step 2: Platform Deep Dives
1. Segment data by platform
2. For each platform, compute full metric set for the quarter
3. Identify top 3-5 campaigns per platform by ROAS (minimum qualifying spend)
4. Analyze campaign-type performance (prospecting/retargeting/ASC for Meta; Search/Shopping/Display for Google)
5. Surface platform-specific trends and shifts across the 90 days

### Step 3: Creative & Audience Analysis
1. Group creatives by theme/angle, compute aggregate quarterly performance per theme
2. Analyze format performance (UGC vs static vs video vs carousel) across the quarter
3. Identify creative lifecycle patterns (sustained performers vs. fatigued creatives)
4. Analyze audience segment performance (prospecting pools, retargeting efficiency)
5. Identify audience growth or contraction trends

### Step 4: Achievements & Challenges
1. Identify top 3-5 achievements from the data (biggest ROAS wins, scale milestones, efficiency improvements)
2. Frame each achievement with supporting metrics and what drove it
3. Identify challenges and underperformance areas
4. Diagnose root causes for each challenge
5. Document what corrective actions were taken and their status
6. Incorporate Brock's qualitative notes on wins and challenges

### Step 5: Next Quarter Strategy
1. Based on quarter performance, draft budget allocation for next quarter (specific dollar amounts per platform)
2. Recommend creative direction based on what themes and formats won
3. Build a testing roadmap: 3-5 specific tests with hypotheses and success metrics
4. Propose audience strategy adjustments
5. Identify new opportunities (channels, tactics, seasonal events)
6. Ensure every recommendation has a measurable success metric

### Step 6: Build Report
1. Load base styles from `2-onboarding/skills/pre-onboarding/templates/_base-styles.html`
2. Load agency branding from `brands/{slug}/brand.md`
3. Render all sections per rules.md structure
4. Write in strategic partner voice per tone guidelines
5. Build appendix with full data tables
6. Validate all metrics and sections render correctly

### Step 7: Deploy to Vercel
1. Structure deployment: `./reports/{client-slug}/qbr-{YYYY}-q{X}/`
2. Create `index.html`, `package.json`, `api/og.js`
3. Deploy and capture URL

## Final Output

Present QBR highlights in conversation, then confirm:
> "QBR generated for **{Client}** -- **Q{X} {Year}**."
> **Report URL:** {vercel_url}
>
> **Quarter headline:** {single most important takeaway}
>
> **Top 3 wins:**
> 1. {win with metric}
> 2. {win with metric}
> 3. {win with metric}
>
> **Key challenge addressed:** {challenge + corrective action}
>
> **Next quarter recommendation:** {budget split + primary strategic direction}
>
> Options:
> 1. **Deploy only** -- QBR is live at the URL
> 2. **Draft delivery email** -- draft a client email scheduling the QBR presentation
> 3. **Refine** -- adjust sections, add context, or modify recommendations
> 4. **Presentation mode** -- structure the QBR as talking points for a live client call

## Cadence

- QBRs cover full calendar quarters (Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec)
- Generated within the first 2 weeks of the new quarter
- Delivered to client via scheduled presentation meeting

## Error Handling

- Less than 60 days of data: flag "Partial quarter -- {X} days of data. Metrics may not reflect full quarterly performance."
- No prior quarter data: skip QoQ comparison, note "First QBR -- no quarter-over-quarter comparison available"
- Single platform only: produce single-platform QBR, skip cross-platform comparison
- Missing revenue data: skip revenue attribution and ROAS sections, note "Revenue data unavailable -- engagement and efficiency analysis only"
- No Klaviyo data: skip Klaviyo platform deep dive, note "Email/SMS data not included"
- No client context file: ask for targets and contract details manually
- Missing creative-level data: skip creative performance evolution section, note "Creative-level breakdowns unavailable -- campaign-level analysis only"
- Empty dataset: stop and flag to Brock
