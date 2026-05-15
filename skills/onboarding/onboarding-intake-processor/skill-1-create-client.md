# SKILL 1: Create/Update CRM Entry + Client Context

## What to do

### Step 1: Create or update CRM entry

**If new client (not in CRM):**

Create a new page in the CRM database (`collection://YOUR_NOTION_DB_ID`) with:

| Property | Value |
|---|---|
| Company Name (title) | `company_name` |
| Client Name | `contact_name` |
| Email | `contact_email` |
| Website | `website` |
| Instagram | `instagram` (from research) |
| TikTok | `tiktok` (from research) |
| Meta Ads Library | `meta_ads_library` (constructed from Facebook page) |
| Company Type | Inferred from website (Ecommerce / Lead Gen / SaaS) |
| Services | `platforms` joined (e.g., "Meta, Google") |
| Top 3 Best Sellers | `best_sellers` (if provided) |
| Status | `2. Intake Complete` |

Leave unknown fields empty — never guess.

**If existing client:**

Update the existing CRM page with any new information from the intake form. Do NOT overwrite existing data with empty fields. Only update fields that have new values.

Update Status to `2. Intake Complete`.

### Step 2: Create/update client context file

Write the client context file at:
```
brands/{agency_slug}/clients/{client_slug}/context.md
```

Template:
```markdown
# {Company Name} — Client Context

## Brand
- **Website:** {website}
- **Instagram:** {instagram}
- **TikTok:** {tiktok}
- **Meta Ads Library:** {meta_ads_library}
- **Company Type:** {company_type}

## Contact
- **Name:** {contact_name}
- **Email:** {contact_email}
- **Phone:** {phone}

## Account
- **Monthly Spend:** {monthly_spend}
- **Platforms:** {platforms}
- **Ad Account IDs:** {ad_account_ids}
- **Goals:** {goals}

## Products
- **Top Products:** {best_sellers}

## Competitors
{competitors list or "To be researched"}

## Creative Assets
- **Brand Guidelines:** {brand_guidelines or "Not yet provided"}
- **Assets Link:** {creative_assets_link or "Not yet provided"}

## Campaign Notes
<!-- Updated after kickoff call and during active management -->
```

### Step 3: Update client registry

Add the client to the agency's registry file at:
```
brands/{agency_slug}/clients/_registry.md
```

Add a row to the table:
```
| {Company Name} | {client_slug} | Intake Complete | {platforms} | Intake processed {date} |
```

### Step 4: Confirm

Report to Brock:
- CRM entry: created or updated
- Status set to: 2. Intake Complete
- Client context file: path
- Any fields that are still missing

## Next step

Proceed to Skill 2: Generate Kickoff Agenda.
