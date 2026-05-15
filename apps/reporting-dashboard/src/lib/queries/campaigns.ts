import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Campaign } from '@/lib/types'

export async function fetchTopCampaigns(clientId: string, from: string, to: string, limit = 10): Promise<Campaign[]> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('client_metrics')
    .select('platform, campaign_name, date, spend, revenue, impressions, clicks, conversions')
    .eq('client_id', clientId)
    .gte('date', from)
    .lte('date', to)
    .not('campaign_name', 'is', null)

  if (error || !data) return []

  // Aggregate by campaign
  const byCampaign = new Map<string, { platform: string; spend: number; revenue: number; impressions: number; clicks: number; conversions: number; dailySpend: Map<string, number> }>()

  for (const row of data) {
    const key = `${row.platform}:${row.campaign_name}`
    const existing = byCampaign.get(key) || {
      platform: row.platform,
      spend: 0, revenue: 0, impressions: 0, clicks: 0, conversions: 0,
      dailySpend: new Map<string, number>(),
    }
    existing.spend += Number(row.spend)
    existing.revenue += Number(row.revenue)
    existing.impressions += Number(row.impressions)
    existing.clicks += Number(row.clicks)
    existing.conversions += Number(row.conversions)
    existing.dailySpend.set(row.date, (existing.dailySpend.get(row.date) || 0) + Number(row.spend))
    byCampaign.set(key, existing)
  }

  const campaigns: Campaign[] = Array.from(byCampaign.entries()).map(([key, data]) => {
    const campaignName = key.split(':').slice(1).join(':')
    const roas = data.spend > 0 ? data.revenue / data.spend : 0
    const cpa = data.conversions > 0 ? data.spend / data.conversions : 0

    // Get last 7 days of spend for sparkline
    const sortedDates = Array.from(data.dailySpend.entries()).sort(([a], [b]) => a.localeCompare(b))
    const trend = sortedDates.slice(-7).map(([, v]) => v)

    // Determine status based on trend
    let status: Campaign['status'] = 'active'
    if (trend.length >= 3) {
      const recent = trend.slice(-3).reduce((a, b) => a + b, 0) / 3
      const earlier = trend.slice(0, Math.min(3, trend.length)).reduce((a, b) => a + b, 0) / Math.min(3, trend.length)
      if (earlier > 0) {
        const change = (recent - earlier) / earlier
        if (change > 0.15 && roas > 3) status = 'scaling'
        else if (Math.abs(change) < 0.1) status = 'stable'
        else if (change < -0.15) status = 'declining'
        else if (roas < 2) status = 'monitor'
      }
    }

    return {
      campaign_name: campaignName,
      platform: data.platform,
      spend: data.spend,
      revenue: data.revenue,
      impressions: data.impressions,
      clicks: data.clicks,
      conversions: data.conversions,
      roas,
      cpa,
      trend,
      status,
    }
  })

  // Sort by revenue descending, take top N
  return campaigns.sort((a, b) => b.revenue - a.revenue).slice(0, limit)
}
