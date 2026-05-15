# Creative Brief Generator — Workflow

## Trigger

Activated by:
- "Generate creative brief for [Client]"
- "Creative brief for [Client]"
- "Build briefs from this research"
- Chained from competitor-research or audit output in the strategy pipeline

## Skill Chain

```
Skill 0: Parse & Validate Input
    ↓
Skill 1: Generate Creative Brief
```

## Before Starting

Confirm scope:
> "Generating creative brief for **{Brand Name}** ({Vertical}). Sources: {list input sources}. Target platforms: {platforms}."

## Input Sources

The skill accepts input from multiple sources. At minimum ONE must be present:

| Source | How It Arrives | What It Provides |
|---|---|---|
| Competitor research | Section 7 "Creative Brief Input Summary" | Messaging angles, pain points, user language, creative themes |
| Meta audit (pre or post) | Creative deep dive section | Winning patterns, format mix, copy themes, fatigue signals |
| Google audit | Ad copy patterns section | Headline patterns, description themes, keyword angles |
| Manual brief | Brock's direct input | Specific angles, products, audience, goals |
| Client context | CRM + context.md | Best sellers, brand voice, competitor list, goals |

## Context Flow

`BRIEF_CONTEXT` assembled in Skill 0:
- `brand_name`, `agency_slug`, `client_slug`
- `vertical` (Beauty/Health/Apparel/Food/Events/Other)
- `campaign_objective` (Awareness/Consideration/Conversion)
- `target_platforms` (Meta, Google, TikTok)
- `research_input` (from competitor-research Section 7, if available)
- `audit_input` (from meta/google audit creative sections, if available)
- `manual_input` (from Brock, if available)
- `client_context` (from CRM/context.md)

## Final Output

Present the complete creative brief in conversation. Then ask:
> "Creative brief complete. Options:
> 1. **Refine** — adjust angles, copy, or direction
> 2. **Generate mockups** — feed to creative-generator for HTML ad production
> 3. **Write to Notion** — save under client's CRM page
> 4. **Continue pipeline** — proceed to next step in strategy pipeline"

## Error Handling

- No input sources available: ask Brock for manual brief input (product, angle, audience)
- Vertical not identifiable: use general D2C template, note this in brief
- Client not in CRM: proceed with available data, note missing context
