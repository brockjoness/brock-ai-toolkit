'use client'

import { useState, useEffect, useCallback } from 'react'
import { PersonaCard } from './persona-card'
import { PersonaForm } from './persona-form'
import type { Persona } from '@/lib/queries/personas'

export function PersonaList({ initialPersonas }: { initialPersonas: Persona[] }) {
  const [personas, setPersonas] = useState(initialPersonas)

  const refresh = useCallback(async () => {
    // Re-fetch by reloading the page (server component will re-fetch)
    const res = await fetch(window.location.href)
    if (res.ok) {
      window.location.reload()
    }
  }, [])

  return (
    <div className="space-y-4">
      <PersonaForm onCreated={refresh} />

      {personas.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2} className="w-6 h-6">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p className="text-[15px] font-medium text-[#111110] mb-1">No personas yet</p>
          <p className="text-[13px] text-[#9B9B90]">Create your first customer persona to generate targeted ad copy.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {personas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} onDeleted={refresh} />
          ))}
        </div>
      )}
    </div>
  )
}
