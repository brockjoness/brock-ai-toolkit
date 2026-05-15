# SKILL 3: Deploy to Vercel

## What to do

### Step 1: Deploy to Vercel

```bash
cd "./reports/{client-slug}/week-{YYYY-MM-DD}" && npx vercel --yes
```

Capture the deployment URL.

### Step 2: Present results

Tell Brock:

> "Weekly report deployed for **{Client Name}** ({Date Range})."
>
> **Report URL:** {vercel_url}
>
> **Key highlights:**
> - {Highlight 1: e.g., "ROAS up 23% WoW to 4.2x"}
> - {Highlight 2: e.g., "Top performer: UGC testimonial ad, 5.1x ROAS"}
> - {Highlight 3: e.g., "Creative fatigue detected on 2 ads -- refresh recommended"}
>
> **Options:**
> 1. **Draft delivery email** -- compose email with report link for the client
> 2. **Write to Notion** -- save report summary under client's CRM page
> 3. **Generate next creative brief** -- feed recommendations into creative-brief-generator

### Step 3: Draft delivery email (if requested)

Use the email-autoresponder rules for tone. Draft includes:
- Subject: "{Client Name} Weekly Report -- {Date Range}"
- Brief summary (2-3 sentences from executive summary)
- Report link (CTA button)
- 1-2 key callouts
- Next steps / upcoming actions
- Signature from `memory/email-signatures.md` for the appropriate account

## Error Handling

- Vercel deploy fails: retry once, then provide local file path
- Client email not in CRM: present report URL to Brock for manual delivery
