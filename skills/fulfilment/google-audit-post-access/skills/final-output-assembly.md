# FINAL OUTPUT ASSEMBLY -- Post-Access Google Ads Audit

After all skills have run, compile the full report as a **client-facing deliverable**. This is sent directly to the client -- it is not an internal working document. Apply all formatting, removal, and tone rules below before finalizing.

Do not output the final report incrementally during skill execution. Compile it at the end.

---

## SECTION ORDER

Present sections in this order:

1. **Executive Summary** (from Skill 3: snapshot table + Top 3 winners + Top 3 patterns + Top 3 to stop + Key learnings)
2. **Search Campaign Deep Dive** (from Skill 4: keyword performance, search terms, ad copy, Quality Score, match types, extensions)
3. **Shopping & PMax Deep Dive** (from Skill 5: product performance, feed quality, asset groups, search term insights)
4. **Performance Diagnostics** (from Skill 6: bidding strategy, budget allocation, Display/YouTube/DemandGen, audience analysis)
5. **Landing Page Analysis** (from Skill 7: performance table, message match audit, QS impact)
6. **Action Plan** (from Skill 8: testing roadmap, briefs, recommendations, discussion points, action items)
7. **Appendix**

Omit sections entirely if the corresponding skill was skipped (e.g., no Shopping section if no Shopping data).

---

## WHAT TO REMOVE ENTIRELY

Do not include any of the following in the final output:

- **Data Quality Report** -- column mapping tables, row counts, field detection notes
- **Baselines section** -- threshold calculations, bucket classification methodology as a standalone section
- Any mention of which data columns were or were not present in the export
- "Skills run" lists, internal process logs, skill numbers
- "Data source type," "Data missing" rows
- Internal classification methodology (Winner/Loser threshold definitions)
- Raw baseline computation tables (use baselines internally, present only the comparison)

---

## LANGUAGE REFRAMING

Replace internal/process language with client-appropriate equivalents:

| Instead of... | Write... |
|---|---|
| "Confirm with client" / "Ask client if..." | Move to Discussion Points in Action Plan |
| "Cannot assess -- data not provided" | Omit -- or note as a forward-looking recommendation |
| "Insufficient sample" | "Not enough data to classify -- monitoring" |
| "Engagement-only analysis" | Present engagement findings without labeling the limitation |
| "Loser threshold" / "Winner threshold" | Use internally -- present as WINNER / MIDDLE / LOSER tiers |
| "Degraded analysis" | Omit -- just run whatever analysis is possible |
| "Skip Skill X" | Omit the section silently |
| "Period baseline -- treat as directional" | Omit -- use the baseline internally |

---

## TONE AND FRAMING RULES

- Write as a **trusted advisor presenting findings**, not as a system reporting data gaps
- Use **"we" language** throughout -- this is a partnership, not a vendor report
- Never frame missing data as a problem -- either work around it silently or note it as a forward-looking recommendation
- Structural gaps (no PMax campaign, no negative keywords, no extensions) are **strategic opportunities** -- surface them as actionable insights
- Data caveats belong in the **Appendix only** -- never as inline warnings
- Do not use internal skill numbers or skill names in the output
- Every finding should explain **why** -- connect data to search intent, auction mechanics, and user psychology
- When recommending changes, be specific about what to do (exact keywords, specific headlines, concrete bid targets)

---

## SECTION-SPECIFIC RULES

### Executive Summary
Open with Account Snapshot table. Follow with Top 3 Winners (with "why it works"), Top 3 Patterns to Replicate (with tactical instructions), Top 3 Things to Stop (with concrete alternatives), and Key Learnings Summary. This section should be powerful enough to stand alone.

### Search Campaign Deep Dive
Present keyword winners and wasted spend with clear action items. Search term analysis focuses on waste and opportunity. Ad copy analysis extracts reusable patterns. Quality Score section focuses on high-impact fixes only. Extension audit is a quick checklist.

### Shopping & PMax Deep Dive
Product performance grouped by meaningful categories. Feed quality is a health assessment, not a checklist. PMax search term insights focus on the brand vs generic split and cannibalization risk.

### Performance Diagnostics
Bidding strategy section focuses on mismatches and recommended changes. Budget allocation is about reallocation opportunities. Display/YouTube/DemandGen sections only appear if relevant and focus on key findings, not exhaustive tables.

### Landing Page Analysis
Performance table with key insight paragraph. Message match audit uses strong/weak classification with specific fixes for weak matches. QS landing page impact highlights only pages that need work.

### Action Plan
Testing roadmap covers breadth (many tests, light detail). Full briefs cover depth (1-3 top opportunities, full detail). Recommendations, discussion points, and action items close the report.

### Appendix
Include only:
1. Date range and attribution model/window
2. Conversion tracking notes (if any concerns about tracking setup)
3. Campaign naming recommendation (if names are informal or inconsistent)

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
# [Brand Name] -- Google Ads Audit Report
Report Date: [date]
Campaign Types: [Search, Shopping, PMax, etc.]
Total Spend: $[amount]
Total Conversions: [count]
Weighted ROAS: X.XXx
Date Range: [start] to [end]
```
