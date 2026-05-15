# Competitor Research

## What it is
A skill that takes a client (brand, website, category) and produces a competitor research deliverable: who they compete with, what those competitors are doing on Meta and Google Ads, what creative angles work in the category, and where there's a gap to exploit. Output is a structured markdown brief plus a rendered HTML page.

## What problem it solves
Most agency-side competitor research is shallow ("here are five competitors") or buried inside a slide deck nobody opens twice. This skill produces a structured, repeatable artifact tied to a real strategic question: where do we have a creative or positioning edge? It runs from the same CRM context as the rest of the onboarding chain, so it doesn't need separate inputs.

## Maturity
`working`

## How to run it
Trigger with phrases like "Run competitor research for [Client]." The skill expects the client to exist in your Notion CRM. Required tools: Notion MCP, a web-search-capable Claude (or the Meta Ads Library + Google search via the browser), and the agency brand file referenced in the workflow.

## Inputs and outputs
**In:** Client company name (looked up in CRM), agency slug, optional Meta Ads Library URL, optional category context.
**Out:** A markdown summary plus an HTML page rendered to `pre-onboarding/{client-slug}/competitor-research/`, ready to deploy alongside other onboarding deliverables.

## Where to extend it
- Change the deliverable structure: edit `output-template.md`.
- Add or remove research dimensions: edit the section list in `skill-1-competitor-research.md`.
- Restyle the HTML output: edit `../pre-onboarding/templates/competitor-research.html`.

## Known limitations
- Quality of the analysis depends heavily on what Meta Ads Library and the open web return for the category — sparse data produces a thin report.
- No automated competitor *discovery* — it works best when you (or the CRM) already names competitors.
- Assumes US/English-language ad ecosystems.
