# Skill Inventory

A structured catalog of every Claude skill in this workspace. Skills are grouped by department.

**Total skills:** 43

---

## Sales (13 skills)

| Skill | Description |
|---|---|
| `call-prep` | End-to-end sales call prep: reads the CRM page, auto-runs the right prospect audit, deploys it, cross-references call notes with audit findings to write talking points, and pings your team channel. |
| `casualize-names` | Batch-converts formal names into casual versions for cold email personalization via Google Sheets. |
| `classify-leads` | LLM-based classification to categorize scraped leads when keyword matching fails. |
| `cold-email-autoreply` | Generates contextual replies to incoming cold email threads using campaign knowledge bases, sends via the Instantly API. |
| `cold-email-campaigns` | Creates full multi-step cold email campaigns with A/B-tested openers and follow-up sequences, deployed to Instantly. |
| `email-autoresponder` | Multi-account Gmail integration that reads and replies across several inboxes using voice-matched responses. |
| `gmaps-leads` | Scrapes Google Maps for local business leads with website enrichment, owner contact extraction, and email verification. |
| `lead-enrichment` | Enriches website submissions by researching each lead's identity from their email address and updating Notion. |
| `proposal-generator` | Generates branded sales proposals and deploys them as styled HTML pages with shareable links. |
| `prospect-audit` | Analyzes a prospect's Meta ads, website, social profiles, and market position to generate a personalized audit lead magnet. Supports per-agency branding variants (see the skill's "branding variants" section). |
| `scrape-leads` | End-to-end lead scraping via Apify with validation, LLM classification, email enrichment, and delivery to Sheets / Notion. |
| `social-content` | Writes LinkedIn and X posts in author-specific voice profiles for agency thought leadership. |
| `proposal-deployer` | Companion to `proposal-generator` — deploys the generated HTML to a static host and returns the shareable URL. |

---

## Onboarding (5 skills)

| Skill | Description |
|---|---|
| `client-onboarding` | Full launch handoff: scans the CRM, generates contracts, creates Stripe invoices, sends welcome emails, creates tasks, updates status. |
| `competitor-research` | Deep competitor research via Perplexity API: Reddit / Twitter sentiment, review analysis, competitive landscape. |
| `onboarding-intake-processor` | Parses new client intake data, creates / updates CRM entries, and generates a kickoff meeting agenda. |
| `pre-onboarding` | Full pre-onboarding pipeline: data gathering, competitor research, platform audits, 12-month roadmap, HTML deliverables, deployment. |
| `strategy-pipeline` | Wraps pre-onboarding into a concise 90-day strategy document with creative briefs and review checkpoints. |

---

## Fulfilment (13 skills)

| Skill | Description |
|---|---|
| `audience-analyzer` | Analyzes audience performance data to build segment profiles, identify high-value targeting, and map insights to creative strategy. |
| `manus-meta-deploy` | Autonomous Meta Ads deployment driven by a validated Campaign Object: ingest brief → build campaign / ad set / creative / targeting / budget → deploy → verify → post-launch report. Supports browser automation, API, or sub-agent modes. |
| `audit-report-deployer` | Converts completed audits into styled, branded HTML pages and deploys them as shareable client links. |
| `creative-brief-generator` | Translates research and audits into structured creative briefs with hook angles, visual direction, and copy variants. |
| `creative-generator` | Generates Meta ad creative mockups as HTML layouts (4:5 feed + 9:16 story) based on data-driven briefs. |
| `creative-iterator` | Takes test winners and routes them back into the creative pipeline for the next round of variants. |
| `creative-production-router` | Routes creative briefs to optimal production: HTML static, AI UGC (HeyGen), AI video (Veo 3), or human direction. |
| `google-audit-post-access` | Full diagnostic Google Ads audit with account data: keyword analysis, Quality Score, bidding, budget allocation. |
| `google-audit-pre-access` | Pre-access Google Ads audit using only public data to demonstrate expertise and drive sales. |
| `landing-page-auditor` | Scores landing pages across 10 CRO dimensions with prioritized fix recommendations ranked by revenue impact. |
| `meta-audit-post-access` | Full diagnostic Meta Ads audit: creative fatigue detection, funnel analysis, copy mining, actionable briefs. |
| `meta-audit-pre-access` | Pre-access Meta creative audit using the Ad Library and website data to spot gaps and missing creative concepts. |
| `test-analyzer` | Analyzes ad performance to determine winners / losers with statistical rigor; generates iteration briefs. |

---

## Reporting (4 skills)

| Skill | Description |
|---|---|
| `budget-pacing-monitor` | Tracks daily spend against monthly targets, projects month-end spend, flags overspend / underspend. |
| `engagement-mapper` | Analyzes hourly / daily performance to identify optimal ad scheduling and engagement patterns. |
| `monthly-report-generator` | Strategic monthly reports with MoM trends, 90-day trend lines, platform comparisons, deployed as branded HTML. |
| `weekly-report-generator` | Weekly tactical reports with spend pacing, top / bottom ads, WoW trends, and strategic recommendations. |

---

## Retention (2 skills)

| Skill | Description |
|---|---|
| `churn-risk-detector` | Scores clients on churn risk by combining performance signals with engagement indicators; recommends interventions. |
| `qbr-generator` | Quarterly Business Reviews with 90-day synthesis, challenge diagnosis, and next-quarter strategy, deployed as HTML. |

---

## Social (5 skills)

| Skill | Description |
|---|---|
| `clickflow-newsletter` | Turns voice-to-text dumps into polished newsletter emails for a warm subscriber list. Reads voice-reference rules (no greetings, no exclamations, 150–300 words, lowercase subject lines), infers the email type (resource-drop / build-update / insight / behind-the-scenes), and presents 3 subject lines + body for review. |
| `content-ideation` | Generates a 7-day content calendar across YouTube / IG / newsletter, with every YouTube idea grounded in a real Claude skill from this inventory. Loads creator references, checks the Notion Social DB for context, drafts hooks / thumbnails / lead magnets, and pushes everything to Notion. Runs daily via a 9am LaunchAgent. |
| `instagram-carousel-generator` | Takes carousel scripts and photos, outputs HTML files per card with photo background and text overlay. |
| `youtube-description` | Generates polished YouTube descriptions from a transcript: corrected M:SS timestamps, summary, key bullets, links, and a standard Connect footer appended to every video. |
| `youtube-thumbnails` | Generates high-CTR YouTube thumbnails via Gemini (Nano Banana Pro) using face-direction matching from a reference photo library. Supports multiple style presets, plus reference-mode recreation and edit passes. |
