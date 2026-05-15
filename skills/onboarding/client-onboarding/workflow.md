# Client Onboarding Workflow

Master orchestration file. Scans CRM for clients at status "5. Onboarded" and runs the full launch handoff: contract generation, Stripe invoicing, onboarding email, Notion workflow task, and CRM status update.

## Trigger

Activated by commands like:
- "Run onboarding check"
- "Process onboarded clients"
- "Launch onboarded clients"
- "Check for onboarded clients"

## Agency Gate

**Contract generation and Stripe invoicing only run for ClickFlow and Example SaaS clients.** If the CRM Agency field is Acme Agency or Beacon Brand, Skills 1-2 and the Review Checkpoint are skipped entirely. The workflow jumps straight to email, workflow task, and CRM update.

## Workflow

Execute the following skills in order. For each client found at "5. Onboarded", run the applicable skills sequentially before moving to the next client.

| Step | Skill File | What It Does | Agency Gate |
|---|---|---|---|
| 1 | `skill-0-crm-scan.md` | Query CRM for "5. Onboarded" clients, extract fields, compute pricing, assemble ONBOARDING_CONTEXT per client | All |
| 2 | `skill-1-contract.md` | Copy Google Docs contract template, populate with client data, share with client | ClickFlow + Example SaaS only |
| **CP** | **REVIEW CHECKPOINT** | **Pause for Brock's review before invoice and email (see below)** | ClickFlow + Example SaaS only |
| 3 | `skill-2-invoice.md` | Create Stripe customer (or find existing), create + auto-send invoice | ClickFlow + Example SaaS only |
| 4 | `skill-3-email.md` | Draft onboarding welcome email in ClickFlow Gmail | All |
| 5 | `skill-4-workflow-task.md` | Create launch setup task in Notion Workflow database | All |
| 6 | `skill-5-crm-update.md` | Update CRM status to "6. Active", report completion summary | All |

## Before Starting

After Skill 0 completes, confirm scope:
> "Found {N} client(s) at status '5. Onboarded': {list of company names}. Processing sequentially: contract, invoice, email, workflow task, CRM update."

If 0 clients found: "No clients at status '5. Onboarded'." Stop.

## Review Checkpoint

**After Skill 1 and before Skill 2**, pause and present to Brock:

```
--- REVIEW CHECKPOINT ---

Client: {Company Name} | Agency: {Agency Name}

Contract: {Google Doc URL}
  Services: {services list}
  Monthly fee: ${deal_value}/mo
  Billing: {billing_terms}

Stripe invoice will be auto-sent to {email} for ${deal_value}.
Due: {days_until_due} days ({billing_terms}).

Options:
  a) Approve -- send Stripe invoice, draft onboarding email, create workflow task
  b) Revise contract -- specify changes
  c) Skip this client -- move to next
```

**Wait for Brock's response before proceeding to Skill 2.** Do not auto-continue.

If Brock requests revisions:
- Re-run Skill 1 with specified changes
- Return to the checkpoint with updated contract
- Only proceed after explicit approval

## Context Flow

Skill 0 produces an `ONBOARDING_CONTEXT` block per client that flows through Skills 1-5. It contains:

- `company_name`, `client_name`, `email`, `phone`, `website`
- `deal_value` (monthly invoice amount from CRM Deal Value field)
- `services` (array from CRM Services multi-select)
- `agency_slug` (from CRM Agency field, default: clickflow)
- `billing_terms` (from CRM Billing Terms field)
- `days_until_due` (computed from billing_terms: net 60 = 60, net 30 = 30, due on receipt = 0, subscription = 0)
- `brand_colors`, `brand_fonts`, `brand_logo`, `brand_tagline` (from agency brand.md)
- `client_slug` (kebab-case of company name)
- `crm_page_url` (Notion page URL for Workflow task relation)
- `skip_contract_invoice` (true if agency is Acme Agency or Beacon Brand)

Skills add to context as they complete:
- Skill 1 adds: `contract_url`
- Skill 2 adds: `invoice_id`, `invoice_url`, `invoice_number`

## Final Output

After all clients processed, present summary:

```
Onboarding check complete.

{For each client:}
{Company Name} ({Agency}):
  Contract: {contract_url}
  Invoice: #{invoice_number} -- ${deal_value} due in {days_until_due} days
  Email: Drafted in ClickFlow Gmail (review and send)
  Workflow Task: {task_url} -- due {due_date}
  CRM Status: 6. Active
```

## Error Handling

- **No clients at "5. Onboarded"**: Report and stop. Not an error.
- **Missing required CRM fields** (client_name, email, deal_value, services): Skip that client, report which fields are missing, continue to next client.
- **Google Docs API fails**: Hard stop for that client. Report error, move to next.
- **Stripe API fails**: Hard stop for that client. Report error with manual fallback instructions, move to next.
- **Gmail draft fails**: Note failure, provide email content for manual send. Continue to Skill 4.
- **Notion Workflow task creation fails**: Note failure. Continue to Skill 5.
- **Notion CRM update fails**: Note failure, instruct Brock to update manually.
- **Multiple clients**: Process sequentially. One client's failure does not block others.
