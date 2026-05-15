# Churn Risk Detector -- Rules

## Data Source

Current input: CSV/XLSX upload with performance data + manual qualitative notes. Future: Will query Supabase client_metrics table directly when data pipeline is operational.

## Risk Signal Definitions & Weights

### Quantitative Signals (from performance data)

| Signal | Condition | Weight | Score |
|---|---|---|---|
| ROAS decline | 3+ consecutive weeks of declining ROAS | 20 | 0-20 |
| CPA inflation | CPA increased >15% over past 4 weeks | 15 | 0-15 |
| Spend reduction | Client-initiated spend decrease >10% MoM | 20 | 0-20 |
| Revenue decline | Revenue dropped >15% MoM (not due to spend cut) | 10 | 0-10 |
| Below target | ROAS or CPA consistently below agreed targets for 3+ weeks | 15 | 0-15 |

### Qualitative Signals (from manual input or CRM)

| Signal | Condition | Weight | Score |
|---|---|---|---|
| Slow response | Average email/Slack response time >48 hours | 10 | 0-10 |
| Missed meetings | 2+ missed or cancelled meetings in past month | 10 | 0-10 |
| Scope complaints | Client has raised scope or pricing concerns | 15 | 0-15 |
| Competitor mentions | Client has mentioned competitor agencies or in-housing | 20 | 0-20 |
| Contract timing | Within 60 days of contract renewal | 10 | 0-10 |
| Reduced communication | Noticeable drop in client-initiated communication | 5 | 0-5 |

### Scoring

- Each signal is scored proportionally within its weight range based on severity
- Total possible score: 150
- Risk levels:

| Score Range | Risk Level | Color Code |
|---|---|---|
| 0-25 | Low | Green |
| 26-50 | Medium | Yellow |
| 51-80 | High | Orange |
| 81+ | Critical | Red |

## Output Format

### Per-Client Risk Card

```
--- CLIENT RISK ASSESSMENT ---

Client: {Client Name}
Agency: {Agency Name}
Risk Level: {LOW / MEDIUM / HIGH / CRITICAL}
Composite Score: {X} / 150
Trend: {Rising / Stable / Declining} (vs. last assessment if available)

TOP CONTRIBUTING FACTORS:
  1. {Signal name} -- {specific data point} (score: {X}/{max})
  2. {Signal name} -- {specific data point} (score: {X}/{max})
  3. {Signal name} -- {specific data point} (score: {X}/{max})

RECOMMENDED INTERVENTION:
  Action: {specific action}
  Owner: {Brock / Account Manager / Team}
  Timeline: {immediate / this week / before renewal}
  Goal: {what this intervention should achieve}
```

### Portfolio Summary (when assessing multiple clients)

| Client | Risk Level | Score | Top Signal | Recommended Action | Urgency |
|---|---|---|---|---|---|
| | | | | | |

Sorted by score descending (highest risk first).

## Intervention Playbook

| Risk Level | Default Interventions |
|---|---|
| Low | Standard service. Include in next scheduled check-in. |
| Medium | Proactive outreach within 1 week. Share a performance win or insight. Schedule extra touchpoint. |
| High | Schedule urgent strategy call within 3 days. Prepare value demonstration (results summary, competitive benchmarks). Address specific concerns. Consider QBR acceleration. |
| Critical | Same-day outreach from Brock. Prepare retention package (QBR, results showcase, scope review, pricing discussion if applicable). All-hands response. |

## Assessment Frequency

- Full portfolio scan: monthly
- Individual client check: on-demand or when triggered by performance data
- Post-QBR reassessment: within 1 week of QBR delivery

## Formatting Rules

- No emojis
- No em dashes in output
- Risk levels: ALL CAPS
- Scores: always show as X / max
- Percentages: 1 decimal place
- Dollar amounts: 2 decimal places with commas
