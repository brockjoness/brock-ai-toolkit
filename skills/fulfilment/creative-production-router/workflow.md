# Creative Production Router -- Workflow

Routing skill that takes a creative brief and determines the optimal production method, then routes to the correct tool or generates production instructions.

## Trigger

Activated by:
- "Produce creatives for [Client]" | "Make these ads"
- "Route this brief to production"
- Chained from creative-brief-generator when production is requested
- Chained from creative-iterator after iteration briefs are approved

## Production Methods

| Method | What It Produces | When to Use | Tool/Process |
|---|---|---|---|
| **HTML Static** | 4:5 feed + 9:16 story mockups | Default for static ad concepts | Existing `creative-generator` skill |
| **AI UGC (HeyGen)** | AI-generated spokesperson video | UGC-style brief, no real creator available | HeyGen -- generate production instructions |
| **AI Video (Veo 3)** | AI-generated product/lifestyle video | Video brief, no existing footage | Veo 3 -- generate production instructions |
| **Human Content Direction** | Shot list + creative direction doc | High-production brief, real shoot needed | Generate creative direction document |

## Routing Logic

### Step 1: Analyze the brief

Read the creative brief and determine:
- **Format requirements:** Static only? Video? UGC? Mixed?
- **Asset availability:** Does the client have product images? Video footage? UGC creators?
- **Budget signals:** High-production (shoot needed) vs. rapid-production (AI/HTML)?
- **Platform targets:** Meta feed/story? TikTok? YouTube? Google Display?

### Step 2: Determine production method per variant

For each variant in the brief, assign a production method:

| Brief Signal | Route To |
|---|---|
| Static ad, product-focused, promotional | **HTML Static** (creative-generator) |
| Static ad, lifestyle/brand, text overlay | **HTML Static** (creative-generator) |
| "UGC-style", "creator", "testimonial video" | **AI UGC** (HeyGen instructions) |
| "Product demo", "motion", "animation" | **AI Video** (Veo 3 instructions) |
| "Photoshoot", "lifestyle shoot", "high-production" | **Human Content Direction** |
| "Carousel" | **HTML Static** (creative-generator, multiple frames) |

If the brief doesn't specify format, default to **HTML Static** for speed.

### Step 3: Route to HTML Static (creative-generator)

If method = HTML Static:
1. Load creative-generator skill from `3-fulfilment/skills/creative-generator/`
2. Pass the brief with:
   - Hook angles -> variant concepts
   - Visual direction -> design instructions
   - Copy variants -> headline/body/CTA text
   - Platform notes -> format-specific adaptations
3. Creative-generator produces 4:5 + 9:16 HTML files and deploys to Vercel

### Step 4: Generate AI UGC instructions (HeyGen)

If method = AI UGC:

Produce a structured HeyGen production brief:

```
--- HEYGEN PRODUCTION BRIEF ---

Variant: {variant name}
Client: {client name}
Platform: {target platform}

AVATAR SELECTION:
  Type: {professional / casual / creator-style}
  Demographics: {age range, gender, ethnicity preferences}
  Setting: {background description -- e.g., "clean home office", "kitchen counter"}

SCRIPT:
  Hook (0-3s): "{exact opening line -- must stop scroll}"
  Body (3-15s): "{main message -- benefit + proof}"
  CTA (15-20s): "{closing line with call to action}"

  Total duration: {15-30 seconds}
  Tone: {conversational / authoritative / excited / calm}

VISUAL NOTES:
  - {Camera angle preference}
  - {Product placement instructions if applicable}
  - {Text overlay instructions for key points}

MUSIC/AUDIO:
  - {Background music style or "none"}
  - {Captions: yes/no}
```

### Step 5: Generate AI Video instructions (Veo 3)

If method = AI Video:

Produce a structured Veo 3 prompt brief:

```
--- VEO 3 PRODUCTION BRIEF ---

Variant: {variant name}
Client: {client name}

PROMPT:
  "{Detailed video generation prompt -- describe the scene, action, product, lighting, style, duration}"

STYLE REFERENCES:
  - {Visual style: "cinematic", "product photography in motion", "lifestyle b-roll"}
  - {Color palette: match brand colors}
  - {Aspect ratio: 4:5 for feed, 9:16 for story/reel}

POST-PRODUCTION:
  - Text overlay: "{headline text to add in post}"
  - Logo placement: {top-left / bottom-right / end card}
  - CTA card: "{CTA text}" at {timestamp}

DURATION: {5-15 seconds}
```

### Step 6: Generate Human Content Direction

If method = Human Content Direction:

Produce a creative direction document:

```
--- CREATIVE DIRECTION BRIEF ---

Variant: {variant name}
Client: {client name}
Production type: {photo shoot / video shoot / UGC creator}

CONCEPT:
  {2-3 sentence description of the creative concept}

SHOT LIST:
  1. {Shot description -- angle, framing, action, product placement}
  2. {Shot description}
  3. {Shot description}
  [...]

TALENT:
  - Type: {model / real customer / brand founder / UGC creator}
  - Demographics: {preferences}
  - Wardrobe: {guidance}

LOCATION:
  - Setting: {studio / on-location / home}
  - Vibe: {description}

PROPS:
  - {Required props list}

POST-PRODUCTION:
  - Text overlays: {yes/no, content}
  - Color grading: {warm / cool / natural / brand-matched}
  - Music: {style, licensed or original}

DELIVERABLES:
  - {X} final cuts at {aspect ratios}
  - Raw footage for future iterations
```

### Step 7: Present routing summary

```
--- PRODUCTION ROUTING ---

Brief: {brief name} for {Client Name}

Variant 1: {name} -> {method} {status: ready / instructions generated}
Variant 2: {name} -> {method} {status}
Variant 3: {name} -> {method} {status}

HTML Static variants: routed to creative-generator ({X} variants)
AI UGC briefs: {X} HeyGen production briefs generated
AI Video briefs: {X} Veo 3 production briefs generated
Human direction: {X} creative direction docs generated

Options:
  a) Proceed with HTML production (deploy to Vercel)
  b) Review AI production briefs before external tools
  c) Export all production briefs as documents
```

## Error Handling

- If brief is ambiguous about format: default to HTML Static, note recommendation for video/UGC testing
- If creative-generator fails: present the HTML static brief as design specifications for manual production
- If client has no brand assets: note in production briefs, use placeholder approach
