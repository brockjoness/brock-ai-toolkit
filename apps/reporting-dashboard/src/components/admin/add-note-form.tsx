'use client'

import { useState, useTransition } from 'react'
import { addClientNote } from '@/app/actions/admin'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function AddNoteForm({ clientId }: { clientId: string }) {
  const [content, setContent] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    startTransition(async () => {
      await addClientNote(clientId, content.trim())
      setContent('')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        placeholder="Add an internal note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
      />
      <Button type="submit" size="sm" disabled={isPending || !content.trim()}>
        {isPending ? 'Adding...' : 'Add Note'}
      </Button>
    </form>
  )
}
