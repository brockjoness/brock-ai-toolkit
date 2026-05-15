# Strategy Pipeline

## What it is
A workflow-only skill that describes how a brand's strategy gets developed across the onboarding period: positioning, audience, creative angles, offer, channel mix, and measurement. It is a thinking framework rendered as a runnable skill — Claude works through each layer in order and produces a strategy document.

## What problem it solves
Most agencies do "strategy" as a one-off deck that never gets revisited. This skill makes strategy a structured, layered output that can be regenerated when something changes (new product, new budget, new performance signal). It also forces the assistant to connect each layer back to the data already gathered in pre-onboarding.

## Maturity
`working`

## How to run it
Trigger with "Run strategy pipeline for [Client]." It expects you to have already run the pre-onboarding skill (competitor research + audits + roadmap) so it has data to reason against. No external API keys are strictly required beyond your CRM connection.

## Inputs and outputs
**In:** A client with completed pre-onboarding deliverables, the client's CRM context (services, budget, notes), and any kickoff call transcript.
**Out:** A multi-section strategy document (markdown) covering positioning, audience, offer, creative, channels, and measurement.

## Where to extend it
- Reorder or add strategy layers: edit `workflow.md`.
- Change the output format (e.g., produce slides instead of markdown): replace the final assembly step.

## Known limitations
- This is a single-file workflow with no sub-skills yet — heavy reliance on the LLM to follow the structure.
- No mechanism to "version" strategy as it evolves; each run overwrites the prior output.
- Assumes the brand has at least some clarity on positioning; works less well for true zero-to-one launches.
