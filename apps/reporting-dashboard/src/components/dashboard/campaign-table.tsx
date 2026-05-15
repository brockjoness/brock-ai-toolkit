import type { Campaign } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Sparkline } from '@/components/charts/sparkline'
import { TableCard } from '@/components/ui/card'

const statusBadge: Record<string, { variant: 'green' | 'red' | 'yellow' | 'blue' | 'gray'; label: string }> = {
  scaling: { variant: 'green', label: 'Scaling' },
  stable: { variant: 'green', label: 'Stable' },
  active: { variant: 'green', label: 'Active' },
  monitor: { variant: 'yellow', label: 'Monitor' },
  declining: { variant: 'red', label: 'Declining' },
}

const platformBadge: Record<string, 'blue' | 'green' | 'gray'> = {
  meta: 'blue',
  google: 'green',
  klaviyo: 'gray',
}

function getTrendColor(trend: number[]): 'green' | 'red' | 'yellow' {
  if (trend.length < 2) return 'yellow'
  const first = trend.slice(0, 3).reduce((a, b) => a + b, 0) / 3
  const last = trend.slice(-3).reduce((a, b) => a + b, 0) / 3
  const change = (last - first) / first
  if (change > 0.05) return 'green'
  if (change < -0.05) return 'red'
  return 'yellow'
}

export function CampaignTable({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <TableCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[15px] font-semibold">Top Campaigns</div>
          <div className="text-[12px] text-[#888]">Ranked by ROAS &middot; March 2026</div>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Campaign</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Platform</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Spend</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Revenue</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">ROAS</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">CPA</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Trend (7d)</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Status</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => {
            const s = statusBadge[c.status] || statusBadge.active
            const trendColor = getTrendColor(c.trend)
            const roasColor = c.roas >= 3 ? 'text-[#2D7A4F] font-semibold' : c.roas < 2.5 ? 'text-[#D14343]' : ''
            const cpaColor = c.cpa > 25 ? 'text-[#D14343]' : ''

            return (
              <tr key={i} className="border-b border-[#F8F8F6] last:border-b-0">
                <td className="px-3 py-3 text-[13px] font-medium">{c.campaign_name}</td>
                <td className="px-3 py-3 text-[13px]">
                  <Badge variant={platformBadge[c.platform] || 'gray'}>
                    {c.platform.charAt(0).toUpperCase() + c.platform.slice(1)}
                  </Badge>
                </td>
                <td className="px-3 py-3 text-[13px] font-mono">${c.spend.toLocaleString()}</td>
                <td className="px-3 py-3 text-[13px] font-mono">${c.revenue.toLocaleString()}</td>
                <td className={`px-3 py-3 text-[13px] font-mono ${roasColor}`}>{c.roas.toFixed(2)}x</td>
                <td className={`px-3 py-3 text-[13px] font-mono ${cpaColor}`}>${c.cpa.toFixed(2)}</td>
                <td className="px-3 py-3 text-[13px]">
                  <Sparkline data={c.trend} color={trendColor} />
                </td>
                <td className="px-3 py-3 text-[13px]">
                  <Badge variant={s.variant}>{s.label}</Badge>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableCard>
  )
}
