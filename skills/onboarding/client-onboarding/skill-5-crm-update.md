# SKILL 5: CRM Status Update

## When to use

After Skill 4 (workflow task) has created the Notion task. This is the final skill for each client.

## What to do

### Step 1: Update CRM status

Use Notion MCP `notion-update-page` on `crm_page_url` to update:

| Property | New Value |
|---|---|
| Status | `6. Active` |
| Onboarding | `true` (checkbox) |

### Step 2: Report per-client completion summary

> "Onboarding complete for **{company_name}** ({agency_slug}):"
>
> | Step | Result |
> |---|---|
> | Contract | {contract_url} |
> | Invoice | #{invoice_number} - ${deal_value} due in {days_until_due} days |
> | Email | Drafted in ClickFlow Gmail (review and send) |
> | Workflow Task | {task_url} - due {due_date} |
> | CRM Status | Updated to 6. Active |

### Step 3: Check for next client

If there are more clients in the ONBOARDING_CONTEXT queue from Skill 0:
- Proceed to Skill 1 for the next client

If this was the last client:
- Present the final summary (see workflow.md Final Output section)
- The workflow is complete

## Error handling

- Notion update fails: report the error. Instruct Brock: "Update {company_name} CRM status to '6. Active' manually."
- Even if the CRM update fails, still report the completion summary for this client.

## Next step

If more clients remain: return to Skill 1 for the next client.
If last client: workflow complete.
