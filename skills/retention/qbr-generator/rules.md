# QBR Generator -- Rules

## Data Source

Current input: CSV/XLSX upload with 90 days of performance data + client context notes. Future: Will query Supabase client_metrics table directly when data pipeline is operational.

## Report Structure

Every QBR follows this structure:

### 1. Quarter in Review (Headline Metrics)

| Metric | Q Target | Q Actual | vs. Target | vs. Prior Q | Trend |
|---|---|---|---|---|---|
| Total Spend | | | | | |
| Total Revenue | | | | | |
| Blended ROAS | | | | | |
| Blended CPA | | | | | |
| Total Conversions | | | | | |
| Avg. CTR | | | | | |
| Avg. CPM | | | | | |

Include a 1-2 sentence headline: "This quarter, {Client} achieved {headline metric} -- {context}."

### 2. Key Achievements (Top 3-5 Wins)
For each:
- Achievement headline (specific and data-backed)
- Supporting metrics (before vs. after, or absolute performance)
- What drove the result (strategy, creative, audience, timing)
- Business impact (revenue generated, efficiency gained, scale achieved)

### 3. Challenges & Learnings
For each challenge:
- What happened (specific, honest)
- Root cause diagnosis
- What was tried to address it
- Current status (resolved, in progress, requires client input)
- Learning extracted for future quarters

### 4. Platform Deep Dives

#### Meta Ads
- Spend, ROAS, CPA, CTR, CPM for the quarter
- Campaign-level top performers
- Audience performance (prospecting vs retargeting vs ASC)
- Key trends and shifts during the quarter

#### Google Ads
- Spend, ROAS, CPA, CTR, CPM for the quarter
- Campaign-level top performers (Search, Shopping, Display, YouTube)
- Keyword and audience insights
- Key trends and shifts

#### Klaviyo (if applicable)
- Email revenue, open rates, click rates, conversion rates
- Flow performance vs. campaign performance
- List growth and segmentation health
- Key trends and shifts

### 5. Creative Performance Evolution
- Creative themes that won this quarter (with metrics)
- Format performance comparison (UGC, static, video, carousel) across 90 days
- Creative lifecycle analysis (which creatives sustained, which fatigued)
- Creative direction that emerged as the strongest for this brand

### 6. Audience Growth & Segmentation
- Audience size trends (prospecting pools, retargeting pools)
- New audience segments tested and their performance
- Audience overlap and saturation signals
- Recommendations for audience strategy next quarter

### 7. Revenue Attribution
- Revenue by platform (Meta, Google, Klaviyo)
- Revenue by campaign type (prospecting, retargeting, email)
- Attribution model and window used (state clearly)
- Cross-platform attribution notes (overlap, potential double-counting)

### 8. Next Quarter Strategy

| Category | Recommendation | Rationale | Success Metric |
|---|---|---|---|
| Budget | {total and per-platform allocation} | | |
| Creative direction | {themes, formats, production plan} | | |
| Testing roadmap | {specific tests with hypotheses} | | |
| Audience strategy | {expansion, refinement, new segments} | | |
| New opportunities | {channels, tactics, offers to explore} | | |

Each recommendation must include a measurable success metric.

### 9. Appendix
- Full monthly data tables (Month 1, Month 2, Month 3)
- Campaign-level performance tables
- Creative-level performance tables (if available)
- Full metric definitions used in this report

## Tone & Voice

- This is a relationship document, not just an analytics report
- Celebrate wins genuinely -- these are shared achievements
- Address challenges as a partner who owns the problem, not a vendor making excuses
- Frame the next quarter as an opportunity, grounded in what the data taught this quarter
- Use "we" language (agency + client as a team)
- Avoid: blame, defensiveness, vague promises, generic recommendations

## Metric Rules

- **ROAS:** Revenue / Spend
- **CPA:** Spend / Purchases
- **CTR:** Link Clicks / Impressions
- **CPM:** Spend / Impressions x 1000
- **CVR:** Purchases / Link Clicks
- **QoQ Change:** ((This Quarter - Last Quarter) / Last Quarter) x 100

## Formatting Rules

- No emojis
- No em dashes
- Numbers: commas for thousands ($1,234), dollar sign for money, percentage for rates
- Trends: directional arrows in HTML (green up, red down, gray flat)
- Round percentages to 1 decimal place
- Round dollar amounts to 2 decimal places
- Quarter references: "Q1 2026" format

## Deployment

- HTML report deployed to Vercel: `./reports/{client-slug}/qbr-{YYYY}-q{X}/`
- Uses dark theme base styles from `2-onboarding/skills/pre-onboarding/templates/_base-styles.html`
- Agency branding injected from `brands/{slug}/brand.md`
- Each QBR is a separate Vercel deployment
- File structure: `index.html`, `package.json`, `api/og.js`
