# SKILL 4: Notion Workflow Task Creation

## When to use

After Skill 3 (onboarding email) has drafted the email.

## What to do

### Step 1: Validate required fields

Check ONBOARDING_CONTEXT has:
- `company_name`
- `services` (array)
- `crm_page_url` (for Client relation)
- `contract_url` (from Skill 1)

### Step 2: Generate task instructions

Build a service-specific checklist from the `services` array. For each service selected:

| Service | Checklist Items |
|---|---|
| Meta Ads | Build Meta campaign structure, install pixel, create custom audiences, launch initial campaigns |
| Google Ads | Build search/shopping campaigns, install conversion tracking, launch initial campaigns |
| TikTok Ads | Build TikTok campaign structure, install pixel, launch initial campaigns |
| Shopify CRO | Review Shopify store, implement CRO recommendations, set up conversion tracking |
| Email Flows (i.e. Klaviyo Hubspot) | Set up Klaviyo/Hubspot flows (welcome, abandoned cart, post-purchase, win-back) |
| Email Campaigns (i.e. Klaviyo Hubspot) | Build first email campaign batch, set up send schedule |
| AI-Enabled Content Creation | Set up content creation pipeline, generate initial creative assets |

Add universal items at the bottom:
- Verify tracking and attribution setup
- Set up reporting dashboard
- Schedule first weekly report (next Friday)
- Confirm budget allocation across platforms

Format as a single text block:

```
Launch setup for {Company Name}

Services:
- [ ] {Service 1 checklist items}
- [ ] {Service 2 checklist items}
...

General:
- [ ] Verify tracking and attribution setup
- [ ] Set up reporting dashboard
- [ ] Schedule first weekly report (next Friday)
- [ ] Confirm budget allocation across platforms

Contract: {contract_url}
Invoice: {invoice_url}
Monthly fee: ${deal_value}/mo
```

### Step 3: Calculate due date

Set due date to current date + 2 days (48 hours, per onboarding SOP launch promise).

Format as ISO-8601 date string (e.g., `2026-03-08`).

### Step 4: Create the task

Use Notion MCP `notion-create-pages` to create a new page in the Workflow database (`collection://YOUR_NOTION_DB_ID`):

| Property | Value |
|---|---|
| Name | `{Company Name} - Launch Setup` |
| Client | Relation to `crm_page_url` |
| Status | `To Do` |
| Priority | `High` |
| Due Date (start) | Computed due date (current + 2 days) |
| Instructions | Generated checklist from Step 2 |
| Content | `contract_url` |

### Step 5: Report

> "Workflow task created: **{Company Name} - Launch Setup**"
> Due: {due_date}
> Status: To Do | Priority: High
> Task URL: {task_url}

## Error handling

- Notion MCP fails to create task: report the error. Provide the task details (name, instructions, due date) so Brock can create manually. Continue to Skill 5.
- Client relation fails: create the task without the relation. Note: "Client relation not linked. Link manually in Notion."
- Missing contract_url or invoice_url: still create the task. Note the missing references in the instructions.

## Next step

Proceed to Skill 5: CRM Status Update.
