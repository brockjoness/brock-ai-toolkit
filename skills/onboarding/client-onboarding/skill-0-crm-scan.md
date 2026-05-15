# SKILL 0: CRM Scan & Context Gathering

## When to use

This is always the first skill. Triggered by "run onboarding check" or similar commands per the workflow.md trigger list.

## What to do

### Step 1: Query CRM for onboarded clients

Search the CRM database (`collection://YOUR_NOTION_DB_ID`) for all clients where Status = "5. Onboarded".

If no clients found: report "No clients at status '5. Onboarded'." and stop the workflow.

If clients found: list them and proceed to Step 2 for each client.

### Step 2: Extract CRM fields

For each client at "5. Onboarded", pull all available fields:

| Field | Variable Name | Required? |
|---|---|---|
| Company Name | `company_name` | Yes (fatal) |
| Client Name | `client_name` | Yes (fatal -- needed for contract + email) |
| Email | `email` | Yes (fatal -- needed for invoice + email) |
| Deal Value | `deal_value` | Yes (fatal -- monthly invoice amount) |
| Services | `services` | Yes (fatal -- determines deliverables) |
| Agency | `agency_slug` | Recommended (default: Clickflow) |
| Billing Terms | `billing_terms` | Recommended (default: "Invoice (due on receipt)") |
| Website | `website` | No |
| Phone number | `phone` | No |
| Page URL | `crm_page_url` | Yes (for Workflow task relation) |

If `client_name`, `email`, `deal_value`, or `services` is missing: skip this client, report which fields are missing, and continue to the next client.

### Step 3: Agency gate

**Only ClickFlow and Example SaaS clients** get the full contract + invoice workflow.

| CRM Agency Value | Eligible? |
|---|---|
| Clickflow (or empty) | Yes |
| Example SaaS | Yes |
| Acme Agency | No -- skip contract + invoice (Skills 1-2) |
| Beacon Brand | No -- skip contract + invoice (Skills 1-2) |

If the client's agency is Acme Agency or Beacon Brand:
- Set `skip_contract_invoice = true` in ONBOARDING_CONTEXT
- Report: "**{Company Name}** ({Agency}) -- skipping contract & invoice (not managed by ClickFlow/Example SaaS). Will create workflow task and update CRM only."
- The workflow will skip Skills 1-2 and the Review Checkpoint, jumping directly to Skill 3 (email), Skill 4 (workflow task), and Skill 5 (CRM update).

### Step 4: Map agency slug

Map the CRM Agency field value to the agency slug used for brand files:

| CRM Value | Agency Slug |
|---|---|
| Clickflow | clickflow |
| Acme Agency | acme-agency |
| Beacon Brand | beacon-brand |
| Example SaaS | example-saas |

If Agency field is empty, default to `clickflow`.

### Step 5: Load agency branding

Read the agency's brand file from `brands/{agency-slug}/brand.md`.

Extract:
- `brand_colors` (primary/accent colors)
- `brand_fonts` (heading, body fonts)
- `brand_logo` (logo URL or path)
- `brand_tagline` (agency tagline)

### Step 6: Compute billing terms

Map the CRM Billing Terms field to Stripe `days_until_due`:

| Billing Terms | days_until_due |
|---|---|
| Invoice (net 60) | 60 |
| Invoice (net 30) | 30 |
| Invoice (due on receipt) | 0 |
| Subscription | 0 |

If Billing Terms is empty, default to 0 (due on receipt).

### Step 7: Parse services

The Services field is a multi-select with these possible values:
- Meta Ads
- Google Ads
- TikTok Ads
- Shopify CRO
- Email Flows (i.e. Klaviyo Hubspot)
- Email Campaigns (i.e. Klaviyo Hubspot)
- AI-Enabled Content Creation

Store as an array. This is used for:
- Contract services list (Skill 1)
- Stripe invoice description (Skill 2)
- Workflow task instructions (Skill 4)

### Step 8: Generate client slug

Convert company name to kebab-case:
- "ACME Corp" becomes `purity-coffee`
- "Example Co" becomes `example-co`

Store as `client_slug`.

### Step 9: Assemble ONBOARDING_CONTEXT

Package everything into a structured context block per client. This is held in conversation context (not written anywhere) and flows through all subsequent skills.

```
ONBOARDING_CONTEXT {
  company_name
  client_name
  email
  phone
  website
  deal_value
  services (array)
  agency_slug
  billing_terms
  days_until_due
  brand_colors
  brand_fonts
  brand_logo
  brand_tagline
  client_slug
  crm_page_url
  skip_contract_invoice (true if agency is Acme Agency or Beacon Brand)
}
```

### Step 10: Confirm scope

Present to Brock:

> "Found {N} client(s) at status '5. Onboarded':
> {For each client:}
> - **{Company Name}** ({Agency}) -- ${deal_value}/mo, {billing_terms}, Services: {services list}
>
> Processing sequentially: contract, invoice, email, workflow task, CRM update."

Proceed to Skill 1 for the first client.

## Error handling

- CRM query fails: report the error. Stop.
- No clients found: report "No clients at '5. Onboarded'." Stop (not an error).
- Missing required fields on a client: skip that client, report which fields are missing, continue to next.
- Agency brand file not found: default to ClickFlow branding and note the fallback.

## Next step

Proceed to Skill 1: Contract Generation for the first client.
