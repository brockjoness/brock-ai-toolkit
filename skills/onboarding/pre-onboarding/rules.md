# Pre-Onboarding Rules

## Execution

- Run skills sequentially: context gathering > competitor research > meta audit > google audit > roadmap > HTML generation > deploy
- Never skip context gathering (Skill 0). All downstream skills depend on it.
- If a skill fails (e.g., Perplexity API down), note the failure in the deliverable and proceed with remaining skills. Do not block the entire package.
- Confirm scope to the user in one line before beginning: "Pre-onboarding for **[Company Name]** via **[Agency Name]**. Running: competitor research, meta audit, google audit, 12-month roadmap."

## HTML Generation

- All deliverables use the dark theme base styles from `templates/_base-styles.html`
- Agency branding is injected from the agency's `brand.md` -- never hardcode agency colors or fonts
- Client logo fetched via Clearbit (`https://logo.clearbit.com/{domain}`) -- fall back to styled text if unavailable
- Every deliverable links back to the hub page
- Convert markdown-style text output to HTML using these rules:
  - `# Heading` becomes `<h2>`
  - `## Subheading` becomes `<h3>`
  - `### Sub-subheading` becomes `<h4>`
  - `**bold**` becomes `<strong>`
  - `- bullet` becomes `<ul class="content-list"><li>...</li></ul>`
  - `> quote` becomes `<div class="user-quote"><p>quote</p></div>`
  - Pipe tables become `<table class="data-table">...</table>`
  - `[text](url)` becomes `<a href="url" style="color: var(--accent); text-decoration: none;">text</a>`

## Deployment

- Each deliverable is a separate Vercel deployment
- Hub page is always deployed LAST (needs all other URLs)
- Deploy from `pre-onboarding/{client-slug}/{deliverable}/` directories
- Follow the same `npx vercel --yes` pattern as proposals
- Each deployable directory contains: `index.html`, `api/og.js`, `package.json`

## Quality

- Roadmap must incorporate call notes/transcript if available -- never generate a generic roadmap when client-specific context exists
- Meta audit is skipped (not failed) if no Meta Ads Library URL is available -- note it on the hub page with a "pending" badge
- Google audit is a placeholder until the skill is built -- always note this clearly with a "pending" badge
- All deliverables must be professional, client-facing quality. No internal skill references, no process notes, no "Step X" language.

## Minimum Required Fields

- **Company Name**: Required (fatal if missing)
- **Agency**: Required (ask if not specified in the command)
- **Meta Ads Library URL**: Required for meta audit (skip meta audit if missing)
- **Website**: Recommended (proceed without)
- **Call notes/transcript**: Recommended for roadmap quality (proceed without -- use CRM fields for a solid baseline roadmap)
