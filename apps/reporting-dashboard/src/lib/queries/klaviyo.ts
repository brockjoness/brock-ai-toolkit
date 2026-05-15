import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { KlaviyoFlow } from '@/lib/types'

export async function fetchFlowPerformance(clientId: string, from: string, to: string): Promise<KlaviyoFlow[]> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('klaviyo_metrics')
    .select('name, type, sent, delivered, opened, clicked, conversions, revenue')
    .eq('client_id', clientId)
    .gte('date', from)
    .lte('date', to)

  if (error || !data) return []

  const byFlow = new Map<string, KlaviyoFlow>()
  for (const row of data) {
    const existing = byFlow.get(row.name) || {
      name: row.name, type: row.type || 'flow',
      sent: 0, delivered: 0, opened: 0, clicked: 0, revenue: 0,
      open_rate: 0, click_rate: 0,
    }
    existing.sent += Number(row.sent)
    existing.delivered += Number(row.delivered)
    existing.opened += Number(row.opened)
    existing.clicked += Number(row.clicked)
    existing.revenue += Number(row.revenue)
    byFlow.set(row.name, existing)
  }

  return Array.from(byFlow.values()).map(flow => ({
    ...flow,
    open_rate: flow.sent > 0 ? (flow.opened / flow.sent) * 100 : 0,
    click_rate: flow.sent > 0 ? (flow.clicked / flow.sent) * 100 : 0,
  })).sort((a, b) => b.revenue - a.revenue)
}
