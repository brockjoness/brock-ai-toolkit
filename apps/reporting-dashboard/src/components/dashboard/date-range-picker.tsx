'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const ranges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'This month', value: 'mtd' },
  { label: 'Last 90 days', value: '90d' },
]

export function DateRangePicker() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('range') || 'mtd'

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('range', value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex gap-2">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => handleSelect(r.value)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-[13px] cursor-pointer transition-all duration-150 border ${
            current === r.value
              ? 'bg-[#1A1A18] text-white border-[#1A1A18]'
              : 'bg-white text-[#555] border-[#E8E8E6] hover:border-[#ccc]'
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
