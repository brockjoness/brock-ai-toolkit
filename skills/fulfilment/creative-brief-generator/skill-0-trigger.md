# SKILL 0: Parse & Validate Input

## What to do

### Step 1: Identify the brand

Extract brand/company name from the user's command or from upstream skill context.

If not identifiable, ask:
> "Which brand/client is this creative brief for?"

### Step 2: Load client context

If the brand is in the CRM (`YOUR_NOTION_CRM_COLLECTION_ID`):
- Fetch CRM page for brand voice, best sellers, services, website
- Load client context file from `agencies/{agency}/clients/{slug}/context.md` if it exists

### Step 3: Detect vertical

Determine the brand's vertical from:
1. Client context file (if it specifies vertical)
2. CRM "Objective" field (D2C, Lead Gen, SaaS)
3. Website/product analysis
4. Brock's input

Map to template:
| Vertical | Template File |
|---|---|
| Beauty, Skincare, Cosmetics | `templates/beauty-skincare.md` |
| Health, Wellness, Supplements, Fitness | `templates/health-wellness.md` |
| Apparel, Fashion, Accessories | `templates/apparel-fashion.md` |
| Food, Beverage, CPG | `templates/food-beverage.md` |
| Events, Entertainment, Ticketing | `templates/events-entertainment.md` |
| Other / General D2C | No template — use general best practices |

### Step 4: Collect input sources

Gather all available input data:

**From upstream skills (if in pipeline):**
- Check for `COMPETITOR_RESEARCH_OUTPUT` — look for Section 7 "Creative Brief Input Summary"
- Check for `META_AUDIT_OUTPUT` — look for creative deep dive / action plan sections
- Check for `GOOGLE_AUDIT_OUTPUT` — look for ad copy patterns

**From conversation:**
- Check if Brock provided manual direction (product, angle, audience, goals)

**From client context:**
- Best sellers, brand voice, competitor list, goals

At least ONE input source must be present. If none:
> "I need input to generate a creative brief. Options:
> 1. Run competitor research first (`competitor research for [Brand]`)
> 2. Provide manual direction (product, target audience, key angles, goals)
> 3. Point me to an existing audit output"

### Step 5: Determine campaign parameters

Extract or infer:
- **Campaign objective:** Awareness / Consideration / Conversion (default: Conversion for D2C)
- **Target platforms:** Meta Feed + Stories (default), plus Google Display, TikTok if client has those services
- **Budget context:** From CRM monthly spend field (affects creative volume recommendations)

### Step 6: Assemble BRIEF_CONTEXT

Package all inputs into structured context for Skill 1.

### Step 7: Confirm scope

> "Generating creative brief for **{Brand}** ({Vertical}). Sources: {research / audit / manual}. Platforms: {Meta, Google, etc.}."

## Next step

Proceed to Skill 1: Generate Creative Brief.
