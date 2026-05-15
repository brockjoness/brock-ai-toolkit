# SKILL 4: 12-Month Client Roadmap Generator

## When to use

After Skills 1-3 have completed. This skill synthesizes all gathered data into a strategic 12-month plan.

## Inputs

Pull from the conversation context:

1. **CRM Data** (from Skill 0):
   - `company_type` (Ecommerce / Lead Gen / SaaS / other)
   - `services` (which platforms/channels we're managing)
   - `best_sellers` (top products to focus creative around)
   - `website`, `instagram`, `tiktok`

2. **Call Notes/Transcript** (from Skill 0):
   - `call_notes` -- scan for: revenue targets, pain points, goals, timeline expectations, budget, past agency experiences, specific requests

3. **Competitor Research** (from Skill 1):
   - `COMPETITOR_RESEARCH_OUTPUT` -- extract: positioning gaps, messaging angles, competitive threats, customer pain points

4. **Meta Audit** (from Skill 2):
   - `META_AUDIT_OUTPUT` -- extract: creative strengths to double down on, weaknesses to fix, testing roadmap suggestions, landing page issues

5. **Google Audit** (from Skill 3):
   - `GOOGLE_AUDIT_OUTPUT` -- extract: ad strategy strengths/weaknesses, landing page issues, competitive gaps

## What to do

### Step 1: Extract strategic signals

Scan all inputs and extract:
- **Revenue/growth target** (from call notes, or "TBD -- baseline in Month 1")
- **Top pain points** (from call notes + competitor research)
- **Platform mix** (from services field -- which channels are we managing?)
- **Company type** (drives quarterly themes and KPI selection)
- **Creative gaps** (from Meta audit + Google audit)
- **Landing page issues** (from audits)
- **Competitive opportunities** (from competitor research)
- **Client-specific requests** (anything mentioned in call notes)

### Step 2: Define strategic pillars

Create exactly 3 strategic pillars that will guide the year. These should be specific to this client, not generic. Examples:

- For an ecommerce brand with weak creative: "Creative Velocity", "Full-Funnel Optimization", "Retention & LTV"
- For a lead gen company with no tracking: "Measurement Infrastructure", "Lead Quality Engineering", "Channel Expansion"
- For a SaaS with high churn: "Acquisition Efficiency", "Trial-to-Paid Conversion", "Retention Marketing"

Each pillar needs a 1-2 sentence description of what it means for this client specifically.

### Step 3: Generate quarter-by-quarter roadmap

Follow the structure below. **Customize every month based on the extracted signals.** Do not output a generic roadmap.

---

#### Q1: Foundation & Quick Wins (Months 1-3)

**Month 1: [Theme Name]**
- Focus: [one sentence]
- Key Activities: 4-6 specific items, customized to client
- KPI Targets: specific metrics (e.g., "Establish baseline CPA", "Launch 3 campaign structures")
- Dependencies: what's needed from the client this month

**Month 2: [Theme Name]**
- Focus: [one sentence]
- Key Activities: 4-6 items -- first optimization cycle, creative testing begins
- KPI Targets: specific metrics
- Dependencies: what's needed

**Month 3: [Theme Name]**
- Focus: [one sentence]
- Key Activities: 4-6 items -- scale winners, first performance report
- KPI Targets: specific metrics
- Dependencies: what's needed

---

#### Q2: Growth & Optimization (Months 4-6)

Focus shifts from setup to growth. Specific activities depend on Q1 learnings, but plan for:
- Month 4: audience/placement expansion, new creative concepts from competitor gaps
- Month 5: full-funnel optimization, retargeting refinement, email integration (if applicable)
- Month 6: mid-year strategic review, roadmap adjustment

---

#### Q3: Scale & Diversification (Months 7-9)

Focus shifts to scale and channel expansion:
- Month 7: channel expansion (second platform if single-channel), advanced testing
- Month 8: LTV optimization, Q4 seasonal planning (if ecommerce)
- Month 9: Q4 prep, budget reallocation for peak season

---

#### Q4: Peak & Long-Term Strategy (Months 10-12)

Focus depends heavily on company type:
- **Ecommerce**: Black Friday/holiday execution, aggressive scaling, creative refresh
- **Lead Gen**: year-end push, pipeline optimization, annual contract renewals
- **SaaS**: expansion revenue focus, year-end budgets, renewal campaigns

Month 12 always includes: annual review, Year 2 roadmap development.

---

### Step 4: Customization rules

Apply these adaptations based on client signals:

| Signal | How It Changes the Roadmap |
|---|---|
| Company Type = Ecommerce | Heavy Q4 planning, Black Friday in Month 9-10, AOV/LTV metrics, seasonal creative |
| Company Type = Lead Gen | Pipeline velocity metrics, lead quality optimization, CRM integration early |
| Company Type = SaaS | Trial-to-paid focus, churn reduction, expansion revenue in Q3-Q4 |
| Services include Klaviyo/email | Email flow build in Month 2, list segmentation in Month 4, lifecycle automation in Month 6 |
| Services include Google | Search campaign build Month 1, Shopping/PMax in Month 2, keyword expansion in Month 4 |
| Services include TikTok | TikTok test campaigns in Month 3, scale if winning in Month 5 |
| Meta audit found landing page issues | Prioritize LP fixes in Month 1 activities |
| Meta audit found strong creative patterns | Reference specific winning patterns in Month 2 creative expansion |
| Competitor research found positioning gaps | Map specific gap exploitation to Months 2-3 creative tests |
| Call notes mention specific revenue target | Reverse-engineer monthly targets into each month's KPIs |
| Call notes mention specific pain point | Address that pain point explicitly in Month 1 action items |
| Call notes mention past agency frustration | Emphasize communication/transparency in Month 1, early wins focus |
| No call notes available | Use CRM fields for a solid baseline roadmap. Note at the top: "This roadmap is based on available CRM data. It will be refined after our strategy kickoff call." |

### Step 5: Generate milestones table

Create a key milestones table:

| Month | Milestone | Success Metric |
|---|---|---|
| 1 | First campaigns live | [specific metric] |
| 3 | First quarterly review | [specific metric] |
| 6 | Mid-year strategic review | [specific metric] |
| 9 | Q4 prep complete | [specific metric] |
| 12 | Year 1 review + Year 2 plan | [specific metric] |

Add 1-2 client-specific milestones if applicable (e.g., "Month 2: Email flows live" if Klaviyo is in scope).

### Step 6: Generate investment summary

Brief section covering:
- Monthly retainer (from CRM services field, or "per proposal")
- Recommended ad spend trajectory (start conservative, scale with winners)
- Any one-time setup fees (if applicable)

## Output format

Produce the roadmap as structured text (markdown-style). It will be converted to HTML in Skill 5 using the roadmap template.

```
# 12-MONTH CLIENT ROADMAP

**Client:** [Company Name]
**Agency:** [Agency Name]
**Services:** [services list]
**Created:** [date]
**Year 1 Target:** [revenue target or "TBD -- baseline Month 1"]

## Strategic Pillars

1. **[Pillar 1]**: [description]
2. **[Pillar 2]**: [description]
3. **[Pillar 3]**: [description]

## Q1: [Quarter Theme] (Months 1-3)

### Month 1: [Month Theme]
**Focus:** [one sentence]
**Key Activities:**
- [Activity 1]
- [Activity 2]
- [Activity 3]
- [Activity 4]
**KPI Targets:** [specific]
**Dependencies:** [what's needed from client]

[...continue for all 12 months...]

## Key Milestones
[table]

## Investment Summary
[brief section]
```

Store the full output as `ROADMAP_OUTPUT`.

## Progress update

Tell the user:
> "12-month roadmap complete. Moving to HTML generation."

## Next step

Proceed to Skill 5: HTML Generation.
