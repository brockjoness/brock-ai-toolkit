# Audit Report Deployer -- Workflow

## Overview

This workflow converts a completed audit report into a styled HTML page and deploys it to Vercel as a shareable client link. It follows the same pattern as the proposal generator deployment.

---

## Step 1: Identify the Agency

Determine which agency is sending this report (from the routing context):
- **Clickflow** (Brock's personal brand)
- **Acme Agency** (example agency)
- **Beacon Brand** (example brand)
- **Example SaaS** (example product)

Read the corresponding `brand.md` file from `agencies/{agency-slug}/brand.md` to get:
- Agency name
- Accent color
- Logo URL (if available)

---

## Step 2: Gather Report Variables

Collect these variables from the completed audit:

### Theme Variables (from agency brand.md)
- `{{ACCENT_COLOR}}` -- e.g., `#C9A84C` for ClickFlow
- `{{AGENCY_NAME}}` -- e.g., `ClickFlow`
- `{{AGENCY_LOGO}}` -- logo URL or text fallback

### Client & Report Details
- `{{CLIENT_NAME}}` -- brand name being audited
- `{{CLIENT_LOGO}}` -- fetch via Clearbit: `https://logo.clearbit.com/{domain}`
- `{{REPORT_TYPE}}` -- one of:
  - "Creative Analysis Report" (Meta pre-access)
  - "Meta Ads Audit Report" (Meta post-access)
  - "Google Ads Assessment" (Google pre-access)
  - "Google Ads Audit Report" (Google post-access)
- `{{REPORT_DATE}}` -- current date in format `March 3, 2026`
- `{{REPORT_SUBTITLE}}` -- the opening metrics line from the report (spend, conversions, ROAS, etc.)

### Report Content
- `{{REPORT_CONTENT}}` -- the full audit output, converted to HTML sections

---

## Step 3: Convert Report Content to HTML

Transform the audit's markdown/plain-text output into HTML sections:

1. Convert `#` headers to `<h1>`, `##` to `<h2>`, `###` to `<h3>`
2. Convert pipe tables to `<table>` elements with the template's table styling classes
3. Convert bold text (`**text**`) to `<strong>` tags
4. Convert bullet lists to `<ul><li>` elements
5. Convert numbered lists to `<ol><li>` elements
6. Wrap each major section in a `<section>` element with appropriate class

---

## Step 4: Inject into Template

Read the template at `skills/fulfilment/audit-report-deployer/template.html`

Replace all `{{VARIABLE}}` placeholders with the collected values.

---

## Step 5: Fetch Client Logo

Use the client's website domain to fetch their logo via Clearbit:

```
https://logo.clearbit.com/{domain}
```

If the domain is not available or Clearbit fails, fall back to:
- A logo URL provided by Brock
- Client name rendered as styled text

---

## Step 6: Write the HTML File

Create a directory structure for this report:

```
reports/{client-slug}-{audit-type}/
```

Audit type slug format:
- `meta-pre-access`
- `meta-post-access`
- `google-pre-access`
- `google-post-access`

Example: `reports/example-co-meta-post-access/`

Write the generated HTML to:

```
reports/{client-slug}-{audit-type}/index.html
```

---

## Step 7: Deploy to Vercel

Run the Vercel CLI from the report directory:

```bash
cd "reports/{client-slug}-{audit-type}" && npx vercel --yes
```

This will:
1. Upload the static HTML file to Vercel
2. Return a public URL

**Note:** If Vercel is not authenticated, prompt Brock to run `npx vercel login` once.

---

## Step 8: Return the Public URL

Provide Brock with:
- The public Vercel URL
- Confirmation of which agency branding was used
- The report type
- The local file path (for reference)

Example output:
```
Report deployed successfully

Agency: Clickflow
Client: Example Co
Type: Meta Ads Audit Report
URL: https://your-deployment.vercel.app
Local: reports/example-co-meta-post-access/index.html
```

---

## Error Handling

- **No agency specified** -> Use the agency from the routing context, or ask Brock
- **Client logo fetch fails** -> Use client name as styled text fallback
- **Vercel not installed** -> Prompt Brock to run `npm i -g vercel`
- **Vercel auth required** -> Prompt Brock to run `vercel login`
- **Template not found** -> Alert Brock that the template file is missing
