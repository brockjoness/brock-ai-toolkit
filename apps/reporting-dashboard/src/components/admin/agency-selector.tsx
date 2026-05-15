'use client'

import { useState, useTransition } from 'react'
import { updateClientAgency } from '@/app/actions/admin'
import { Select } from '@/components/ui/select'

const agencies = [
  { slug: 'clickflow', name: 'Clickflow' },
  { slug: 'beacon-brand', name: 'Beacon Brand' },
  { slug: 'acme-agency', name: 'Acme Agency' },
]

export function AgencySelector({
  clientId,
  currentAgency,
}: {
  clientId: string
  currentAgency: string
}) {
  const [selected, setSelected] = useState(currentAgency)
  const [isPending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newAgency = e.target.value
    setSelected(newAgency)
    startTransition(async () => {
      await updateClientAgency(clientId, newAgency)
    })
  }

  return (
    <div className="relative">
      <Select value={selected} onChange={handleChange} disabled={isPending}>
        {agencies.map((agency) => (
          <option key={agency.slug} value={agency.slug}>
            {agency.name}
          </option>
        ))}
      </Select>
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-[#2D7A4F] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
