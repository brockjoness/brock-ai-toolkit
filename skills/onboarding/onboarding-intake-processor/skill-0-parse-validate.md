# SKILL 0: Parse & Validate Intake Data

## What to do

### Step 1: Extract fields from intake data

Parse the intake data (form submission, pasted text, or conversational input) and extract:

| Field | Variable | Required? |
|---|---|---|
| Company Name | `company_name` | Yes (fatal) |
| Website URL | `website` | Yes (fatal) |
| Primary Contact Name | `contact_name` | Yes (fatal) |
| Primary Contact Email | `contact_email` | Yes (fatal) |
| Phone Number | `phone` | No (ask Brock if missing) |
| Monthly Ad Spend | `monthly_spend` | Yes (fatal) |
| Platform(s) | `platforms` | Yes (fatal) |
| Ad Account IDs | `ad_account_ids` | No |
| Goals / KPIs | `goals` | Recommended |
| Top Products/Services | `best_sellers` | Recommended |
| Competitor List | `competitors` | Optional |
| Creative Assets Link | `creative_assets_link` | Optional |
| Brand Guidelines | `brand_guidelines` | Optional |

### Step 2: Validate required fields

Check all required fields are present. If ANY required field is missing:
- List the missing fields
- Ask Brock to provide them
- Do NOT proceed until all required fields are confirmed

### Step 3: Determine agency

If not specified, default to `clickflow`. If Brock specifies an agency, use that.

### Step 4: Generate slugs

- `client_slug`: kebab-case of company name (e.g., "ACME Corp" → `purity-coffee`)
- Extract domain from website for Clearbit logo: strip protocol and path

### Step 5: Check for existing CRM entry

Search CRM (`collection://YOUR_NOTION_DB_ID`) for the company name.
- If found: note "existing entry — will update"
- If not found: note "new entry — will create"

### Step 6: Research publicly (if new client)

If this is a new client (not in CRM), run the same research as Rule 4 in notion-rules.md:
- Search for Facebook page → construct Meta Ads Library URL
- Find Instagram URL
- Find TikTok URL

### Step 7: Assemble INTAKE_CONTEXT

Package everything into a structured context block for downstream skills.

## Next step

Proceed to Skill 1: Create/Update CRM Entry + Client Context.
