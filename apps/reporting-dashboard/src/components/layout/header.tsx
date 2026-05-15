import type { AgencyTheme } from '@/lib/types'
import { DateRangePicker } from '@/components/dashboard/date-range-picker'

export function Header({
  clientName,
  lastUpdated,
  platforms,
}: {
  clientName: string
  theme?: AgencyTheme
  lastUpdated?: string
  platforms?: string[]
}) {
  const platformList = platforms?.length ? platforms.join(', ') : 'Meta, Google, Klaviyo, Shopify'
  const timestamp = lastUpdated || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) + ' at 6:00 AM'

  return (
    <div className="flex items-center justify-between mb-7">
      <div>
        <h1 className="text-[24px] font-bold mb-0.5">{clientName}</h1>
        <p className="text-[13px] text-[#888]">
          Last updated: {timestamp} &nbsp;&middot;&nbsp; Data from {platformList}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <DateRangePicker />
        <button
          className="px-4 py-2 rounded-[10px] text-[13px] font-medium text-white cursor-pointer"
          style={{ background: 'var(--color-accent, #2D7A4F)' }}
        >
          Export PDF
        </button>
      </div>
    </div>
  )
}
