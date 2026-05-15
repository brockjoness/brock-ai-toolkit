---
name: proposal-generator
description: Generate custom, branded proposals for prospects after sales calls. Supports multi-brand theming, handles typed summaries or pasted transcripts, includes pricing and next steps, deploys to public Vercel URL.
---

## When to Trigger

This skill activates when a proposal is requested for a prospect. Common patterns:
- "Generate a proposal for [Client Name]"
- "Create a proposal for [Client]"
- "Proposal for [Client] from [Brand]"
- "Make a proposal for the call I just had with [Client]"
- "[Brand] proposal for [Client]"

## What This Skill Does

1. Identifies which brand is sending the proposal (each defined in `./brands/{slug}/brand.md`)
2. Gathers call context (typed summary or pasted transcript)
3. Fetches client data from a CRM if available
4. Generates an HTML proposal with:
   - Brand-specific theming (colors, fonts, logo)
   - Personalized "What We Discussed" section
   - Pricing tiers (2-3 options based on budget)
   - Split next steps (deliverables vs. requirements)
   - Relevant testimonials
   - The sender's bio
5. Deploys to Vercel and returns a public URL

## Required Information

- **Client name** (required)
- **Brand** (which of your brands is sending) — if not specified, ask
- **Call context** (typed notes or pasted transcript) — if not provided, ask
- **Pricing discussed** (optional, but recommended)
- **Client website/domain** (optional, for logo fetching)
