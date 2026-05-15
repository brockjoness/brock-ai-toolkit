# Budget Pacing Monitor -- Rules

## Data Source

Current input: CSV/XLSX upload with daily spend data + monthly budget target (from client context or manual input). Future: Will query Supabase client_metrics table directly when data pipeline is operational.

## Pacing Calculation Logic

### Core Formula
- **Days in month:** calendar days in the current billing month
- **Days elapsed:** number of days from month start to the latest data date (inclusive)
- **Expected spend:** (Days elapsed / Days in month) x Monthly budget
- **Actual spend:** sum of daily spend through the latest data date
- **Pace variance:** ((Actual spend - Expected spend) / Expected spend) x 100
- **Daily run rate:** Actual spend / Days elapsed
- **Projected month-end spend:** Daily run rate x Days in month
- **Projected variance:** ((Projected month-end spend - Monthly budget) / Monthly budget) x 100

### Platform-Level Pacing
When multi-platform data is available, compute pacing independently for:
- Meta Ads
- Google Ads
- Combined total

## Alert Thresholds

| Pace Variance | Status | Alert Level |
|---|---|---|
| Within +/- 10% | On Track | No alert |
| +10% to +20% | Ahead of pace | Warning -- overspend risk |
| -10% to -15% | Behind pace | Warning -- underspend risk |
| > +20% | Significantly ahead | Critical -- overspend imminent |
| > -15% | Significantly behind | Critical -- underspend, budget underutilization |

## Output Format

### Pacing Status Card

```
--- BUDGET PACING CHECK ---

Client: {Client Name}
Period: {Month, Year}
Data through: {latest date in dataset}
Days elapsed: {X} / {X} ({X}% of month)

OVERALL STATUS: {ON TRACK / WARNING / CRITICAL}

Monthly budget:     ${X,XXX.XX}
Expected spend:     ${X,XXX.XX} (at this point in the month)
Actual spend:       ${X,XXX.XX}
Pace variance:      {+/-X.X}% ({$X,XXX ahead/behind})

Daily run rate:     ${X,XXX.XX}/day
Projected month-end: ${X,XXX.XX}
Projected variance:  {+/-X.X}% vs. budget

PLATFORM BREAKDOWN (if multi-platform):
  Meta:   ${X,XXX.XX} spent / ${X,XXX.XX} budget -- {status}
  Google: ${X,XXX.XX} spent / ${X,XXX.XX} budget -- {status}

RECOMMENDATION:
  {Specific budget adjustment to get back on pace}
  {e.g., "Reduce daily Meta budget by $XX to $XXX/day for remaining X days"}
```

### Alert Escalation

- **On Track:** present status card only, no action needed
- **Warning:** present status card + recommended daily budget adjustment
- **Critical:** present status card + URGENT label + specific same-day action + recommend notifying Brock

## Correction Formula

When pacing is off:
- **Remaining budget:** Monthly budget - Actual spend
- **Remaining days:** Days in month - Days elapsed
- **Required daily spend:** Remaining budget / Remaining days
- **Current daily run rate vs. required:** highlight the gap

## Formatting Rules

- No emojis
- No em dashes
- Dollar amounts: always use $ with commas and 2 decimal places ($1,234.56)
- Percentages: 1 decimal place (12.3%)
- Status labels: ALL CAPS for status (ON TRACK, WARNING, CRITICAL)
- Dates: YYYY-MM-DD format

## HTML Alert Card (Optional)

When requested, generate an HTML alert card using:
- Green background for On Track
- Yellow/amber background for Warning
- Red background for Critical
- Uses dark theme base styles from `2-onboarding/skills/pre-onboarding/templates/_base-styles.html`
- Agency branding injected from `brands/{slug}/brand.md`
