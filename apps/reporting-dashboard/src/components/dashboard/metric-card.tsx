type DotColor = 'green' | 'blue' | 'purple' | 'yellow' | 'red'

const dotColors: Record<DotColor, string> = {
  green: '#2D7A4F',
  blue: '#4285F4',
  purple: '#8B5CF6',
  yellow: '#FBB005',
  red: '#D14343',
}

export function MetricCard({
  label,
  value,
  change,
  changeLabel,
  dotColor,
  mono = false,
}: {
  label: string
  value: string
  change: number
  changeLabel: string
  dotColor: DotColor
  mono?: boolean
}) {
  const isPositive = change > 0
  const isNeutral = change === 0

  return (
    <div className="bg-[var(--color-card,#fff)] border border-[var(--color-card-border,#E8E8E6)] rounded-2xl px-5 py-[18px]">
      <div className="flex items-center gap-1.5 text-[12px] text-[#888] mb-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: dotColors[dotColor] }}
        />
        {label}
      </div>
      <div
        className={`text-[28px] font-bold tracking-[-0.02em] mb-1 ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </div>
      <div
        className={`flex items-center gap-1 text-[12px] ${
          isNeutral ? 'text-[#888]' : isPositive ? 'text-[#2D7A4F]' : 'text-[#D14343]'
        }`}
      >
        <span>{isPositive ? '\u25B2' : '\u25BC'}</span>
        {changeLabel}
      </div>
    </div>
  )
}
