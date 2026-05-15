import { requireAdmin } from '@/lib/queries/auth'
import { fetchAllClients } from '@/lib/queries/clients'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrencyExact } from '@/lib/utils'
import Link from 'next/link'

const statusColors: Record<string, 'green' | 'red' | 'yellow' | 'blue' | 'gray'> = {
  active: 'green',
  paused: 'yellow',
  churning: 'red',
  churned: 'gray',
}

const stageColors: Record<string, 'green' | 'red' | 'yellow' | 'blue' | 'gray'> = {
  lead: 'blue',
  onboarding: 'yellow',
  active: 'green',
  paused: 'yellow',
  churning: 'red',
  churned: 'gray',
}

const agencyColors: Record<string, 'green' | 'yellow' | 'blue' | 'gray'> = {
  clickflow: 'green',
  'beacon-brand': 'yellow',
  'acme-agency': 'blue',
}

const agencyNames: Record<string, string> = {
  clickflow: 'Clickflow',
  'beacon-brand': 'Beacon Brand',
  'acme-agency': 'Acme Agency',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AdminClientsPage() {
  await requireAdmin()
  const clients = await fetchAllClients()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold text-[#1A1A18]">All Clients</h1>
        <span className="text-[13px] text-[#888]">{clients.length} clients</span>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E8E6] text-left bg-[#FAFAF9]">
                <th className="px-5 py-3 font-medium text-[#888]">Name</th>
                <th className="px-5 py-3 font-medium text-[#888]">Agency</th>
                <th className="px-5 py-3 font-medium text-[#888]">Status</th>
                <th className="px-5 py-3 font-medium text-[#888]">Pipeline Stage</th>
                <th className="px-5 py-3 font-medium text-[#888]">Monthly Budget</th>
                <th className="px-5 py-3 font-medium text-[#888]">ROAS Target</th>
                <th className="px-5 py-3 font-medium text-[#888]">Created</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-[#F0F0EE] last:border-0 hover:bg-[#FAFAF9] transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/clients/${client.slug}`} className="text-[#1A1A18] font-medium hover:text-[#2D7A4F]">
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={agencyColors[client.agency_slug] || 'gray'}>
                      {agencyNames[client.agency_slug] || client.agency_slug}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={statusColors[client.status] || 'gray'}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={stageColors[client.pipeline_stage || ''] || 'gray'}>
                      {(client.pipeline_stage || 'unknown').charAt(0).toUpperCase() + (client.pipeline_stage || 'unknown').slice(1)}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-[#1A1A18]">
                    {client.monthly_budget ? formatCurrencyExact(client.monthly_budget) : '--'}
                  </td>
                  <td className="px-5 py-3 text-[#1A1A18]">
                    {client.roas_target ? client.roas_target.toFixed(1) + 'x' : '--'}
                  </td>
                  <td className="px-5 py-3 text-[#888]">
                    {formatDate(client.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
