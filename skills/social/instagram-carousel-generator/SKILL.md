# SKILL — Instagram Carousel Generator

---

## TRIGGER

- "create carousels"
- "generate carousel for [post title]"
- "build the carousel slides"
- "create a [style-name] carousel"
- Any request referencing a carousel from a content database

---

## WHAT THIS SKILL DOES

Takes a carousel script (card-by-card text), selects a visual style, and outputs
one HTML file per card — 1080x1080px self-contained files ready to screenshot.

Supports 6 visual styles. Only `editorial-minimalism` requires photos.

---

## STEP 0 — STYLE SELECTION

Load the style registry at:
```
./instagram/styles/_registry.md
```

**If `--style` flag is provided:** load `styles/[slug].md` directly.

**If no `--style` flag:** display:
```
Which style? Choose one:
  1. editorial-minimalism — personal stories (requires photos)
  2. bold-text            — hot takes, opinions
  3. dark-tech            — tools, technical tutorials
  4. clean-infographic    — data, frameworks, step-by-steps
  5. gradient-neon        — launches, announcements
  6. whiteboard-diagram   — system flows, mental models
```
Wait for selection, then load the appropriate style file.

**Brand override (optional):**
If `--brand` flag is provided, load brand tokens from the registry and override the style's default color tokens.

---

## PHOTO LOGIC (CONDITIONAL)

**`editorial-minimalism` only:**

Photos live at:
```
./instagram-carousel-generator/
```

Inside that folder are date subfolders named `YYYY.MM.DD` (e.g. `2026.02.20`).

**Always use the most recent date folder automatically.** Sort the date folders
alphabetically descending and use the first result. Do not ask which folder
to use unless there is a tie or ambiguity.

Output files go into an `output/` subfolder inside the same date folder:
```
instagram-carousel-generator/2026.02.20/output/
```

**Photo naming convention:**
Photos must be named in card order: `1.jpg`, `2.jpg`, `3.jpg`, etc.
If photos aren't numbered, list them and ask the user to assign one per card before proceeding.

**All other styles:** Skip photo step entirely. Proceed with CSS-only backgrounds.

---

## INPUTS

Before running, collect the following. Ask in a single message if anything is missing.

**Required:**
- `STYLE` — selected in Step 0
- `CARD_SCRIPTS` — the card-by-card text for this carousel
  (paste directly, or give a page title to pull the scripts)

**Automatic (do not ask):**
- `PHOTO_FOLDER` — resolved from the most recent date folder (editorial-minimalism only)
- `OUTPUT_FOLDER` — see output path below

---

## OUTPUT SPEC

One `.html` file per card, named `card-01.html`, `card-02.html`, etc.

### Output Path
```
output/[style-slug]/[series-slug]/card-[NN].html
```
Example: `output/bold-text/meta-ads-opinions/card-01.html`

### Canvas
- Size: 1080x1080px per card
- Self-contained HTML file — no external dependencies except Google Fonts
- No JavaScript

### Chrome (all styles)
- **Top bar:** 48px, DM Sans 400, 13px, letter-spacing 0.08em, uppercase. Series name left, card count right.
- **Progress dots:** 6px diameter, 4px gap, filled = current and past cards.
- **Dark styles** (editorial-minimalism, bold-text, dark-tech, gradient-neon): white/light text chrome
- **Light styles** (clean-infographic, whiteboard-diagram): dark text chrome

### Style-Specific Layout
Follow the loaded style guide's typography, color tokens, layout patterns, overlay stacks, and card templates exactly. Each style guide contains a Quick-Start Template — use it as the HTML shell.

---

## STEP-BY-STEP WORKFLOW

### Step 1 — Style selection (Step 0 above)

### Step 2 — Photo resolution (editorial-minimalism only)
Find the most recent date folder. List the photos found and confirm the count matches the number of cards in the script.

### Step 3 — Map content to cards
Present a mapping table before generating anything:

| Card | Type | Content Preview |
| ---- | ---- | --------------- |
| 01   | Cover | The thing nobody tells you |
| 02   | Body  | Bold claim about X |
| ...  | ...   | ... |
| 07   | CTA   | Follow for more |

Ask: "Does this mapping look right?"

### Step 4 — Generate HTML files
For each card, generate a self-contained HTML file following the selected style guide:
- Use the style's Quick-Start Template as the base
- Apply the style's design tokens, typography, and layout patterns
- Include Chrome (top bar + progress dots) on every card
- Google Fonts via `<link>` tag — no other external dependencies

The file must render correctly when opened directly in Safari or Chrome by
double-clicking from Finder.

### Step 5 — Save to output folder
Save all files to the output path above.

### Step 6 — Print summary

```
Generated X cards → [path to output folder]
Style: [style name]

  card-01.html — [content preview]
  card-02.html — [content preview]
  ...

Open each in Safari, go full screen (Cmd+Shift+F),
screenshot with Cmd+Shift+4 → Space → click window.
```

---

## HARD STOPS

- If card scripts are missing — stop and ask before generating anything
- For editorial-minimalism:
  - If the photo folder doesn't exist — stop and ask the user to check the path
  - If the most recent date folder is empty — stop and ask the user to add photos
  - If fewer photos than cards — list the gap and ask how to handle

---

## QUALITY CHECKS BEFORE DELIVERING

- [ ] Text is readable on every card — overlay/contrast is doing its job
- [ ] No text is cropped or overflowing the canvas
- [ ] Cover card has strong visual weight — headline is large and confident
- [ ] CTA card closes cleanly — last line lands well
- [ ] Chrome (top bar + dots) renders on every card
- [ ] Style tokens applied correctly — fonts, colors, backgrounds match the style guide
- [ ] For editorial-minimalism: all files use relative image paths

---

## QUICK START

When invoked with "create carousels", Claude should:

1. Load the style registry
2. Ask: "Which style?" (list the 6 options)
3. If editorial-minimalism selected, find the most recent date folder and list photos
4. Ask: "Which carousel are we building? Paste the card scripts or give me the page title."
5. Execute the workflow above without further prompting
