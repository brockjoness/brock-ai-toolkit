---
name: youtube-description
description: Generate YouTube video descriptions from transcripts with timestamps, key points, links, and a standard Connect footer.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# SKILL — YouTube Description Generator

---

## TRIGGER

- "create youtube description for [video]"
- "generate description from transcript"
- "write a YT description"
- Any request to create a YouTube video description from a transcript

---

## WHAT THIS SKILL DOES

Takes a video transcript (with timestamps) and generates a polished YouTube description including: summary, key bullet points, corrected timestamps, download/resource links, and the standard Connect footer.

---

## STEP-BY-STEP WORKFLOW

### Step 1 — Parse Transcript

Read the provided transcript. Extract:
- Core topic and value proposition
- Key sections/phases with their `[HH:MM:SS]` timestamps
- Any links, tools, or resources mentioned
- CTAs or lead magnets mentioned

### Step 2 — Write Description

Structure:

```
**[Title — bold, benefit-driven, includes the core method/tool]**

[2-3 sentence summary of what the video covers and the outcome]

[Bullet list of what's included/covered — 4-8 items]

[Resource/download links if mentioned]

—

TIMESTAMPS
[Corrected timestamps from transcript markers]

—

Connect:
https://www.instagram.com/brockmjones/
https://www.linkedin.com/in/brockmjones/
```

### Step 3 — Timestamp Rules

- Use `M:SS` format (e.g. `0:00`, `1:30`, `4:15`) — no leading zeros on minutes
- Derive timestamps from the `[HH:MM:SS]` markers in the transcript
- Each timestamp gets a short `— Description` suffix
- Aim for 8-14 timestamp entries covering all major sections

### Step 4 — Present

Output the full description ready to copy-paste into YouTube.

---

## CONNECT FOOTER

**Always append this footer to every YouTube description, separated by a `—` divider.**

The shipped footer is Brock Jones's — replace with your own profiles:

```
Connect:
https://www.instagram.com/brockmjones/
https://www.linkedin.com/in/brockmjones/
```

Every description ends with this block.

---

## HARD STOPS

- Never fabricate timestamps — only use markers from the transcript
- Never invent links or resources not mentioned in the video
- Never add hashtags unless explicitly asked

---

## COMPANION SKILLS

| Skill | How It Connects |
|---|---|
| `content-ideation` | Provides video topics and briefs |
| `youtube-thumbnails` | Generates the thumbnail for the same video |
