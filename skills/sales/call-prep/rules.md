# Call Prep -- Rules

## Activation Triggers

- `prepare for a call with {Notion page URL}`
- `call prep for {Notion page URL}`
- `prep call {Notion page URL}`

The input MUST be a Notion CRM page URL. Bare domains or emails are not accepted -- use the prospect-audit skill directly for those.

## Hard Stops

1. **Notion page URL is invalid or inaccessible** -- STOP
2. **No "Agency" property on the page** (or value is not a recognized brand variant) -- ASK which variant
3. **No domain/website on the CRM page** -- STOP, flag missing data

## Inherited Rules

During the audit phase, all prospect-audit rules apply unchanged. See: `../prospect-audit/rules.md`.

## Agency Routing

| Agency Property Value | Audit Pipeline | Deploy Template |
|---|---|---|
| Default (e.g. `Acme Agency`) | `../prospect-audit/skills/` (0-5) | `../prospect-audit/skills/skill-6-deploy.md` |
| Secondary brand variant | shared skills (0-5) + alt template | `../prospect-audit/skills/skill-6-deploy.md` (variant) |

If the Agency value is anything else, ask.

## Scope

- **Manual mode only** -- no automated polling
- **No email delivery** -- Skill 7 (email) from the audit pipeline is SKIPPED
- **Skip Skill 5 approval gate** -- call prep is meant to be autonomous

## Audit Skip Logic

If the `Prospect Audit` property on the CRM page already contains a URL:
- SKIP the entire audit pipeline
- Jump directly to Skill 2 (talking points)
- Use the existing audit URL; do not redeploy

## Talking Points

Talking points are **internal** (not client-facing). They should be:
- Actionable and specific to this prospect
- Cross-referenced with audit findings AND internal call notes
- Structured for quick scanning during a live call
- Written into the Notion page under the relevant call notes date section

## Notion Writes (limited to)

- `Prospect Audit` property: the deployed Vercel URL
- Page body: talking points written under the current date's call notes

## Team Chat Notification

- Channel: `#your-team-channel`
- Includes: company name, agency, audit URL, CRM link, top 3 talking point summaries
- If chat MCP is unavailable: skip silently, report in conversation instead
