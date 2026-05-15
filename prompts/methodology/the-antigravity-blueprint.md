# The Antigravity Blueprint

**How I rebuilt a 6-person agency as a solo operator using a single AI workspace. This is the architecture behind Clickflow.**

## What is Antigravity?

Antigravity is the name of my Claude Code workspace — a VS Code environment where I've built 20+ custom AI skills that run my entire agency. Competitor research, client reports, ad creative briefs — all automatic.

One person. One workspace. Agency-level output.

## The Work-Type Structure

Everything is organized into 5 work types.

### Work Type 0 — Operations
The foundation: CRM management, feedback loops, verification before any deliverable ships.

### Work Type 1 — Sales
Turning strangers into clients:
- **Prospect Audit** — public-data audit from a domain, deployed as a branded HTML page
- **Social Content** — LinkedIn/X posts in my voice
- **Proposal Generator** — branded HTML proposals on Vercel
- **Lead Enrichment** — waitlist email → company/LinkedIn/phone
- **Email Autoresponder** — voice-matched drafts across 5 inboxes

### Work Type 2 — Onboarding
What happens after a client signs:
- **Pre-Onboarding Orchestrator** — competitor research + Meta audit + Google audit + 90-day roadmap, deployed before the kickoff call
- **Competitor Research** — Perplexity-powered, ad library + website analysis
- **Client Onboarding** — contract + invoice + kickoff email in one run

### Work Type 3 — Fulfilment
The ongoing work:
- **Creative Brief Generator** — vertical templates for beauty, health, apparel, food, events
- **Meta / Google Ads Audit** — full performance audit from CSV
- **Test Analyzer** — winning/losing ads, next-round brief
- **Creative Generator** — HTML ad mockups with Meta safe zones
- **Audience Analyzer** — targeting recommendations

### Work Type 4 — Reporting
- **Weekly Report Generator** — branded performance report deployed in under 5 minutes
- **Engagement Mapper** — daypart analysis for ad scheduling

## Architecture Principles

**Wrapper pattern — never modify, always extend.** New capabilities go in new skill directories that call existing ones. No skill is edited in place.

**Every deliverable deploys to a live URL.** All HTML outputs auto-deploy to Vercel. Clients get a link, not an attachment.

**Research powers everything.** Perplexity grounds every brief, audit, and strategy in real market data.

**Voice is codified.** Stored voice profiles with hook structures, banned phrases, tone rules. Output is consistent whether I write it or Claude does.

## The Stack

| Tool | Role |
|---|---|
| Claude Code | The brain. All skills run in VS Code |
| Perplexity API | Competitor research and market intelligence |
| Vercel | Auto-deploy of HTML deliverables |
| Notion | CRM, client registry, lead tracking |
| Gmail MCP | 5-inbox email with voice matching |
| Nano Banana 2 | AI image generation for ad creative |
| Kling | AI video generation |

## What This Means for Your Agency

The brands I work with get deliverables that look like they came from a 10-person team — before the kickoff call even happens. The system does the research, the analysis, the briefs, and the reporting. I handle the strategy and the relationship.

Infrastructure first, clients second.

*Built by Brock Jones — Founder, Clickflow.*
