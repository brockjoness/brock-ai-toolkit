import type { BudgetPacing as BudgetPacingType } from '@/lib/types'

const statusLabels: Record<string, { label: string; color: string; symbol: string }> = {
  on_track: { label: 'On pace', color: '#2D7A4F', symbol: '\u2713' },
  ahead: { label: 'ahead', color: '#92700C', symbol: '\u25B2' },
  behind: { label: 'behind', color: '#D14343', symbol: '\u25BC' },
  critical: { label: 'critical', color: '#D14343', symbol: '\u25BC' },
}

function PacingRow({
  label,
  spent,
  budget,
  pctSpent,
  pctElapsed,
  variancePct,
  status,
  fillGradient,
  bold = false,
}: {
  label: string
  spent: string
  budget: string
  pctSpent: number
  pctElapsed: number
  variancePct: number
  status: string
  fillGradient: string
  bold?: boolean
}) {
  const s = statusLabels[status] || statusLabels.on_track
  const aheadBehind = status === 'on_track'
    ? s.label
    : `${Math.abs(variancePct)}% ${s.label}`

  return (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[13px] text-[#888]">{label}</span>
        <span className={`font-mono text-[13px] ${bold ? 'font-semibold' : ''}`}>
          {spent} / {budget}
        </span>
      </div>
      <div className="h-3 bg-[#F0F0EE] rounded-[6px] relative overflow-hidden">
        <div
          className="h-full rounded-[6px] transition-all duration-500"
          style={{ width: `${Math.min(pctSpent, 100)}%`, background: fillGradient }}
        />
        <div
          className="absolute -top-1 w-0.5 h-5 bg-[#1A1A18] rounded-sm"
          style={{ left: `${pctElapsed}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[11px] text-[#999]">
        <span>{pctSpent}% spent</span>
        <span style={{ color: s.color }}>
          {aheadBehind} {s.symbol}
        </span>
      </div>
    </div>
  )
}

export function BudgetPacingCard({ items }: { items: BudgetPacingType[] }) {
  // Build fill gradients based on platform
  function getGradient(platform: string, status: string) {
    if (platform === 'total') return 'linear-gradient(90deg, #2D7A4F, #4285F4)'
    if (platform === 'meta') return status === 'ahead'
      ? 'linear-gradient(90deg, #4285F4, #FBB005)'
      : '#4285F4'
    if (platform === 'google') return '#34A853'
    return '#8B5CF6'
  }

  return (
    <div>
      {items.map((item) => (
        <PacingRow
          key={item.platform}
          label={item.platform === 'total' ? 'Total' : item.platform === 'meta' ? 'Meta Ads' : item.platform === 'google' ? 'Google Ads' : item.platform}
          spent={`$${item.spent.toLocaleString()}`}
          budget={`$${item.budget.toLocaleString()}`}
          pctSpent={item.pct_spent}
          pctElapsed={item.pct_elapsed}
          variancePct={item.variance_pct}
          status={item.status}
          fillGradient={getGradient(item.platform, item.status)}
          bold={item.platform === 'total'}
        />
      ))}
    </div>
  )
}
