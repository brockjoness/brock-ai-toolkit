# SKILL 6: Hub Page Generation & Deployment

## When to use

After Skill 5 has generated all HTML deliverable files.

## What to do

### Step 1: Deploy individual deliverables

Deploy each deliverable directory to Vercel, capturing the returned URL for each.

**Deploy order:**

```bash
cd "pre-onboarding/{client-slug}/competitor-research" && npx vercel --yes
```
Capture URL as `COMPETITOR_RESEARCH_URL`.

```bash
cd "pre-onboarding/{client-slug}/meta-audit" && npx vercel --yes
```
Capture URL as `META_AUDIT_URL`.

```bash
cd "pre-onboarding/{client-slug}/google-audit" && npx vercel --yes
```
Capture URL as `GOOGLE_AUDIT_URL`.

```bash
cd "pre-onboarding/{client-slug}/roadmap" && npx vercel --yes
```
Capture URL as `ROADMAP_URL`.

**Important:** Run these commands from the workspace root directory (`./`), using absolute or relative paths to the subdirectories.

If a deploy fails: retry once. If it fails again, note the failure and the local file path. Continue deploying the remaining deliverables.

### Step 2: Generate the hub page

Read the hub template from:
- `./onboarding/pre-onboarding/templates/hub.html`

Inject all variables:

| Placeholder | Value |
|---|---|
| `{{BASE_STYLES}}` | Contents of `_base-styles.html` |
| `{{CLIENT_NAME}}` | Company name |
| `{{CLIENT_LOGO_HTML}}` | Client logo HTML |
| `{{AGENCY_NAME}}` | Full agency name |
| `{{AGENCY_SLUG}}` | Agency slug |
| `{{AGENCY_LOGO_HTML}}` | Agency logo HTML |
| `{{ABOUT_SECTION_LABEL}}` | Agency-specific "About" label |
| `{{DATE}}` | Current date |
| `{{YEAR}}` | Current year |
| `{{ACCENT_COLOR}}` | Agency accent color |
| `{{ACCENT_SUBTLE}}` | Agency accent subtle |
| `{{FONT_HEADING}}` | Agency heading font |
| `{{FONT_BODY}}` | Agency body font |
| `{{FONT_CODE}}` | Agency code font |
| `{{PROPOSAL_URL}}` | `proposal_url` from CLIENT_CONTEXT (fetched from CRM in Skill 0) |
| `{{COMPETITOR_RESEARCH_URL}}` | Vercel URL from Step 1 |
| `{{META_AUDIT_URL}}` | Vercel URL from Step 1 |
| `{{GOOGLE_AUDIT_URL}}` | Vercel URL from Step 1 |
| `{{ROADMAP_URL}}` | Vercel URL from Step 1 |
| `{{META_STATUS}}` | "complete" if audit ran, "pending" if skipped |
| `{{META_STATUS_LABEL}}` | "Complete" or "Pending" |
| `{{GOOGLE_STATUS}}` | "complete" if audit ran, "pending" if placeholder |
| `{{GOOGLE_STATUS_LABEL}}` | "Complete" or "Pending" |

### Step 3: Write hub page files

Write to `pre-onboarding/{client-slug}/hub/`:
- `index.html` (the hub page)
- `package.json` (with `@vercel/og` dependency)
- `api/og.js` (OG image with "Pre-Onboarding Hub" as deliverable title)

### Step 4: Update deliverable pages with hub URL

Now that we know the hub will be deployed, we need to go back and update the `{{HUB_URL}}` placeholder in each deliverable's `index.html`. However, since we don't have the hub URL yet, we have two options:

**Option A (preferred):** Deploy the hub first as a no-op to get the URL, then update all pages and redeploy everything.

**Option B (simpler):** Leave the "Back to Hub" links as relative links or remove them on first deploy, then update after hub deployment.

**Use Option B for simplicity:** Replace `{{HUB_URL}}` in each deliverable with `javascript:history.back()` as a fallback. The client can use their browser's back button. If needed, a follow-up redeploy can inject the actual hub URL.

### Step 5: Deploy the hub

```bash
cd "pre-onboarding/{client-slug}/hub" && npx vercel --yes
```

Capture URL as `HUB_URL`.

### Step 6: Present results to the user

```
Pre-onboarding complete for [Company Name] via [Agency Name].

Hub URL: [HUB_URL]

Individual deliverables:
  Competitor Research: [COMPETITOR_RESEARCH_URL]
  Meta Audit: [META_AUDIT_URL or "Skipped -- no Ad Library URL"]
  Google Audit: [GOOGLE_AUDIT_URL]
  12-Month Roadmap: [ROADMAP_URL]

Local files: pre-onboarding/{client-slug}/
```

If any deploys failed, note them:
```
  [Deliverable]: Deploy failed. Local file at pre-onboarding/{client-slug}/{deliverable}/index.html
```

## Error handling

- If Vercel is not authenticated: tell the user to run `npx vercel login` first.
- If a single deploy fails after retry: continue with remaining deploys, note the failure.
- If ALL deploys fail: present local file paths and suggest the user deploy manually or check their Vercel configuration.

### Step 7: Update CRM with hub URL

Search the CRM (`collection://YOUR_NOTION_DB_ID`) for the client by Company Name. Update the **Proposal** property with the hub URL (`HUB_URL`). This overwrites the proposal URL so the CRM links to the hub (which itself links to the proposal and all other deliverables).
