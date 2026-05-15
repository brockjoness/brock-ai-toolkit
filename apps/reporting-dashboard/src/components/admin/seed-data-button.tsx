'use client'

import { useState, useTransition } from 'react'
import { seedDemoData } from '@/app/actions/admin'
import { Button } from '@/components/ui/button'

export function SeedDataButton({ clientId }: { clientId: string }) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle')

  function handleClick() {
    setResult('idle')
    startTransition(async () => {
      try {
        await seedDemoData(clientId)
        setResult('success')
      } catch {
        setResult('error')
      }
    })
  }

  return (
    <div className="space-y-2">
      <Button variant="secondary" size="sm" onClick={handleClick} disabled={isPending}>
        {isPending ? 'Seeding...' : 'Seed Demo Data'}
      </Button>
      {result === 'success' && (
        <p className="text-[12px] text-[#2D7A4F] font-medium">30 days of demo data seeded.</p>
      )}
      {result === 'error' && (
        <p className="text-[12px] text-[#D14343] font-medium">Error seeding data. Try again.</p>
      )}
    </div>
  )
}
