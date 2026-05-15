# Workflow Map — Onboarding Skill Reference

All skill files for this workflow live in `./onboarding/`.
For execution sequence and trigger logic, see skill-0-trigger.md.

| Skill File | Description |
|---|---|
| skill-0-trigger.md | Entry point: parse brand name, verify API key, start workflow |
| skill-1-competitor-research.md | Reddit, X/Twitter, reviews, competitive landscape research via Perplexity API |

**Notes:**
- Skill 1 makes 5 separate Perplexity API calls (Reddit brand sentiment, Reddit pain points, X/Twitter category sentiment, review analysis, competitive landscape).
- All API calls use the `sonar` model via `$PERPLEXITY_API_KEY`.
- Section 7 of the output ("Creative Brief Input Summary") provides structured input for the `creative-brief-generator` skill at `./fulfilment/creative-brief-generator/`.
- Cross-cutting rules (API usage, output format, degraded analysis) are in rules.md.

**Downstream Chains:**

Standalone:
```
competitor-research output (Section 7)
    ↓
creative-brief-generator (./fulfilment/creative-brief-generator/)
    ↓
creative-generator (./fulfilment/creative-generator/) → HTML ad mockups
```

Within pre-onboarding / strategy pipeline:
```
Skill 0: Context → Skill 1: Competitor Research → Skill 2: Meta Audit → Skill 3: Google Audit
    ↓
Skill 4: Roadmap (Mode A: 12-month / Mode B: 90-day strategy doc)
    ↓
Skill 4b: Creative Brief (chains to ./fulfilment/creative-brief-generator/)
    ↓
REVIEW CHECKPOINT (pause for Brock's approval)
    ↓
Skill 5: HTML Generation → Skill 6: Hub & Vercel Deployment
```
