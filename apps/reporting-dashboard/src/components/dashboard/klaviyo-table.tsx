import type { KlaviyoFlow } from '@/lib/types'
import { TableCard } from '@/components/ui/card'

function rateColor(rate: number, type: 'open' | 'click'): string {
  if (type === 'open') {
    if (rate >= 45) return 'text-[#2D7A4F]'
    if (rate < 30) return 'text-[#D14343]'
    return ''
  }
  // click rate
  if (rate >= 10) return 'text-[#2D7A4F]'
  if (rate < 3) return 'text-[#D14343]'
  return ''
}

export function KlaviyoTable({ flows }: { flows: KlaviyoFlow[] }) {
  return (
    <TableCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[15px] font-semibold">Klaviyo Flow Performance</div>
          <div className="text-[12px] text-[#888]">Last 30 days</div>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Flow</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Sent</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Open Rate</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Click Rate</th>
            <th className="text-left text-[11px] font-medium text-[#888] uppercase tracking-[0.04em] px-3 pb-3 border-b border-[#F0F0EE]">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {flows.map((f, i) => (
            <tr key={i} className="border-b border-[#F8F8F6] last:border-b-0">
              <td className="px-3 py-3 text-[13px] font-medium">{f.name}</td>
              <td className="px-3 py-3 text-[13px] font-mono">{f.sent.toLocaleString()}</td>
              <td className={`px-3 py-3 text-[13px] font-mono ${rateColor(f.open_rate, 'open')}`}>
                {f.open_rate.toFixed(1)}%
              </td>
              <td className={`px-3 py-3 text-[13px] font-mono ${rateColor(f.click_rate, 'click')}`}>
                {f.click_rate.toFixed(1)}%
              </td>
              <td className="px-3 py-3 text-[13px] font-mono font-semibold">
                ${f.revenue.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableCard>
  )
}
