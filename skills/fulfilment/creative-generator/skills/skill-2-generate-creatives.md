# SKILL 2: Generate HTML Ad Creatives

## When to use

After Skill 1 has produced the structured variant briefs. This skill generates the actual HTML ad creative files.

## What to do

### Step 1: Load Agency Brand

Read the agency's brand.md file from `.claude/agencies/{slug}/brand.md` to extract:
- **Accent color** (for CTA buttons, highlights)
- **Font family** (for headlines and body copy -- use the Google Fonts import URL)
- **Background color** (primary background)
- **Text color** (primary and secondary)
- **Border radius** (for buttons and cards)
- **Design aesthetic** (inform overall layout feel)

If no agency is specified, use neutral defaults:
- Accent: `#2563EB` (blue)
- Font: `Inter`
- Background: `#FFFFFF`
- Text: `#111827` (primary), `#6B7280` (secondary)
- Radius: `12px`

### Step 2: Read Templates

Read both HTML templates:
- `templates/feed-4x5.html` (1080 x 1350px)
- `templates/story-9x16.html` (1080 x 1920px)

### Step 3: Generate Each Variant

For each of the 3 variants from Skill 1:

**3a. Prepare template variables:**

| Variable | Source |
|---|---|
| `{{ACCENT_COLOR}}` | Agency brand accent color |
| `{{FONT_FAMILY}}` | Agency brand font (e.g., `'DM Sans', sans-serif`) |
| `{{FONT_IMPORT}}` | Google Fonts URL for the font family |
| `{{BG_COLOR}}` | Agency brand background or creative background |
| `{{TEXT_COLOR}}` | Agency brand primary text color |
| `{{TEXT_COLOR_SECONDARY}}` | Agency brand secondary text color |
| `{{BORDER_RADIUS}}` | Agency brand border radius |
| `{{HEADLINE}}` | Variant headline (max 8 words) |
| `{{BODY_COPY}}` | Variant body copy (1-2 lines) |
| `{{CTA_TEXT}}` | Variant CTA text |
| `{{IMAGE_URL}}` | Image URL if provided, empty string if not |
| `{{IMAGE_PLACEHOLDER_TEXT}}` | Descriptive label for placeholder (e.g., "Lifestyle -- woman in morning routine") |
| `{{CLIENT_NAME}}` | Client/brand name |
| `{{VARIANT_NAME}}` | Variant display name (e.g., "Emotional Hook") |

**3b. Replace all `{{VARIABLE}}` placeholders** in both templates with the prepared values.

**3c. Write the output files:**
- `{variant-slug}-feed.html`
- `{variant-slug}-story.html`

### Step 4: Generate Gallery Index

After all variants are generated, create an `index.html` gallery page that:
- Shows all variants side by side (feed format on top row, story format below, or in a grid)
- Each creative is displayed at a scaled-down size with a link to the full-size HTML file
- Uses iframes to render the actual creative HTML inline
- Shows variant names and strategic rationale below each creative
- Agency-branded header with client name and date
- Responsive layout for easy review on desktop

**Gallery layout:**
```
[Client Name] -- Creative Mockups -- [Date]

VARIANT 1: [Name]                    VARIANT 2: [Name]                    VARIANT 3: [Name]
[4:5 iframe scaled]                  [4:5 iframe scaled]                  [4:5 iframe scaled]
[9:16 iframe scaled]                 [9:16 iframe scaled]                 [9:16 iframe scaled]
[Rationale]                          [Rationale]                          [Rationale]
```

## Output

Files written to `creatives/{client-slug}/`:
- `{variant-1-slug}-feed.html`
- `{variant-1-slug}-story.html`
- `{variant-2-slug}-feed.html`
- `{variant-2-slug}-story.html`
- `{variant-3-slug}-feed.html`
- `{variant-3-slug}-story.html`
- `index.html` (gallery page)

Total: 7 HTML files.

## Future extension point

A `skill-2b-generate-videos.md` can be added later to:
- Take the same variant briefs from Skill 1
- Generate video scripts (hook, body, CTA structure)
- Call HeyGen API for UGC-style talking head videos
- Call VO3 API for product/lifestyle video generation
- Output video files or video preview links alongside the static creatives

The variant brief format from Skill 1 is designed to support both static and video generation.

## Next step

Proceed automatically to Skill 3.
