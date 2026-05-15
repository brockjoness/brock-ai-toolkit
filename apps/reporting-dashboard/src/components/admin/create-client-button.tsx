'use client'

import { useState, useTransition } from 'react'
import { createClientFromSubmission } from '@/app/actions/admin'
import { Button } from '@/components/ui/button'

export function CreateClientButton({ submissionId }: { submissionId: string }) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle')

  function handleClick() {
    startTransition(async () => {
      try {
        await createClientFromSubmission(submissionId)
        setResult('success')
      } catch {
        setResult('error')
      }
    })
  }

  if (result === 'success') {
    return <span className="text-[12px] text-[#2D7A4F] font-medium">Client Created</span>
  }

  if (result === 'error') {
    return <span className="text-[12px] text-[#D14343] font-medium">Error — try again</span>
  }

  return (
    <Button size="sm" variant="accent" onClick={handleClick} disabled={isPending}>
      {isPending ? 'Creating...' : 'Create Client'}
    </Button>
  )
}
