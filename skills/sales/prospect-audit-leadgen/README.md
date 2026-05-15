# Prospect Audit — Lead Gen Variant

## What it is
A variant of [`prospect-audit`](../prospect-audit) aimed at **local service businesses** (lawyers, contractors, medspas, dentists) instead of ecommerce DTC brands. Same general shape — single-page HTML audit deployed to Vercel — but it analyzes the **competitive lead-generation landscape**, SEO/local search presence, and **website lead-capture conversion** rather than Meta creative analysis. It does not require active Meta ads.

## What problem it solves
Service businesses don't always run Meta ads, so the standard prospect-audit hard-stops on them. But they have a different stack of audit-worthy signals: how many competitors are running paid ads locally, where their SEO sits, how their site captures leads (forms, click-to-call, chat). This variant covers that surface.

## Maturity
`experimental` — Source ships only an HTML template; no `SKILL.md`, `rules.md`, or `workflow.md` exists yet. The skill itself needs to be authored before it's runnable end-to-end.

## How to run it
Not currently runnable end-to-end. The template is the starting point. Suggested path:

1. Clone the [`prospect-audit`](../prospect-audit) skill files (`agent.md`, `rules.md`, `workflow.md`, `skills/`).
2. Replace skill 2 (Meta Ad Library Audit) with a "Competitive Ad Landscape" skill that scans the top N local competitors via the same Meta Ad Library tool and tallies who's running ads, what spend levels look like, and what messaging angles dominate.
3. Replace skill 3 (Organic Social Audit) with an SEO / local-search audit.
4. Replace skill 4 (Product Page Review) with a "Lead Capture Review" of the website's forms, CTAs, and chat widgets.
5. Wire the deploy step at the new template at `./templates/prospect-audit-leadgen.html`.

## Inputs and outputs
**In:** A domain or company name.
**Out:** A single-page HTML audit covering market snapshot, competitive ad landscape, social presence, and website lead capture — deployed to Vercel.

## Where to extend it
- `templates/prospect-audit-leadgen.html` — the deliverable's structure (already has all the right placeholders)
- The to-be-authored `skills/` folder — see prospect-audit for the pattern

## Known limitations
- No SKILL/workflow files. This is currently a template plus an intent statement; it needs the orchestrating skills authored.
- Cross-reference with `prospect-audit` if you want to ship both as a runnable pair.
