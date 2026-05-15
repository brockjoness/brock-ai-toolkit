# brock-ai-toolkit

This is the working set of AI tools I run my own stuff on, sanitized and documented so other operators can read it, run it, and pull from it. I run a small agency and build tooling to do more with fewer hands — this is most of that tooling. It's not a product. Use any of it however you want.

I'm putting this here for two reasons:
1. So prospective clients can see what I actually do, not just what I claim.
2. Because almost all of it works for service businesses generally, not just for me. If you run an agency, an insurance brokerage, an accounting firm, or any other service shop, there's probably something useful in here.

— Brock Jones

## What's here

| Folder | What's in it |
|---|---|
| [`skills/`](./skills) | Reusable Claude Code skills organized by department — sales, onboarding, fulfilment, reporting, retention, social, operations. ~50 in total. Dev setup required. |
| [`prompts/`](./prompts) | Paste-into-Claude.ai prompts — no dev setup, no CLI, no install. Same workflows, simpler entry point. Good if you don't write code. |
| [`apps/`](./apps) | Three full applications: a reporting dashboard (Next.js + Supabase), an ad-generator scaffold, a lead-magnet calculator. |
| [`docs/`](./docs) | How I think about this stuff — orchestration patterns, the skill inventory, audit reference frameworks, the feedback protocol. |
| [`.env.example`](./.env.example) | Every env var any tool here expects, in one file. |

A **skill** is a Markdown-driven Claude Code instruction set (sometimes paired with scripts and templates) that does one job well. A **prompt** is the same idea but designed to paste directly into Claude.ai — no install, no terminal. An **app** is a deployable web project. The docs explain how it all fits together.

If you don't write code, start in [`prompts/`](./prompts). If you do, start in [`skills/`](./skills).

## Where to start

Three suggested entry points, in roughly the order I'd read them:

1. **[`skills/sales/prospect-audit`](./skills/sales/prospect-audit)** — A lead magnet that analyzes a prospect's Meta ads, website, and market position to generate a personalized audit. This one skill probably explains the value of the whole repo faster than any document I could write.
2. **[`docs/orchestration-notes.md`](./docs/orchestration-notes.md)** — How I organize tooling across departments and brands so a single workspace can serve multiple businesses without crosstalk. The architecture pattern is portable to any operator running multiple lines of business.
3. **[`apps/reporting-dashboard`](./apps/reporting-dashboard)** — A Next.js + Supabase client reporting portal. Shows what happens when these skills graduate from one-off CLI runs into a deployable product.

If you'd rather wander, the per-department READMEs in `skills/` are written so a smart non-developer can skim them.

## How it's wired

Most of this is Claude + a small handful of integrations. Concretely:

- **Claude** (Anthropic API or Claude Code) does the heavy thinking — analysis, generation, classification, summarization.
- **Notion** is the operational source of truth — CRM, workflow state, content calendar.
- **Supabase + Vercel** for anything that needs a database, auth, or a public URL.
- **Apify** for scraping (Google Maps, LinkedIn, websites).
- **Instantly** for cold email infrastructure.
- **Google Workspace** via service accounts for contracts, sheets, calendar.

The orchestration approach is light. Each skill is a self-contained instruction set Claude can execute. Workflows are skills calling other skills, plus a thin Python or shell wrapper where the API surface needs more than text. I picked this stack because the marginal cost of adding a new skill is roughly zero — write a Markdown file, point it at the data, ship.

More detail in [`docs/stack-overview.md`](./docs/stack-overview.md).

## A note on data and security

Nothing in this repo solves data sovereignty on its own — it's tooling, not infrastructure. Where inference happens (Anthropic cloud, Google cloud) is a separate question every deployment has to answer for itself. If you're in Canada (PIPEDA) or a regulated industry (healthcare, financial services, legal), you need to think about that before pointing any of these tools at customer data.

[`docs/security-and-data-sovereignty.md`](./docs/security-and-data-sovereignty.md) lays out the considerations.

Everything here has been scrubbed of real customer data, real client identifiers, and real secrets before publication. If you spot something that slipped through, email me.

## How to use this

Fork it. Adapt it. Tell me what's missing.

If something looks like it should exist but doesn't, that's probably because I either haven't built it yet or it's still too specific to my own setup to publish. Tell me what you'd want and I'll either point you somewhere or build it.

## How to reach me

- Email: brock@clickflow.dev (preferred) or brockjones444@gmail.com
- GitHub: [@brockjoness](https://github.com/brockjoness)

If you read something here and want to talk about whether it'd work for your business, the email above is the fastest way to get a real conversation going.
