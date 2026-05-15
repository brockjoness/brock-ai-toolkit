# Strategy Pipeline Workflow

Standalone orchestrator that wraps the pre-onboarding pipeline with additional features: concise strategy document mode, creative brief generation, review checkpoint, and timing instrumentation.

**This skill does NOT modify the pre-onboarding pipeline.** It calls pre-onboarding skills as-is and adds its own steps around them.

## Trigger

Activated by:
- "24-hour strategy for [Client]"
- "Strategy doc for [Client]"
- "Build strategy document for [Client]"
- "Quick strategy for [Client]"
- "Strategy pipeline for [Client]"

**Note:** Standard "Begin pre-onboarding for [Client]" triggers go to the unmodified pre-onboarding pipeline, NOT here.

## Workflow

| Step | Action | Details |
|---|---|---|
| 1 | **Start timing** | Note `PIPELINE_START` timestamp |
| 2 | **Run pre-onboarding Skills 0-3** | Execute the standard pre-onboarding pipeline through context gathering, competitor research, meta audit, and google audit. These run exactly as specified in `pre-onboarding/skills/`. |
| 3 | **Generate strategy document** | Instead of calling pre-onboarding Skill 4 (full 12-month roadmap), generate a concise 90-day strategy doc (see format below) |
| 4 | **Generate creative brief** | Chain to `creative-brief-generator` using research + audit + strategy output as inputs |
| 5 | **Review checkpoint** | Pause for Brock's review of all deliverables before HTML generation |
| 6 | **HTML generation + deployment** | Run pre-onboarding Skills 5-6 with the strategy doc output substituted for ROADMAP_OUTPUT, plus add creative brief HTML |
| 7 | **Record timing** | Note `PIPELINE_END`, report elapsed time |

## Step 2: Run Pre-Onboarding Skills 0-3

Load and execute these skills exactly as written:
- `./onboarding/pre-onboarding/skills/skill-0-trigger.md`
- `./onboarding/pre-onboarding/skills/skill-1-competitor-research-adapter.md`
- `./onboarding/pre-onboarding/skills/skill-2-meta-audit-adapter.md`
- `./onboarding/pre-onboarding/skills/skill-3-google-audit-adapter.md`

This produces: `CLIENT_CONTEXT`, `COMPETITOR_RESEARCH_OUTPUT`, `META_AUDIT_OUTPUT`, `GOOGLE_AUDIT_OUTPUT`.

## Step 3: Generate Strategy Document

Instead of the full 12-month roadmap, produce a concise strategy document:

```
# GROWTH STRATEGY

**Client:** [Company Name]
**Agency:** [Agency Name]
**Prepared:** [date]

## The Opportunity

[2-3 sentences summarizing the biggest growth opportunity based on research + audit findings. Specific, not generic.]

## Strategic Pillars

1. **[Pillar 1]**: [1 sentence]
2. **[Pillar 2]**: [1 sentence]
3. **[Pillar 3]**: [1 sentence]

## 90-Day Action Plan

### Month 1: [Theme]
**Goal:** [one sentence outcome]
- [Action 1 -- specific, measurable]
- [Action 2]
- [Action 3]
- [Action 4]
**Success metric:** [one clear KPI]

### Month 2: [Theme]
**Goal:** [one sentence outcome]
- [Action 1]
- [Action 2]
- [Action 3]
**Success metric:** [one clear KPI]

### Month 3: [Theme]
**Goal:** [one sentence outcome]
- [Action 1]
- [Action 2]
- [Action 3]
**Success metric:** [one clear KPI]

## Year 1 Direction

| Quarter | Focus | Target Outcome |
|---|---|---|
| Q1 | Foundation & Quick Wins | [specific] |
| Q2 | Growth & Optimization | [specific] |
| Q3 | Scale & Diversification | [specific] |
| Q4 | Peak Performance | [specific] |

## Immediate Next Steps

1. [First thing -- e.g., "Grant Meta Business Manager access"]
2. [Second thing]
3. [Third thing]
```

Use the same input extraction logic as `pre-onboarding/skills/skill-4-roadmap-generator.md` (Steps 1-4: extract strategic signals, define pillars, customize per client). The difference is output format only.

Store as `ROADMAP_OUTPUT` (for downstream compatibility with Skill 5).

## Step 4: Generate Creative Brief

Load and execute the creative-brief-generator:
- `.claude/work-types/./fulfilment/creative-brief-generator/skill-0-trigger.md`
- `.claude/work-types/./fulfilment/creative-brief-generator/skill-1-generate-brief.md`

Map pipeline context to brief inputs:
- `research_input` = Section 7 of `COMPETITOR_RESEARCH_OUTPUT`
- `audit_input` = Creative sections from `META_AUDIT_OUTPUT`
- `client_context` = Full CLIENT_CONTEXT

Store as `CREATIVE_BRIEF_OUTPUT`.

## Step 5: Review Checkpoint

Pause and present summary to Brock:

```
--- REVIEW CHECKPOINT ---

Strategy pipeline analysis complete for [Company Name] via [Agency Name].

Deliverables ready for HTML generation:

1. Competitor Research: [DONE / SKIPPED]
   Key findings: [1-2 sentence summary]

2. Meta Audit: [DONE / SKIPPED]
   Key findings: [1-2 sentence summary]

3. Google Audit: [DONE / PLACEHOLDER]

4. Strategy Document: DONE
   Strategic pillars: [list 3 pillars]

5. Creative Brief: DONE
   Top angles: [list 2-3 top hook angles]

Options:
  a) Approve -- proceed to HTML generation and deploy
  b) Revise -- specify which deliverable to adjust
  c) Skip a deliverable -- exclude from final package
```

**Wait for explicit approval before proceeding.**

## Step 6: HTML Generation + Deployment

Run pre-onboarding Skill 5 (HTML generation) and Skill 6 (deployment) with:
- `ROADMAP_OUTPUT` containing the strategy doc (Skill 5 converts it to HTML using the roadmap template)
- `CREATIVE_BRIEF_OUTPUT` converted to HTML inline (use angle-card structure for hooks, stat-cards for CTAs, content-list for copy variants)
- Creative brief deployed as an additional Vercel page

## Step 7: Final Output

```
Strategy pipeline complete for [Company Name] via [Agency Name].
Pipeline time: [X hours, Y minutes]

Hub URL: [hub URL]

Individual deliverables:
  Competitor Research: [URL]
  Meta Audit: [URL or "Skipped"]
  Google Audit: [URL or "Placeholder"]
  Growth Strategy: [URL]
  Creative Brief: [URL]

Local files: pre-onboarding/{client-slug}/
```

## Error Handling

- Same error handling as pre-onboarding pipeline
- If creative brief generation fails: proceed without it, note on hub with "pending" badge
- If checkpoint is denied/revised: re-run only the affected step, return to checkpoint
