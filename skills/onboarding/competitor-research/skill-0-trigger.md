# SKILL 0: Onboarding Workflow Trigger & Entry Point

## When to activate

Start the onboarding research workflow automatically when **any** of the following occur:

1. The user requests competitor research, market research, or brand research for a client onboarding
2. The user provides a brand/company name and asks for customer sentiment analysis, review mining, or social listening
3. The user says they are onboarding a new client and need research
4. The router matches this request to the onboarding work type

## What to do

### Step 1: Extract required inputs

Identify the **brand/company name** from the user's message. This is the only required input.

If the brand name is not provided, ask:
> "What is the brand or company name to research?"

### Step 2: Extract optional inputs (do not ask — use if provided)

- **Industry/vertical**: e.g., skincare, fitness, pet food, SaaS
- **Product category**: e.g., protein powder, running shoes, CRM software
- **Known competitors**: specific competitor names to compare against
- **Target market**: e.g., US women 25-40, UK millennials
- **Website URL**: for additional context

If agency/client context was loaded by the router (brand.md, context.md), extract these from there.

### Step 3: Check API readiness

Before proceeding, verify the Perplexity API key is available by running:

```bash
echo "${PERPLEXITY_API_KEY:+API key is set}"
```

If the output is empty, stop and tell the user:
> "The Perplexity API key is not set. Please ensure $PERPLEXITY_API_KEY is configured in your project's .env file (see .env.example) and your shell has been reloaded."

### Step 4: State the research scope

Confirm back to the user in one line:
> "Onboarding research for **[Brand Name]** ([Industry/Vertical if known]). Running competitor & market research via Perplexity API."

If agency context was loaded, also state:
> "Agency context loaded: [Agency Name]"

### Step 5: Begin research

Proceed automatically to Skill 1 (Competitor Research).

## Re-entry logic

If the user provides **additional context** after research has started (e.g., competitor names, specific review platforms to check, a product category correction):

- Identify which research areas are affected
- Re-run the affected Perplexity API calls with the refined queries
- Update the deliverable with revised findings
- State: "Updated [section] with new context — changes noted below."

## Next step

Proceed automatically to Skill 1.
