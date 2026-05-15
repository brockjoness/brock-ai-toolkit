import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { ShopifyOverview } from '@/lib/types'

export async function fetchShopifyOverview(clientId: string, from: string, to: string): Promise<ShopifyOverview> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('shopify_metrics')
    .select('order_count, gross_revenue, net_revenue, refunds, average_order_value, new_customers, returning_customers')
    .eq('client_id', clientId)
    .gte('date', from)
    .lte('date', to)

  if (error || !data || data.length === 0) {
    return { order_count: 0, gross_revenue: 0, net_revenue: 0, refunds: 0, average_order_value: 0, new_customers: 0, returning_customers: 0, conversion_rate: 0 }
  }

  const totals = data.reduce((acc, row) => ({
    order_count: acc.order_count + Number(row.order_count),
    gross_revenue: acc.gross_revenue + Number(row.gross_revenue),
    net_revenue: acc.net_revenue + Number(row.net_revenue),
    refunds: acc.refunds + Number(row.refunds),
    new_customers: acc.new_customers + Number(row.new_customers),
    returning_customers: acc.returning_customers + Number(row.returning_customers),
  }), { order_count: 0, gross_revenue: 0, net_revenue: 0, refunds: 0, new_customers: 0, returning_customers: 0 })

  return {
    ...totals,
    average_order_value: totals.order_count > 0 ? totals.gross_revenue / totals.order_count : 0,
    conversion_rate: 0, // needs session data from Shopify
  }
}
