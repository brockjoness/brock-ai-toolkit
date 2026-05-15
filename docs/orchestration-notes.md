# Orchestration Notes

These are notes on how I structured my own AI tooling for an ad agency that serves multiple brands and a personal content channel on the side. Treat it as a worked example, not a prescription. The structure is what matters; the specific agency / client / skill names are placeholders.

## The mental model: three layers

Every task an agent might receive maps to one of three signals (or some combination):

1. **Agency** — which business unit is this for? (e.g. "Acme Agency", "Clickflow")
2. **Work type** — what kind of work? (e.g. "Meta audit", "competitor research", "weekly report")
3. **Client** — for which end client? (often optional)

Routing a request becomes: parse those three signals, load the matching context, run the matching skill. Most of the productivity gain comes from having the agency context (brand voice, palette, terminology) and client context (ad account IDs, goals, history) injected automatically, instead of pasted into every prompt.

## Folder layout

```
.claude/
  agencies/
    acme-agency/
      brand.md                     # voice, palette, do-not-say list
      clients/
        _registry.md               # one-line index of every client
        example-client/
          context.md               # ad account IDs, goals, history
    clickflow/                     # my own personal/newsletter brand
      brand.md
  work-types/
    0-operations/
    1-sales/skills/call-prep/
    2-onboarding/skills/competitor-research/
    3-fulfilment/skills/meta-audit-pre-access/
    4-reporting/skills/weekly-report-generator/
    5-retention/skills/qbr-generator/
  social/
    {creator-handle}/
      skills/content-ideation/
      skills/youtube-thumbnails/
  reference/
    feedback-protocol.md
    verification-checklist.md
```

Two important separations to enforce, even when it feels redundant:

- **Agency separation.** Each agency keeps its own credentials, Slack workspace, Notion database, and CRM. No cross-pollination, ever. The agent should fail closed when an agency-specific token isn't loaded, not silently fall back to "any agency's" token.
- **Departments are the spine.** Work types live under `work-types/{n-department}/`. This stays stable even when agencies and clients churn.

## Routing protocol the agent follows

1. Parse the request for three signals: agency, work type, client. All optional.
2. If an agency is named, load `agencies/{slug}/brand.md`. If a client is also named, load `agencies/{slug}/clients/{slug}/context.md`.
3. Match the work type by table lookup (see below) — don't let the agent guess paths.
4. Read that work type's `agent.md` (persona), then `rules.md`, then load skills as the agent's workflow dictates.
5. If no work type matches: say so and offer to scaffold one.
6. If no agency/client/work-type is implied (a one-off question): just answer.

State the matched agency + work type + client in one line before starting. Flag missing data; never assume.

## Capabilities table (example)

This is the table the router looks up. Build your own version.

| Department | Work type | Path |
|---|---|---|
| Operations | `notion-rules` | `.claude/work-types/0-operations/` |
| Sales | `call-prep` | `.claude/work-types/1-sales/skills/call-prep/` |
| Onboarding | `pre-onboarding` | `.claude/work-types/2-onboarding/skills/pre-onboarding/` |
| Onboarding | `competitor-research` | `.claude/work-types/2-onboarding/skills/competitor-research/` |
| Fulfilment | `meta-audit-pre-access` | `.claude/work-types/3-fulfilment/skills/meta-audit-pre-access/` |
| Fulfilment | `meta-audit-post-access` | `.claude/work-types/3-fulfilment/skills/meta-audit-post-access/` |
| Fulfilment | `google-audit-pre-access` | `.claude/work-types/3-fulfilment/skills/google-audit-pre-access/` |
| Fulfilment | `google-audit-post-access` | `.claude/work-types/3-fulfilment/skills/google-audit-post-access/` |
| Reporting | `weekly-report-generator` | `.claude/work-types/4-reporting/skills/weekly-report-generator/` |
| Retention | `qbr-generator` | `.claude/work-types/5-retention/skills/qbr-generator/` |
| Social | `content-ideation` | `.claude/social/{handle}/skills/content-ideation/` |
| Social | `youtube-thumbnails` | `.claude/social/{handle}/skills/youtube-thumbnails/` |

Branded variants of a single skill (e.g. a prospect audit themed for Agency A vs Agency B) belong in the same skill folder, parameterised by the agency context — not as separate skills. See the "branding variants" section of the prospect-audit skill for the pattern.

## Brand files

`brand.md` is the agency's voice and visual identity in one short file. Put the things you find yourself re-explaining: tone words, banned phrases, palette hex codes, typography, report layout conventions, signature sign-off, whether emoji is OK. Keep it short — agents read it on every call.

## Client context files

`context.md` per client holds the operational facts: ad-account IDs, monthly budget, conversion goals, recent platform changes, who the point of contact is, anything the agent must respect. Don't put history here ("we tried X in February"); that belongs in a separate notes file. `context.md` should fit on one screen.

A `clients/_registry.md` at the agency level lists every client slug with a one-line description, so the agent can answer "which clients do I have for Acme Agency?" without scanning the filesystem.

## Skills

Skills live under a department's `skills/` folder. Each skill is a self-contained module:

```
skills/{skill-name}/
  SKILL.md                   # what it does, when to use, inputs/outputs
  agent.md                   # persona/role (optional, often shared)
  rules.md                   # constraints (optional)
  scripts/                   # any executable helpers
  templates/                 # HTML/email/doc templates
```

Skills can chain — `prospect-audit` chains into `audit-report-deployer` to publish to Vercel; `cold-email-campaigns` chains into `cold-email-autoreply`. Document chains in `SKILL.md` so an agent can plan multi-step work.

## Credentials

Store API keys and tokens in your project's `.env` file (a per-app `.env.example` lists what's needed). Never store secrets in iCloud-synced folders, never commit them, never hardcode them in skill scripts.

For a multi-agency setup, namespace your env vars per agency:

```
ACME_META_ACCESS_TOKEN=
ACME_SLACK_WEBHOOK_URL=
ACME_NOTION_TOKEN=

CLICKFLOW_META_ACCESS_TOKEN=
CLICKFLOW_SLACK_WEBHOOK_URL=
CLICKFLOW_NOTION_TOKEN=
```

so it is structurally impossible to use Agency A's webhook from Agency B's skill.

## Adding new work types, agencies, or clients

- **No matching work type for a request?** Flag it. Propose `work-types/{name}/agent.md` + `rules.md` + `skills/{first-skill}/SKILL.md`. Build it only on demand.
- **New agency.** Create `agencies/{slug}/brand.md` and `clients/_registry.md`.
- **New client.** Create `agencies/{slug}/clients/{slug}/context.md` and add a one-liner to `_registry.md`.

## Self-improvement loop

Two reference files I keep at the workspace root because they apply to every skill:

- `reference/feedback-protocol.md` — what to do when the operator says "you got that wrong" or "debrief".
- `reference/verification-checklist.md` — a pre-delivery checklist the agent runs against any client-facing output (right agency? right client? right palette? brand voice? numbers double-checked?).

Hooking these into every skill via a one-line `Read` at the end of the workflow has caught more goofs than any other single thing in this setup.

## What this is not

- Not a framework, not a library — it's a folder structure plus discipline.
- Not multi-agent. A single Claude Code session handles routing in-prompt; sub-agents are spawned only for genuinely parallel work.
- Not a CMS for skills. Skills are markdown + scripts checked into git. No skill registry server, no skill marketplace — at least not yet.

Take the structure, throw out the names, swap in your own. The point is the layering, not the labels.
