import type { ShopifyOverview as ShopifyOverviewType } from '@/lib/types'
import { TableCard } from '@/components/ui/card'

function InnerCard({
  label,
  value,
  change,
  subtitle,
}: {
  label: string
  value: string
  change?: { value: string; direction: 'up' | 'down' }
  subtitle?: string
}) {
  return (
    <div className="p-3.5 bg-[#F8F8F6] rounded-xl">
      <div className="text-[12px] text-[#888] mb-1">{label}</div>
      <div className="text-[24px] font-bold">{value}</div>
      {change && (
        <div className={`flex items-center gap-1 text-[12px] mt-1 ${change.direction === 'up' ? 'text-[#2D7A4F]' : 'text-[#D14343]'}`}>
          <span>{change.direction === 'up' ? '\u25B2' : '\u25BC'}</span>
          {change.value}
        </div>
      )}
      {subtitle && (
        <div className="text-[12px] text-[#888] mt-1">{subtitle}</div>
      )}
    </div>
  )
}

export function ShopifyOverviewCard({ data }: { data: ShopifyOverviewType }) {
  const newPct = Math.round((data.new_customers / (data.new_customers + data.returning_customers)) * 100)
  const returnPct = 100 - newPct
  const refundRate = data.gross_revenue > 0 ? (data.refunds / data.gross_revenue * 100) : 0

  return (
    <TableCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[15px] font-semibold">Shopify Overview</div>
          <div className="text-[12px] text-[#888]">March 2026 MTD</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <InnerCard
          label="Orders"
          value={data.order_count.toLocaleString()}
          change={{ value: '15.2%', direction: 'up' }}
        />
        <InnerCard
          label="Gross Revenue"
          value={`$${data.gross_revenue.toLocaleString()}`}
          change={{ value: '18.7%', direction: 'up' }}
        />
        <InnerCard
          label="AOV"
          value={`$${data.average_order_value.toFixed(2)}`}
          change={{ value: '$3.40', direction: 'up' }}
        />
        <InnerCard
          label="New vs Returning"
          value={`${newPct} / ${returnPct}`}
          subtitle="% new · % return"
        />
        <InnerCard
          label="Refund Rate"
          value={`${refundRate.toFixed(1)}%`}
          change={{ value: '0.4%', direction: 'down' }}
        />
        <InnerCard
          label="Conv. Rate"
          value={`${data.conversion_rate.toFixed(1)}%`}
          change={{ value: '0.3%', direction: 'up' }}
        />
      </div>
    </TableCard>
  )
}
