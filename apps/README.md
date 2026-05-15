# Apps

Three deployable web projects. Unlike the skills under `../skills/`, these are full applications you can clone, install, and run.

| App | Stack | Maturity | What it is |
|---|---|---|---|
| [ad-generator](./ad-generator) | Next.js 15 + Anthropic/Gemini/Fal SDKs | experimental | A fresh scaffold for an AI-driven Meta/Google ad creative generator. The SDKs are bundled and configured; the pipeline isn't wired yet. Useful as a starting point. |
| [reporting-dashboard](./reporting-dashboard) | Next.js + Supabase | working | Client reporting portal with admin and client roles. Connects to Meta, Google, Shopify, Klaviyo. Edge functions for data sync. The most complete app in the repo. |
| [hit-rate-calculator](./hit-rate-calculator) | Static HTML | working | Single-page lead-magnet calculator that estimates ad creative production needs. Embed-friendly, no build step. |

Each app has its own README with install / run / deploy instructions and its own `.env.example`.

## Why these three

They show three different maturity points: an idea I scaffolded but haven't built yet (ad-generator), a working application that real clients sit behind (reporting-dashboard), and a tiny static lead magnet that does one thing well (hit-rate-calculator). The shape of "AI tooling for a service business" is rarely one big app — it's usually a constellation of small things at varying maturity. These three are the constellation.
