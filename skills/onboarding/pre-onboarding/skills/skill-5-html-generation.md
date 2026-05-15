# SKILL 5: HTML Generation

## When to use

After all analysis skills (1-4) have completed and all output variables are populated.

## What to do

Generate HTML deliverable pages for each component using the templates in `templates/`. Each page is a self-contained `index.html` written to the deployment directory.

### Step 1: Read templates

Read the following template files:
- `./onboarding/pre-onboarding/templates/_base-styles.html`
- `./onboarding/pre-onboarding/templates/competitor-research.html`
- `./onboarding/pre-onboarding/templates/meta-audit.html`
- `./onboarding/pre-onboarding/templates/google-audit.html`
- `./onboarding/pre-onboarding/templates/roadmap.html`

(The hub template is handled in Skill 6, after deployment URLs are known.)

### Step 2: Prepare shared variables

These variables are injected into every template:

| Placeholder | Source |
|---|---|
| `{{BASE_STYLES}}` | Contents of `_base-styles.html` |
| `{{CLIENT_NAME}}` | `company_name` from CLIENT_CONTEXT |
| `{{CLIENT_LOGO_HTML}}` | `client_logo_html` from Skill 0 |
| `{{AGENCY_NAME}}` | Full agency name from brand.md |
| `{{AGENCY_SLUG}}` | `agency_slug` from CLIENT_CONTEXT |
| `{{AGENCY_LOGO_HTML}}` | Agency logo from brand.md (or text fallback) |
| `{{ABOUT_SECTION_LABEL}}` | Agency-specific label (e.g., "ABOUT THE FOUNDER") |
| `{{DATE}}` | Current date (e.g., "March 2026") |
| `{{YEAR}}` | Current year (e.g., "2026") |
| `{{ACCENT_COLOR}}` | Primary accent color from brand.md |
| `{{ACCENT_SUBTLE}}` | Subtle accent variant from brand.md |
| `{{FONT_HEADING}}` | Heading font from brand.md |
| `{{FONT_BODY}}` | Body font from brand.md |
| `{{FONT_CODE}}` | Code/mono font from brand.md |
| `{{HUB_URL}}` | Leave as `{{HUB_URL}}` for now -- will be injected after hub deployment in Skill 6 |

### Step 3: Convert text outputs to HTML

For each deliverable, take the structured text output and convert it to HTML sections.

**Conversion rules:**

| Markdown Pattern | HTML Output |
|---|---|
| `# Heading` | `<h2>Heading</h2>` |
| `## Subheading` | `<h3>Subheading</h3>` |
| `### Sub-subheading` | `<h4>Sub-subheading</h4>` |
| `**bold text**` | `<strong>bold text</strong>` |
| `- bullet item` | `<ul class="content-list"><li>bullet item</li></ul>` (group consecutive bullets) |
| `> quote text` | `<div class="user-quote"><p>quote text</p></div>` |
| `> "quote" -- source` | `<div class="user-quote"><p>"quote"</p><span class="quote-source">source</span></div>` |
| Pipe tables | `<table class="data-table"><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>` |
| `[text](url)` | `<a href="url" style="color: var(--accent); text-decoration: none;">text</a>` |
| Empty lines between sections | Close current container, start new one |

**Section wrapping:**
- Each major section (identified by `#` headers in the text output) becomes content inside the corresponding template placeholder
- Use `<div class="card">` for self-contained content blocks
- Use `<div class="card accent-border">` for key findings or recommendations
- Use `<div class="angle-card">` for messaging angles with name + source + description
- Use `<div class="stats-grid">` + `<div class="stat-card">` for metric summaries

### Step 4: Generate competitor research HTML

Take `COMPETITOR_RESEARCH_OUTPUT` and inject into `competitor-research.html`:

| Template Placeholder | Maps To Section |
|---|---|
| `{{INDUSTRY}}` | Industry from CRM or research output |
| `{{REDDIT_SENTIMENT_CONTENT}}` | Section 1: Reddit Brand Sentiment |
| `{{PAIN_POINTS_CONTENT}}` | Section 2: Customer Pain Points & Objections |
| `{{TWITTER_SENTIMENT_CONTENT}}` | Section 3: X/Twitter Category Sentiment |
| `{{REVIEW_ANALYSIS_CONTENT}}` | Section 4: Review Platform Analysis |
| `{{COMPETITIVE_LANDSCAPE_CONTENT}}` | Section 5: Competitive Landscape |
| `{{ACTIONABLE_SYNTHESIS_CONTENT}}` | Section 6: Actionable Synthesis |

For Section 6, convert each messaging angle into an `<div class="angle-card">` with:
- `.angle-name` for the angle name
- `.angle-source` for the source
- Description text below
- User language to borrow as a `<div class="user-quote">`

### Step 5: Generate meta audit HTML

Take `META_AUDIT_OUTPUT` and inject into `meta-audit.html`:

| Template Placeholder | Maps To Section |
|---|---|
| `{{AD_COUNT}}` | Total active ads analyzed (from Skill 2 extraction) |
| `{{COMPETITORS_REVIEWED}}` | Competitor names or "None" |
| `{{EXECUTIVE_BRIEF_CONTENT}}` | Executive Creative Brief (Top 3 Working + Top 3 to Fix) |
| `{{CREATIVE_ANALYSIS_CONTENT}}` | Creative Analysis (format mix, copy mining, message angles) |
| `{{COMPETITOR_SNAPSHOT_CONTENT}}` | Competitor Snapshot (comparison tables) |
| `{{WEBSITE_REVIEW_CONTENT}}` | Website & Landing Page Review |
| `{{OPPORTUNITIES_CONTENT}}` | Opportunities & Next Steps (testing roadmap + sales close) |

If `META_AUDIT_OUTPUT` is "SKIPPED": generate a placeholder page similar to the Google audit placeholder, noting why it was skipped and using the "pending" status badge.

### Step 6: Generate Google audit HTML

Take `GOOGLE_AUDIT_OUTPUT` and inject into `google-audit.html`:

**If the output is actual audit content**: inject the audit sections into `{{GOOGLE_AUDIT_BODY}}` following the same section structure as the Meta audit (executive brief, ad landscape, website review, competitor snapshot, opportunities).

**If the output is "PLACEHOLDER"**: inject the placeholder content specified in skill-3-google-audit-adapter.md.

**If the output is "SKIPPED"**: generate a skipped notice page.

### Step 7: Generate roadmap HTML

Take `ROADMAP_OUTPUT` and inject into `roadmap.html`:

| Template Placeholder | Maps To |
|---|---|
| `{{SERVICES}}` | Services from CRM |
| `{{YEAR_1_TARGET}}` | Revenue target or "TBD" |
| `{{COMPANY_TYPE}}` | Company type from CRM |
| `{{STRATEGIC_PILLARS_CONTENT}}` | 3 pillar cards using `<div class="pillars-grid">` + `<div class="pillar-card">` |
| `{{Q1_THEME}}` | Quarter 1 theme name |
| `{{Q1_CONTENT}}` | Month 1-3 cards using `<div class="month-card">` with activities as `<ul class="month-activities">` and KPIs as `<span class="kpi-tag">` |
| `{{Q2_THEME}}` through `{{Q4_THEME}}` | Quarter theme names |
| `{{Q2_CONTENT}}` through `{{Q4_CONTENT}}` | Month cards for each quarter |
| `{{MILESTONES_CONTENT}}` | Milestone rows using `<div class="milestone-row">` |
| `{{INVESTMENT_CONTENT}}` | Investment summary as card content |

Each month card structure:
```html
<div class="month-card">
    <p class="month-number">MONTH [N]</p>
    <h3 class="month-title">[Month Theme]</h3>
    <p class="month-focus">[Focus sentence]</p>
    <ul class="month-activities">
        <li>[Activity 1]</li>
        <li>[Activity 2]</li>
        ...
    </ul>
    <span class="kpi-tag">[KPI 1]</span>
    <span class="kpi-tag">[KPI 2]</span>
</div>
```

### Step 8: Write HTML files to disk

Create the deployment directories and write each file:

```
pre-onboarding/{client-slug}/competitor-research/index.html
pre-onboarding/{client-slug}/meta-audit/index.html
pre-onboarding/{client-slug}/google-audit/index.html
pre-onboarding/{client-slug}/roadmap/index.html
```

Each directory also needs:

**package.json:**
```json
{
  "dependencies": {
    "@vercel/og": "^0.6.0"
  }
}
```

**api/og.js:** (OG image generator for social sharing)
```javascript
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          background: '#08080D',
          padding: '60px',
          fontFamily: 'Inter, sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                width: '60px',
                height: '4px',
                background: '{{ACCENT_COLOR}}',
                marginBottom: '30px',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: { color: '#8888A0', fontSize: '24px', marginBottom: '16px' },
              children: '{{AGENCY_NAME}} // Pre-Onboarding',
            },
          },
          {
            type: 'div',
            props: {
              style: { color: '#F0EFF4', fontSize: '48px', fontWeight: 700, marginBottom: '16px' },
              children: '{{DELIVERABLE_TITLE}}',
            },
          },
          {
            type: 'div',
            props: {
              style: { color: '{{ACCENT_COLOR}}', fontSize: '32px', fontStyle: 'italic' },
              children: '{{CLIENT_NAME}}',
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 }
  );
}
```

Replace `{{DELIVERABLE_TITLE}}` with the appropriate title for each deliverable:
- "Competitor & Market Research"
- "Meta Creative Audit"
- "Google Ads Audit"
- "12-Month Strategic Roadmap"

### Step 9: Provide progress update

Tell the user:
> "HTML deliverables generated. Moving to deployment."

## Next step

Proceed to Skill 6: Hub & Deployment.
