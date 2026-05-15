// Meta Marketing API Data Pull
// Runs daily via cron to fetch ad performance data
//
// Setup required:
// 1. Create Meta Business App at developers.facebook.com
// 2. Add System User with ads_read permission
// 3. Generate long-lived token (60-day, auto-refresh)
// 4. Grant System User access to each client's ad account
//
// API Endpoint: GET /v21.0/act_{ad_account_id}/insights
// Fields: spend, impressions, clicks, actions, action_values,
//         campaign_name, adset_name, ad_name, frequency, reach
// Breakdowns: none (daily aggregation by date_preset)
// Date range: yesterday

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface MetaInsight {
  campaign_name: string
  adset_name: string
  ad_name: string
  spend: string
  impressions: string
  clicks: string
  actions?: Array<{ action_type: string; value: string }>
  action_values?: Array<{ action_type: string; value: string }>
  frequency: string
  reach: string
  date_start: string
}

export async function pullMetaData(clientId: string, adAccountId: string, accessToken: string) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateStr = yesterday.toISOString().split('T')[0]

  const url = `https://graph.facebook.com/v21.0/act_${adAccountId}/insights`
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
    console.error(`Meta API error for client ${clientId}:`, data.error)
    return
  }

  const insights: MetaInsight[] = data.data || []

  for (const row of insights) {
    const conversions = row.actions?.find(a => a.action_type === 'purchase')?.value || '0'
    const revenue = row.action_values?.find(a => a.action_type === 'purchase')?.value || '0'

    // Upsert to unified metrics
    await supabase.from('client_metrics').upsert({
      client_id: clientId,
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
    }, {
      onConflict: 'client_id,platform,date,campaign_name,ad_group_name,ad_name'
    })

    // Also store in platform-specific table
    await supabase.from('meta_ads').upsert({
      client_id: clientId,
      date: dateStr,
      campaign_name: row.campaign_name,
      adset_name: row.adset_name,
      ad_name: row.ad_name,
      spend: parseFloat(row.spend),
      impressions: parseInt(row.impressions),
      clicks: parseInt(row.clicks),
      conversions: parseFloat(conversions),
      revenue: parseFloat(revenue),
      frequency: parseFloat(row.frequency || '0'),
      reach: parseInt(row.reach || '0'),
    })
  }

  console.log(`Pulled ${insights.length} Meta ad rows for client ${clientId}`)
}
