# Prospect Audit Workflow

## Trigger

- "prospect audit for {email or domain}"
- "generate lead magnet for {company}"
- "audit {domain}"
- "run prospect audit"

## Skill Chain

Execute these skills sequentially. Each depends on the previous one's output. If a hard stop is triggered at any point, STOP and report why.

```
Skill 0: Discovery & Context
    ↓
Skill 1: Market Snapshot
    ↓
Skill 2: Meta Ad Library Audit
    ↓
Skill 3: Organic Social Audit
    ↓
Skill 4: Product Page Review
    ↓
Skill 5: Synthesis & Report
    ↓
Skill 6: HTML Generation & Deployment
    ↓
Skill 7: Email Delivery
```

## Before starting

> "Prospect audit for **{domain}**. Running: discovery, market snapshot, Meta audit, social audit, product page review, synthesis. Deploying to Vercel."

## Skill files

- `skills/skill-0-discovery.md`
- `skills/skill-1-market-snapshot.md`
- `skills/skill-2-meta-audit.md`
- `skills/skill-3-social-audit.md`
- `skills/skill-4-product-page.md`
- `skills/skill-5-synthesis.md`
- `skills/skill-6-deploy.md`
- `skills/skill-7-email.md`

## Context flow

`PROSPECT_CONTEXT` is assembled in Skill 0 and flows through all subsequent skills: `domain`, `company_name`, `prospect_slug`, `website_url`, `facebook_page_url`, `meta_ads_library_url`, `instagram_url`, `tiktok_url`, `product_page_url`, `logo_html`, `ad_spend`, `email`.

Output variables created by each skill: `MARKET_SNAPSHOT_OUTPUT` (Skill 1), `META_AUDIT_OUTPUT` (Skill 2), `SOCIAL_AUDIT_OUTPUT` (Skill 3), `PRODUCT_PAGE_OUTPUT` (Skill 4), `SYNTHESIS_OUTPUT` (Skill 5).

## Error handling

- **Hard stop conditions** (personal email, no live website, no Meta ads): STOP entirely
- **Perplexity API fails**: note the failure, proceed with available data
- **Chrome DevTools MCP unavailable**: fall back to WebFetch
- **Instagram/TikTok profile blocked**: note and skip
- **Vercel deploy fails**: retry once, then provide local file path
- **Gmail MCP fails**: report the error, provide audit URL for manual email delivery
- **No email address**: skip email delivery, audit is still complete
