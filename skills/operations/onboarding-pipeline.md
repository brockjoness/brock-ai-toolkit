# SOP: Client Onboarding Pipeline

## Goal
From intake form submission to kickoff call in under 24 hours.

## CRM Status Flow

```
1. Lead → 2. Intake Complete → 3. Audit Sent → 4. Kickoff Scheduled → 5. Onboarded → 6. Active
```

## Pipeline Steps

### Step 1: Intake Form Received → Status: "2. Intake Complete"
**Time target: 0-1 hour**

1. New submission arrives (Google Form or website form)
2. Run `onboarding-intake-processor` skill:
   - Validate all required fields are present
   - Create or update CRM entry with intake data
   - Populate client context file (`agencies/{agency}/clients/{slug}/context.md`)
   - Generate kickoff call agenda
3. If fields are missing, flag immediately — do not proceed without: Company Name, Website, Primary Contact Email, Monthly Ad Spend, and Platform(s)
4. Update CRM status to `2. Intake Complete`

### Step 2: Free Audit / Pre-Onboarding → Status: "3. Audit Sent"
**Time target: 1-3 hours after intake**

1. If prospect (not yet signed): Run `prospect-audit` skill → deploy → send audit link via email
2. If signed client: Run `pre-onboarding` skill → deploy full package (competitor research, meta audit, google audit, roadmap) → send hub link
3. Update CRM status to `3. Audit Sent`
4. Update CRM `Proposal` or `Audit URL` field with deployed URL

### Step 3: Schedule Kickoff Call → Status: "4. Kickoff Scheduled"
**Time target: 2-6 hours after audit sent**

1. Send email with audit/pre-onboarding link + scheduling link for kickoff call
2. Once call is booked, update CRM status to `4. Kickoff Scheduled`
3. Before the call, review the audit/roadmap output and prepare talking points

### Step 4: Kickoff Call → Status: "5. Onboarded"
**Time target: Within 24 hours of intake**

During the call:
- Walk through audit findings / pre-onboarding deliverables
- Confirm goals, KPIs, and success metrics
- Collect remaining account access (Meta Business Manager, Google Ads, Shopify, Klaviyo)
- Confirm budget and launch timeline
- Set expectations: weekly reports (Friday), monthly check-ins, QBRs

After the call:
- Update CRM with call notes
- Update client context file with confirmed goals and KPIs
- Run `launch-readiness-check` to validate all prerequisites
- Update CRM status to `5. Onboarded`

### Step 5: Launch → Status: "6. Active"
**Time target: 48 hours after kickoff (per site promise)**
**Automation: `client-onboarding` workflow**

1. Run "onboarding check" to scan CRM for clients at "5. Onboarded"
2. Workflow auto-generates: service agreement contract, Stripe invoice (auto-sent, amount from Deal Value field)
3. Review checkpoint: verify contract and pricing before invoice sends
4. After approval: invoice sent, onboarding email drafted
5. Workflow task created in your project management tool (due: 48 hours, priority: High)
6. CRM status updated to `6. Active`
7. Build and launch campaigns per workflow task checklist
8. Begin weekly reporting cadence (Fridays)

## Required Intake Fields

| Field | Required? | Notes |
|---|---|---|
| Company Name | Yes | Fatal if missing |
| Website URL | Yes | Needed for audit + logo |
| Primary Contact Name | Yes | For all communications |
| Primary Contact Email | Yes | For delivery + scheduling |
| Monthly Ad Spend (current or planned) | Yes | Determines pricing tier |
| Platform(s) (Meta, Google, TikTok) | Yes | Determines scope |
| Ad Account Access | Recommended | Can collect at kickoff if not available |
| Goals (ROAS target, CPA target, revenue target) | Recommended | Refine at kickoff if vague |
| Top Products / Services | Recommended | Informs creative strategy |
| Competitor List (3-5) | Optional | Research if not provided |
| Creative Assets Link (Drive, Dropbox) | Optional | Collect at kickoff if not available |
| Brand Guidelines | Optional | Collect at kickoff if not available |

## Timing Summary

| Step | Target Time | Cumulative |
|---|---|---|
| Intake processed | 1 hour | 1 hour |
| Audit/package delivered | 2 hours | 3 hours |
| Kickoff call scheduled | 3 hours | 6 hours |
| Kickoff call completed | 18 hours | 24 hours |
| First campaign live | 48 hours | 72 hours |

## Automation Points

- `onboarding-intake-processor` — processes intake form, creates CRM entry + context file
- `prospect-audit` / `pre-onboarding` — generates and deploys audit/package
- `client-onboarding` — generates contract, sends Stripe invoice, drafts onboarding email, creates workflow task, updates CRM to "6. Active"
- `launch-readiness-check` — validates all prerequisites before go-live
- `email-autoresponder` — drafts follow-up emails at each stage
