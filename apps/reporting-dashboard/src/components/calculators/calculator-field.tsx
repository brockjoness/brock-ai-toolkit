'use client'

export function CalcInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step,
  min,
  max,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  prefix?: string
  suffix?: string
  step?: number
  min?: number
  max?: number
}) {
  return (
    <div>
      <label className="block text-[11px] text-[#6B6B60] uppercase tracking-wide mb-1 font-medium">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#9B9B90]">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step || 1}
          min={min}
          max={max}
          className={`w-full border border-[#E8E8E2] rounded-xl py-2.5 text-[13px] bg-white text-[#111110] focus:outline-none focus:ring-2 focus:ring-[#1A1A18] focus:border-transparent transition-all ${prefix ? 'pl-7 pr-3.5' : 'px-3.5'} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#9B9B90]">{suffix}</span>}
      </div>
    </div>
  )
}

export function CalcOutput({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-2.5 ${highlight ? '' : 'border-b border-[#F2F2EE]'}`}>
      <span className="text-[13px] text-[#6B6B60]">{label}</span>
      <span className={`text-[14px] font-semibold ${highlight ? 'text-[#2D7A4F] text-[16px]' : 'text-[#111110]'}`}>{value}</span>
    </div>
  )
}

export function CalcSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[12px] font-semibold text-[#111110] uppercase tracking-wide mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

export function fmt(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

export function fmtExact(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

export function fmtPct(n: number): string {
  return `${n.toFixed(2)}%`
}

export function fmtNum(n: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)
}

export function fmtX(n: number): string {
  return `${n.toFixed(2)}x`
}
