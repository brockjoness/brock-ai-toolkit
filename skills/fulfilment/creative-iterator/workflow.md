# Creative Iterator -- Workflow

Lightweight routing skill that takes test-analyzer output (winning elements + iteration briefs) and feeds it into the creative pipeline to produce the next round of ad variants.

## Trigger

Activated by:
- Selecting option (a) "Generate full iteration briefs" from test-analyzer output
- "Iterate on winning ads for [Client]"
- "Next round of creatives for [Client]"
- Chained automatically when test-analyzer identifies clear winners

## Input

Requires at least one of:
1. `EXTRACTION_OUTPUT` from test-analyzer Skill 2 (winning elements, patterns)
2. Manual winning ad description from Brock (ad name, what worked, what to change)

## Workflow

### Step 1: Package iteration context

Assemble the iteration input for creative-brief-generator:

```
ITERATION_CONTEXT:
  client_name: {from test context or ask}
  agency_slug: {from test context or ask}
  iteration_type: {angle / format / copy / CTA}

  winning_elements:
    hook: {winning hook type}
    visual_style: {winning visual approach}
    copy_theme: {winning copy approach}
    cta: {winning CTA}
    format: {winning format}

  change_brief:
    what_to_change: {specific variable to iterate on}
    variants_requested: {3 by default}
    avoid: {elements from losers to avoid}

  performance_benchmark:
    roas: {winner's ROAS to beat}
    cpa: {winner's CPA to beat}
    ctr: {winner's CTR to beat}
```

### Step 2: Route to creative-brief-generator

Load the creative-brief-generator skill:
- `.claude/work-types/3-fulfilment/skills/creative-brief-generator/skill-0-trigger.md`
- `.claude/work-types/3-fulfilment/skills/creative-brief-generator/skill-1-generate-brief.md`

Pass `ITERATION_CONTEXT` as `manual_input` to the brief generator. The brief generator will:
1. Load the client's vertical template
2. Generate briefs that PRESERVE winning elements and ITERATE on the specified variable
3. Produce 3-5 hook angles that build on what worked

### Step 3: Route brief output to creative-generator

After briefs are generated, offer routing:

> "Iteration briefs ready. Options:
> 1. **Generate HTML mockups** -- feed briefs to creative-generator for ad production
> 2. **Review briefs first** -- check the briefs before producing creatives
> 3. **Adjust** -- modify the iteration direction"

If option 1 is selected, chain to:
- `.claude/work-types/3-fulfilment/skills/creative-generator/`

## Full Chain

```
test-analyzer (winners identified)
    |
creative-iterator (packages winning elements)
    |
creative-brief-generator (produces iteration briefs)
    |
creative-generator (produces HTML ad mockups)
```

## Error Handling

- If no winning elements are available: ask Brock for manual input (which ad to iterate on, what worked)
- If creative-brief-generator fails: present the iteration briefs as text for manual use
- If creative-generator fails: present the briefs as text and note the failure
