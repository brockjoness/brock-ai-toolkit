# youtube-description

## What it is
A Claude skill that turns a timestamped video transcript into a polished YouTube description with summary, bullet points, timestamps, resource links, and a standard "Connect" footer.

## What problem it solves
Writing descriptions is tedious and easy to phone in. This skill produces consistent, well-structured descriptions that include the SEO-helpful timestamps reviewers want, the resource links you mentioned in the video, and a consistent footer.

## Maturity
`working`.

## How to run it
1. Drop `SKILL.md` into your Claude skills folder.
2. Edit the `Connect:` footer block at the bottom to point at your own social profiles (the shipped version uses Brock Jones's IG/LinkedIn).
3. Trigger Claude with "create youtube description for [video]" and paste the transcript (with `[HH:MM:SS]` markers).

No env vars needed.

## Inputs and outputs
**In:** A transcript with timestamps in `[HH:MM:SS]` format.
**Out:** A formatted description ready to copy/paste into YouTube: title, summary, bullets, links, timestamps in `M:SS` format, and the Connect footer.

## Where to extend it
- The Connect footer at the bottom of `SKILL.md` is the main thing to customize.
- Step 2's template (title, summary, bullets, links, timestamps) can be reshaped per channel.

## Known limitations
- Won't fabricate timestamps — needs them in the source transcript.
- Won't invent resource links — only references what was mentioned in the video.
- Doesn't add hashtags unless explicitly asked.
