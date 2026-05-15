import { getClientUser } from '@/lib/queries/auth'
import { fetchOverviewMetrics, fetchPreviousPeriodMetrics, fetchDailyMetrics, fetchDailyMetricsByPlatform, fetchPlatformSummaries } from '@/lib/queries/metrics'
import { fetchTopCampaigns } from '@/lib/queries/campaigns'
import { fetchFlowPerformance } from '@/lib/queries/klaviyo'
import { fetchShopifyOverview } from '@/lib/queries/shopify'
import { getDateRange, getDaysElapsed, getDaysInMonth, calculatePacing, formatCurrency, formatCurrencyExact, formatNumber, formatRoas } from '@/lib/utils'
import { MetricCard } from '@/components/dashboard/metric-card'
import { DateRangePicker } from '@/components/dashboard/date-range-picker'
import { PlatformPills } from '@/components/dashboard/platform-pills'
import { AlertBanner } from '@/components/dashboard/alert-banner'
import { BudgetPacingCard as BudgetPacing } from '@/components/dashboard/budget-pacing'
import { CampaignTable } from '@/components/dashboard/campaign-table'
import { KlaviyoTable } from '@/components/dashboard/klaviyo-table'
import { ShopifyOverviewCard as ShopifyOverview } from '@/components/dashboard/shopify-overview'
import { RevenueSpendChart } from '@/components/charts/revenue-spend-chart'
import { RoasPlatformChart } from '@/components/charts/roas-platform-chart'
import { RevenueDonutChart } from '@/components/charts/revenue-donut-chart'
import { Card } from '@/components/ui/card'
import type { BudgetPacing as BudgetPacingType } from '@/lib/types'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const { client } = await getClientUser()
  const { range } = await searchParams
  const dateRange = getDateRange(range || 'mtd')

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400 text-lg">No client data available. Complete onboarding to get started.</p>
      </div>
    )
  }

  // Fetch all data in parallel
  const [metrics, prevMetrics, daily, dailyByPlatform, platformSummaries, campaigns, klaviyoFlows, shopify] = await Promise.all([
    fetchOverviewMetrics(client.id, dateRange.from, dateRange.to),
    fetchPreviousPeriodMetrics(client.id, dateRange.from, dateRange.to),
    fetchDailyMetrics(client.id, dateRange.from, dateRange.to),
    fetchDailyMetricsByPlatform(client.id, dateRange.from, dateRange.to),
    fetchPlatformSummaries(client.id, dateRange.from, dateRange.to),
    fetchTopCampaigns(client.id, dateRange.from, dateRange.to),
    fetchFlowPerformance(client.id, dateRange.from, dateRange.to),
    fetchShopifyOverview(client.id, dateRange.from, dateRange.to),
  ])

  // Calculate changes
  const spendChange = prevMetrics.spend > 0 ? ((metrics.spend - prevMetrics.spend) / prevMetrics.spend) * 100 : 0
  const revenueChange = prevMetrics.revenue > 0 ? ((metrics.revenue - prevMetrics.revenue) / prevMetrics.revenue) * 100 : 0
  const roasChange = metrics.roas - prevMetrics.roas
  const cpaChange = metrics.cpa - prevMetrics.cpa
  const convChange = prevMetrics.conversions > 0 ? ((metrics.conversions - prevMetrics.conversions) / prevMetrics.conversions) * 100 : 0

  // Budget pacing
  const daysElapsed = getDaysElapsed()
  const daysInMonth = getDaysInMonth()
  const budget = client.monthly_budget || 0

  const metaSpend = platformSummaries.find(p => p.platform === 'meta')?.spend || 0
  const googleSpend = platformSummaries.find(p => p.platform === 'google')?.spend || 0
  const metaBudget = budget * 0.8 // assume 80/20 split
  const googleBudget = budget * 0.2

  const totalPacing = calculatePacing(metrics.spend, budget, daysElapsed, daysInMonth)
  const metaPacing = calculatePacing(metaSpend, metaBudget, daysElapsed, daysInMonth)

  // Prepare chart data
  const roasChartData = (() => {
    const dateMap = new Map<string, { date: string; meta: number; google: number }>()
    for (const row of dailyByPlatform) {
      const existing = dateMap.get(row.date) || { date: row.date, meta: 0, google: 0 }
      if (row.platform === 'meta') existing.meta = row.roas
      if (row.platform === 'google') existing.google = row.roas
      dateMap.set(row.date, existing)
    }
    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date))
  })()

  const platformRevenue = platformSummaries.map(p => ({
    name: p.platform === 'meta' ? 'Meta Ads' : p.platform === 'google' ? 'Google Ads' : p.platform === 'klaviyo' ? 'Klaviyo' : 'Shopify',
    value: p.revenue,
    color: p.platform === 'meta' ? '#4285F4' : p.platform === 'google' ? '#34A853' : p.platform === 'klaviyo' ? '#8B5CF6' : '#96BF48',
  }))

  // Alert for budget pacing
  const showAlert = totalPacing.status === 'ahead' || totalPacing.status === 'critical'

  return (
    <div>
      {/* Header area */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>{client.name}</h1>
          <p className="text-sm text-gray-500">
            {dateRange.from} to {dateRange.to} · Data from {platformSummaries.map(p => p.platform).join(', ') || 'no platforms connected'}
          </p>
        </div>
        <DateRangePicker />
      </div>

      {/* Alert banner */}
      {showAlert && (
        <AlertBanner variant="warning">
          <strong>Budget pacing alert:</strong> Total spend is {Math.abs(totalPacing.variancePct).toFixed(0)}% ahead of target ({formatCurrencyExact(metrics.spend)} spent of {formatCurrencyExact(budget)} with {daysInMonth - daysElapsed} days remaining).
        </AlertBanner>
      )}

      {/* Metric cards */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        <MetricCard label="Total Spend" value={formatCurrency(metrics.spend)} change={spendChange} changeLabel="vs last period" dotColor="green" />
        <MetricCard label="Revenue" value={formatCurrency(metrics.revenue)} change={revenueChange} changeLabel="vs last period" dotColor="blue" />
        <MetricCard label="Blended ROAS" value={formatRoas(metrics.roas)} change={roasChange} changeLabel="vs last period" dotColor="purple" />
        <MetricCard label="CPA" value={formatCurrencyExact(metrics.cpa)} change={-cpaChange} changeLabel="vs last period" dotColor="yellow" />
        <MetricCard label="Conversions" value={formatNumber(metrics.conversions)} change={convChange} changeLabel="vs last period" dotColor="red" />
      </div>

      {/* Platform pills */}
      <PlatformPills platforms={platformSummaries.map(p => ({
        id: p.platform,
        label: p.platform === 'meta' ? 'Meta' : p.platform === 'google' ? 'Google' : p.platform === 'klaviyo' ? 'Klaviyo' : 'Shopify',
        dotColor: p.platform === 'meta' ? '#4285F4' : p.platform === 'google' ? '#34A853' : p.platform === 'klaviyo' ? '#8B5CF6' : '#96BF48',
        detail: formatCurrency(p.spend),
      }))} />

      {/* Charts row */}
      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold" style={{ color: 'var(--color-foreground)' }}>Revenue vs. Spend</h3>
              <p className="text-xs text-gray-500">Daily, all platforms blended</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-[#2D7A4F]" /> Revenue</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-[#4285F4]" /> Spend</span>
            </div>
          </div>
          <RevenueSpendChart data={daily} />
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-[15px] font-semibold" style={{ color: 'var(--color-foreground)' }}>Budget Pacing</h3>
            <p className="text-xs text-gray-500">{new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })} · {formatCurrencyExact(budget)} target</p>
          </div>
          <BudgetPacing
            items={[
              { platform: 'meta', spent: metaSpend, budget: metaBudget, days_elapsed: daysElapsed, days_in_month: daysInMonth, pct_spent: metaPacing.pctSpent, pct_elapsed: metaPacing.pctElapsed, projected_spend: metaPacing.projected, status: metaPacing.status, variance_pct: metaPacing.variancePct },
              (() => { const gp = calculatePacing(googleSpend, googleBudget, daysElapsed, daysInMonth); return { platform: 'google', spent: googleSpend, budget: googleBudget, days_elapsed: daysElapsed, days_in_month: daysInMonth, pct_spent: gp.pctSpent, pct_elapsed: gp.pctElapsed, projected_spend: gp.projected, status: gp.status, variance_pct: gp.variancePct } })(),
              { platform: 'total', spent: metrics.spend, budget, days_elapsed: daysElapsed, days_in_month: daysInMonth, pct_spent: totalPacing.pctSpent, pct_elapsed: totalPacing.pctElapsed, projected_spend: totalPacing.projected, status: totalPacing.status, variance_pct: totalPacing.variancePct },
            ]}
          />
        </Card>
      </div>

      {/* ROAS + Donut row */}
      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold" style={{ color: 'var(--color-foreground)' }}>ROAS by Platform</h3>
              <p className="text-xs text-gray-500">Daily trend · Target: {formatRoas(client.roas_target || 3)}</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-[#4285F4]" /> Meta</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-[#34A853]" /> Google</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-gray-300" /> Target</span>
            </div>
          </div>
          <RoasPlatformChart data={roasChartData} target={client.roas_target || 3} />
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-[15px] font-semibold" style={{ color: 'var(--color-foreground)' }}>Revenue by Channel</h3>
            <p className="text-xs text-gray-500">MTD</p>
          </div>
          <RevenueDonutChart channels={platformRevenue} />
        </Card>
      </div>

      {/* Campaign table */}
      {campaigns.length > 0 && <CampaignTable campaigns={campaigns} />}

      {/* Bottom row: Klaviyo + Shopify */}
      <div className="grid grid-cols-2 gap-4">
        {klaviyoFlows.length > 0 && <KlaviyoTable flows={klaviyoFlows} />}
        <ShopifyOverview data={shopify} />
      </div>
    </div>
  )
}
