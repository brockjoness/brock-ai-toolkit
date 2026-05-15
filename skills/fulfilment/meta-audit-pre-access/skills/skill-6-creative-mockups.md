# SKILL 6: Creative Mockups

## When to use

After Skill 5 (Opportunities & Next Steps). This skill generates HTML ad creative mockups based on the audit findings, giving the prospect a tangible preview of what their ads could look like.

This is a separate deliverable from the audit report -- it gets its own Vercel deployment URL and its own card in the pre-onboarding hub.

## What to do

### Step 1: Extract the 3 strongest creative angles

From the audit findings (Skills 2-5), identify the top 3 creative angles to mock up. Prioritize:

1. **Strongest from Skill 5 Creative Testing Roadmap** -- the #1 recommended static concept
2. **Best copy angle from Skill 2** -- the strongest headline/hook from copy & messaging analysis
3. **Competitive gap from Skill 3** -- an angle the prospect isn't running that competitors are missing too (first-mover opportunity)

Each angle becomes a **variant** with a descriptive name (e.g., "Performance Proof", "Social Proof", "Versatility Story").

### Step 2: Build variant briefs

For each of the 3 variants, define:

- **Variant name** (e.g., "20 Hours Cold")
- **Angle** (what creative pattern this tests)
- **Headline** (max 8 words, scroll-stopping)
- **Body copy** (1-2 lines, benefit-focused)
- **CTA text** (2-4 words)
- **Image direction** (descriptive label for placeholder, or real image URL if available)
- **Strategic rationale** (1 sentence -- why this variant, tied back to audit data)

### Step 3: Load agency brand

Read the agency's `brand.md` from `.claude/agencies/{slug}/brand.md` for theming reference. However, note that ad creatives should reflect the **client's brand**, not the agency's. Use:
- Client's brand colors (infer from their website if no brand.md exists)
- Clean, modern fonts (DM Sans is a safe default)
- Color palette that matches the client's product aesthetic

### Step 4: Generate HTML creatives

Read the creative generator templates at:
- `.claude/work-types/3-fulfilment/skills/creative-generator/templates/feed-4x5.html`
- `.claude/work-types/3-fulfilment/skills/creative-generator/templates/story-9x16.html`

Refer to `.claude/work-types/3-fulfilment/skills/creative-generator/knowledge-meta-specs.md` for Meta safe zone specifications.

For each variant, generate 2 HTML files:
- `{variant-slug}-feed.html` (1080 x 1350px, 4:5 feed format)
- `{variant-slug}-story.html` (1080 x 1920px, 9:16 story/reels format)

All content must be positioned within Meta's safe zones (baked into layout via padding/margins).

### Step 5: Generate gallery index

Create an `index.html` gallery page showing all variants side by side:
- Dark theme matching the audit report aesthetic
- Each variant shows both feed and story formats via scaled iframes
- Include variant name, format tag, and strategic rationale
- "Open full size" links to individual HTML files

### Step 6: Deploy to Vercel

1. Write all files to `creatives/{client-slug}/`
2. Deploy: `cd "creatives/{client-slug}" && npx vercel --prod --yes`
3. Store the production URL for the hub card

### Step 7: Report the URL

Provide:
- Gallery URL (Vercel production URL)
- Local file path
- Summary of the 3 variants with rationale

## Output

- 6 HTML creative files (3 variants x 2 formats)
- 1 gallery index.html
- Deployed Vercel URL

## Next step

Proceed to Final Output Assembly. Pass the creative mockups URL for inclusion in the pre-onboarding hub.
