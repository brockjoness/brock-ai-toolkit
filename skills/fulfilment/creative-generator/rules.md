# Creative Generator -- Rules

## Output Rules

### Formats
- Always generate BOTH formats for every variant:
  - **4:5 Feed** (1080 x 1350px)
  - **9:16 Story/Reels** (1080 x 1920px)
- Default: **3 variants** per run, producing 6 HTML files total

### Variant Naming
- Each variant gets a descriptive slug based on its creative angle
- Examples: `emotional-hook`, `benefit-led`, `social-proof`, `urgency-scarcity`, `testimonial`
- File naming: `{variant-slug}-feed.html`, `{variant-slug}-story.html`

### Safe Zones
- All content (headlines, body copy, CTAs) must be positioned within Meta's usable creative area
- Safe zones are baked into the template layout via padding/margins -- no visible overlays or guides
- Refer to `knowledge-meta-specs.md` for exact pixel values per format

### Agency Branding
- Read brand guidelines from `.claude/agencies/{slug}/brand.md`
- Apply: accent color, font family, background color, text color, border radius
- If no agency context is available, use neutral defaults (white bg, dark text, Inter font, blue accent)

### Image Handling
- If the user provides an image URL: render the actual image in the creative
- If no image is provided: render a styled placeholder box with a descriptive label (e.g., "Lifestyle shot -- woman using product outdoors")
- Never generate or source AI images -- these are layout/copy mockups only
- Image placeholders should use a muted version of the agency accent color as background

### Copy Rules
- Headlines: max 8 words, punchy, scroll-stopping
- Body copy: max 2 lines, benefit-focused
- CTA text: action-oriented, 2-4 words (e.g., "Shop Now", "Get Yours", "Try It Free")
- Never use em dashes in ad copy
- Match the brand's voice and tone from brand.md

### Variant Strategy
When sourcing from audit output (skill-4 creative deep dive):
1. **Variant 1**: Map to the #1 winning creative pattern
2. **Variant 2**: Map to the #2 winning creative pattern or best-performing headline type
3. **Variant 3**: Map to a different angle (if patterns 1-2 are similar) or test an anti-pattern fix

When sourcing from manual brief:
1. **Variant 1**: Lead with the strongest value proposition
2. **Variant 2**: Emotional/aspirational angle
3. **Variant 3**: Social proof or urgency angle

### Deployment
- Write files to `creatives/{client-slug}/`
- Generate an `index.html` gallery page showing all variants
- Deploy via Vercel: `cd "creatives/{client-slug}" && npx vercel --yes`
- Return the public URL and local file paths

## Constraints
- Do not modify audit output files or any files outside the creative-generator scope
- Do not send creatives to clients -- all output is for Brock's review only
- Do not create more than 5 variants without explicit request
- Templates must be self-contained HTML (inline CSS, Google Fonts only external dependency)
