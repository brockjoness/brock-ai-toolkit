# Sales Skills

A set of Claude Code skills covering top-of-funnel through proposal: lead scraping, classification, enrichment, cold email, prospect audits, call prep, proposal generation, and outbound social. Most assume a stack of Notion (CRM), Google Sheets, Instantly (cold email), Apify (scraping), Gmail MCP, and Vercel (audit hosting). They are written as Brock runs them at Clickflow but should port to any solo-operator or small agency that wants to automate outbound.

| Skill | What it does |
|---|---|
| [call-prep](./call-prep) | Reads a CRM page, runs the prospect audit if missing, writes structured talking points into Notion, pings team chat |
| [casualize-names](./casualize-names) | Bulk-converts formal first/company/city names to casual versions for cold email merge fields |
| [classify-leads](./classify-leads) | LLM-based lead classification (product SaaS vs services, etc.) for nuanced filtering after a scrape |
| [cold-email-autoreply](./cold-email-autoreply) | Auto-drafts contextual replies to Instantly campaign threads using a campaign knowledge base + CRM context |
| [cold-email-campaigns](./cold-email-campaigns) | Generates 3-campaign cold email sequences (opener A/B, bump, breakup) and deploys to Instantly |
| [critique-cold-email](./critique-cold-email) | Scores a pasted cold email across 8 dimensions, flags spam triggers, offers concrete rewrites |
| [email-autoresponder](./email-autoresponder) | Multi-inbox Gmail triage: drafts replies in your voice across N accounts, never sends without approval |
| [gmaps-leads](./gmaps-leads) | Scrapes Google Maps listings with website + owner enrichment into Google Sheets |
| [lead-enrichment](./lead-enrichment) | Enriches inbound waitlist submissions (Notion) with name, company, phone, LinkedIn via web research |
| [proposal-generator](./proposal-generator) | Generates a branded HTML proposal from call notes/transcript and deploys it to a public Vercel URL |
| [prospect-audit](./prospect-audit) | Full lead-magnet audit from a domain: Meta Ad Library, social, product page, market, deployed to Vercel |
| [prospect-audit-leadgen](./prospect-audit-leadgen) | Lead-gen variant of prospect-audit aimed at local service businesses (no Meta ads required) |
| [scrape-leads](./scrape-leads) | Apify-based lead scraper with 25-lead quality gate, geographic partitioning, and email enrichment |
| [social-content](./social-content) | Writes LinkedIn / X posts in a chosen author's voice, with a per-author voice profile loaded at start |
