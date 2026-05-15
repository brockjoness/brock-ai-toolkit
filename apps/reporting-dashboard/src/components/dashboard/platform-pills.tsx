'use client'

import { useState } from 'react'

interface PlatformPill {
  id: string
  label: string
  dotColor?: string
  detail?: string
}

export function PlatformPills({
  platforms,
  onSelect,
}: {
  platforms: PlatformPill[]
  onSelect?: (id: string) => void
}) {
  const [active, setActive] = useState('all')

  const allPills: PlatformPill[] = [
    { id: 'all', label: 'All Platforms' },
    ...platforms,
  ]

  function handleClick(id: string) {
    setActive(id)
    onSelect?.(id)
  }

  return (
    <div className="flex gap-1.5 mb-6">
      {allPills.map((p) => (
        <button
          key={p.id}
          onClick={() => handleClick(p.id)}
          className={`flex items-center gap-1.5 px-4 py-[7px] rounded-[20px] text-[13px] font-medium cursor-pointer transition-all duration-150 border ${
            active === p.id
              ? 'bg-[#1A1A18] text-white border-[#1A1A18]'
              : 'bg-white text-[#1A1A18] border-[#E8E8E6] hover:border-[#ccc]'
          }`}
        >
          {p.dotColor && (
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: active === p.id ? '#fff' : p.dotColor }}
            />
          )}
          {p.label}
          {p.detail && (
            <span className="font-mono text-[12px] text-[#888] ml-1">{p.detail}</span>
          )}
        </button>
      ))}
    </div>
  )
}
