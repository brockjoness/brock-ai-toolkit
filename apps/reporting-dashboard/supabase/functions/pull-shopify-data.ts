// Shopify API Data Pull
// Runs daily via cron
//
// Setup required:
// 1. Create custom app in client's Shopify admin
// 2. Scopes: read_orders, read_analytics, read_customers
// 3. Store access token per-client in Supabase
//
// Endpoints:
// GET /admin/api/2024-01/orders.json — orders with financial data
// Calculate: order count, gross revenue, refunds, AOV, new vs returning

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface ShopifyOrder {
  id: number
  created_at: string
  total_price: string
  subtotal_price: string
  total_discounts: string
  refunds: Array<{
    transactions: Array<{ amount: string }>
  }>
  customer: {
    orders_count: number
  }
}

export async function pullShopifyData(clientId: string, shopifyStore: string, accessToken: string) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateStr = yesterday.toISOString().split('T')[0]
  const sinceDate = `${dateStr}T00:00:00-00:00`
  const untilDate = `${dateStr}T23:59:59-00:00`

  let allOrders: ShopifyOrder[] = []
  let pageUrl: string | null = `https://${shopifyStore}.myshopify.com/admin/api/2024-01/orders.json?status=any&created_at_min=${sinceDate}&created_at_max=${untilDate}&limit=250`

  // Paginate through all orders
  while (pageUrl) {
    const response = await fetch(pageUrl, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    allOrders = allOrders.concat(data.orders || [])

    // Check for next page via Link header
    const linkHeader = response.headers.get('Link')
    const nextMatch = linkHeader?.match(/<([^>]+)>;\s*rel="next"/)
    pageUrl = nextMatch ? nextMatch[1] : null
  }

  // Calculate metrics
  const orderCount = allOrders.length
  const grossRevenue = allOrders.reduce((sum, o) => sum + parseFloat(o.total_price), 0)
  const netRevenue = allOrders.reduce((sum, o) => sum + parseFloat(o.subtotal_price), 0)
  const refunds = allOrders.reduce((sum, o) => {
    return sum + (o.refunds || []).reduce((rSum, r) => {
      return rSum + r.transactions.reduce((tSum, t) => tSum + parseFloat(t.amount), 0)
    }, 0)
  }, 0)
  const averageOrderValue = orderCount > 0 ? grossRevenue / orderCount : 0
  const newCustomers = allOrders.filter(o => o.customer?.orders_count === 1).length
  const returningCustomers = allOrders.filter(o => o.customer?.orders_count > 1).length

  // Upsert Shopify metrics
  await supabase.from('shopify_metrics').upsert({
    client_id: clientId,
    date: dateStr,
    order_count: orderCount,
    gross_revenue: grossRevenue,
    net_revenue: netRevenue,
    refunds,
    average_order_value: averageOrderValue,
    new_customers: newCustomers,
    returning_customers: returningCustomers,
  })

  // Also push to unified metrics
  await supabase.from('client_metrics').upsert({
    client_id: clientId,
    platform: 'shopify',
    date: dateStr,
    revenue: grossRevenue,
    conversions: orderCount,
  }, {
    onConflict: 'client_id,platform,date,campaign_name,ad_group_name,ad_name'
  })

  console.log(`Pulled ${orderCount} Shopify orders for client ${clientId} on ${dateStr}`)
}
