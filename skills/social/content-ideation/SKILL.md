---
name: content-ideation
description: Generate weekly content calendar with YouTube, Instagram, and newsletter ideas based on the user's actual Claude skills and reference creator styles. Pushes ideas to Notion.
allowed-tools: Bash, Read, Glob, Grep, WebSearch, WebFetch, mcp__notion__notion-search, mcp__notion__notion-fetch, mcp__notion__notion-create-pages
---

# SKILL — Content Ideation Engine

---

## TRIGGER

- "generate content ideas"
- "what should I post this week"
- "content calendar"
- "youtube ideas"
- "ig content plan"
- "newsletter ideas"
- Automatic daily trigger via scheduled job (optional, set up your own)

---

## WHAT THIS SKILL DOES

Generates a 7-day content calendar across YouTube, Instagram, and email newsletter. Every YouTube idea is grounded in a real Claude skill from the user's workspace. Instagram gets both YouTube-derived content (Reels + Carousels) and standalone personal/lifestyle posts. Newsletter angles include lead magnets.

Viral potential is the priority. Revisiting popular topics with a fresh angle is encouraged — novelty is not required.

---

## CONTENT WORKFLOW

This is the production pipeline each piece of content follows:

```
YouTube Video (8-15 min)
  ├── IG Reel (60-90 sec, same concept)
  ├── IG Carousel (5-8 cards, same concept)
  └── Email Newsletter (automation tip + lead magnet link)
```

---

## INPUTS

Before running, collect the following. Ask in a single message if anything is missing.

**Required:**
- `WEEK_START` — defaults to next Monday. Can specify "this week" or a date.

**Optional (improves output):**
- `FOCUS_DEPARTMENT` — narrows the skill inventory to one department
- `PERSONAL_MOMENTS` — personal life things happening that week for IG personal content
- `TRENDING_TOPICS` — any AI/automation news to ride
- `CUSTOM_IDEAS` — any specific ideas already in mind

---

## REFERENCE FILES TO LOAD

Before generating, read these files (paths are placeholders — point at your own):

```
./skill-inventory.md            — the content mine
./creator-references/youtube/   — YouTube creator profiles
./creator-references/instagram/ — Instagram creator profiles
./style-guide.md                — carousel design system
```

---

## STEP-BY-STEP WORKFLOW

### Step 1 — Load References

Read the skill inventory and all creator reference profiles. Internalize the title patterns, hook structures, and content styles before generating ideas.

### Step 2 — Check Notion for Context

Use `notion-search` to query your Social content database for recent entries. Seeing what topics have been covered recently helps suggest fresh angles, but repeating high-performing topics is encouraged.

**Data source ID:** `YOUR_NOTION_DB_ID`

### Step 3 — Select 2-3 YouTube Topics

Pick skills from the inventory that have strong YouTube angles. Selection criteria (in priority order):

1. **Viral potential** — would this make someone stop scrolling?
2. **Visual demo potential** — can you show the thing on screen?
3. **Lead magnet potential** — is there a template, checklist, or workflow to give away?
4. **Cross-skill stories** — angles that span multiple skills tell a bigger story

For each topic, generate title options in two styles:
- **Practical, outcome-focused:** "I Built an AI That [Does X] in [Y Time]"
- **Bold, framework-based:** "The [Framework Name] That [Outcome]"

### Step 4 — Generate YouTube Content Briefs

For each selected topic, output:

```
### [VIDEO TITLE]

**Skill(s):** [skill-name]
**Style:** [practical | bold | hybrid]
**Estimated length:** [8-15 min]

**Title options:**
1. [Practical-style title]
2. [Bold-style title]
3. [Hybrid/custom title]

**Thumbnail concept:**
[One sentence describing the thumbnail. Include: expression, key visual element, any text overlay, style preset]

**Hook (first 30 seconds):**
[Script for the opening — what keeps them watching. Lead with the outcome.]

**Key talking points:**
1. [Point with reference to specific skill file]
2. [Point with data/example]
3. [Point showing the build process]
4. [Point with before/after comparison]
5. [Point with takeaway the viewer can apply]

**B-roll / screen recording notes:**
- [What to capture from the workspace]
- [What to show on screen during the demo]

**Lead magnet idea:**
[A template, checklist, or workflow viewers can access for free. Include: what it is, CTA format ("Comment 'KEYWORD' to get..." or "Link in description")]
```

### Step 5 — Generate IG Adaptations

For each YouTube video, create:

**Reel concept:**
```
**IG Reel: [Short title]**
Hook (first 3 sec): [The scroll-stopping opener]
Point 1: [Key insight, 15 sec]
Point 2: [The demo/proof, 15 sec]
Point 3: [The result, 15 sec]
CTA: [What to comment/do, 10 sec]
Total: ~60 sec
Caption: [2-3 lines + CTA + hashtags]
```

**Carousel concept:**
```
**IG Carousel: [Series name]**
Cards: [5-8]
Card 1 (Cover): [Hook headline]
Card 2: [First point/tool]
...
Card N (CTA): [Closing + CTA]
```

Format carousel scripts as the instagram-carousel-generator skill expects (card-by-card text with headline + body per card).

### Step 6 — Generate Standalone IG Ideas

2-3 additional posts per week that are NOT YouTube derivatives:

- **1 personal/lifestyle post**
- **1-2 quick-hit posts:** behind-the-scenes of the workspace, single automation demo, "day in the life" with Claude

For personal content, use `PERSONAL_MOMENTS` input if provided. If not, suggest filmable prompts.

### Step 7 — Generate Newsletter Angles

For each YouTube video, produce:

```
**Newsletter: [Topic]**

Subject line options:
1. [Option A — curiosity-driven]
2. [Option B — benefit-driven]

Lead paragraph:
[2-3 sentences tying the video topic to a practical tip]

Lead magnet:
[What it is + link placeholder + access instructions]

CTA:
[Primary: watch the full video. Secondary: grab the template]
```

### Step 8 — Output the Calendar

Present everything as a 7-day table:

```
| Day | Platform | Type | Title/Concept | Source | Lead Magnet |
|-----|----------|------|---------------|--------|-------------|
| Mon | YouTube  | Video | "I Built an AI That..." | inventory | Template |
...
```

### Step 9 — Push to Notion

Use `notion-create-pages` to create entries in your Social database.

**Field mapping (example — adapt to your schema):**

| Notion Field | Value |
|---|---|
| `Idea` | Video/post title |
| `Platform` | `["YouTube"]`, `["Instagram"]`, or both |
| `Type` | `Talking head`, `Carousel`, or `Voice Overlay` |
| `Posted?` | `false` |
| `date` | Suggested publish date |
| `Inspo` | Link to reference creator content (if applicable) |

The full brief goes in the page body as markdown.

---

## HARD STOPS

- If `skill-inventory.md` does not exist — stop and instruct the user to populate it first
- If creator reference profiles are missing — stop and flag which ones
- If the Notion Social database is not accessible — output the calendar to conversation only, skip the Notion push
- Never invent skills that don't exist in the workspace
- Never output a YouTube idea without a thumbnail concept

---

## QUALITY CHECKS BEFORE DELIVERING

- [ ] Every YouTube title has a clear value proposition
- [ ] Every YouTube idea references at least one real skill from `skill-inventory.md`
- [ ] Every thumbnail concept is describable in one sentence
- [ ] Carousel scripts are in the format the carousel-generator expects
- [ ] Newsletter angles include a concrete lead magnet idea
- [ ] The week has variety across topics
- [ ] Personal IG content appears at least 2x per week
- [ ] Every Reel hook would make someone stop scrolling in the first 3 seconds
- [ ] CTAs are specific, never vague

---

## COMPANION SKILLS

| Skill | How It Connects |
|---|---|
| `instagram-carousel-generator` | Takes carousel scripts from Step 5 and generates HTML card files |
| `youtube-thumbnails` | Takes thumbnail concepts from Step 4 and generates thumbnail images |

---

## QUICK START

When invoked with "generate content ideas":

1. Load `skill-inventory.md` and all creator reference profiles
2. Check Notion Social database for recent context
3. Ask: "Any specific focus this week? (department, personal moments, trending topics) Or should I go full auto?"
4. Generate the full calendar and briefs
5. Push to Notion
6. Print summary with the calendar table
