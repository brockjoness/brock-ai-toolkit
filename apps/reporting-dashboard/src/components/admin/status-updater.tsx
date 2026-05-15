'use client'

import { useState, useTransition } from 'react'
import { updateRequestStatus, updateOnboardingStatus } from '@/app/actions/admin'
import { Select } from '@/components/ui/select'

export function StatusUpdater({
  id,
  currentStatus,
  type,
  statuses,
}: {
  id: string
  currentStatus: string
  type: 'request' | 'onboarding'
  statuses: string[]
}) {
  const [selected, setSelected] = useState(currentStatus)
  const [isPending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value
    setSelected(newStatus)
    startTransition(async () => {
      if (type === 'request') {
        await updateRequestStatus(id, newStatus)
      } else {
        await updateOnboardingStatus(id, newStatus)
      }
    })
  }

  return (
    <div className="relative inline-block min-w-[130px]">
      <Select
        value={selected}
        onChange={handleChange}
        disabled={isPending}
        className="py-1.5 text-[12px]"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </option>
        ))}
      </Select>
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-3.5 h-3.5 border-2 border-[#2D7A4F] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
