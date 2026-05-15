# SKILL 0: Notion Intake

## When to use

Always first. Triggered when the call-prep workflow begins.

## What to do

### Step 1: Parse the Notion URL

Extract the Notion page URL from the trigger command and pull the page ID (UUID).

### Step 2: Fetch the CRM page

Use `notion-fetch` MCP tool with `include_discussions: true`.

### Step 3: Extract CRM properties

Map these properties from the Notion page into `CALL_PREP_CONTEXT`:

| Field | CRM Property | Required? |
|---|---|---|
| `page_id` | Page UUID from URL | Required |
| `notion_url` | Full Notion page URL | Required |
| `company_name` | `Company Name` | Required |
| `agency` | `Agency` | Required -- ASK if missing |
| `domain` | `Website` (extract domain, strip protocol/path) | Required -- STOP if missing |
| `email` | `Email` | Best effort |
| `client_name` | `Client Name` | Best effort |
| `instagram` | `Instagram` | Best effort |
| `tiktok` | `TikTok` | Best effort |
| `meta_ads_library` | `Meta Ads Library` | Best effort |
| `objective` | `Objective` | Best effort |
| `existing_audit_url` | `Prospect Audit` | Best effort |
| `status` | `Status` | Informational |

### Step 4: Extract call notes

Read the page body. Look for the `## Call Notes:` section and extract dated toggle sections, any internal notes from team members, and any existing talking points content. Store the raw call notes text as `call_notes`.

### Step 5: Determine the current date section

Identify the most recent dated call notes section (e.g., `### 2026.03.25`). Store as `current_date_section`.

### Step 6: Check for existing audit

If `existing_audit_url` is populated, set `skip_audit = true`. Otherwise `skip_audit = false`.

### Step 7: Validate required fields

- If `agency` is empty or not a recognized brand variant: ASK which variant to use
- If `domain` / `Website` is empty: STOP with "No website found on the CRM page for {company_name}."
- If `company_name` is empty: STOP with "No company name found on the CRM page."

### Step 8: Confirm scope

> "Call prep for **{company_name}** ({agency}). Domain: {domain}. Audit exists: [yes/no]. Running: {full audit + talking points + chat ping / talking points + chat ping only}."

## Next step

Proceed to Skill 1: Agency Router.
