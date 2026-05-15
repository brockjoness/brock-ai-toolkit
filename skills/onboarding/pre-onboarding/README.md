# Pre-Onboarding Hub

## What it is
A skill that generates a full pre-kickoff deliverable suite for a prospect or newly-signed client: competitor research, Meta Ads audit, Google Ads audit, and a 12-month roadmap, all rendered as branded HTML pages and tied together by a hub page. The hub gets deployed to Vercel and the URL flows back into the CRM.

## What problem it solves
The window between "they said yes" and "we have our kickoff call" is where most agencies look the laziest. This skill fills that window with a thoughtful, branded set of artifacts that make the client feel like work is already happening — and gives the strategist a starting point for the first real working session.

## Maturity
`production`

## How to run it
Trigger with "Begin pre-onboarding for [Client]." The skill expects a record in your Notion CRM and a brand file at `brands/{agency-slug}/brand.md`. You'll also need: Vercel CLI logged in (`npx vercel login`), Notion MCP, and a way to access the Meta Ads Library and Google Ads landscape (browser-capable Claude).

Set the placeholders in `.env`.

## Inputs and outputs
**In:** Client company name, agency slug, optional Meta Ads Library URL, optional Google Ads ID, optional call notes attached to the CRM page.
**Out:** Four HTML deliverables plus a hub page, all deployed to Vercel with their URLs written back into the CRM's Proposal field.

## Where to extend it
- Add a new deliverable type: create a new skill under `skills/`, add a template under `templates/`, and wire it into `skill-6-hub-and-deployment.md`.
- Restyle: edit `templates/_base-styles.html` and the per-deliverable HTML templates.
- Swap deployment target (e.g., Cloudflare Pages instead of Vercel): rewrite step 1 of `skill-6-hub-and-deployment.md`.

## Known limitations
- Vercel is the only deploy target supported out of the box.
- The Google Ads audit is currently a placeholder structure; the Meta audit is the most mature of the four.
- The hub page generation is two-pass (deliverables deploy first, hub picks up URLs), so a failure mid-flow can leave orphan deployments.
- Client logo fallback is Clearbit + text; some brands don't resolve cleanly.
