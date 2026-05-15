# Creative Generator

## What it is
Generates ad creative mockups as HTML in Meta's primary formats (4:5 feed, 9:16 story/reels) from a creative brief. Produces multiple variants, each testing a distinct angle.

## What problem it solves
The cheap, fast bridge between a brief and "show me what this would look like." Instead of waiting on a designer, you get an HTML gallery of variants you can preview, screenshot, or hand off as design intent.

## Maturity
`working`

## How to run it
Requires Node and the Vercel CLI to deploy previews (optional — you can also just open the local HTML files).

```bash
npm i -g vercel
vercel login
```

Invoke with a brief (from `creative-brief-generator` or written manually) and an agency slug. The skill writes HTML files to `creatives/{client-slug}/`, builds an `index.html` gallery, and optionally deploys via Vercel.

## Inputs and outputs
**In:** Creative brief (angles, copy, visual direction), agency brand tokens, client name.
**Out:** HTML files for each variant in `creatives/{client-slug}/`, a gallery `index.html`, and (optional) a Vercel preview URL.

## Where to extend it
Edit `templates/feed-4x5.html` and `templates/story-9x16.html` for layout changes. Update Meta safe-zone specs in `knowledge-meta-specs.md`. Tune variant-selection logic in `skills/skill-2-generate-creatives.md`.

## Known limitations
- HTML mockups, not production assets — fine for previews and approvals, not for upload to Ads Manager.
- Real photography requires you to supply image URLs; the skill does not generate raster imagery.
- Brand-token lookup assumes you have an `agencies/{slug}/brand.md` file.
