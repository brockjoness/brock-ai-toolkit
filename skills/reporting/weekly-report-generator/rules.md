# Weekly Report Generator -- Rules

## Report Structure

Every weekly report follows this structure:

### 1. Executive Summary (3 sentences max)
- Sentence 1: Overall performance vs. target (up/down/flat + by how much)
- Sentence 2: What drove the result (specific campaign, creative, or audience)
- Sentence 3: Primary recommendation for next week

### 2. Spend vs. Budget Tracker
- Total spend this week
- Total budget for the period
- Pacing: on track / underspent / overspent (% variance)
- Spend by platform (if multi-platform)

### 3. Key Metrics Table

| Metric | This Week | Last Week | WoW Change | Target |
|---|---|---|---|---|
| Spend | | | | |
| ROAS | | | | |
| CPA | | | | |
| CTR | | | | |
| CPM | | | | |
| CVR | | | | |
| Purchases | | | | |
| Revenue | | | | |

### 4. Top Performing Ads (3-5)
For each:
- Ad name / creative description
- Key metrics (ROAS, CPA, CTR)
- Why it's winning (creative angle, audience, format)
- Recommendation: scale, iterate, or maintain

### 5. Bottom Performing Ads (2-3)
For each:
- Ad name / creative description
- Key metrics
- Diagnosis: why it's underperforming
- Recommendation: cut, revise, or give more time

### 6. Week-Over-Week Trends
- Metric trend lines (ROAS, CPA, CTR over past 4 weeks if data available)
- Fatigue signals (frequency > threshold, declining thumb-stop rate)
- Budget pacing trend

### 7. Strategic Recommendations (2-3 action items)
Each recommendation must include:
- **What:** specific action to take
- **Why:** data point that drives this recommendation
- **Expected impact:** what we expect to change
- **Owner:** Brock / Platform / Client

### 8. Next Week's Plan
- Campaigns to scale/cut/launch
- Creative tests planned
- Budget adjustments
- Any client action items needed

## Metric Rules

Reference the shared metric definitions:
- **ROAS:** Revenue / Spend (do not compute if revenue absent)
- **CPA:** Spend / Purchases (do not compute if purchases absent)
- **CTR:** Link Clicks / Impressions (use link clicks, not all clicks)
- **CPM:** Spend / Impressions x 1000
- **CVR:** Purchases / Link Clicks
- **Frequency:** Impressions / Reach (flag if >= 3.0 prospecting, >= 6.0 retargeting)

See `./fulfilment/meta-audit-post-access/skills/knowledge-metrics.md` for full definitions.
See `./fulfilment/meta-audit-post-access/skills/knowledge-thresholds.md` for fatigue/classification thresholds.

## Formatting Rules

- No emojis
- No em dashes
- Numbers: use commas for thousands (1,234), dollar sign for money ($1,234.56), percentage for rates (12.3%)
- Trends: use directional arrows in HTML (up arrow green, down arrow red, flat arrow gray)
- Round percentages to 1 decimal place
- Round dollar amounts to 2 decimal places

## Classification Rules

Minimum thresholds for labeling an ad as top/bottom performer:
- Spend >= $200 AND at least 3 purchases (for ROAS/CPA-based ranking)
- If purchases unavailable: use CTR + CPM for ranking (note: "Ranked by engagement -- conversion data unavailable")

## Deployment

- HTML report deployed to Vercel: `./reports/{client-slug}/week-{YYYY-MM-DD}/`
- Uses dark theme base styles from `2-onboarding/skills/pre-onboarding/templates/_base-styles.html`
- Agency branding injected from `brands/{slug}/brand.md`
- Each report is a separate Vercel deployment
- File structure: `index.html`, `package.json`, `api/og.js`
