# Security and data sovereignty

Plain-language read on what's in this repo and what you need to think about before pointing it at real customer data. None of this is legal advice — talk to your own counsel for regulated work.

## What this repo is (and isn't)

This is **tooling**, not infrastructure. The skills here describe what to do with data. They don't decide where the data lives, who sees it, or what jurisdiction it's processed in. Those are deployment-time choices you make every time you point a skill at a real customer record.

## What flows where

When you run these skills out of the box:

- **Prompts and inputs you send to Claude** go to **Anthropic** (US-based, Canadian region available on some plans). Anthropic's data policy applies — recent versions of the policy do not train on API traffic by default, but verify the current policy before relying on it.
- **Image / video / audio inputs to generation tools** go to whichever provider you've wired up — **Google** (Gemini, Veo), **fal.ai**, **HeyGen**, **ElevenLabs**, etc. Each has its own data and retention policy.
- **Scraped lead data** comes from **Apify** (data center varies by actor) and **AnyMailFinder**.
- **Customer / CRM records** sit in **Notion** by default. Notion is US-hosted and SOC 2 Type II.
- **Reporting dashboard data** sits in **Supabase**. You pick the region when you create the project; if it matters, pick one in your jurisdiction.
- **Generated audit / proposal pages** deploy to **Vercel** (CDN, global).
- **Outbound email** goes through **Instantly** and your own mailbox provider (Google Workspace, etc.).

That's a lot of vendors. If any of them are unacceptable to your customer, swap them or run that skill against synthetic data only.

## Things you should think about before shipping

### If you're in Canada (PIPEDA)

PIPEDA doesn't prohibit cross-border processing, but you need to (a) be transparent about it with your customers, and (b) have a contract with each US-based processor that meets PIPEDA's "comparable protection" bar. Anthropic, Notion, Vercel, and Supabase all have data processing agreements available — sign them.

If your customer is a public-sector entity or in a regulated industry, the bar is higher. Default to keeping their data inside Canada (Supabase has a Toronto region; for Anthropic, ask about regional routing).

### If you're in a regulated industry

- **Healthcare (HIPAA)**: most of the cloud vendors above will sign BAAs but only on specific plans. Don't assume the free tier is HIPAA-eligible.
- **Financial services (PCI, GLBA, MAS, FCA)**: same idea — and don't send card data through Claude, period.
- **Legal**: privilege is preserved as long as the data stays under your firm's control. Most LLM API providers are subcontractors of your firm, not third parties — but you should disclose use of AI to your client per your jurisdiction's rules.

### If you're in the EU / UK (GDPR)

You're going to want EU regions for Supabase and Anthropic, and you're going to want a DPA on file with every vendor in the chain. The lawful basis question (consent vs. legitimate interest vs. contract) is the one that bites people — figure it out before you start scraping leads.

## What this repo does not include

- No baked-in encryption-at-rest beyond what the vendors provide.
- No audit logging beyond what each skill writes to Notion or stdout. If you need real audit trails, add them.
- No PII redaction layer between you and Claude — if you don't want a customer's name or email in the prompt, strip it yourself first.
- No DLP, no SSO, no role-based access control. Those live in your deployment, not in the skill.

## Things I do, that you might want to copy

- Secrets live in a local `.env` (or `~/.secrets/credentials.env` on a single dev machine) — never in the repo, never in iCloud, never in Notion.
- I don't store customer files in iCloud-synced folders. Apple's cloud is fine for my own work; not for clients.
- Per-client folders are siloed — a skill working on Client A's data can't see Client B's because the agent is given only one client's context per invocation.
- Read-only API tokens wherever possible. The few skills that need write access (e.g. campaign deploy) use scoped tokens with the minimum permissions.
- I rotate any token that's been on disk longer than I'm comfortable with.

If you're going to run any of this against real customer data, do the boring work first. Then run the tooling.
