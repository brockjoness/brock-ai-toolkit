# Proposal Generator

## What it is
Generates a branded HTML proposal after a sales call. You give it the client name, your brand identity, and either a typed summary or a transcript paste; it produces a single-page proposal with a "what we discussed" recap, pricing tiers based on the budget discussed, split next steps (your deliverables vs. their requirements), and your bio. The HTML is deployed to Vercel and returns a public URL.

## What problem it solves
Custom proposals are a tax on momentum after a hot call. Templated ones look templated. This skill lets you ship a polished, on-brand proposal within minutes of hanging up, while the conversation is still warm — and gives you a public URL so the prospect doesn't have to download a PDF.

## Maturity
`working` — Used in production, but the per-brand theming, pricing tiers, testimonials, and bio in `proposal-rules.md` are heavily personalized and **must be replaced** with your own before this is useful.

## How to run it

Trigger phrases: `generate a proposal for {client}`, `create a proposal for {client}`, `proposal for {client} from {brand}`.

Setup once:
1. Edit `proposal-rules.md` — replace the bio, testimonials, and pricing tiers with your own.
2. Edit `template.html` and `template-clickflow.html` — these are sanitized starter templates. Customize the brand variables.
3. Add per-brand `brand.md` files at `./brands/{slug}/brand.md` for color/font/logo overrides.
4. Run `vercel login` once.

Then trigger:
```
"generate a proposal for Acme Corp from {your-brand}"
```

The skill will ask for call context (typed summary or transcript paste) and pricing.

## Inputs and outputs
**In:** Client name, brand identity, call context (summary or transcript), optionally pricing and client website.
**Out:** A static HTML proposal at `./proposals/{client-slug}/index.html`, deployed to a public Vercel URL.

## Where to extend it
- `proposal-rules.md` — your bio, testimonials, pricing tiers, "About" section labels
- `template.html` / `template-clickflow.html` — the visual templates (dark and light)
- `workflow.md` — the step sequence

## Known limitations
- Requires Vercel CLI installed and authenticated.
- Clearbit logo fetching is best-effort; falls back to text rendering of the company name.
- Pricing tiers are hardcoded in `proposal-rules.md` — they assume an agency/services context. Replace them entirely if you sell something else.
- Includes a `proposal-images/` folder referenced in the template. The image binaries are NOT included in this public repo (they may contain real client data); supply your own with the same filenames or remove the references from the template.
