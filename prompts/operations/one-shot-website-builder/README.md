# One-Shot Website Builder

## What it is
A prompt that builds a complete, single-file HTML website from a one-paragraph business description — responsive, animated, with a working contact form and SEO tags. Output is one HTML file you can preview in any browser.

## What problem it solves
Most "AI websites" look obviously AI-generated: centered everything, purple-blue gradients, generic copy. This prompt enforces a design discipline that produces something a human designer would ship.

## Where to use it
Claude.ai (paste-and-go, output is a live-preview artifact) or Claude Code (writes files + can deploy to Vercel with one command).

## How to run it
1. Paste PROMPT.md into a new Claude chat.
2. Describe your business: name, offering, audience, vibe.
3. Optionally pick a theme from the 10 listed.
4. Claude generates the complete HTML in one artifact.
5. Copy the code, save as `index.html`, open in a browser.

## Inputs and outputs
**In:** business description, target audience, primary site goal, optional theme.
**Out:** one self-contained HTML file with all CSS/JS inline, working mobile menu, animations, contact form, SEO meta.

## Known limitations
- Single page only. For multi-page sites use Claude Code.
- Contact form needs a real backend (Formspree or Vercel serverless) before it sends real emails.
- Images are CSS art / SVG by default — no real photography.
