// Google Ads API Data Pull
// Runs daily via cron
//
// Setup required:
// 1. Apply for Google Ads API access (developer token)
// 2. Create OAuth2 credentials in Google Cloud Console
// 3. Generate refresh token via OAuth2 flow
// 4. Get customer IDs for each client's Google Ads account
//
// Uses Google Ads Query Language (GAQL):
// SELECT campaign.name, ad_group.name, metrics.cost_micros, metrics.impressions,
//        metrics.clicks, metrics.conversions, metrics.conversions_value
// FROM ad_group_ad
// WHERE segments.date = 'YYYY-MM-DD'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface GoogleAdRow {
  campaign: { name: string; id: string }
  adGroup: { name: string; id: string }
  metrics: {
    costMicros: string
    impressions: string
    clicks: string
    conversions: number
    conversionsValue: number
  }
  segments: { date: string }
}

async function getAccessToken(): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  })
  const data = await response.json()
  return data.access_token
}

export async function pullGoogleData(clientId: string, customerId: string) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateStr = yesterday.toISOString().split('T')[0]

  const accessToken = await getAccessToken()

  const query = `
    SELECT
      campaign.name, campaign.id,
      ad_group.name, ad_group.id,
      metrics.cost_micros, metrics.impressions, metrics.clicks,
      metrics.conversions, metrics.conversions_value,
      segments.date
    FROM ad_group
    WHERE segments.date = '${dateStr}'
  `

  const response = await fetch(
    `https://googleads.googleapis.com/v17/customers/${customerId}/googleAds:searchStream`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }
  )

  const data = await response.json()
  const rows: GoogleAdRow[] = data[0]?.results || []

  for (const row of rows) {
    const spend = parseInt(row.metrics.costMicros) / 1_000_000

    // Upsert to unified metrics
    await supabase.from('client_metrics').upsert({
      client_id: clientId,
      platform: 'google',
      date: dateStr,
      campaign_name: row.campaign.name,
      ad_group_name: row.adGroup.name,
      spend,
      impressions: parseInt(row.metrics.impressions),
      clicks: parseInt(row.metrics.clicks),
      conversions: row.metrics.conversions,
      revenue: row.metrics.conversionsValue,
    }, {
      onConflict: 'client_id,platform,date,campaign_name,ad_group_name,ad_name'
    })

    // Also store in platform-specific table
    await supabase.from('google_ads').upsert({
      client_id: clientId,
      date: dateStr,
      campaign_id: row.campaign.id,
      campaign_name: row.campaign.name,
      ad_group_id: row.adGroup.id,
      ad_group_name: row.adGroup.name,
      spend,
      impressions: parseInt(row.metrics.impressions),
      clicks: parseInt(row.metrics.clicks),
      conversions: row.metrics.conversions,
      revenue: row.metrics.conversionsValue,
    })
  }

  console.log(`Pulled ${rows.length} Google Ads rows for client ${clientId}`)
}
