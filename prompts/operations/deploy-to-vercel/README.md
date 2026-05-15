# Deploy to Vercel

## What it is
A Claude Code skill that turns any HTML output into a live public URL in one command. Handles directory creation, package.json, OG image generation, Clearbit logo fetching, and `npx vercel --yes` deployment.

## What problem it solves
Most Claude skills produce HTML artifacts — proposals, audits, reports, dashboards. Getting that HTML in front of a client usually means downloading, opening a terminal, configuring hosting. This collapses it to one command: "deploy this."

## Where to use it
Claude Code (terminal). Claude.ai cannot run CLI commands, so the no-code path is "save the file, run `npx vercel --yes` yourself."

## How to run it
1. Install Vercel CLI: `npm i -g vercel`
2. Authenticate: `vercel login`
3. Save SKILL.md to `.claude/skills/deploy-to-vercel/SKILL.md`
4. After any HTML output, say: "Deploy this"
5. Claude writes the files, runs vercel, returns the URL.

## Inputs and outputs
**In:** HTML content from another Claude skill (or pasted manually).
**Out:** a live public URL with social preview cards and a client-logo OG image.

## Known limitations
- Free Vercel tier limits per-account deployments — fine for typical agency use.
- Clearbit logo URLs can fail silently for unknown domains. Skill falls back to a styled text logo.
- Custom domain mapping is a separate manual step.
