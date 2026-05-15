# SKILL 2: Generate Kickoff Agenda

## What to do

### Step 1: Generate kickoff call agenda

Using `INTAKE_CONTEXT`, generate a structured kickoff call agenda:

```
KICKOFF CALL AGENDA — {Company Name}
Date: {scheduled date or TBD}

1. INTRODUCTIONS (5 min)
   - Who's on the call
   - Quick overview of ClickFlow's approach

2. AUDIT WALKTHROUGH (10 min)
   - Key findings from {audit type: prospect audit / pre-onboarding package}
   - Quick wins identified
   - Competitive landscape highlights

3. GOALS & KPIs ALIGNMENT (10 min)
   - Confirm: {goals from intake}
   - Set target metrics: ROAS target, CPA target, revenue target
   - Timeline expectations (30/60/90 day milestones)

4. ACCOUNT ACCESS & SETUP (10 min)
   Collect (if not already provided):
   - [ ] Meta Business Manager access (invite: brock@clickflow.dev as Admin)
   - [ ] Google Ads MCC access (if applicable)
   - [ ] Shopify/website analytics access
   - [ ] Klaviyo access (if applicable)
   - [ ] Any existing creative assets or brand guidelines

5. CAMPAIGN STRATEGY PREVIEW (10 min)
   - Platform priorities: {platforms}
   - Initial campaign structure recommendation
   - Creative testing approach (3-5 variants, 48-72hr monitoring)
   - Budget allocation across platforms

6. WORKING RELATIONSHIP (5 min)
   - Weekly reports delivered Fridays
   - Monthly strategy calls
   - Quarterly business reviews
   - Slack channel or email for day-to-day communication
   - Response time expectations

7. NEXT STEPS & TIMELINE (5 min)
   - Account access deadline: {date}
   - First campaign target launch: 48 hours after access confirmed
   - First weekly report: following Friday
```

### Step 2: Customize based on intake data

- If `competitors` provided: add "Competitive positioning vs. {competitors}" to section 2
- If `best_sellers` provided: add "Priority products for initial campaigns: {products}" to section 5
- If `creative_assets_link` provided: note "Creative assets received — will review before launch" in section 4
- If `monthly_spend` indicates high tier ($250K+): add "Dedicated Slack channel setup" to section 6

### Step 3: Present to Brock

Display the full agenda in conversation. This is for Brock's reference — he uses it to run the kickoff call.

## Output

The kickoff agenda is conversational output only (not deployed anywhere). Brock copies what he needs for the call.

## Workflow complete

After presenting the agenda, summarize the full intake processing result:
- CRM status
- Client context file location
- What's ready for the next step (audit or pre-onboarding)
- Any missing items to follow up on
