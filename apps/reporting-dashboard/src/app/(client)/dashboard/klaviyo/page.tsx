import { getClientUser } from '@/lib/queries/auth'
import { fetchFlowPerformance } from '@/lib/queries/klaviyo'
import { getDateRange, formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { Card, TableCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default async function KlaviyoDeepDivePage({
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

  const flows = await fetchFlowPerformance(client.id, dateRange.from, dateRange.to)

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <Link href="/dashboard" className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors mb-2 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Klaviyo
        </h1>
        <p className="text-sm text-gray-500">
          Flow and campaign performance for {dateRange.from} to {dateRange.to}
        </p>
      </div>

      {flows.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <p className="text-gray-400 text-[14px] mb-3">
              Connect your Klaviyo account in Settings to see data here.
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
        <TableCard>
          <h3 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
            Flows &amp; Campaigns ({flows.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium text-right">Sent</th>
                  <th className="pb-3 pr-4 font-medium text-right">Delivered</th>
                  <th className="pb-3 pr-4 font-medium text-right">Opened</th>
                  <th className="pb-3 pr-4 font-medium text-right">Open Rate</th>
                  <th className="pb-3 pr-4 font-medium text-right">Clicked</th>
                  <th className="pb-3 pr-4 font-medium text-right">Click Rate</th>
                  <th className="pb-3 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {flows.map((flow) => (
                  <tr key={flow.name} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 pr-4 font-medium" style={{ color: 'var(--color-foreground)' }}>
                      {flow.name}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={flow.type === 'flow' ? 'blue' : 'gray'}>
                        {flow.type}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatNumber(flow.sent)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatNumber(flow.delivered)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatNumber(flow.opened)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatPercent(flow.open_rate)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatNumber(flow.clicked)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatPercent(flow.click_rate)}</td>
                    <td className="py-3 text-right text-gray-600">{formatCurrency(flow.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TableCard>
      )}
    </div>
  )
}
