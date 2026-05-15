# SKILL 0: Context Gathering & Validation

## When to use

This is always the first skill. Triggered by "begin pre-onboarding for [client]" or similar commands per the workflow.md trigger list.

## What to do

### Step 1: Parse the command

Extract:
- **Client name** from the user's command
- **Agency name** (if specified). If not specified, ask the user which agency this is for.

### Step 2: Search Notion CRM

Search the CRM database (`collection://YOUR_NOTION_DB_ID`) for the client by company name.

If no match is found: **stop** and tell the user the client was not found in the CRM. Do not guess or proceed without CRM data.

If a match is found: fetch the full client page.

### Step 3: Extract CRM fields

Pull all available fields from the CRM entry:

| Field | Variable Name | Required? |
|---|---|---|
| Company Name | `company_name` | Yes (fatal) |
| Client Name | `client_name` | No |
| Email | `email` | No |
| Website | `website` | Recommended |
| Instagram | `instagram` | No |
| TikTok | `tiktok` | No |
| Meta Ads Library | `meta_ads_library` | Required for meta audit |
| Google Ads ID | `google_ads_id` | No |
| Meta Business Manager ID | `meta_bm_id` | No |
| Company Type | `company_type` | Recommended |
| Services | `services` | Recommended |
| Top 3 Best Sellers | `best_sellers` | No |
| Content Source 1 | `content_source_1` | No |
| Content Source 2 | `content_source_2` | No |
| Content Source 3 | `content_source_3` | No |
| Performance Sheet | `performance_sheet` | No |
| Tracking Source | `tracking_source` | No |
| Status | `status` | No |
| Proposal | `proposal_url` | Recommended |

### Step 4: Fetch page content (call notes)

Use `notion-fetch` on the client's page ID to retrieve the full page content. This typically contains:
- Call transcripts
- Meeting notes
- Strategic notes
- Any other content added to the page

Store the full text as `call_notes`.

### Step 5: Load agency branding

Read the agency's brand file from `brands/{agency-slug}/brand.md`.

Extract:
- `brand_colors` (primary/accent colors)
- `brand_fonts` (heading, body, code fonts)
- `brand_logo` (logo URL or path)
- `brand_tagline` (agency tagline)
- `about_section_label` (e.g., "ABOUT THE FOUNDER", "ABOUT THE CMO")

Map agency slug to "About" label:
| Agency Slug | Label |
|---|---|
| clickflow | ABOUT THE FOUNDER |
| acme-agency | ABOUT OUR GROWTH STRATEGIST |
| beacon-brand | ABOUT THE CMO |
| example-saas | ABOUT OUR CO-FOUNDER |

### Step 6: Generate client slug

Convert company name to kebab-case for directory naming:
- "ACME Corp" becomes `purity-coffee`
- "Example Co" becomes `example-co`

Store as `client_slug`.

### Step 7: Fetch client logo

Try to fetch the client's logo via Clearbit:
```
https://logo.clearbit.com/{domain}
```

Where `{domain}` is extracted from the `website` field (e.g., `acme-corp.com`).

If the website field is empty or Clearbit returns no logo, generate a text-based logo fallback:
```html
<span class="client-logo-text">{{COMPANY_NAME}}</span>
```

Store the logo HTML as `client_logo_html`.

### Step 8: Validate and confirm

Check minimum requirements:
- `company_name`: present (fatal if not)
- `agency_slug`: present (fatal if not -- should have been asked in Step 1)
- `meta_ads_library`: if missing, note "Meta audit will be skipped -- no Ad Library URL"
- `website`: if missing, note "Client logo will use text fallback"
- `call_notes`: if empty, note "Roadmap will use CRM fields only -- no call transcript available"

Confirm scope to the user in one line:
> "Pre-onboarding for **[Company Name]** via **[Agency Name]**. Running: competitor research, meta audit [or 'skipped'], google audit [placeholder], 12-month roadmap. Deploying to Vercel."

### Step 9: Assemble CLIENT_CONTEXT

Package everything into a structured context block that flows through all subsequent skills. This is not written anywhere -- it's held in conversation context.

## Next step

Proceed to Skill 1: Competitor Research Adapter.
