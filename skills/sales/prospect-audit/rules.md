# Prospect Audit -- Rules

## Activation Triggers

- "prospect audit for {email or domain}"
- "generate lead magnet for {company}"
- "audit {domain}"
- "run prospect audit"

## Data Sources

Public data only. No ad account access required.

| Source | How to Access | Required? |
|---|---|---|
| Prospect's website | WebFetch or Chrome DevTools MCP | Required |
| Meta Ads Library | Chrome DevTools MCP (navigate + snapshot) or web search | Best effort -- skip section if no active ads |
| Prospect's social links | Scraped from website footer/header | Best effort |
| Reddit / review sentiment | Perplexity API (sonar model) | 2 calls |
| Competitor landscape | Perplexity API (sonar model) | Combined with sentiment call |

## Hard Stops

The following conditions STOP the entire process. No partial reports.

1. **Personal email domain** (gmail.com, yahoo.com, hotmail.com, outlook.com, icloud.com, aol.com, protonmail.com, me.com, live.com, msn.com, mail.com) -- STOP
2. **Domain doesn't resolve to a live website** -- STOP

If a hard stop is triggered, report the reason and do not generate any deliverable.

## Soft Conditions

- **No Meta Ads Library found** -- skip the Meta Creative Analysis section, proceed with all other sections. Note the absence as an opportunity in the synthesis.

## Branding

Default theme is light (the Clickflow palette). See `templates/_base-styles-light.html`.

- Colors: `--bg: #FAFAF8`, `--accent: #1A1A18`, `--green: #2D7A4F`
- Fonts: DM Sans (primary), DM Mono (code/data), Newsreader (italic accents)

For a second brand variant (dark palette), see the "Branding variants" section in `README.md`.

## Scope Limits (Lead Magnet, Not Full Audit)

- **3 creative angles only** -- with teaser: "we identified X additional angles in our full analysis"
- **1 social profile audit per platform** -- with teaser about extended organic content strategy
- **1 product page only** -- with teaser about the full funnel audit
- **3 creative test concepts** -- with teaser about the production pipeline
- **2 Perplexity research calls** -- not the full 5-call competitor research

## Teasers & CTAs

Every major section ends with a teaser that drives toward a strategy call. See `skills/skill-5-synthesis.md` for the closing "What a Full Engagement Reveals" structure.

## Output Format

- Client-facing document
- No internal methodology exposed
- No emojis, no code blocks
- No hedging language
- Every finding includes "why" -- never just describe
- Target length: single scrollable page, 4-6 sections

## General Rules

- CRM writes are limited to updating Audit Status and Audit URL only.

### Mode Detection

- **Automated mode**: Triggered when the prompt contains "AUTOMATED mode" (set by a poller script). Skip review, proceed directly through deployment and email draft.
- **Manual mode**: Triggered by conversational commands. Proceed directly from synthesis to HTML generation, deployment, and email draft -- no approval gate.

## Notion Integration

The Website Submissions database (`collection://YOUR_NOTION_DATA_SOURCE_ID`) tracks audit lifecycle:

**Audit Status flow:**
- `Pending` -- form submitted, waiting to be picked up
- `Processing` -- audit is currently running
- `Complete` -- audit deployed and URL saved
- `Failed` -- hard stop triggered

**After deployment:**
- Search by email
- Set `Audit URL` to the deployed Vercel URL
- Set `Audit Status` to "Complete"
- Draft delivery email to prospect via Skill 7

**On failure:**
- Set `Audit Status` to "Failed"
- Do NOT set Audit URL
