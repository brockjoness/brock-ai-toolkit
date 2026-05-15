# FINAL OUTPUT ASSEMBLY -- Pre-Access Audit

After all skills have run, compile the full report as a **client-facing sales document**. This is presented to prospects to demonstrate expertise and drive account access.

Do not output the final report incrementally during skill execution. Compile it at the end.

---

## SECTION ORDER

Present sections in this order:

1. **Executive Creative Brief** (from Skill 5 subsections 1-2: Top 3 Working + Top 3 to Fix + Key Learnings)
2. **Creative Analysis** (from Skill 2: patterns, format mix, copy mining, video/static notes)
3. **Competitor Snapshot** (from Skill 3, if competitors were analyzed)
4. **Website & Landing Page Review** (from Skill 4: message match, quick wins, trust signals)
5. **Opportunities & Next Steps** (from Skill 5 subsections 3-4: testing roadmap + "What we'd do with access")

---

## WHAT TO REMOVE

Do not include any of the following in the final output:

- Ad Library raw data tables (the full ad-by-ad catalog from Skill 1) -- reference specific ads inline but don't dump the full table
- Internal process notes (skill numbers, workflow references, "Step X")
- Any mention of methodology limitations ("we couldn't assess X because we lack account data")
- Hedge language ("it's possible that...", "we can't be sure but...")
- Any reference to the Notion CRM pull or internal data sources

---

## TONE AND FRAMING RULES

- **Sales tone**: Confident, opinionated, action-oriented
- **"We" language**: "We see an opportunity to..." not "The data suggests..."
- **Frame everything as opportunity**: "You're missing [X] -- here's what we'd test" not "Your ads are weak because..."
- **No caveats about data access**: Silently work within the constraints. Never say "we couldn't do X because we don't have access." Instead, put the valuable access-dependent analyses in the "What a Full Audit Would Reveal" section as the sales close.
- **Be specific**: Reference specific ads, specific copy, specific landing pages. Generic observations are worthless.
- **Every observation has a "why"**: Never just describe what you see -- explain why it works or why it fails.

---

## LENGTH GUIDELINE

Target: 3-5 pages when pasted into a Google Doc. This is a sales document -- it should be impressive but not overwhelming. Cut ruthlessly. If a section doesn't drive a decision or close the sale, cut it.

---

## DEPLOYMENT

After compiling the final report, deploy it as a shareable client link:

1. Read the audit report deployer workflow at `.claude/work-types/3-fulfilment/skills/audit-report-deployer/workflow.md`
2. Follow the deployment steps to generate HTML and deploy to Vercel
3. Present both the report content and the shareable URL to Brock

## CREATIVE MOCKUPS

Skill 6 generates HTML ad creative mockups as a separate deliverable. After the audit report is deployed:

1. The creative mockups should already be deployed to their own Vercel URL (from Skill 6)
2. Include the creative mockups URL in the summary alongside the audit report URL
3. Both URLs should be added to the pre-onboarding hub as separate deliverable cards

---

## OUTPUT FORMAT

Format the report as plain text with clear section headers and simple tables. Use Notion-compatible formatting: headers (#, ##, ###), bold for emphasis, bullet points for lists, pipe tables for data. Do not use markdown code blocks, HTML, or syntax that requires rendering.

Open with:

```
# [Brand Name] -- Pre-Access Creative Audit
Report Date: [date]
Total Active Ads Analyzed: [count]
Competitors Reviewed: [names or "None"]
```

End with the "What a Full Audit Would Reveal" section as the final impression.
