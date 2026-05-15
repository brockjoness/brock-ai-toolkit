# SKILL 1: Market Snapshot

## When to use

After Skill 0 has completed and PROSPECT_CONTEXT is assembled.

## What to do

### Step 1: Make 2 Perplexity API calls

Use the Perplexity MCP tool (sonar model) for web research. Make 2 calls instead of the full 5 used in the pre-onboarding competitor research.

**Call 1: Brand Sentiment & Pain Points**

Prompt:
```
Search Reddit, review platforms (Trustpilot, Google Reviews, G2, app stores), and social media for mentions of {company_name} ({domain}).

Return:
1. Overall sentiment (positive/negative/mixed) with specific examples
2. Top 3 customer pain points or objections mentioned by real users (with direct quotes if available)
3. What customers love most (top 3 positives with quotes)
4. Any recurring complaints or friction points
5. Star ratings on major review platforms if available
```

**Call 2: Competitive Landscape**

Prompt:
```
Research the competitive landscape for {company_name} ({domain}) in their market category.

Return:
1. Top 3-5 direct competitors with their key differentiators
2. How {company_name} is positioned relative to competitors (price, quality, audience)
3. Market gaps or opportunities that competitors are missing
4. Messaging angles that competitors use but {company_name} does not (and vice versa)
5. Category trends or shifts happening in this market right now
```

### Step 2: Structure the output

Combine both calls into a structured `MARKET_SNAPSHOT_OUTPUT`:

```
## Market Snapshot: {company_name}

### Brand Sentiment
[Sentiment summary -- 2-3 paragraphs max]
[Key quotes from real users if found]

### Customer Pain Points
[Top 3 pain points with evidence]

### Competitive Landscape
[Competitor comparison -- light matrix format]

| Competitor | Key Differentiator | Price Position | Messaging Focus |
|---|---|---|---|

### Market Opportunities
[2-3 specific opportunities based on competitive gaps]
```

### Step 3: Progress update

Tell Brock:
> "Market snapshot complete. Moving to Meta audit."

## Error handling

- If Call 1 fails: note "Brand sentiment data unavailable" and proceed with Call 2
- If Call 2 fails: note "Competitive landscape data unavailable" and proceed
- If both fail: set `MARKET_SNAPSHOT_OUTPUT` to a minimal section noting research was unavailable, proceed to Skill 2

## Next step

Proceed to Skill 2: Meta Ad Library Audit.
