# FINAL OUTPUT ASSEMBLY -- Post-Access Audit

After all skills have run, compile the full report as a **client-facing deliverable**. This is sent directly to the client -- it is not an internal working document. Apply all formatting, removal, and tone rules below before finalizing.

Do not output the final report incrementally during skill execution. Compile it at the end.

---

## SECTION ORDER

Present sections in this order:

1. **Executive Summary** (from Skill 3: snapshot table + Top 3 winners + Top 3 patterns + Top 3 to stop + Key learnings)
2. **Creative Deep Dive** (from Skill 4: classification tables, creative patterns, copy mining, video/static analysis, Ad Library cross-reference)
3. **Landing Page Analysis** (from Skill 6: performance table, message match audit)
4. **Performance Diagnostics** (from Skill 5: fatigue flags, audience insights, root cause analysis)
5. **Action Plan** (from Skill 7: testing roadmap, creative briefs, recommendations, discussion points, action items)
6. **Appendix**

---

## WHAT TO REMOVE ENTIRELY

Do not include any of the following in the final output:

- **Data Quality Report** -- column mapping tables, row counts, field detection notes
- **Baselines section** -- threshold calculations, bucket classification methodology as a standalone section
- **Measurement Integrity** -- surface specific concerns (pixel anomalies) in the Appendix only
- Any mention of "snapshot mode," "WoW fatigue logic disabled," "time-series not available," or similar data availability caveats
- Any mention of which data columns were or were not present in the export
- "Skills run" lists, internal process logs, skill numbers
- "Data source type," "Data missing" rows

---

## LANGUAGE REFRAMING

Replace internal/process language with client-appropriate equivalents:

| Instead of... | Write... |
|---|---|
| "Confirm with client" / "Ask client if..." | Move to Discussion Points in Action Plan |
| "Request time-series export" | "We'll track this trend going forward" |
| "Cannot differentiate fatigue from 'never worked'" | Omit -- flag the ad for monitoring or action |
| "Mode: Snapshot" / "Daily or weekly export required" | Omit entirely |
| "Integrity concerns exist -- treat conclusions as directional" | Omit -- surface specific concerns once in Appendix |
| "No Shopify data provided -- cannot validate" | "We recommend cross-referencing Meta attribution against backend order data" |
| "Loser threshold" / "Winner threshold" | Use internally -- present as WINNER / MIDDLE / LOSER tiers |
| "Insufficient sample" | "Not enough data to classify -- monitoring" |
| "Period baseline -- treat as directional" | Omit -- use the baseline internally |

---

## TONE AND FRAMING RULES

- Write as a **trusted advisor presenting findings**, not as a system reporting data gaps
- Use **"we" language** throughout -- this is a partnership, not a vendor report
- Never frame missing data as a problem -- either work around it silently or note it as a forward-looking recommendation
- Structural gaps (no retargeting campaign, no ASC) are **strategic opportunities** -- surface them as actionable insights
- Measurement caveats belong in the **Appendix only** -- never as inline warnings
- Do not use internal skill numbers or skill names in the output
- Every finding should explain **why** -- connect data to creative psychology and actionable insight

---

## SECTION-SPECIFIC RULES

### Executive Summary
Open with Account Snapshot table. Follow with Top 3 Creative Winners (with "why it works"), Top 3 Patterns to Replicate (with tactical instructions), Top 3 Things to Stop (with concrete alternatives), and Key Learnings Summary. This section should be powerful enough to stand alone.

### Creative Deep Dive
Present winner/loser tables with the "Why It Works / Why It Fails" column. Include production guidance for video editors alongside strategic analysis. Copy mining section presents actual reusable copy from winners.

### Landing Page Analysis
Present the performance table with key insight paragraph. Message match audit uses strong/weak classification with specific fixes for weak matches.

### Performance Diagnostics
Fatigue table shows only flagged ads with recommended actions -- no methodology. Root cause is grouped by failure type (Creative Failures, Funnel Leaks, Efficiency Drags) for scannability.

### Action Plan
Testing roadmap covers breadth (many concepts, light detail). Full briefs cover depth (1-3 top opportunities, full detail). Recommendations, discussion points, and action items close the report.

### Appendix
Include only:
1. Date range and attribution window assumption
2. Ad Library capture date (if applicable)
3. Pixel anomaly notes
4. Campaign naming recommendation (if names are informal)

---

## DEPLOYMENT

After compiling the final report, deploy it as a shareable client link:

1. Read the audit report deployer workflow at `.claude/work-types/3-fulfilment/skills/audit-report-deployer/workflow.md`
2. Follow the deployment steps to generate HTML and deploy to Vercel
3. Present both the report content and the shareable URL to Brock

---

## OUTPUT FORMAT

Format as plain text with clear section headers and simple tables. Notion-compatible formatting: headers (#, ##, ###), bold for emphasis, bullet points for lists, pipe tables for data. No code blocks, no HTML.

Open with:

```
# [Brand Name] -- Creative Analysis Report
Report Date: [date]
Total Ads Analyzed: [count]
Total Spend: $[amount]
Weighted ROAS: X.XXx
Total Orders: [count]
```
