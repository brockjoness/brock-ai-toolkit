# SKILL 2: Stripe Invoice (Auto-Send)

## When to use

After Skill 1 (contract) and the review checkpoint. Brock has approved the contract and pricing.

## Prerequisites

- Stripe API key stored as `STRIPE_API_KEY` in `your project's .env file (see .env.example)`
- Client email and deal value in ONBOARDING_CONTEXT

## What to do

### Step 1: Validate required fields

Check ONBOARDING_CONTEXT has:
- `email`
- `company_name`
- `deal_value` (monthly amount in dollars)
- `services` (for invoice description)
- `days_until_due` (from billing terms mapping)

If any are missing: hard stop for this client. Report the missing fields.

### Step 2: Load Stripe API key

```bash
source your project's .env file (see .env.example)
```

Verify `$STRIPE_API_KEY` is set. If not: hard stop. Report "Stripe API key not configured at your project's .env file (see .env.example)."

### Step 3: Search for existing Stripe customer

```bash
curl -s "https://api.stripe.com/v1/customers/search" \
  -u "$STRIPE_API_KEY:" \
  -G \
  --data-urlencode "query=email:'{email}'"
```

If a customer exists: use the existing `customer_id`.
If no customer found: proceed to Step 4.

### Step 4: Create Stripe customer (if needed)

```bash
curl -s -X POST "https://api.stripe.com/v1/customers" \
  -u "$STRIPE_API_KEY:" \
  -d "email={email}" \
  -d "name={company_name}" \
  -d "metadata[agency]={agency_slug}" \
  -d "metadata[source]=client-onboarding-workflow"
```

Extract `customer_id` from the response.

### Step 5: Create invoice item

Convert `deal_value` to cents (multiply by 100).

Format the services array into a description string, e.g.:
- "Monthly Management - Meta Ads, Google Ads, Email Campaigns"

```bash
curl -s -X POST "https://api.stripe.com/v1/invoiceitems" \
  -u "$STRIPE_API_KEY:" \
  -d "customer={customer_id}" \
  -d "amount={deal_value_in_cents}" \
  -d "currency=usd" \
  -d "description=Monthly Management - {services list}"
```

### Step 6: Create the invoice

```bash
curl -s -X POST "https://api.stripe.com/v1/invoices" \
  -u "$STRIPE_API_KEY:" \
  -d "customer={customer_id}" \
  -d "collection_method=send_invoice" \
  -d "days_until_due={days_until_due}" \
  -d "auto_advance=true" \
  -d "metadata[agency]={agency_slug}" \
  -d "metadata[client]={company_name}"
```

Extract `invoice_id` from the response.

### Step 7: Finalize the invoice

```bash
curl -s -X POST "https://api.stripe.com/v1/invoices/{invoice_id}/finalize" \
  -u "$STRIPE_API_KEY:"
```

### Step 8: Send the invoice

```bash
curl -s -X POST "https://api.stripe.com/v1/invoices/{invoice_id}/send" \
  -u "$STRIPE_API_KEY:"
```

### Step 9: Store invoice details

Extract from the API responses:
- `invoice_id`
- `invoice_number`
- `invoice_url` (the Stripe hosted invoice page URL)
- `amount_due` (formatted as dollars for reporting)

Add all to ONBOARDING_CONTEXT.

### Step 10: Report

> "Invoice **#{invoice_number}** sent to **{email}**.
> Amount: **${deal_value}** | Due: **{days_until_due} days** ({billing_terms}).
> Invoice URL: {invoice_url}"

## Error handling

- Stripe API key not found: hard stop. Report "Stripe API key not configured."
- Customer search fails: attempt to create a new customer anyway.
- Customer creation fails: hard stop for this client. Report the API error.
- Invoice item creation fails: hard stop. Report the error.
- Invoice creation fails: hard stop. Report the error with manual fallback: "Create invoice manually in Stripe Dashboard for {email}, ${deal_value}."
- Finalize fails: hard stop. The invoice exists but is in draft state. Report for manual finalization.
- Send fails: note the failure. The invoice is finalized but not sent. Report: "Invoice finalized but send failed. Send manually from Stripe Dashboard."

## Next step

Proceed to Skill 3: Onboarding Email.
