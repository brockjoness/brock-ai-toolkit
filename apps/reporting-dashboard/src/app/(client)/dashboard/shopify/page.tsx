import { getClientUser } from '@/lib/queries/auth'
import { fetchShopifyOverview } from '@/lib/queries/shopify'
import { getDateRange, formatCurrency, formatCurrencyExact, formatNumber, formatPercent } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default async function ShopifyDeepDivePage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const { client } = await getClientUser()
  const { range } = await searchParams
  const dateRange = getDateRange(range || '30d')

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400 text-lg">No client data available.</p>
      </div>
    )
  }

  const shopify = await fetchShopifyOverview(client.id, dateRange.from, dateRange.to)
  const hasData = shopify.order_count > 0 || shopify.gross_revenue > 0

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <Link href="/dashboard" className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors mb-2 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Shopify
        </h1>
        <p className="text-sm text-gray-500">
          Store performance for {dateRange.from} to {dateRange.to}
        </p>
      </div>

      {!hasData ? (
        <Card>
          <div className="py-12 text-center">
            <p className="text-gray-400 text-[14px] mb-3">
              Connect your Shopify store in Settings to see data here.
            </p>
            <Link
              href="/settings"
              className="text-[13px] font-medium px-4 py-2 rounded-[10px] bg-[#1A1A18] text-white hover:bg-[#2a2a28] transition-all inline-block"
            >
              Go to Settings
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Orders</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              {formatNumber(shopify.order_count)}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Gross Revenue</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              {formatCurrency(shopify.gross_revenue)}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Net Revenue</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              {formatCurrency(shopify.net_revenue)}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Refunds</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              {formatCurrency(shopify.refunds)}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Avg Order Value</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              {formatCurrencyExact(shopify.average_order_value)}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">New Customers</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              {formatNumber(shopify.new_customers)}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Returning Customers</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              {formatNumber(shopify.returning_customers)}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Conversion Rate</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              {shopify.conversion_rate > 0 ? formatPercent(shopify.conversion_rate) : '--'}
            </p>
          </Card>
        </div>
      )}
    </div>
  )
}
