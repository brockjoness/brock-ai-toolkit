# Churn Risk Detector -- Workflow

## Trigger

Activated by:
- "Check churn risk for [Client]"
- "Client health check for [Client]"
- "Which clients are at risk?"
- "Retention scan"
- "Risk assessment for [Client]"
- Scheduled monthly portfolio scan

## Skill Chain

```
Skill 0: Gather & Parse Risk Inputs
    |
Skill 1: Score Quantitative Signals
    |
Skill 2: Score Qualitative Signals
    |
Skill 3: Compute Composite Score & Risk Level
    |
Skill 4: Generate Intervention Recommendations
```

## Before Starting

Confirm scope:
> "Running churn risk assessment for **{Client / All Clients}**. Data sources: {performance CSV / manual notes / both}."

If assessing a single client, confirm:
> "Assessing **{Client Name}** ({Agency}). Performance data period: {date range}. Qualitative signals: {provided / not provided}."

## Input

| Source | Format | What It Provides |
|---|---|---|
| Performance data | CSV/XLSX (weekly or monthly aggregates) | ROAS trend, CPA trend, spend changes, revenue trajectory |
| Client context | `brands/{slug}/clients/{slug}/context.md` | Contract dates, targets, historical notes |
| Qualitative notes | Manual input from Brock | Response times, meeting attendance, scope feedback, competitor mentions |
| Prior risk assessment | Previous output (if available) | Trend comparison (rising/stable/declining risk) |

### Minimum Required for Assessment
- At least 3 weeks of performance data (ROAS, spend minimum) for quantitative scoring
- OR qualitative signals alone (produces a qualitative-only assessment, flagged as partial)

## Context Flow

`CHURN_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug`, `client_slug`
- `assessment_date`
- `performance_data[]` (weekly aggregates: ROAS, CPA, spend, revenue)
- `contract_renewal_date` (from client context, if available)
- `targets` (agreed ROAS/CPA targets from client context)
- `qualitative_signals{}` (response_time, meetings_missed, scope_complaints, competitor_mentions, communication_trend)
- `prior_assessment` (previous risk score and level, if available)

## Step-by-Step Execution

### Step 0: Gather & Parse
1. If performance CSV provided: parse and compute weekly aggregates for the past 4-8 weeks
2. Load client context from `brands/{slug}/clients/{slug}/context.md` for contract dates and targets
3. If qualitative notes provided: parse into structured signals
4. If prior assessment exists: load for trend comparison
5. If assessing multiple clients: repeat for each client in the portfolio

### Step 1: Score Quantitative Signals
1. **ROAS decline:** check if ROAS has declined for 3+ consecutive weeks. Score 0-20 based on severity (5 per consecutive week beyond 2)
2. **CPA inflation:** compute 4-week CPA trend. If >15% increase, score proportionally up to 15
3. **Spend reduction:** compare current month spend to prior month. If client-initiated decrease >10%, score proportionally up to 20
4. **Revenue decline:** check if revenue dropped >15% MoM independent of spend changes. Score up to 10
5. **Below target:** compare ROAS/CPA to agreed targets. If below for 3+ weeks, score up to 15

### Step 2: Score Qualitative Signals
1. **Slow response:** if average response time data available and >48h, score up to 10
2. **Missed meetings:** count missed/cancelled meetings in past 30 days. 2+ triggers scoring up to 10
3. **Scope complaints:** if client has raised scope or pricing concerns, score up to 15 based on severity/frequency
4. **Competitor mentions:** if client has mentioned competitors or in-housing, score up to 20
5. **Contract timing:** check if renewal is within 60 days, score up to 10
6. **Reduced communication:** if noticeable drop in client-initiated messages, score up to 5
7. If qualitative signals are not provided: note "Qualitative signals not assessed -- quantitative only" and adjust max possible score

### Step 3: Composite Score & Level
1. Sum all signal scores
2. Map to risk level per rules.md thresholds
3. If prior assessment exists: compute trend (Rising if score increased >10 points, Declining if decreased >10 points, Stable otherwise)
4. Identify top 3 contributing factors by score

### Step 4: Intervention Recommendations
1. Match risk level to intervention playbook in rules.md
2. Customize recommendation based on the specific top contributing factors
3. Assign owner and timeline
4. If Critical: flag for immediate Brock attention

## Final Output

### Single Client
> **Churn Risk Assessment -- {Client Name}**
> **Risk Level: {LOW / MEDIUM / HIGH / CRITICAL}** (Score: {X}/150)
>
> {Risk card per rules.md format}
>
> Options:
> 1. **Schedule intervention** -- draft outreach email or meeting agenda
> 2. **Generate QBR** -- fast-track a quarterly business review for this client
> 3. **Reassess** -- add qualitative signals or update data

### Portfolio Scan
> **Portfolio Risk Summary -- {Date}**
>
> {Portfolio summary table per rules.md format}
>
> **Immediate attention needed:** {list of High/Critical clients}
>
> Options:
> 1. **Deep dive on [Client]** -- expand assessment for a specific client
> 2. **Draft retention plan** -- intervention plan for all at-risk clients
> 3. **Export summary** -- generate a shareable risk dashboard

## Error Handling

- Less than 3 weeks of performance data: note "Insufficient data for reliable quantitative scoring -- assessment is directional only"
- No qualitative signals provided: produce quantitative-only assessment, note max possible score is reduced
- No client context file found: skip contract timing signal, note "Client context unavailable -- contract renewal date unknown"
- No prior assessment available: skip trend analysis, note "First assessment -- no trend available"
- Empty dataset: stop and flag to Brock
