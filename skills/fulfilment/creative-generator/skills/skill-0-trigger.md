# SKILL 0: Workflow Trigger & Entry Point

## When to activate

Start the creative generation workflow automatically when **any** of the following occur:

1. The user explicitly requests creative generation: "generate creatives", "make ads", "create ad mockups", "build creatives", "make me some ads"
2. A completed meta audit's creative deep dive output (Skill 4) is available in the conversation and the user asks to turn recommendations into creatives
3. The user provides a manual creative brief with product/service details, target audience, and messaging direction
4. The user provides an image or image URL and asks for ad creatives to be built around it

## What to do

1. **Identify the input source**:
   - **Audit output**: Look for the creative deep dive output (winner/loser tables, creative patterns, copy mining) from a completed meta audit in the conversation
   - **Manual brief**: The user provides product details, audience, messaging, and creative direction directly
   - **Mixed**: The user provides some elements manually and references audit findings

2. **Identify the agency context**:
   - Check if agency/client context was loaded by the router (brand.md, context.md)
   - If available, note the agency slug for brand.md lookup in Skill 2
   - If no agency context, ask the user which agency brand to use or default to neutral styling

3. **Identify the client**:
   - Pull client name from the routing context, audit output, or ask the user
   - This is needed for file naming and deployment

4. **Check for images**:
   - Did the user provide image URLs or upload images?
   - If yes, store for use in Skill 2
   - If no, creatives will use styled placeholder boxes

5. **Proceed to Skill 1** immediately -- do not wait for further instructions

## Re-entry logic

If the user provides **additional inputs** after creative generation has started (e.g., new images, revised copy, different angle requests):

- Determine which variants are affected
- Re-run Skill 1 (brief intake) with updated inputs
- Re-generate affected creatives in Skill 2
- State clearly: "Updated [variant name] with new [input type]."

If the user asks for **more variants** beyond the initial 3:
- Run Skill 1 for the additional variants only
- Generate and add to the existing output directory
- Update the gallery index page

## Next step

Proceed automatically to Skill 1.
