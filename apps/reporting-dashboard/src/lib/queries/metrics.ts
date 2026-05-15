import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { MetricSummary, DailyMetric, PlatformSummary } from '@/lib/types'

export async function fetchOverviewMetrics(clientId: string, from: string, to: string): Promise<MetricSummary> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('client_metrics')
    .select('spend, revenue, impressions, clicks, conversions')
    .eq('client_id', clientId)
    .gte('date', from)
    .lte('date', to)

  if (error || !data) return { spend: 0, revenue: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0, cpa: 0, ctr: 0 }

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

export async function fetchDailyMetrics(clientId: string, from: string, to: string): Promise<DailyMetric[]> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('client_metrics')
    .select('date, spend, revenue, impressions, clicks, conversions')
    .eq('client_id', clientId)
    .gte('date', from)
    .lte('date', to)
    .order('date')

  if (error || !data) return []

  // Aggregate by date (sum across platforms/campaigns)
  const byDate = new Map<string, DailyMetric>()
  for (const row of data) {
    const existing = byDate.get(row.date) || { date: row.date, spend: 0, revenue: 0, impressions: 0, clicks: 0, conversions: 0 }
    existing.spend += Number(row.spend)
    existing.revenue += Number(row.revenue)
    existing.impressions += Number(row.impressions)
    existing.clicks += Number(row.clicks)
    existing.conversions += Number(row.conversions)
    byDate.set(row.date, existing)
  }

  return Array.from(byDate.values())
}

export async function fetchDailyMetricsByPlatform(clientId: string, from: string, to: string): Promise<{ date: string; platform: string; spend: number; revenue: number; roas: number }[]> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('client_metrics')
    .select('date, platform, spend, revenue')
    .eq('client_id', clientId)
    .gte('date', from)
    .lte('date', to)
    .order('date')

  if (error || !data) return []

  const grouped = new Map<string, { date: string; platform: string; spend: number; revenue: number }>()
  for (const row of data) {
    const key = `${row.date}-${row.platform}`
    const existing = grouped.get(key) || { date: row.date, platform: row.platform, spend: 0, revenue: 0 }
    existing.spend += Number(row.spend)
    existing.revenue += Number(row.revenue)
    grouped.set(key, existing)
  }

  return Array.from(grouped.values()).map(r => ({
    ...r,
    roas: r.spend > 0 ? r.revenue / r.spend : 0,
  }))
}

export async function fetchPlatformSummaries(clientId: string, from: string, to: string): Promise<PlatformSummary[]> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('client_metrics')
    .select('platform, spend, revenue, conversions')
    .eq('client_id', clientId)
    .gte('date', from)
    .lte('date', to)

  if (error || !data) return []

  const byPlatform = new Map<string, PlatformSummary>()
  for (const row of data) {
    const existing = byPlatform.get(row.platform) || { platform: row.platform, spend: 0, revenue: 0, conversions: 0, roas: 0 }
    existing.spend += Number(row.spend)
    existing.revenue += Number(row.revenue)
    existing.conversions += Number(row.conversions)
    byPlatform.set(row.platform, existing)
  }

  return Array.from(byPlatform.values()).map(p => ({
    ...p,
    roas: p.spend > 0 ? p.revenue / p.spend : 0,
  }))
}

export async function fetchPreviousPeriodMetrics(clientId: string, from: string, to: string): Promise<MetricSummary> {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  const diff = toDate.getTime() - fromDate.getTime()
  const prevTo = new Date(fromDate.getTime() - 1)
  const prevFrom = new Date(prevTo.getTime() - diff)

  return fetchOverviewMetrics(clientId, prevFrom.toISOString().split('T')[0], prevTo.toISOString().split('T')[0])
}
