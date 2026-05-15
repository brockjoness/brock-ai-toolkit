// Generates realistic e-commerce advertising demo data for 30 days

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function weekendDip(dayOfWeek: number): number {
  if (dayOfWeek === 0 || dayOfWeek === 6) return 0.7 + Math.random() * 0.1
  return 1
}

export function generateMetricsData(clientId: string) {
  const rows: Array<{
    client_id: string
    platform: string
    date: string
    spend: number
    revenue: number
    impressions: number
    clicks: number
    conversions: number
    campaign_name: string
  }> = []

  const today = new Date()
  const metaCampaigns = [
    'Prospecting - Broad',
    'Prospecting - Lookalike',
    'Retargeting - Website Visitors',
    'ASC - Top Products',
  ]
  const googleCampaigns = [
    'Search - Brand',
    'Search - Non-Brand',
    'PMax - Shopping',
  ]

  for (let d = 29; d >= 0; d--) {
    const date = new Date(today)
    date.setDate(date.getDate() - d)
    const dateStr = date.toISOString().split('T')[0]
    const dow = date.getDay()
    const wkMod = weekendDip(dow)

    for (const campaign of metaCampaigns) {
      const baseSpend = campaign.includes('Prospecting') ? rand(180, 280) : campaign.includes('Retargeting') ? rand(80, 140) : rand(120, 200)
      const spend = +(baseSpend * wkMod * rand(0.85, 1.15)).toFixed(2)
      const roas = campaign.includes('Retargeting') ? rand(4, 6) : campaign.includes('ASC') ? rand(3.5, 5) : rand(2.5, 4)
      const revenue = +(spend * roas).toFixed(2)
      const cpm = rand(12, 22)
      const impressions = Math.round((spend / cpm) * 1000)
      const ctr = rand(1.2, 2.8) / 100
      const clicks = Math.round(impressions * ctr)
      const convRate = rand(2, 5) / 100
      const conversions = +(clicks * convRate).toFixed(1)

      rows.push({ client_id: clientId, platform: 'meta', date: dateStr, spend, revenue, impressions, clicks, conversions, campaign_name: campaign })
    }

    for (const campaign of googleCampaigns) {
      const baseSpend = campaign.includes('Brand') ? rand(40, 80) : campaign.includes('Non-Brand') ? rand(80, 150) : rand(60, 120)
      const spend = +(baseSpend * wkMod * rand(0.85, 1.15)).toFixed(2)
      const roas = campaign.includes('Brand') ? rand(6, 10) : campaign.includes('PMax') ? rand(3, 5) : rand(2, 3.5)
      const revenue = +(spend * roas).toFixed(2)
      const impressions = Math.round(rand(2000, 8000) * wkMod)
      const ctr = rand(3, 8) / 100
      const clicks = Math.round(impressions * ctr)
      const conversions = +(clicks * rand(2, 6) / 100).toFixed(1)

      rows.push({ client_id: clientId, platform: 'google', date: dateStr, spend, revenue, impressions, clicks, conversions, campaign_name: campaign })
    }
  }

  return rows
}

export function generateKlaviyoData(clientId: string) {
  const flows = [
    { name: 'Welcome Series', type: 'flow' as const, baseSent: 800, openRate: 0.45, clickRate: 0.08, convRate: 0.04, revPerConv: 85 },
    { name: 'Abandoned Cart', type: 'flow' as const, baseSent: 1200, openRate: 0.42, clickRate: 0.06, convRate: 0.05, revPerConv: 120 },
    { name: 'Post Purchase', type: 'flow' as const, baseSent: 600, openRate: 0.38, clickRate: 0.05, convRate: 0.03, revPerConv: 95 },
    { name: 'Browse Abandon', type: 'flow' as const, baseSent: 900, openRate: 0.28, clickRate: 0.04, convRate: 0.02, revPerConv: 75 },
    { name: 'Win Back', type: 'flow' as const, baseSent: 400, openRate: 0.22, clickRate: 0.03, convRate: 0.015, revPerConv: 110 },
    { name: 'VIP Loyalty', type: 'flow' as const, baseSent: 300, openRate: 0.35, clickRate: 0.07, convRate: 0.06, revPerConv: 150 },
  ]

  const rows: Array<{
    client_id: string
    date: string
    type: string
    name: string
    sent: number
    delivered: number
    opened: number
    clicked: number
    conversions: number
    revenue: number
    unsubscribed: number
    bounced: number
  }> = []

  const today = new Date()
  for (let d = 29; d >= 0; d--) {
    const date = new Date(today)
    date.setDate(date.getDate() - d)
    const dateStr = date.toISOString().split('T')[0]

    for (const flow of flows) {
      const sent = Math.round(flow.baseSent / 30 * rand(0.8, 1.2))
      const delivered = Math.round(sent * rand(0.96, 0.99))
      const opened = Math.round(delivered * flow.openRate * rand(0.9, 1.1))
      const clicked = Math.round(opened * flow.clickRate / flow.openRate * rand(0.85, 1.15))
      const conversions = +(clicked * flow.convRate / (flow.clickRate / flow.openRate) * rand(0.8, 1.2)).toFixed(1)
      const revenue = +(conversions * flow.revPerConv * rand(0.9, 1.1)).toFixed(2)
      const unsubscribed = Math.round(sent * rand(0.001, 0.005))
      const bounced = Math.round(sent * rand(0.01, 0.03))

      rows.push({ client_id: clientId, date: dateStr, type: flow.type, name: flow.name, sent, delivered, opened, clicked, conversions, revenue, unsubscribed, bounced })
    }
  }

  return rows
}

export function generateShopifyData(clientId: string) {
  const rows: Array<{
    client_id: string
    date: string
    order_count: number
    gross_revenue: number
    net_revenue: number
    refunds: number
    average_order_value: number
    new_customers: number
    returning_customers: number
  }> = []

  const today = new Date()
  for (let d = 29; d >= 0; d--) {
    const date = new Date(today)
    date.setDate(date.getDate() - d)
    const dateStr = date.toISOString().split('T')[0]
    const dow = date.getDay()
    const wkMod = weekendDip(dow)

    const orderCount = Math.round(rand(18, 38) * wkMod)
    const avgAov = rand(85, 125)
    const grossRevenue = +(orderCount * avgAov).toFixed(2)
    const refunds = +(grossRevenue * rand(0.02, 0.05)).toFixed(2)
    const netRevenue = +(grossRevenue - refunds).toFixed(2)
    const newCustomers = Math.round(orderCount * rand(0.55, 0.65))
    const returningCustomers = orderCount - newCustomers

    rows.push({
      client_id: clientId,
      date: dateStr,
      order_count: orderCount,
      gross_revenue: grossRevenue,
      net_revenue: netRevenue,
      refunds,
      average_order_value: +avgAov.toFixed(2),
      new_customers: newCustomers,
      returning_customers: returningCustomers,
    })
  }

  return rows
}
