# SKILL 3: Onboarding Welcome Email

## When to use

After Skill 2 (Stripe invoice) has sent the invoice successfully.

## What to do

### Step 1: Validate email availability

Check that `email` exists in ONBOARDING_CONTEXT.

If no email is available:
- Report to Brock: "No email address available for {company_name}. Invoice was sent via Stripe but cannot draft onboarding email."
- STOP this skill. Continue to Skill 4.

### Step 2: Read email template

Read the template file:
- `./onboarding/client-onboarding/templates/onboarding-email.html`

### Step 3: Resolve first name

Extract the first name from `client_name`:
- Split on space, take the first segment
- If `client_name` is empty: use "there" (yields "Hi there,")

### Step 4: Prepare variables

| Placeholder | Source |
|---|---|
| `{{FIRST_NAME}}` | Resolved first name from Step 3 |
| `{{COMPANY_NAME}}` | `company_name` from ONBOARDING_CONTEXT |
| `{{CONTRACT_URL}}` | `contract_url` from Skill 1 output |
| `{{CALENDAR_LINK}}` | `https://calendar.app.google/YOUR_CALENDAR_SLUG` |

Replace all placeholders in the template with their values.

### Step 5: Draft the email

Use `mcp__gmail__draft_email` to create a draft:
- **To:** `email` from ONBOARDING_CONTEXT
- **Subject:** `Welcome to ClickFlow | {company_name} Onboarding`
- **Body:** Use `htmlBody` with `mimeType: "text/html"` containing the populated template

The template already includes the ClickFlow signature. Do not append an additional signature.

### Step 6: Present results

> "Onboarding email drafted for **{company_name}**."
>
> **To**: {email}
> **Subject**: Welcome to ClickFlow | {company_name} Onboarding
> **Contract link**: {contract_url}
>
> Review the draft in your ClickFlow Gmail and send when ready.

## Error handling

- No email address: skip this skill. Report to Brock. Continue to Skill 4.
- Gmail MCP draft fails: report the error. Provide the populated HTML content so Brock can paste manually. Continue to Skill 4.
- Template file not found: compose a plain-text fallback email with the same content (greeting, contract link, what to expect, calendar link). Draft that instead.

## Next step

Proceed to Skill 4: Notion Workflow Task Creation.
