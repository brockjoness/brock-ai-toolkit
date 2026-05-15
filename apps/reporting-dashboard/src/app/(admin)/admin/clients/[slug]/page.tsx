import { requireAdmin } from '@/lib/queries/auth'
import { fetchClientBySlug, fetchClientRequests, fetchClientNotes } from '@/lib/queries/clients'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AgencySelector } from '@/components/admin/agency-selector'
import { AddNoteForm } from '@/components/admin/add-note-form'
import { StatusUpdater } from '@/components/admin/status-updater'
import { ClientEditForm } from '@/components/admin/client-edit-form'
import { SeedDataButton } from '@/components/admin/seed-data-button'

const priorityColors: Record<string, 'green' | 'red' | 'yellow' | 'blue' | 'gray'> = {
  low: 'gray',
  normal: 'blue',
  high: 'yellow',
  urgent: 'red',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await requireAdmin()
  const { slug } = await params

  const client = await fetchClientBySlug(slug)
  if (!client) notFound()

  const [requests, notes] = await Promise.all([
    fetchClientRequests(client.id),
    fetchClientNotes(client.id),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/clients" className="text-[13px] text-[#888] hover:text-[#1A1A18]">
          Clients
        </Link>
        <span className="text-[13px] text-[#ccc]">/</span>
        <h1 className="text-[22px] font-semibold text-[#1A1A18]">{client.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Edit Form */}
          <Card>
            <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-4">Client Settings</h2>
            <ClientEditForm client={client} />
          </Card>

          {/* Recent Requests */}
          <Card>
            <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-4">Recent Requests</h2>
            {requests.length === 0 ? (
              <p className="text-[13px] text-[#888]">No requests yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E6] text-left">
                      <th className="pb-2 font-medium text-[#888]">Title</th>
                      <th className="pb-2 font-medium text-[#888]">Type</th>
                      <th className="pb-2 font-medium text-[#888]">Priority</th>
                      <th className="pb-2 font-medium text-[#888]">Status</th>
                      <th className="pb-2 font-medium text-[#888]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id} className="border-b border-[#F0F0EE] last:border-0">
                        <td className="py-2.5 text-[#1A1A18] font-medium">{req.title}</td>
                        <td className="py-2.5">
                          <Badge variant="blue">{req.type.replace(/_/g, ' ')}</Badge>
                        </td>
                        <td className="py-2.5">
                          <Badge variant={priorityColors[req.priority] || 'gray'}>{req.priority}</Badge>
                        </td>
                        <td className="py-2.5">
                          <StatusUpdater
                            id={req.id}
                            currentStatus={req.status}
                            type="request"
                            statuses={['open', 'in_progress', 'completed', 'cancelled']}
                          />
                        </td>
                        <td className="py-2.5 text-[#888]">{formatDate(req.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Agency Selector */}
          <Card>
            <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-3">Agency</h2>
            <AgencySelector clientId={client.id} currentAgency={client.agency_slug} />
          </Card>

          {/* Quick Info */}
          <Card>
            <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-3">Quick Info</h2>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#888]">Slug</span>
                <span className="text-[#1A1A18] font-mono text-[12px]">{client.slug}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Created</span>
                <span className="text-[#1A1A18]">{formatDate(client.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Client ID</span>
                <span className="text-[#1A1A18] font-mono text-[11px]">{client.id.slice(0, 8)}...</span>
              </div>
            </div>
          </Card>

          {/* Demo Data */}
          <Card>
            <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-3">Demo Data</h2>
            <p className="text-[12px] text-[#888] mb-3">Seed 30 days of realistic metrics for testing dashboards and charts.</p>
            <SeedDataButton clientId={client.id} />
          </Card>

          {/* Internal Notes */}
          <Card>
            <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-3">Internal Notes</h2>
            <div className="space-y-3 mb-4">
              {notes.length === 0 ? (
                <p className="text-[13px] text-[#888]">No notes yet.</p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="border-b border-[#F0F0EE] pb-3 last:border-0 last:pb-0">
                    <p className="text-[13px] text-[#1A1A18] whitespace-pre-wrap">{note.content}</p>
                    <p className="text-[11px] text-[#888] mt-1">{formatDate(note.created_at)}</p>
                  </div>
                ))
              )}
            </div>
            <AddNoteForm clientId={client.id} />
          </Card>
        </div>
      </div>
    </div>
  )
}
