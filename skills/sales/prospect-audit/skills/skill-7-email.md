# SKILL 7: Email Delivery

## When to use

After Skill 6 has deployed the audit to Vercel and updated Notion.

## What to do

### Step 1: Validate email availability

Check if `email` exists in PROSPECT_CONTEXT.

If no email is available:
- Report: "No email address available for {company_name}. Audit is live at {audit_url} but cannot send delivery email."
- STOP this skill (the audit is still complete).

### Step 2: Read email template

- `./templates/prospect-audit-email.html`

### Step 3: Resolve first name

Check the Website Submissions database entry for a contact name. If a name exists, extract the first name. Otherwise use "there" (yields "Hi there,").

### Step 4: Prepare variables

| Placeholder | Source |
|---|---|
| `{{COMPANY_NAME}}` | `company_name` from PROSPECT_CONTEXT |
| `{{FIRST_NAME}}` | Resolved first name |
| `{{AUDIT_URL}}` | Vercel deployment URL from Skill 6 |
| `{{CALENDAR_LINK}}` | `https://your-calendar-link.example.com` |

Replace all placeholders.

### Step 5: Send the email

Use your configured Gmail MCP server's `send_email` tool (e.g. `mcp__gmail-{your-brand}__send_email`):
- **To:** prospect's email from PROSPECT_CONTEXT
- **Subject:** `{Your brand} & {company_name} | Account Audit`
- **Body:** Use `htmlBody` with `mimeType: "text/html"` containing the populated template

### Step 6: Present results

> "Audit delivery email sent to **{company_name}**."
>
> **To**: {email}
> **Subject**: {Your brand} & {company_name} | Account Audit
> **Audit URL**: {audit_url}

## Error handling

- If no email address available: report, skip email (audit is still complete)
- If Gmail MCP send fails: report the error, provide the audit URL for manual send
- If Notion lookup for contact name fails: use "there" as fallback

## Final step

This is the last skill. The workflow is complete.
