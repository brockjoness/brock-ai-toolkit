# Fulfilment Skills

Skills for the work that happens *after* a client signs: audits, creative briefs, ad mockups, iteration loops, and landing-page reviews. These are the production pipeline skills — they take inputs (data exports, creative briefs, prospect URLs) and ship deliverables (reports, mockups, iteration plans).

Most skills here are bring-your-own-data: they don't pull from ad APIs directly. Pair them with exports from Meta Ads Manager and Google Ads, plus optional context from Notion or attribution platforms.

| Skill | What it does |
|---|---|
| [audience-analyzer](./audience-analyzer/) | Builds segment profiles and targeting recommendations from audience performance data. |
| [audit-report-deployer](./audit-report-deployer/) | Renders a finished audit as a styled HTML page and deploys to Vercel as a client link. |
| [creative-brief-generator](./creative-brief-generator/) | Turns research, audits, or manual direction into a structured creative brief by vertical. |
| [creative-generator](./creative-generator/) | Produces HTML ad mockups (4:5 feed, 9:16 story) in multiple variants from a brief. |
| [creative-iterator](./creative-iterator/) | Routes `test-analyzer` winners back into the brief → mockup loop. |
| [creative-production-router](./creative-production-router/) | Decides whether a brief goes to HTML mockups, HeyGen, Veo 3, or a real shoot. |
| [google-audit-pre-access](./google-audit-pre-access/) | Pre-access Google Ads audit from Transparency Center + website + competitors. |
| [google-audit-post-access](./google-audit-post-access/) | Full Google Ads diagnostic with action plan from connected-account exports. |
| [meta-audit-pre-access](./meta-audit-pre-access/) | Pre-access Meta creative audit from Ad Library + website + competitors. |
| [meta-audit-post-access](./meta-audit-post-access/) | Full Meta Ads diagnostic, creative deep dive, and action plan from exports. |
| [landing-page-auditor](./landing-page-auditor/) | 10-dimension CRO audit with scored findings and a prioritized fix plan. |
| [test-analyzer](./test-analyzer/) | Classifies ad tests, extracts winning elements, and emits iteration briefs. |

## Common workflow

A typical chain looks like:

1. `meta-audit-pre-access` or `google-audit-pre-access` → win the deal
2. `audit-report-deployer` → ship the report as a branded link
3. `meta-audit-post-access` or `google-audit-post-access` → onboarding audit
4. `creative-brief-generator` → translate findings into briefs
5. `creative-production-router` → route briefs to the right production method
6. `creative-generator` → produce mockups
7. After launch: `test-analyzer` → `creative-iterator` → loop back to step 4

## Agency / brand tokens

Several skills reference an `agencies/{slug}/brand.md` file for accent colors, logos, and naming. This is a convention only — set it up in your own workspace however you like. Drop in an `agencies/clickflow/brand.md` (or `agencies/acme-agency/brand.md`) before using the deployers.
