# SKILL 2: Winning Element Extraction

## When to use

After Skill 1 has classified all ads. Extracts the specific creative elements that drove winning (or losing) performance.

## Inputs

- `ANALYSIS_OUTPUT` from Skill 1 (classified ads with metrics)
- `TEST_CONTEXT` from Skill 0 (ad names, test type)
- Ad creative details if available (from Brock's input, ad names, or prior audit data)

## What to do

### Step 1: Parse winning ad names for creative elements

Ad names often encode creative variables. Extract patterns:

| Name Component | Maps To |
|---|---|
| "Social Proof" / "Testimonial" / "Review" | Messaging angle: social proof |
| "Benefit" / "Transform" / "Results" | Messaging angle: benefit-led |
| "Urgency" / "Limited" / "Last Chance" | Messaging angle: urgency/scarcity |
| "UGC" / "User" / "Creator" | Format: UGC-style |
| "Static" / "Image" | Format: static image |
| "Video" / "Reel" | Format: video |
| "Carousel" | Format: carousel |
| "Hook A" / "Hook B" | Hook variant |
| "CTA: Shop Now" / "CTA: Learn More" | CTA variant |

### Step 2: Build element profile for each winner

For each winning ad, construct an element profile:

```
WINNING ELEMENTS -- {Ad Name}:
  Hook/Angle: {specific angle -- e.g., "transformation before/after"}
  Visual Style: {e.g., "lifestyle photography, warm tones, minimal text"}
  Copy Theme: {e.g., "benefit-led, customer language, specific result claim"}
  CTA: {e.g., "Shop Now" vs "Get Yours"}
  Format: {e.g., "4:5 static" or "9:16 video"}
  Audience Response: {CTR, thumb-stop indicators}
```

### Step 3: Build element profile for each loser

Same structure, but highlight what DIDN'T work:

```
LOSING ELEMENTS -- {Ad Name}:
  Hook/Angle: {specific angle that underperformed}
  Visual Style: {what was different from winners}
  Copy Theme: {what messaging fell flat}
  CTA: {if different from winner}
  Format: {if different from winner}
  Possible Reasons: {fatigue? wrong audience? weak hook? message mismatch?}
```

### Step 4: Identify the winning variable

Based on test type:

**If angle test (same format, different messaging):**
- The winning ANGLE is the key finding
- Note which specific pain point, benefit, or emotional trigger won

**If format test (same angle, different formats):**
- The winning FORMAT is the key finding
- Note: static vs. video vs. carousel vs. UGC

**If copy test (same angle + format, different copy):**
- The winning COPY APPROACH is the key finding
- Note: headline structure, body copy length, CTA choice

**If CTA test:**
- The winning CTA is the key finding

**If mixed (multiple variables):**
- Note that results are directional, not conclusive
- Identify the MOST LIKELY winning variable based on which element differs most between winner and loser
- Recommend a clean isolation test as next step

### Step 5: Generate pattern summary

```
WINNING PATTERNS:
  1. {Pattern}: {explanation} -- drove {X}% better ROAS vs. baseline
  2. {Pattern}: {explanation} -- drove {X}% lower CPA vs. baseline

LOSING PATTERNS:
  1. {Pattern}: {explanation} -- underperformed by {X}%

KEY INSIGHT: {one sentence -- the single most actionable takeaway}

ELEMENTS TO CARRY FORWARD:
  - {Hook type}
  - {Visual style}
  - {Copy approach}
  - {CTA}

ELEMENTS TO DROP:
  - {Specific element from losers}
```

Store as `EXTRACTION_OUTPUT`.

### Step 6: Provide progress update

> "Winning elements extracted. Key pattern: {one-line summary}. Moving to iteration brief."

## Next step

Proceed to Skill 3: Next Round Brief.
