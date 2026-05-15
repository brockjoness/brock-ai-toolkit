# Sound Like You — Brand Voice Builder

## What it is
A multi-stage prompt that walks you through recording yourself for 30+ minutes, extracts your real brand voice from the transcript, and produces a Brand Voice Document you can drop into a Claude Project to make every LinkedIn / X / carousel post actually sound like you.

## What problem it solves
AI-generated content sounds like AI because it's averaged across millions of writers. The fix isn't a better model — it's giving the model your real cadence, opinions, and edges as ground truth.

## Where to use it
Claude.ai (free tier works). You'll also need a transcription tool like Descript (free tier).

## How to run it
1. Paste PROMPT.md into a fresh Claude chat.
2. Claude asks if you have a transcript. If not, it helps you pick a topic and gives you 10-12 riffing prompts.
3. Record yourself for 30+ minutes in Descript, export transcript, paste back.
4. Claude builds your Brand Voice Document inside a fenced code block.
5. Create a Claude Project, paste the doc into instructions, and optionally upload the transcript.

## Inputs and outputs
**In:** a 30+ minute transcript of you talking with conviction on one topic.
**Out:** a structured Brand Voice Document covering vocabulary, sentence structure, rhythm, tone, worldview, references, quirks, and AI-tropes-to-avoid — with quoted evidence and writing rules.

## Known limitations
- Garbage in, garbage out. If the transcript is short or low-energy, the voice doc will be thin.
- Re-record annually as your thinking shifts. Last year's voice isn't this year's.
- The "mirror me as closely as possible" instruction can over-fit if your transcript is heavily slang-loaded — keep an eye on output.
