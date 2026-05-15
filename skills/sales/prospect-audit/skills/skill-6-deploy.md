# SKILL 6: HTML Generation & Deployment

## When to use

After Skill 5 has been completed. No approval gate -- proceed immediately.

## What to do

### Step 1: Read templates

- `./templates/_base-styles-light.html`
- `./templates/prospect-audit.html`

### Step 2: Prepare variables

| Placeholder | Source |
|---|---|
| `{{BASE_STYLES}}` | Contents of `_base-styles-light.html` |
| `{{COMPANY_NAME}}` | `company_name` from PROSPECT_CONTEXT |
| `{{COMPANY_LOGO}}` | `logo_html` from PROSPECT_CONTEXT |
| `{{DOMAIN}}` | `domain` from PROSPECT_CONTEXT |
| `{{DATE}}` | Current date (e.g., "March 2026") |
| `{{YEAR}}` | Current year |
| `{{TOTAL_ADS}}` | Total active ads count from META_AUDIT_OUTPUT |
| `{{MARKET_SNAPSHOT_CONTENT}}` | Converted HTML from MARKET_SNAPSHOT_OUTPUT |
| `{{META_AUDIT_CONTENT}}` | Converted HTML from META_AUDIT_OUTPUT |
| `{{SOCIAL_AUDIT_CONTENT}}` | Converted HTML from SOCIAL_AUDIT_OUTPUT |
| `{{PRODUCT_PAGE_CONTENT}}` | Converted HTML from PRODUCT_PAGE_OUTPUT |
| `{{QUICK_WINS_CONTENT}}` | Converted HTML from SYNTHESIS_OUTPUT quick wins |
| `{{TESTING_ROADMAP_CONTENT}}` | Converted HTML from SYNTHESIS_OUTPUT testing roadmap |
| `{{FULL_ACCESS_CONTENT}}` | Converted HTML from SYNTHESIS_OUTPUT full access section |
| `{{CALENDAR_LINK}}` | `https://your-calendar-link.example.com` |

### Step 3: Convert text outputs to HTML

| Markdown Pattern | HTML Output |
|---|---|
| `# Heading` | `<h2>Heading</h2>` |
| `## Subheading` | `<h3>Subheading</h3>` |
| `### Sub-subheading` | `<h4>Sub-subheading</h4>` |
| `**bold text**` | `<strong>bold text</strong>` |
| `- bullet item` | `<ul class="content-list"><li>bullet item</li></ul>` |
| `> quote text` | `<div class="user-quote"><p>quote text</p></div>` |
| Pipe tables | `<table class="data-table"><thead>...</thead><tbody>...</tbody></table>` |
| `[text](url)` | `<a href="url">text</a>` |

**Section wrapping:**
- Use `<div class="card">` for self-contained content blocks
- Use `<div class="card accent-border">` for key findings or teasers
- Use `<div class="stats-grid">` + `<div class="stat-card">` for metric summaries
- Quick wins use `<div class="quick-win">` with numbered badges

### Step 4: Write HTML files to disk

```
./prospect-audits/{prospect-slug}/
  index.html
  package.json
  api/og.js
```

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
          background: '#FAFAF8',
          padding: '60px',
          fontFamily: 'Inter, sans-serif',
        },
        children: [
          { type: 'div', props: { style: { width: '60px', height: '4px', background: '#1A1A18', marginBottom: '30px' } } },
          { type: 'div', props: { style: { color: '#9B9B90', fontSize: '24px', marginBottom: '16px' }, children: 'YOUR_BRAND // Prospect Audit' } },
          { type: 'div', props: { style: { color: '#111110', fontSize: '48px', fontWeight: 700, marginBottom: '16px' }, children: 'Your Ad Strategy Audit' } },
          { type: 'div', props: { style: { color: '#1A1A18', fontSize: '32px', fontStyle: 'italic' }, children: '{{COMPANY_NAME}}' } },
        ],
      },
    },
    { width: 1200, height: 630 }
  );
}
```

Replace `{{COMPANY_NAME}}` and `YOUR_BRAND` with actual values.

### Step 5: Deploy to Vercel

```bash
cd ./prospect-audits/{prospect-slug} && npx vercel --yes
```

Capture the deployment URL.

### Step 6: Update Notion

Search the Website Submissions database (`collection://YOUR_NOTION_DATA_SOURCE_ID`) for the prospect's email.

If found, update the page:
- Set `Audit URL` to the deployed Vercel URL
- Set `Meta Ads Library` to `meta_ads_library_url`

### Step 7: Present results

> "Prospect audit deployed for **{company_name}**."
>
> **Audit URL**: {vercel_url}
> **Notion updated**: [yes/no]

## Error handling

- If Vercel deploy fails: retry once, then provide the local file path for manual deployment
- If Notion update fails: report the Vercel URL and note the failure

## Next step

Proceed to Skill 7: Email Delivery.
