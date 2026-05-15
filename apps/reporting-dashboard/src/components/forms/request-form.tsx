'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const REQUEST_TYPES = [
  { value: 'creative_brief', label: 'Creative Brief' },
  { value: 'strategy_change', label: 'Strategy Change' },
  { value: 'budget_change', label: 'Budget Change' },
  { value: 'question', label: 'Question' },
  { value: 'other', label: 'Other' },
]

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

interface RequestFormProps {
  onSuccess?: () => void
}

export function RequestForm({ onSuccess }: RequestFormProps) {
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('normal')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, description: description || null, priority }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      // Reset form
      setType('')
      setTitle('')
      setDescription('')
      setPriority('normal')
      setSuccess(true)
      onSuccess?.()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
          Type <span className="text-red-500">*</span>
        </label>
        <Select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select type...</option>
          {REQUEST_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief summary of your request"
          required
        />
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide any additional details..."
        />
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">Priority</label>
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-[#E8F5EE] border border-[#2D7A4F]/20 rounded-xl px-4 py-3 text-[13px] text-[#2D7A4F]">
          Request submitted successfully.
        </div>
      )}

      <div className="pt-2">
        <Button type="submit" variant="accent" disabled={submitting || !type || !title}>
          {submitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </div>
    </form>
  )
}
