# Proposal Generation Rules

> **Setup required:** Replace the placeholder bio, testimonials, and pricing table below with your own before using this skill. The values here are sanitized stand-ins.

## Brand-Specific "About" Section

Optional — include only for brands where the founder/CMO/strategist bio adds credibility.

| Brand | Include? | Label |
|--------|----------|-------|
| Brand A | Yes | `ABOUT THE FOUNDER` |
| Brand B | Yes | `ABOUT OUR CO-FOUNDER` |
| Brand C | No | — |
| Brand D | No | — |

## Bio (replace with your own)

**Agency:** Started and scaled an agency to $X spend under management. Acquired.
**Software:** Built and launched a consumer app, ongoing.
**Ecommerce:** Scaled a DTC brand to $X/mo, acquired.
**LinkedIn:** [https://www.linkedin.com/in/your-handle/](https://www.linkedin.com/in/your-handle/)

## Testimonials (replace with your own)

Use 6-9 in order. Insert relevant proof images between blocks of three.

1. **Jane Doe — Example Co**: "Replace this with a real testimonial from a real client with permission."
2. **John Smith — ACME Corp**: "Replace this with a real testimonial."
3. **Jamie Roe — Another Co**: "Replace this with a real testimonial."

## Pricing Structure (replace with your own)

Source: your CRM offers database (set `YOUR_NOTION_OFFERS_DB_ID` if applicable).

Example table (replace with your real pricing):

| Offer | $0-50K spend | $50K-250K | $250K-1M | $1M+ |
|---|---|---|---|---|
| **1 platform (Meta)** | $X/mo | $X/mo | $X/mo | $X/mo |
| **2 platforms (Meta+Google)** | $X/mo | $X/mo | $X/mo | $X/mo |
| **3 platforms (Meta+Google+TikTok)** | $X/mo | $X/mo | $X/mo | $X/mo |
| **Email campaigns (1/wk)** | $X/mo | — | — | — |

**Notes:**
- Management fees do NOT include ad spend (paid separately to platforms)
- Content creation billed separately — always note in proposals
- Always ask for client's actual monthly ad spend — never guess

## "Our Approach" Layout

2x2 grid (not 3+1): Performance Marketing | Creative Strategy & Production | Data & Attribution | Lifecycle & Retention

## Templates

- Light theme (e.g. `Brand A`): `template-clickflow.html` with pricing card markup (`.pricing-card`, `.pricing-card.featured`, `.pricing-tier`, `.pricing-label`, `.pricing-price`, `.pricing-price-sub`, `.pricing-features`, `.pricing-btn`)
- Dark theme (default): `template.html` (dark, code-inspired) with CSS variable theming

## Post-Generation

Search your CRM by Company Name → update **Proposal** property with the live URL.
