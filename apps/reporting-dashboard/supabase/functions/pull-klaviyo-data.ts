// Klaviyo API Data Pull
// Runs daily via cron
//
// Setup required:
// 1. Get private API key from client's Klaviyo account
// 2. Store per-client in Supabase clients table
//
// Endpoints:
// GET /api/flows — list all flows with stats
// GET /api/campaigns — list campaigns with performance
// GET /api/metrics — revenue attribution

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const KLAVIYO_BASE = 'https://a.klaviyo.com/api'

interface KlaviyoFlowMessage {
  id: string
  attributes: {
    name: string
    statistics: {
      sent: number
      delivered: number
      opened: number
      clicked: number
      conversions: number
      revenue: number
      unsubscribed: number
      bounced: number
    }
  }
}

async function fetchKlaviyoFlows(apiKey: string) {
  const response = await fetch(`${KLAVIYO_BASE}/flows/?page[size]=50`, {
    headers: {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': '2024-02-15',
      'Accept': 'application/json',
    },
  })
  return response.json()
}

async function fetchKlaviyoCampaigns(apiKey: string) {
  const response = await fetch(`${KLAVIYO_BASE}/campaigns/?filter=equals(messages.channel,'email')&page[size]=50`, {
    headers: {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': '2024-02-15',
      'Accept': 'application/json',
    },
  })
  return response.json()
}

export async function pullKlaviyoData(clientId: string, apiKey: string) {
  const today = new Date().toISOString().split('T')[0]

  // Pull flows
  const flowsData = await fetchKlaviyoFlows(apiKey)
  const flows: KlaviyoFlowMessage[] = flowsData.data || []

  for (const flow of flows) {
    const stats = flow.attributes.statistics
    if (!stats) continue

    await supabase.from('klaviyo_metrics').upsert({
      client_id: clientId,
      date: today,
      type: 'flow',
      name: flow.attributes.name,
      sent: stats.sent || 0,
      delivered: stats.delivered || 0,
      opened: stats.opened || 0,
      clicked: stats.clicked || 0,
      conversions: stats.conversions || 0,
      revenue: stats.revenue || 0,
      unsubscribed: stats.unsubscribed || 0,
      bounced: stats.bounced || 0,
    })
  }

  // Pull campaigns
  const campaignsData = await fetchKlaviyoCampaigns(apiKey)
  const campaigns = campaignsData.data || []

  for (const campaign of campaigns) {
    const stats = campaign.attributes?.statistics
    if (!stats) continue

    await supabase.from('klaviyo_metrics').upsert({
      client_id: clientId,
      date: today,
      type: 'campaign',
      name: campaign.attributes.name,
      sent: stats.sent || 0,
      delivered: stats.delivered || 0,
      opened: stats.opened || 0,
      clicked: stats.clicked || 0,
      conversions: stats.conversions || 0,
      revenue: stats.revenue || 0,
      unsubscribed: stats.unsubscribed || 0,
      bounced: stats.bounced || 0,
    })

    // Also push revenue to unified metrics
    if (stats.revenue > 0) {
      await supabase.from('client_metrics').upsert({
        client_id: clientId,
        platform: 'klaviyo',
        date: today,
        campaign_name: campaign.attributes.name,
        revenue: stats.revenue || 0,
        conversions: stats.conversions || 0,
      }, {
        onConflict: 'client_id,platform,date,campaign_name,ad_group_name,ad_name'
      })
    }
  }

  console.log(`Pulled ${flows.length} flows and ${campaigns.length} campaigns from Klaviyo for client ${clientId}`)
}
