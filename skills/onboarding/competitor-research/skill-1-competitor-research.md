# SKILL 1: Competitor & Market Research

## When to use

After Skill 0 has confirmed the brand name and verified API readiness. Always runs as the first research skill in the onboarding workflow.

---

## What to do

Make **5 separate Perplexity API calls**, each targeting a specific research area. Focused queries yield better results than combined queries. Use the brand name (and optional inputs) extracted by Skill 0.

In all queries below, replace `{BRAND}` with the actual brand/company name, `{INDUSTRY}` with the industry/vertical (if known, otherwise omit that clause), and `{PRODUCT_CATEGORY}` with the product category (if known).

---

### API Call 1: Reddit — Brand Mentions & Sentiment

**Purpose:** Find what real Reddit users are saying about this specific brand.

```bash
curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar",
    "messages": [{"role": "user", "content": "Search Reddit for mentions of {BRAND}. What are real Reddit users saying about this brand? Include: which subreddits discuss it, overall sentiment (positive/negative/mixed), specific praise or complaints users mention, any recurring themes. Quote actual user comments where possible. Focus on the most recent and relevant discussions."}]
  }'
```

Extract from the response: subreddit names, sentiment summary, direct user quotes, recurring themes.

If the brand is too niche for Reddit mentions, note this and move on.

---

### API Call 2: Reddit — Customer Pain Points & Objections

**Purpose:** Understand what problems customers in this category are trying to solve, and what objections they raise about products like this.

```bash
curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar",
    "messages": [{"role": "user", "content": "Search Reddit for discussions about {PRODUCT_CATEGORY} in the {INDUSTRY} space. What are the biggest pain points, frustrations, and unmet needs that real users talk about? What objections do people raise before buying? What do they wish existing products did better? What questions do they ask when comparing options? Quote actual Reddit comments where possible. Focus on recent discussions from the past year."}]
  }'
```

Extract from the response: top pain points (ranked by frequency), purchase objections, unmet needs, comparison criteria users care about, direct quotes.

If no product category is known, use the brand name and its apparent product type instead.

---

### API Call 3: X/Twitter — Category Conversation & Sentiment

**Purpose:** Understand the broader conversation and sentiment around this product category on X/Twitter.

```bash
curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar",
    "messages": [{"role": "user", "content": "Search X (Twitter) for recent discussions about {BRAND} and the {PRODUCT_CATEGORY} category. What are people saying? What is the general sentiment? Are there any trending topics, complaints, or praise related to this brand or its competitors? Who are the key voices or influencers talking about this space? What hashtags are commonly used? Include specific tweets or paraphrased posts where possible."}]
  }'
```

Extract from the response: brand-specific mentions (if any), category sentiment, trending topics, influencer voices, common hashtags, direct quotes or paraphrased posts.

---

### API Call 4: Reviews — Multi-Platform Review Analysis

**Purpose:** Aggregate what customers say in formal reviews across Google Reviews, Trustpilot, G2, app stores, and other review platforms.

```bash
curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar",
    "messages": [{"role": "user", "content": "Find reviews of {BRAND} across review platforms including Google Reviews, Trustpilot, G2, BBB, Amazon, app stores (iOS/Android), and any other relevant review sites. What is their overall rating on each platform? What do positive reviews praise most? What do negative reviews complain about most? Are there recurring themes in 3-star (neutral) reviews? What specific product features or service aspects get the most mentions? Quote actual reviewer language where possible."}]
  }'
```

Extract from the response: platform-by-platform ratings, top positive themes, top negative themes, neutral review insights, specific feature mentions, direct review quotes.

---

### API Call 5: Competitive Landscape & Positioning

**Purpose:** Identify who the brand competes against and where positioning opportunities exist.

```bash
curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar",
    "messages": [{"role": "user", "content": "Who are the main competitors of {BRAND} in the {PRODUCT_CATEGORY} space? For each competitor, what is their positioning, price point, and main value proposition? How does {BRAND} differentiate itself? What messaging angles do competitors use in their marketing? Are there any positioning gaps — things no competitor is claiming or emphasizing that could be an opportunity? What do comparison articles and vs posts say when comparing these brands?"}]
  }'
```

Extract from the response: competitor list with positioning summaries, price point comparisons, messaging angles competitors use, differentiation gaps, comparison article insights.

If specific competitor names were provided as optional input, include them in the query: "...main competitors of {BRAND} including {COMPETITOR_1}, {COMPETITOR_2}..."

---

### Processing API Responses

For each API call:

1. Parse the JSON response and extract the `choices[0].message.content` field
2. If the response includes citations, preserve them
3. If any call returns an error (rate limit, timeout, invalid response), retry once after a 3-second pause
4. If the retry also fails, note "[Research area]: API call failed — data unavailable" and proceed with remaining calls
5. Do not show raw JSON to the user — process all responses into the structured output format below

---

## Output Format

Compile all research into a single structured deliverable with the following sections. Use plain text with Notion-compatible formatting (headers, bold, bullets, blockquotes, tables).

---

### COMPETITOR & MARKET RESEARCH BRIEF

**Brand:** [Brand Name]
**Industry:** [Industry/Vertical]
**Research Date:** [Current Date]
**Prepared by:** Claude (via Perplexity API web research)
**Agency:** [Agency Name, if loaded from context]

---

#### 1. Reddit Brand Sentiment

**Summary:** [2-3 sentence overview of Reddit presence and sentiment]

**Subreddits where [Brand] is discussed:**
- r/[subreddit] — [context]

**Sentiment Breakdown:**

| Sentiment | Frequency | Key Themes |
|---|---|---|
| Positive | [High/Medium/Low] | [themes] |
| Negative | [High/Medium/Low] | [themes] |
| Neutral/Mixed | [High/Medium/Low] | [themes] |

**Notable User Quotes:**
> "[Direct quote from Reddit user]" — r/[subreddit]
> "[Direct quote]" — r/[subreddit]

---

#### 2. Customer Pain Points & Objections (from Reddit)

**Top Pain Points** (ranked by frequency of mention):

| Rank | Pain Point | Frequency | Sample Quote |
|---|---|---|---|
| 1 | [pain point] | [High/Med/Low] | "[quote]" |
| 2 | [pain point] | [High/Med/Low] | "[quote]" |
| 3 | [pain point] | [High/Med/Low] | "[quote]" |

**Purchase Objections:**
- [Objection 1]: [context and how often it appears]
- [Objection 2]: [context]

**Unmet Needs / Wishlist Items:**
- [What users wish existed or worked better]

---

#### 3. X/Twitter Category Sentiment

**Summary:** [2-3 sentence overview of X/Twitter conversation landscape]

**Brand-Specific Mentions:**
- [What people say about the brand directly, if anything]

**Category Trends:**
- [Trending topics, common conversations]

**Key Voices / Influencers:**
- [Names or handles if identified]

**Notable Posts:**
> "[Quote or paraphrase from X/Twitter]"

---

#### 4. Review Platform Analysis

**Ratings Overview:**

| Platform | Rating | # of Reviews | Link |
|---|---|---|---|
| Google Reviews | [X/5] | [count] | [if available] |
| Trustpilot | [X/5] | [count] | |
| G2 | [X/5] | [count] | |
| App Store | [X/5] | [count] | |
| [Other] | [X/5] | [count] | |

**What Positive Reviews Praise:**
- [Theme 1] — "[sample quote]"
- [Theme 2] — "[sample quote]"

**What Negative Reviews Complain About:**
- [Theme 1] — "[sample quote]"
- [Theme 2] — "[sample quote]"

**Neutral Review Insights (3-star):**
- [What people who are "meh" say — these often reveal the real tipping points]

---

#### 5. Competitive Landscape

**Key Competitors:**

| Competitor | Positioning | Price Point | Key Messaging | Strength | Weakness |
|---|---|---|---|---|---|
| [Name] | [positioning] | [price] | [messaging angle] | [strength] | [weakness] |
| [Name] | [positioning] | [price] | [messaging angle] | [strength] | [weakness] |

**Positioning Gaps:**
- [Gap 1]: [Opportunity description — what no competitor is claiming]
- [Gap 2]: [Opportunity description]

**Comparison Context:**
- [What "vs" articles and comparison posts say]

---

#### 6. Actionable Synthesis

**A. Pain Points to Address in Ad Creative**

| Pain Point (from research) | Real User Language | Creative Angle | Why It Works |
|---|---|---|---|
| [pain point] | "[exact quote from user]" | [how to use this in an ad] | [why this resonates based on frequency/emotion] |

**B. Messaging Angles Backed by Real User Language**

3-5 messaging angles, each grounded in actual quotes and sentiment:

1. **[Angle Name]**: [Description]
   - Source: [Where this came from — Reddit, reviews, X]
   - User language to borrow: "[exact phrase or quote]"
   - Hook direction: [How this becomes an ad hook]

2. **[Angle Name]**: [Description]
   - Source: [source]
   - User language to borrow: "[quote]"
   - Hook direction: [direction]

3. (etc.)

**C. Competitive Positioning Opportunities**

Based on the competitive landscape analysis, where this brand can own space:

- **[Opportunity 1]**: [What no competitor is saying or emphasizing, and why this brand can claim it]
- **[Opportunity 2]**: [Gap in the market]

**D. Objection Handling for Ad Creative**

| Objection | How Often It Appears | Recommended Response in Creative |
|---|---|---|
| [objection] | [frequency] | [how to preemptively address in ad copy/visuals] |

**E. Competitor Ad Spend & Activity Signals**

Based on public Ad Library data and market signals observed during research:

| Competitor | Estimated Activity Level | Ad Volume (observed) | Spend Tier Estimate | Primary Platforms |
|---|---|---|---|---|
| [Name] | [High/Medium/Low] | [X active ads] | [<$50K / $50-250K / $250K+/mo] | [Meta, Google, TikTok] |
| [Name] | [High/Medium/Low] | [X active ads] | [estimate] | [platforms] |

**Estimation basis:** Ad volume, creative refresh frequency, and platform breadth are used as proxy signals. These are directional estimates, not confirmed spend data.

**F. Creative Themes Summary**

Consolidated visual and messaging themes observed across the competitive landscape and customer research:

| Theme | Source Signal | Opportunity for [Brand] |
|---|---|---|
| [e.g., UGC-heavy lifestyle content] | [Competitors X and Y use this extensively] | [Underserved / Match / Differentiate] |
| [e.g., Price comparison messaging] | [Reddit users frequently compare on price] | [Opportunity to reframe value] |
| [e.g., Founder-led storytelling] | [Reviews praise personal touch] | [Strong fit for brand authenticity] |

**G. Recommended Next Steps**

- [ ] Validate top 3 messaging angles with the client before creative development
- [ ] Prioritize [angle X] for first round of creative testing (strongest signal)
- [ ] Address [objection Y] in landing page copy (high-frequency negative signal)
- [ ] Monitor [platform] for ongoing sentiment (most active discussion channel)
- [ ] Feed this research into creative brief generator for structured brief production
- [ ] [Additional recommendation based on findings]

---

#### 7. Creative Brief Input Summary

This section packages the key research outputs for direct consumption by the `creative-brief-generator` skill.

**BRIEF_INPUT_FROM_RESEARCH:**
- **Brand:** [Brand Name]
- **Industry:** [Industry/Vertical]
- **Target Audience Signals:** [Key demographics, psychographics, and behavioral signals from research]
- **Top 3 Messaging Angles:** [Angle 1], [Angle 2], [Angle 3] — with hook directions from Section 6B
- **Pain Points to Address:** [Top 3 from Section 6A]
- **Objections to Preempt:** [Top 2 from Section 6D]
- **Competitive Positioning:** [Primary differentiation opportunity from Section 6C]
- **Creative Themes:** [Top 3 from Section 6F]
- **User Language to Borrow:** [3-5 exact quotes from research that should appear in ad copy]

This block can be passed directly to the creative-brief-generator skill to produce platform-specific creative briefs.

---

End of Competitor & Market Research Brief.

---

## Error Handling

If all 5 API calls fail:
> "Unable to complete web research — the Perplexity API is unreachable. Please check your API key and network connection, then re-run this skill."

If some calls succeed and some fail:
> Produce the report with available data. Mark failed sections with: "[Section]: Research unavailable — API call failed after retry."

## Next step

This is currently the final skill in the onboarding workflow. When additional onboarding skills are added, update this line to chain to the next skill.

For now: Present the completed research brief to the user and ask:
> "Research brief complete. Would you like me to refine any section, dig deeper into a specific area, or proceed with onboarding setup?"
