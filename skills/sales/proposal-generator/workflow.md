# Proposal Generator Workflow

## Overview
Generates custom, multi-brand proposals after sales calls. Handles both typed summaries and pasted transcripts, fetches client data from a CRM, and deploys to a public Vercel URL.

---

## Step 1: Identify the Brand

Ask which brand is sending this proposal if not specified.

Read the corresponding `brand.md` file from `./brands/{brand-slug}/brand.md` to get:
- Brand name and tagline
- Accent color(s)
- Font preferences
- Logo URL (if available)
- Services and positioning

---

## Step 2: Gather Call Context

Ask for call context in one of two formats:

### Option A: Typed Summary
- Client's current situation and pain points
- Goals and desired outcomes
- Services discussed
- Budget or pricing discussed
- Commitments made (deliverables)
- Access/assets needed from client (requirements)

### Option B: Pasted Transcript
A transcript from Fireflies, Otter, Fathom, etc.

If a transcript is provided, extract:
1. Client pain points
2. Current situation — what's working/not working
3. Goals
4. Services discussed
5. Pricing/budget
6. Sender's commitments
7. Requirements from client

Synthesize into clear, proposal-ready content.

---

## Step 3: Fetch Client Data from CRM

Query your CRM for the client by name.

If found, extract:
- **Website URL** — for logo fetching
- **Contact name** — for personalization
- **Any existing notes** — for context

If not found, proceed with provided information.

---

## Step 4: Fetch Client Logo

Use the client's website domain to fetch their logo via Clearbit:

```
https://logo.clearbit.com/{domain}
```

If Clearbit fails, fall back to:
- A logo URL provided manually
- Client name rendered as styled text

---

## Step 5: Select Template and Generate the Proposal HTML

| Brand variant | Template File |
|--------|---------------|
| Light theme | `template-clickflow.html` |
| Dark theme (default) | `template.html` |

Read the selected template from `./` and replace placeholders.

### Theme Variables (from brand.md)
- `{{ACCENT_COLOR}}`, `{{ACCENT_SUBTLE}}` (accent at 12% opacity)
- `{{FONT_HEADING}}`, `{{FONT_BODY}}`, `{{FONT_CODE}}`
- `{{AGENCY_NAME}}`, `{{AGENCY_LOGO}}`, `{{AGENCY_TAGLINE}}`
- `{{ABOUT_SECTION_LABEL}}` (per-brand label, see `proposal-rules.md`)

### Client & Proposal Details
- `{{CLIENT_NAME}}`, `{{CLIENT_LOGO}}`, `{{DATE}}`, `{{AGENCY_SLUG}}`

### Call-Specific Content
- `{{WHAT_WE_DISCUSSED}}` — synthesized from call notes
- `{{PRICING_TIERS}}` — 2-3 pricing tiers (HTML)
- `{{DELIVERABLES}}` — "What we'll deliver" list items
- `{{REQUIREMENTS}}` — "What we need from you" list items

### Brand-Specific Content
- `{{AGENCY_OVERVIEW}}` — adapt the overview paragraph
- `{{COMPETENCIES}}` — highlight relevant services
- `{{TESTIMONIALS}}` — 2-3 relevant testimonials (from `proposal-rules.md`)

---

## Step 6: Write the HTML File and Copy Images

```
./proposals/{client-slug}/
./proposals/{client-slug}/images/
```

If you have local proposal images, copy them in:

```bash
cp ./proposal-images/* "./proposals/{client-slug}/images/"
```

Write the generated HTML to `./proposals/{client-slug}/index.html`.

Client slug format: lowercase, hyphens instead of spaces (e.g. `acme-corp`).

---

## Step 7: Deploy to Vercel

```bash
cd "./proposals/{client-slug}" && npx vercel --yes
```

First-time usage requires `vercel login`.

---

## Step 8: Return the Public URL

```
Proposal generated successfully

Brand: Brand A
Client: Acme Corp
URL: https://proposal-acme-corp-abc123.vercel.app
Local: ./proposals/acme-corp/index.html
```

---

## Error Handling

- **No brand specified** → Ask which brand
- **No call context provided** → Ask for typed summary or transcript
- **Client not in CRM** → Proceed with provided info
- **Logo fetch fails** → Use client name as fallback
- **Vercel not installed** → Prompt to run `npm i -g vercel`
- **Vercel auth required** → Prompt to run `vercel login`
