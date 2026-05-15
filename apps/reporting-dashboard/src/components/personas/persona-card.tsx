'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import type { Persona } from '@/lib/queries/personas'

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null
  return (
    <div>
      <p className="text-[10px] text-[#9B9B90] uppercase tracking-wide font-medium mb-0.5">{label}</p>
      <p className="text-[13px] text-[#111110] whitespace-pre-wrap">{value}</p>
    </div>
  )
}

export function PersonaCard({ persona, onDeleted }: { persona: Persona; onDeleted: () => void }) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm(`Delete persona "${persona.name}"?`)) return
    setDeleting(true)
    const res = await fetch(`/api/personas?id=${persona.id}`, { method: 'DELETE' })
    if (res.ok) onDeleted()
    setDeleting(false)
  }

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-semibold text-[#111110]">{persona.name}</h3>
          {persona.description && <p className="text-[13px] text-[#6B6B60] mt-0.5">{persona.description}</p>}
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-[11px] text-[#9B9B90] hover:text-[#D14343] cursor-pointer transition-colors"
        >
          {deleting ? '...' : 'Delete'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Demographics" value={persona.demographics} />
        <Field label="Pain Points" value={persona.pain_points} />
        <Field label="Motivations" value={persona.motivations} />
        <Field label="Buying Triggers" value={persona.buying_triggers} />
      </div>
      {persona.communication_style && (
        <div className="mt-3 pt-3 border-t border-[#F2F2EE]">
          <Field label="Communication Style" value={persona.communication_style} />
        </div>
      )}
    </Card>
  )
}
