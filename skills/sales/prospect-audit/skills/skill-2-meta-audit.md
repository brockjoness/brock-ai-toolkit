# SKILL 2: Meta Ad Library Audit

## When to use

After Skill 1 has completed. Requires `meta_ads_library_url` from PROSPECT_CONTEXT.

## What to do

### Step 1: Navigate to Meta Ads Library

Use Chrome DevTools MCP to navigate to `meta_ads_library_url`. Take snapshots to capture all active ads.

If Chrome DevTools MCP is unavailable:
- Try fetching the URL directly with WebFetch
- Fall back to web search: `{company_name} Meta ads library active ads`
- If no ad data can be found at all: **STOP the entire process** -- report to Brock that no active Meta ads were found

### Step 2: Catalog all active ads

For each active ad, record:

| Ad # | Start Date | Days Active | Format | Primary Copy (first 2 sentences) | Headline | CTA | Messaging Angle |
|---|---|---|---|---|---|---|---|

**Format classification:**
- **Video**: Has play button and duration indicator
- **Static/Image**: No video controls
- **Carousel**: Multiple cards with navigation arrows

**Messaging angle classification** (use the taxonomy from rules.md):
- Pain-point / problem-aware
- Social proof / authority
- Lifestyle / identity
- Feature-led / education
- Promo / offer
- Founder / brand story
- Comparison / switch
- Emotional / milestone

### Step 3: Identify top 3 creative angles

From the cataloged ads, identify the 3 strongest creative patterns. Judge by:
- Recency (newer = likely working)
- Variant count (more variants = scaling it)
- Production quality and copy strength

For each of the 3 angles:
- **Angle name** (descriptive, e.g., "Emotional gifting angle with unboxing UGC")
- **Evidence**: Which ads? How many? How long running?
- **Why it works**: The psychology -- what emotional or rational trigger does this hit?
- **Sample copy**: 1-2 exact headlines or hooks from these ads

After presenting the 3 angles, add the teaser:
> "We identified [X - 3] additional messaging angles across your ad library. Book a strategy call to see the full creative analysis and our production pipeline."

(Where X is the total number of distinct angles found.)

### Step 4: Format mix assessment

| Format | # of Ads | % of Total | Assessment |
|---|---|---|---|
| Video | X | X% | [Over/under/balanced] |
| Static | X | X% | [Over/under/balanced] |
| Carousel | X | X% | [Over/under/balanced] |
| UGC | X | X% | [Over/under/balanced] |

Flag concentration risks and format gaps.

### Step 5: Copy mining (headlines and hooks)

Extract the strongest headlines and hooks from the longest-running or most-variant ads:

**Top Headlines:**
- "[Exact headline]" -- Why it works: [one sentence]
- (List 3-5 strongest)

**Hook Types:**
- What opening patterns appear in longest-running ads?
- What's missing? (e.g., no social proof hooks, no urgency hooks)

### Step 6: Capture output

Store the full analysis as `META_AUDIT_OUTPUT`. Include:
- Total active ads count
- Top 3 angles (with evidence, psychology, sample copy)
- Format mix table
- Top headlines and hooks
- The "additional angles" teaser

Do NOT present interim results to the user.

### Step 7: Progress update

Tell Brock:
> "Meta audit complete ({X} active ads analyzed, {Y} angles identified). Moving to product page review."

## Next step

Proceed to Skill 3: Organic Social Audit.
