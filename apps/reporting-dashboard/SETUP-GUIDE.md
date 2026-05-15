# ClickFlow Dashboard — Step-by-Step Setup Guide

This guide walks through every step to go from the scaffold to a live, data-connected dashboard at `app.clickflow.dev`.

---

## Phase 1: Supabase Setup (30 min)

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up / log in
2. Click **New Project**
3. Settings:
   - **Name:** `clickflow-dashboard`
   - **Database Password:** Generate a strong password and save it to `your project .env file (see .env.example)`
   - **Region:** Pick the closest to your clients (e.g., `us-east-1`)
   - **Plan:** Free tier is fine to start (500MB database, 50k monthly active users)
4. Wait ~2 minutes for the project to provision

### Step 2: Get Your Supabase Keys

1. In your Supabase project, go to **Settings → API**
2. Copy these three values:
   - **Project URL** (looks like `https://abc123.supabase.co`)
   - **anon / public key** (safe for frontend)
   - **service_role key** (secret — only for server-side / cron jobs)
3. Add them to your credentials:

```bash
# Add to your project .env file (see .env.example)
export SUPABASE_URL="https://your-project.supabase.co"
export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### Step 3: Run the Database Schema

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Open the file `dashboard/supabase/schema.sql` from your local project
4. Paste the entire contents into the SQL editor
5. Click **Run** — this creates all 6 tables, indexes, and RLS policies
6. Verify: go to **Table Editor** — you should see: `clients`, `client_metrics`, `meta_ads`, `google_ads`, `klaviyo_metrics`, `shopify_metrics`

### Step 4: Configure Auth

1. In Supabase, go to **Authentication → Providers**
2. Make sure **Email** is enabled (it is by default)
3. Go to **Authentication → URL Configuration**
4. Set:
   - **Site URL:** `http://localhost:3000` (change to `https://app.clickflow.dev` after deploy)
   - **Redirect URLs:** Add both `http://localhost:3000/auth/callback` and `https://app.clickflow.dev/auth/callback`
5. Optional: Go to **Authentication → Email Templates** to customize the magic link email with ClickFlow branding

### Step 5: Add Your First Client

1. Go to **Table Editor → clients**
2. Click **Insert Row**
3. Fill in:
   - `name`: `Example Client` (or your first client)
   - `slug`: `example-client`
   - `agency_slug`: `clickflow`
   - `monthly_budget`: `30000`
   - `roas_target`: `3.0`
   - `status`: `active`
4. Leave the API fields blank for now (we'll fill those in Phase 3)

---

## Phase 2: Run the Dashboard Locally (15 min)

### Step 6: Configure Environment Variables

```bash
cd ./apps/reporting-dashboard

# Copy the example env file
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your Supabase keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 7: Install Dependencies and Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` — you should see the ClickFlow login page.

### Step 8: Create an Auth Callback Route

Create the file `src/app/auth/callback/route.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
```

### Step 9: Test the Auth Flow

1. Go to `http://localhost:3000/login`
2. Enter your email
3. Check your email for the magic link
4. Click it — you should land on `/dashboard`

---

## Phase 3: Connect Platform APIs (1-2 weeks)

Do these one at a time. Start with Meta since it's your primary spend channel.

### Step 10: Meta Marketing API

**Time: 1-2 hours for setup, instant approval**

1. **Create a Meta Business App**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Click **My Apps → Create App**
   - Choose **Business** type
   - Name it: `ClickFlow Dashboard`
   - Select your Business Manager

2. **Add Marketing API product**
   - In your app, click **Add Product**
   - Find **Marketing API** and click **Set Up**

3. **Create a System User**
   - Go to [business.facebook.com](https://business.facebook.com) → **Business Settings**
   - Navigate to **Users → System Users**
   - Click **Add** → name it `clickflow-dashboard` → set role to **Admin**
   - Click **Add Assets** → select the client's **Ad Account** → toggle **Manage campaigns** ON

4. **Generate a Long-Lived Token**
   - On the System User page, click **Generate New Token**
   - Select your app (`ClickFlow Dashboard`)
   - Check these permissions: `ads_read`, `ads_management`, `read_insights`
   - Click **Generate Token** — copy and save it

5. **Store the credentials**

```bash
# Add to your project .env file (see .env.example)
export META_ACCESS_TOKEN="your-system-user-token"
```

6. **Update the client record in Supabase**
   - Go to **Table Editor → clients**
   - Edit your client row
   - Set `meta_account_id` to the Ad Account ID (just the number, no `act_` prefix)

7. **Test the API**

```bash
# Quick test — should return campaign data
curl "https://graph.facebook.com/v21.0/act_YOUR_AD_ACCOUNT_ID/insights?fields=spend,impressions,clicks&date_preset=yesterday&access_token=YOUR_TOKEN"
```

If you get JSON data back with spend/impressions/clicks, you're connected.

### Step 11: Google Ads API

**Time: 2-3 hours for setup, 1-3 days for developer token approval**

1. **Apply for API access**
   - Go to [Google Ads API Center](https://ads.google.com/home/tools/api-center/)
   - Log in with the Google account that manages your clients' ads
   - Apply for a **Developer Token** — describe your use case as "internal reporting dashboard"
   - Note: approval takes 1-3 business days

2. **Create OAuth2 credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project: `clickflow-dashboard`
   - Enable the **Google Ads API**
   - Go to **APIs & Services → Credentials**
   - Click **Create Credentials → OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URI: `http://localhost:3000/auth/google/callback`
   - Save the **Client ID** and **Client Secret**

3. **Generate a Refresh Token**
   - Use the [OAuth Playground](https://developers.google.com/oauthplayground)
   - Or run this flow locally:

```bash
# Step 1: Get authorization code (opens browser)
open "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/auth/google/callback&response_type=code&scope=https://www.googleapis.com/auth/adwords&access_type=offline&prompt=consent"

# Step 2: Exchange code for refresh token
curl -X POST https://oauth2.googleapis.com/token \
  -d "code=AUTH_CODE_FROM_URL" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=http://localhost:3000/auth/google/callback" \
  -d "grant_type=authorization_code"
```

4. **Store credentials**

```bash
# Add to your project .env file (see .env.example)
export GOOGLE_ADS_DEVELOPER_TOKEN="your-developer-token"
export GOOGLE_ADS_CLIENT_ID="your-client-id"
export GOOGLE_ADS_CLIENT_SECRET="your-client-secret"
export GOOGLE_ADS_REFRESH_TOKEN="your-refresh-token"
```

5. **Update client in Supabase** — set `google_customer_id` to the client's Google Ads Customer ID (format: `123-456-7890`, stored without dashes)

### Step 12: Klaviyo API

**Time: 15 minutes, no approval needed**

1. **Get the API key**
   - Log into the client's Klaviyo account (or ask them to)
   - Go to **Settings → API Keys**
   - Click **Create Private API Key**
   - Name: `ClickFlow Dashboard`
   - Scopes: `Read` on Flows, Campaigns, Metrics, Profiles, Lists
   - Copy the private key

2. **Store it per-client in Supabase**
   - Go to **Table Editor → clients**
   - Edit the client row
   - Set `klaviyo_api_key` to the private key

3. **Test**

```bash
curl -X GET "https://a.klaviyo.com/api/flows" \
  -H "Authorization: Klaviyo-API-Key YOUR_PRIVATE_KEY" \
  -H "revision: 2024-10-15"
```

### Step 13: Shopify API

**Time: 20 minutes, no approval needed**

1. **Create a Custom App**
   - Log into the client's Shopify admin (or ask them)
   - Go to **Settings → Apps and sales channels → Develop apps**
   - Click **Create an app** → name: `ClickFlow Dashboard`
   - Click **Configure Admin API scopes**
   - Enable: `read_orders`, `read_analytics`, `read_customers`, `read_products`
   - Click **Save** → **Install app**
   - Copy the **Admin API access token** (shown once — save immediately)

2. **Store per-client**
   - In Supabase → clients → edit row
   - Set `shopify_store` to the store domain (e.g., `example-client.myshopify.com`)
   - Store the access token in a secure way (you may want to add a `shopify_access_token` column)

3. **Test**

```bash
curl -X GET "https://example-client.myshopify.com/admin/api/2024-10/orders.json?limit=5" \
  -H "X-Shopify-Access-Token: YOUR_TOKEN"
```

---

## Phase 4: Build the Data Pull Functions (1-2 days)

### Step 14: Set Up Supabase Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
cd dashboard
supabase link --project-ref your-project-ref
```

### Step 15: Create the Meta Data Pull Function

```bash
supabase functions new pull-meta-data
```

Edit `supabase/functions/pull-meta-data/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Get all active clients with Meta account IDs
  const { data: clients } = await supabase
    .from('clients')
    .select('id, meta_account_id')
    .not('meta_account_id', 'is', null)
    .eq('status', 'active')

  const accessToken = Deno.env.get('META_ACCESS_TOKEN')!
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateStr = yesterday.toISOString().split('T')[0]

  for (const client of clients || []) {
    try {
      const url = `https://graph.facebook.com/v21.0/act_${client.meta_account_id}/insights`
      const params = new URLSearchParams({
        fields: 'campaign_name,adset_name,ad_name,spend,impressions,clicks,actions,action_values,frequency,reach',
        time_range: JSON.stringify({ since: dateStr, until: dateStr }),
        level: 'ad',
        limit: '500',
        access_token: accessToken,
      })

      const response = await fetch(`${url}?${params}`)
      const data = await response.json()

      if (data.error) {
        console.error(`Meta error for ${client.id}:`, data.error.message)
        continue
      }

      for (const row of data.data || []) {
        const conversions = row.actions?.find((a: any) => a.action_type === 'purchase')?.value || '0'
        const revenue = row.action_values?.find((a: any) => a.action_type === 'purchase')?.value || '0'

        await supabase.from('client_metrics').upsert({
          client_id: client.id,
          platform: 'meta',
          date: dateStr,
          campaign_name: row.campaign_name,
          ad_group_name: row.adset_name,
          ad_name: row.ad_name,
          spend: parseFloat(row.spend),
          impressions: parseInt(row.impressions),
          clicks: parseInt(row.clicks),
          conversions: parseFloat(conversions),
          revenue: parseFloat(revenue),
        }, { onConflict: 'client_id,platform,date,campaign_name,ad_group_name,ad_name' })
      }

      console.log(`Pulled ${data.data?.length || 0} rows for client ${client.id}`)
    } catch (e) {
      console.error(`Failed for client ${client.id}:`, e)
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

### Step 16: Deploy and Schedule the Function

```bash
# Deploy
supabase functions deploy pull-meta-data

# Set secrets
supabase secrets set META_ACCESS_TOKEN=your-token

# Test it
supabase functions invoke pull-meta-data
```

**Set up the daily cron:**
1. In Supabase, go to **Database → Extensions** and enable `pg_cron`
2. Go to **SQL Editor** and run:

```sql
-- Pull Meta data every day at 6am UTC
SELECT cron.schedule(
  'pull-meta-data-daily',
  '0 6 * * *',
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/pull-meta-data',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    )
  );
  $$
);
```

### Step 17: Repeat for Google, Klaviyo, Shopify

Follow the same pattern for each platform:
1. `supabase functions new pull-google-data`
2. Adapt the template from `supabase/functions/pull-google-data.ts`
3. Deploy and schedule

The templates in your `supabase/functions/` directory have the API endpoints and field mappings for each platform.

---

## Phase 5: Build the Dashboard Pages (2-3 days)

### Step 18: Create the Data Fetching Layer

Create `src/lib/queries.ts` — reusable queries for the dashboard:

```typescript
import { SupabaseClient } from '@supabase/supabase-js'

export async function getClientMetricsSummary(
  supabase: SupabaseClient,
  clientId: string,
  startDate: string,
  endDate: string
) {
  const { data } = await supabase
    .from('client_metrics')
    .select('platform, spend, revenue, impressions, clicks, conversions')
    .eq('client_id', clientId)
    .gte('date', startDate)
    .lte('date', endDate)

  if (!data) return null

  const totals = data.reduce((acc, row) => ({
    spend: acc.spend + Number(row.spend),
    revenue: acc.revenue + Number(row.revenue),
    impressions: acc.impressions + Number(row.impressions),
    clicks: acc.clicks + Number(row.clicks),
    conversions: acc.conversions + Number(row.conversions),
  }), { spend: 0, revenue: 0, impressions: 0, clicks: 0, conversions: 0 })

  return {
    ...totals,
    roas: totals.spend > 0 ? totals.revenue / totals.spend : 0,
    cpa: totals.conversions > 0 ? totals.spend / totals.conversions : 0,
    ctr: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
  }
}

export async function getDailyMetrics(
  supabase: SupabaseClient,
  clientId: string,
  startDate: string,
  endDate: string
) {
  const { data } = await supabase
    .rpc('get_daily_metrics', {
      p_client_id: clientId,
      p_start_date: startDate,
      p_end_date: endDate,
    })

  return data
}

export async function getTopCampaigns(
  supabase: SupabaseClient,
  clientId: string,
  startDate: string,
  endDate: string,
  limit = 10
) {
  const { data } = await supabase
    .from('client_metrics')
    .select('platform, campaign_name, spend, revenue, impressions, clicks, conversions')
    .eq('client_id', clientId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('revenue', { ascending: false })
    .limit(limit)

  return data
}
```

### Step 19: Add the Daily Metrics SQL Function

Run this in Supabase SQL Editor:

```sql
CREATE OR REPLACE FUNCTION get_daily_metrics(
  p_client_id UUID,
  p_start_date DATE,
  p_end_date DATE
)
RETURNS TABLE (
  date DATE,
  platform TEXT,
  total_spend NUMERIC,
  total_revenue NUMERIC,
  total_impressions BIGINT,
  total_clicks BIGINT,
  total_conversions NUMERIC
) AS $$
  SELECT
    cm.date,
    cm.platform,
    SUM(cm.spend) as total_spend,
    SUM(cm.revenue) as total_revenue,
    SUM(cm.impressions) as total_impressions,
    SUM(cm.clicks) as total_clicks,
    SUM(cm.conversions) as total_conversions
  FROM client_metrics cm
  WHERE cm.client_id = p_client_id
    AND cm.date BETWEEN p_start_date AND p_end_date
  GROUP BY cm.date, cm.platform
  ORDER BY cm.date;
$$ LANGUAGE SQL SECURITY DEFINER;
```

### Step 20: Wire Up the Dashboard Page

Replace `src/app/dashboard/page.tsx` with real data queries. The mockup HTML (`dashboard/mockup.html`) is your design reference — replicate the layout using React components + Recharts for charts + the data from your queries.

Key components to build:
1. `MetricCard` — the summary cards at top (already scaffolded)
2. `RevenueChart` — Revenue vs Spend line chart (use Recharts `<LineChart>`)
3. `BudgetPacing` — pacing bars with projected spend
4. `RoasChart` — ROAS by platform with target line
5. `CampaignTable` — top campaigns with sparklines
6. `KlaviyoFlows` — flow performance table
7. `ShopifySummary` — the 6-metric grid

Each component fetches its own data from Supabase using the queries in `queries.ts`.

---

## Phase 6: Deploy to Vercel (15 min)

### Step 21: Deploy

```bash
cd dashboard

# Install Vercel CLI if needed
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No, create new
# - Project name: clickflow-dashboard
# - Framework: Next.js (auto-detected)
# - Build settings: defaults are fine
```

### Step 22: Set Environment Variables on Vercel

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

Or go to your Vercel project → **Settings → Environment Variables** and add them there.

### Step 23: Set Up Custom Domain

1. In Vercel → **Settings → Domains**
2. Add `app.clickflow.dev`
3. Vercel will give you DNS records to add
4. Go to your DNS provider (wherever clickflow.dev is managed)
5. Add the CNAME record: `app.clickflow.dev` → `cname.vercel-dns.com`
6. Wait for DNS propagation (~5 min)

### Step 24: Update Supabase Auth URLs

1. Go to Supabase → **Authentication → URL Configuration**
2. Update **Site URL** to `https://app.clickflow.dev`
3. Add `https://app.clickflow.dev/auth/callback` to **Redirect URLs**

---

## Phase 7: Onboard Clients (per client, 15 min each)

### Step 25: For Each New Client

1. **Add to Supabase `clients` table:**
   - name, slug, agency_slug, monthly_budget, roas_target

2. **Get their platform credentials:**
   - Meta: Add their Ad Account to your System User's assets
   - Google: Get their Customer ID, ensure your MCC has access
   - Klaviyo: Get their private API key
   - Shopify: Install the custom app on their store

3. **Update the client row** with account IDs / API keys

4. **Create their auth account:**
   - In Supabase → **Authentication → Users → Add User**
   - Enter the client's email
   - They'll get a magic link to set up access

5. **Set up RLS mapping:**
   - Link the auth user ID to the client ID (you may want a `client_users` junction table for multi-user access)

6. **Verify data is flowing:**
   - Manually invoke the pull functions or wait for the daily cron
   - Check the `client_metrics` table for rows with that client ID

---

## Summary: What Runs Where

| Component | Service | Cost |
|-----------|---------|------|
| Dashboard app | Vercel (Hobby or Pro) | Free / $20/mo |
| Database + Auth | Supabase (Free or Pro) | Free / $25/mo |
| Data pull crons | Supabase Edge Functions | Included |
| Meta data | Meta Marketing API | Free |
| Google data | Google Ads API | Free |
| Klaviyo data | Klaviyo API | Free |
| Shopify data | Shopify Admin API | Free |
| Domain | clickflow.dev (existing) | — |

**Total cost to start: $0/mo** (free tiers). Scale to ~$45/mo when you need more capacity.

---

## Troubleshooting

**Meta token expired?**
System User tokens last 60 days. Set a calendar reminder to regenerate. Or implement token refresh in the pull function.

**Google Ads API not approved yet?**
You can still build everything else. Use CSV uploads with your existing `weekly-report-generator` skill in the meantime. Swap to API when approved.

**No data showing in dashboard?**
1. Check `client_metrics` table in Supabase — are there rows?
2. Check Edge Function logs: Supabase → **Edge Functions → Logs**
3. Verify the client_id in the data matches the authenticated user's client

**RLS blocking queries?**
For development, you can temporarily use the `service_role` key (bypasses RLS). But switch to proper RLS policies before giving clients access.
