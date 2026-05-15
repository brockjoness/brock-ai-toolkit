# SKILL 3: Deploy & Preview

## When to use

After Skill 2 has generated all HTML creative files and the gallery index page.

## What to do

### Step 1: Verify Output Directory

Confirm all expected files exist in `creatives/{client-slug}/`:
- 6 creative HTML files (3 variants x 2 formats)
- 1 gallery index.html
- Total: 7 files

### Step 2: Deploy to Vercel

Run:
```bash
cd "creatives/{client-slug}" && npx vercel --yes
```

If Vercel is not authenticated, prompt Brock to run `npx vercel login` first.

### Step 3: Return Results

Provide Brock with:

```
Creatives generated successfully

Agency: [Agency Name]
Client: [Client Name]
Variants: 3

Files:
1. [Variant 1 Name] -- feed + story
2. [Variant 2 Name] -- feed + story
3. [Variant 3 Name] -- feed + story

Gallery URL: [Vercel URL]
Local path: creatives/{client-slug}/

Variant Summary:
- Variant 1 "[Name]": [1-sentence strategic rationale]
- Variant 2 "[Name]": [1-sentence strategic rationale]
- Variant 3 "[Name]": [1-sentence strategic rationale]
```

### Step 4: Offer Next Actions

After presenting results, offer:
- "Want me to adjust any variant's copy, angle, or image direction?"
- "Want me to generate additional variants?"
- "Want me to swap in real product images?" (if placeholders were used)
- "Ready to brief these to the creative team?"

## Error Handling

- **Vercel not installed**: Prompt Brock to run `npm i -g vercel`
- **Vercel auth required**: Prompt Brock to run `vercel login`
- **Template not found**: Alert that template files are missing from `templates/`
- **No agency brand found**: Fall back to neutral defaults and note in the output
- **Deployment fails**: Keep local files and provide the local path for manual review
