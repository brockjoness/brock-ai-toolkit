# Conventions

The shape of skills and apps in this repo, written down so you can reason about them at a glance.

## Skill structure

Every skill folder follows the same shape:

```
skills/{department}/{skill-name}/
├── README.md          # One-page human-readable description (this is what you read first)
├── SKILL.md           # The instruction set Claude actually executes
├── rules.md           # Optional — stricter constraints / output format rules
├── .env.example       # Only if the skill has specific env vars
├── templates/         # Optional — HTML, prompt, or doc templates the skill renders
├── skills/            # Optional — sub-skills if the workflow is multi-step
└── scripts/           # Optional — Python/shell scripts the skill calls
```

The README is for humans. The SKILL.md is for Claude. They overlap intentionally — the README explains what and why; the SKILL.md gives Claude step-by-step instructions for execution.

## Maturity labels

Every skill README declares maturity in one word. I try to be honest:

- **production** — I run this regularly against real work. It either runs on a schedule or I invoke it weekly. Known sharp edges are documented.
- **working** — Functionally complete but doesn't run on a schedule, or only runs occasionally. Probably has at least one rough edge.
- **experimental** — Sketch, scaffold, or unproven idea. Useful as an example of shape; don't expect it to work out of the box.

If you're forking, prefer `production` skills as starting points. Treat `experimental` ones as reading material.

## File naming

- Skills are kebab-case (`prospect-audit`, `weekly-report-generator`).
- Departments are bare names (`sales`, `fulfilment`).
- Templates and outputs use date-prefixed kebab-case where relevant (`2026-04-15-audit-name`).
- Anything starting with `_` is metadata or scaffolding (`_FLAGS.md`, `_registry.md` patterns).

## Env vars

Every skill that touches an external API documents its env vars in a per-skill `.env.example`. The repo root `.env.example` is the union of all of them — handy if you want a single file to copy.

Two patterns to know:
- `YOUR_NOTION_*_DB_ID` (placeholders for IDs you'll fill in once)
- `*_API_KEY` / `*_API_TOKEN` (secrets you supply at runtime, never commit)

## Cross-skill dependencies

Skills sometimes chain — `scrape-leads` → `lead-enrichment` → `cold-email-campaigns` is a common path. Each skill's README calls out what feeds it and what it feeds. Skills don't import each other; they share data via Notion / files.

## Branding variants

A few skills (notably `prospect-audit`) have multiple branded variants — same workflow, different look. The pattern is to clone the skill folder, swap the templates and palette, and keep both. The README of the primary skill documents how to do this cleanly.

## Tone for output

Most skills are written assuming the output will go to a service-business owner — concrete, action-oriented, light on jargon. If you're adapting a skill for a different audience (technical, executive, regulated industry), the tone instructions live near the top of each SKILL.md and are usually a one-liner.

## Apps

The three apps under `apps/` are full deployable projects, not skills:

- **`apps/ad-generator`** — Next.js scaffold for an AI-driven Meta/Google ad creative generator. Currently a fresh scaffold; bundled SDKs (`@anthropic-ai/sdk`, `@google/genai`, `@fal-ai/client`) signal intent.
- **`apps/reporting-dashboard`** — Next.js + Supabase client reporting portal with admin and client roles.
- **`apps/hit-rate-calculator`** — Single-page lead-magnet calculator. Static HTML; deploys anywhere.

Each app has its own README, `.env.example`, and (if needed) `_FLAGS.md` calling out anything you should know before running it.
