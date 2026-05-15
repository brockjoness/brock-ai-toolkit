# Pre-Onboarding Workflow

Master orchestration file. This defines the end-to-end flow from trigger to deployed hub URL.

## Trigger

Activated by commands like:
- "Begin pre-onboarding for [Client]"
- "Pre-onboarding for [Client]"
- "Onboarding package for [Client]"
- "Start pre-onboarding [Client] for [Agency]"

## Workflow

Execute the following skills in order. Each skill file lives in the `skills/` subdirectory.

| Step | Skill File | What It Does |
|---|---|---|
| 1 | `skill-0-trigger.md` | Parse client name, determine agency, fetch CRM data + call notes, validate required fields |
| 2 | `skill-1-competitor-research-adapter.md` | Run existing competitor research skill, capture text output |
| 3 | `skill-2-meta-audit-adapter.md` | Run existing meta pre-access audit skill, capture text output (skip if no Ad Library URL) |
| 4 | `skill-3-google-audit-adapter.md` | Run google audit skill if built, otherwise generate placeholder |
| 5 | `skill-4-roadmap-generator.md` | Synthesize all gathered data into 12-month roadmap |
| 6 | `skill-5-html-generation.md` | Convert all text outputs to branded HTML using templates |
| 7 | `skill-6-hub-and-deployment.md` | Generate hub page, deploy all pages to Vercel, return URLs |

## Context Flow

Skill 0 produces a `CLIENT_CONTEXT` block that flows through all subsequent skills. It contains:

- `company_name`, `client_name`, `agency_slug`
- `website`, `instagram`, `tiktok`
- `meta_ads_library`, `google_ads_id`
- `company_type`, `services`, `best_sellers`
- `call_notes` (full transcript/notes from CRM page content)
- `brand_colors`, `brand_fonts`, `brand_logo`, `brand_tagline` (from agency brand.md)
- `client_slug` (kebab-case of company name, used for directory naming)

Skills 1-3 each produce a text output variable:
- `COMPETITOR_RESEARCH_OUTPUT`
- `META_AUDIT_OUTPUT` (or "SKIPPED" with reason)
- `GOOGLE_AUDIT_OUTPUT` (or "PLACEHOLDER")

Skill 4 produces:
- `ROADMAP_OUTPUT`

Skill 5 consumes all outputs and produces HTML files written to disk.

Skill 6 deploys everything and returns URLs.

## Final Output

Present to the user:

```
Pre-onboarding complete for [Company Name] via [Agency Name].

Hub URL: [hub URL]

Individual deliverables:
  Competitor Research: [URL]
  Meta Audit: [URL or "Skipped -- no Ad Library URL"]
  Google Audit: [URL or "Placeholder -- skill not yet built"]
  12-Month Roadmap: [URL]

Local files: pre-onboarding/{client-slug}/
```

## Error Handling

- If CRM search finds no matching client: stop and tell the user. Do not guess.
- If a Perplexity API call fails: retry once, then note the failure in the competitor research output and proceed.
- If Chrome DevTools MCP is unavailable for Meta audit: skip the meta audit, note on hub page.
- If Vercel deploy fails: retry once, then report the failure with the local file path so the user can deploy manually.
- Never block the entire package for a single component failure.
