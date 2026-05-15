# Skills

Reusable Claude Code skills, organized by department. A skill is a Markdown-driven instruction set (sometimes paired with templates and scripts) that does one job well. Open a department folder to see its skills indexed in a table.

If you don't have Claude Code installed and just want to paste a prompt into Claude.ai instead, see [`../prompts/`](../prompts/) — same workflows, no setup.

| Department | Count | What's in it |
|---|---|---|
| [sales](./sales) | 14 | Lead scraping, enrichment, classification, cold email, prospect audits, proposals, call prep |
| [onboarding](./onboarding) | 5 | Client onboarding handoff, competitor research, pre-onboarding strategy decks, intake processing |
| [fulfilment](./fulfilment) | 12 | Meta + Google ad audits (pre and post-access), creative briefs and generation, audience analysis, test analysis |
| [reporting](./reporting) | 4 | Weekly + monthly client reports, budget pacing, engagement mapping |
| [retention](./retention) | 2 | Churn risk detection, quarterly business reviews |
| [social](./social) | 7 | Content ideation, YouTube thumbnails + descriptions, Instagram carousels, newsletter, video editing |
| [operations](./operations) | — | Standard operating procedures and operational docs |

## How to read a skill

Each skill folder follows the same shape:

- `README.md` — what it is, what it solves, how to run it, what it takes, what it produces, where it's rough.
- `SKILL.md` — the instruction set Claude executes.
- `.env.example` — env vars the skill needs, if any.
- `templates/` — HTML, prompt, or document templates if the skill produces deliverables.
- `scripts/` — Python / shell scripts the skill invokes, if any.

Read the README first. The SKILL.md is the operator's manual — useful once you understand the shape, less useful as an introduction.

See [`../docs/conventions.md`](../docs/conventions.md) for more on the structure, maturity labels, and cross-skill chaining.
