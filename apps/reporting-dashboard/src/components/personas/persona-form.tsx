'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function PersonaForm({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [demographics, setDemographics] = useState('')
  const [painPoints, setPainPoints] = useState('')
  const [motivations, setMotivations] = useState('')
  const [buyingTriggers, setBuyingTriggers] = useState('')
  const [communicationStyle, setCommunicationStyle] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)

    const res = await fetch('/api/personas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        demographics,
        pain_points: painPoints,
        motivations,
        buying_triggers: buyingTriggers,
        communication_style: communicationStyle,
      }),
    })

    if (res.ok) {
      setName('')
      setDescription('')
      setDemographics('')
      setPainPoints('')
      setMotivations('')
      setBuyingTriggers('')
      setCommunicationStyle('')
      setOpen(false)
      onCreated()
    }
    setLoading(false)
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        + New Persona
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E8E8E2] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[15px] font-semibold text-[#111110]">Create Persona</h3>
        <button type="button" onClick={() => setOpen(false)} className="text-[13px] text-[#9B9B90] hover:text-[#111110] cursor-pointer">Cancel</button>
      </div>

      <div>
        <label className="block text-[11px] text-[#6B6B60] uppercase tracking-wide mb-1 font-medium">Name *</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. First-Time Parents" required />
      </div>

      <div>
        <label className="block text-[11px] text-[#6B6B60] uppercase tracking-wide mb-1 font-medium">Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary of who this persona represents..." rows={2} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] text-[#6B6B60] uppercase tracking-wide mb-1 font-medium">Demographics</label>
          <Textarea value={demographics} onChange={(e) => setDemographics(e.target.value)} placeholder="Age, location, income, family..." rows={2} />
        </div>
        <div>
          <label className="block text-[11px] text-[#6B6B60] uppercase tracking-wide mb-1 font-medium">Pain Points</label>
          <Textarea value={painPoints} onChange={(e) => setPainPoints(e.target.value)} placeholder="What frustrates them, what problems they face..." rows={2} />
        </div>
        <div>
          <label className="block text-[11px] text-[#6B6B60] uppercase tracking-wide mb-1 font-medium">Motivations</label>
          <Textarea value={motivations} onChange={(e) => setMotivations(e.target.value)} placeholder="What drives their purchase decisions..." rows={2} />
        </div>
        <div>
          <label className="block text-[11px] text-[#6B6B60] uppercase tracking-wide mb-1 font-medium">Buying Triggers</label>
          <Textarea value={buyingTriggers} onChange={(e) => setBuyingTriggers(e.target.value)} placeholder="What pushes them to buy now..." rows={2} />
        </div>
      </div>

      <div>
        <label className="block text-[11px] text-[#6B6B60] uppercase tracking-wide mb-1 font-medium">Communication Style</label>
        <Input value={communicationStyle} onChange={(e) => setCommunicationStyle(e.target.value)} placeholder="e.g. Casual and reassuring, data-driven, aspirational" />
      </div>

      <Button type="submit" variant="accent" disabled={loading || !name.trim()}>
        {loading ? 'Creating...' : 'Create Persona'}
      </Button>
    </form>
  )
}
