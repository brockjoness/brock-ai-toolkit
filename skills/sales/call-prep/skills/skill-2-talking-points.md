# SKILL 2: Talking Points

## When to use

After the audit is deployed (Skill 1) or after loading an existing audit.

## What to do

### Step 1: Gather inputs

Collect:
- `call_notes` from `CALL_PREP_CONTEXT` (internal notes from team members)
- `current_date_section`
- `company_name`, `agency`, `client_name`, `objective`
- `MARKET_SNAPSHOT_OUTPUT`, `META_AUDIT_OUTPUT`, `PRODUCT_PAGE_OUTPUT`, `SYNTHESIS_OUTPUT`
- `vercel_url` or `existing_audit_url`

### Step 2: Analyze call notes

Read through all internal notes and identify:
- Specific instructions from team members (e.g., "don't pitch the website")
- Key context about the prospect's mindset
- Content recommendations from your creative team
- Any stated pain points, objections, or priorities
- Things to avoid

### Step 3: Cross-reference with audit findings

Map internal notes to audit findings:
- For each team note, find supporting data in the audit outputs
- Identify where audit findings reinforce or contradict team assumptions
- Find the strongest audit-backed talking points

### Step 4: Generate structured talking points

```
- **{Topic from team notes}** -- {What to say, informed by audit data}. Frame: "{exact framing suggestion}".
- **{Key audit finding to lead with}** -- {Finding + why it matters}. Position: "{positioning language}".
- **{Competitive insight}** -- {What competitors are doing}. Frame: "{comparison framing}".
- **{Quick win or opportunity}** -- {Specific recommendation backed by audit}. Pitch: "{how to pitch it}".
- **{Content/creative recommendation}** -- {What to propose, aligned with creative team notes}.
...
- **Avoid on this call:** {Things NOT to do, based on team notes and context}.
```

Guidelines:
- Each point 2-3 sentences max
- Include specific data points (numbers, competitor names, percentages)
- Include "Frame:" or "Position:" language usable verbatim on the call
- The "Avoid" section last
- Typically 6-10 talking points total

### Step 5: Write to Notion

Use `notion-update-page` with `update_content` to insert the talking points into the page under the current date's call notes toggle. Append below any existing talking points rather than overwriting.

### Step 6: Progress update

> "Talking points written for **{company_name}**. Key themes: {2-3 word summary of top 3 themes}."

## Error handling

- If audit outputs are unavailable: Generate talking points from call notes only, note the limitation
- If no call notes exist: Generate from audit findings only, note: "No internal notes found -- talking points are based on audit data alone."
- If Notion content update fails: Present talking points in the conversation for manual copy

## Next step

Proceed to Skill 3: Team Chat Notification.
