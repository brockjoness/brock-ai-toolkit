# SKILL 1: Competitor Research Adapter

## When to use

After Skill 0 has completed and the CLIENT_CONTEXT is assembled. Always runs.

## What to do

### Step 1: Load the existing competitor research skill

Read the following files from the standalone competitor research skill:
- `./onboarding/competitor-research/skill-0-trigger.md`
- `./onboarding/competitor-research/skill-1-competitor-research.md`

### Step 2: Execute the competitor research workflow

Run the competitor research workflow exactly as specified in `skill-1-competitor-research.md`, using the client context from Skill 0:

- **Brand name**: Use `company_name` from CLIENT_CONTEXT
- **Industry**: Use `company_type` if available
- **Product category**: Infer from `services` and `best_sellers` if available
- **Competitor names**: Extract from `call_notes` if any competitors were discussed

Make all 5 Perplexity API calls as specified:
1. Reddit brand mentions & sentiment
2. Reddit customer pain points & objections
3. X/Twitter category conversation & sentiment
4. Multi-platform review analysis
5. Competitive landscape & positioning

### Step 3: Capture the output

Instead of presenting the research brief to the user, capture the full structured text output (the "COMPETITOR & MARKET RESEARCH BRIEF") as `COMPETITOR_RESEARCH_OUTPUT`.

Do NOT present any interim results to the user. The output will be converted to HTML in Skill 5.

### Step 4: Provide progress update

Tell the user:
> "Competitor research complete. Moving to Meta audit."

## Error handling

- If all 5 API calls fail: set `COMPETITOR_RESEARCH_OUTPUT` to an error message and proceed. The HTML generation skill will create a page noting the failure.
- If some calls succeed and some fail: produce the report with available data. Mark failed sections with "[Section]: Research unavailable."

## Next step

Proceed to Skill 2: Meta Audit Adapter.
