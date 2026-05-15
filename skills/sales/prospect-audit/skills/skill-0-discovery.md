# SKILL 0: Discovery & Context

## When to use

Always first. Triggered when the prospect audit workflow begins.

## What to do

### Step 1: Parse the input

Extract the email address or domain from the user's command.

If an email is provided:
- Extract the domain: `brock@clickflow.dev` -> `clickflow.dev`
- Store the email as `email`

If a bare domain is provided:
- Use it directly

### Step 2: Validate the domain

**Check 1 -- Personal email provider:**

If the domain matches any of these, **STOP**:
`gmail.com, yahoo.com, hotmail.com, outlook.com, icloud.com, aol.com, protonmail.com, me.com, live.com, msn.com, mail.com`

Report: "This email uses a personal provider ({domain}). The prospect audit requires a company email."

**Check 2 -- Live website:**

Fetch `https://{domain}`. If it doesn't resolve (timeout, DNS failure, non-200 response), **STOP**.

Report: "The domain {domain} does not resolve to a live website. Cannot proceed."

### Step 3: Scrape the website

From the fetched HTML, extract:

**Company name:**
- Parse the `<title>` tag
- Split on `|`, `-`, `--`, `:` and take the first segment
- Remove "Home", "Welcome to", leading/trailing whitespace
- Store as `company_name`

**Social links -- scan the page HTML for:**
- Facebook page URL (`facebook.com/...` in footer, header, or social sections)
- Instagram URL (`instagram.com/...`)
- TikTok URL (`tiktok.com/...`)

If not found in the initial page, try `/contact` and `/about`.

Store as `facebook_page_url`, `instagram_url`, `tiktok_url`.

### Step 4: Construct Meta Ads Library URL

If a Facebook page URL was found:

1. Extract the page name or ID
2. Search for the Facebook page to find the page ID
3. Construct the Ad Library URL:
   ```
   https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&is_targeted_country=false&media_type=all&search_type=page&sort_data[mode]=total_impressions&sort_data[direction]=desc&source=page-transparency-widget&view_all_page_id={PAGE_ID}
   ```

If no Facebook page URL was found:
- Try web searching: `{company_name} facebook page`
- Try: `site:facebook.com {company_name}`
- If still not found: **STOP**

Store the URL as `meta_ads_library_url`.

### Step 5: Fetch client logo

Try Clearbit:
```
https://logo.clearbit.com/{domain}
```

If valid, generate:
```html
<img src="https://logo.clearbit.com/{domain}" alt="{company_name}" style="height: 40px; width: auto;">
```

Else generate text fallback:
```html
<span style="font-weight: 600; font-size: 20px; letter-spacing: -0.02em;">{company_name}</span>
```

Store as `logo_html`.

### Step 6: Find a product page

Scan the website for a product page URL. Look for nav links: "shop", "products", "collections", "store". Follow the first link and find an individual product page. Store as `product_page_url`.

### Step 7: Generate prospect slug

Convert company name to kebab-case ("Acme Coffee" -> `acme-coffee`). Store as `prospect_slug`.

### Step 8: Check for Notion submission (optional)

If an email was provided, search the Website Submissions database (`collection://YOUR_NOTION_DATA_SOURCE_ID`) for a matching entry. Extract `ad_spend` if available.

### Step 9: Assemble PROSPECT_CONTEXT

```
PROSPECT_CONTEXT:
  domain: {domain}
  company_name: {company_name}
  prospect_slug: {prospect_slug}
  website_url: https://{domain}
  facebook_page_url: {facebook_page_url or "not found"}
  meta_ads_library_url: {meta_ads_library_url}
  instagram_url: {instagram_url or "not found"}
  tiktok_url: {tiktok_url or "not found"}
  product_page_url: {product_page_url or "not found"}
  logo_html: {logo_html}
  ad_spend: {ad_spend or "unknown"}
  email: {email or "not provided"}
```

### Step 10: Confirm scope

> "Prospect audit for **{company_name}** ({domain}). Found: Facebook page [yes/no], Meta Ads Library [yes/no], Instagram [yes/no], product page [yes/no]. Proceeding."

## Next step

Proceed to Skill 1.
