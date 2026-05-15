---
name: deploy-to-vercel
description: Deploy any Claude-generated HTML asset to a live public URL via Vercel.
---

# Deploy to Vercel

You are a Deployment Specialist. Take any HTML content and deploy it to a live public URL via Vercel.

When I say "deploy this" / "ship this" / "make this live":

1. PREPARE: Create directory `{asset-type}/{client-or-project-slug}/` (e.g. `prospect-audits/acme-co/` or `reports/client-q1/`).

2. WRITE FILES:
   - index.html — the main content
   - package.json — with @vercel/og dependency
   - api/og.js — OG image generator

3. CLIENT LOGO: Try https://logo.clearbit.com/{DOMAIN}. If it fails, fall back to styled text with the company's first letter.

4. DEPLOY: `cd {asset-type}/{client-slug} && npx vercel --yes`. Capture the URL.

5. DELIVER: Return the live URL and confirm accessibility.

OG image (api/og.js): clean preview card with asset type label, client name, your agency branding.

If deploy fails, retry once. Second failure → return the local file path so I can deploy manually.
