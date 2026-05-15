# Audit Report Deployer

## What it is
Takes a completed audit report (Meta or Google, pre- or post-access) and turns it into a styled HTML page deployed to Vercel as a shareable client link.

## What problem it solves
Audit findings sitting in markdown or Google Docs feel cheap. This skill renders them in a branded HTML shell and ships a public URL the agency can drop into an email — same pattern, every time, with agency branding baked in.

## Maturity
`working`

## How to run it
Requires Node and the Vercel CLI. From your project root:

```bash
npm i -g vercel
vercel login
```

Then invoke the skill with the audit content plus an agency slug (e.g. `clickflow`, `acme-agency`). The skill reads a brand file at `agencies/{agency-slug}/brand.md` for accent color, name, and logo, injects the audit into `template.html`, writes the result to `reports/{client-slug}-{audit-type}/`, and runs `npx vercel --yes`.

## Inputs and outputs
**In:** Audit report (markdown or plain text), client name and domain, agency slug, audit type.
**Out:** A deployed Vercel URL plus a local `index.html` under `reports/`.

## Where to extend it
Edit `template.html` to change styling, layout, or sections. Add new audit types by extending the slug list in `workflow.md` (Step 6). Swap Clearbit for a different logo source in Step 5.

## Known limitations
- Vercel CLI must be authenticated locally; the skill cannot log you in.
- Clearbit logo lookup degrades gracefully but the fallback is unstyled text.
- No CMS — every deploy is a static one-off.
