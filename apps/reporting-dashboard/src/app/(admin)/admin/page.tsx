import { requireAdmin } from '@/lib/queries/auth'
import { fetchAgencyStats, fetchAllClients } from '@/lib/queries/clients'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrencyExact } from '@/lib/utils'
import Link from 'next/link'

const stageColors: Record<string, 'green' | 'red' | 'yellow' | 'blue' | 'gray'> = {
  lead: 'blue',
  onboarding: 'yellow',
  active: 'green',
  paused: 'yellow',
  churning: 'red',
  churned: 'gray',
}

const statusColors: Record<string, 'green' | 'red' | 'yellow' | 'blue' | 'gray'> = {
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

export default async function AdminDashboard() {
  await requireAdmin()

  const [stats, clients] = await Promise.all([
    fetchAgencyStats(),
    fetchAllClients(),
  ])

  const activeClients = clients.filter((c) => c.status === 'active')
  const totalAdSpend = activeClients.reduce((sum, c) => sum + (c.monthly_budget || 0), 0)

  const stages = ['lead', 'onboarding', 'active', 'paused', 'churning', 'churned']
  const pipelineCounts: Record<string, number> = {}
  for (const stage of stages) {
    pipelineCounts[stage] = clients.filter((c) => c.pipeline_stage === stage).length
  }

  const recentClients = [...clients]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-[22px] font-semibold text-[#1A1A18]">Agency Overview</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-[12px] text-[#888] font-medium uppercase tracking-wide mb-1">Total Clients</p>
          <p className="text-[28px] font-semibold text-[#1A1A18]">{stats.totalClients}</p>
        </Card>
        <Card>
          <p className="text-[12px] text-[#888] font-medium uppercase tracking-wide mb-1">Active Clients</p>
          <p className="text-[28px] font-semibold text-[#1A1A18]">{stats.activeClients}</p>
        </Card>
        <Card>
          <p className="text-[12px] text-[#888] font-medium uppercase tracking-wide mb-1">Total MRR</p>
          <p className="text-[28px] font-semibold text-[#1A1A18]">{formatCurrencyExact(stats.totalMrr)}</p>
        </Card>
        <Card>
          <p className="text-[12px] text-[#888] font-medium uppercase tracking-wide mb-1">Total Ad Spend</p>
          <p className="text-[28px] font-semibold text-[#1A1A18]">{formatCurrencyExact(totalAdSpend)}</p>
        </Card>
      </div>

      {/* Pipeline Breakdown */}
      <Card>
        <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-3">Pipeline Breakdown</h2>
        <div className="flex flex-wrap gap-3">
          {stages.map((stage) => (
            <div key={stage} className="flex items-center gap-2">
              <Badge variant={stageColors[stage] || 'gray'}>
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </Badge>
              <span className="text-[14px] font-medium text-[#1A1A18]">{pipelineCounts[stage] || 0}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Clients */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-[#1A1A18]">Recent Clients</h2>
          <Link href="/admin/clients" className="text-[12px] text-[#2D7A4F] font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E8E6] text-left">
                <th className="pb-2 font-medium text-[#888]">Name</th>
                <th className="pb-2 font-medium text-[#888]">Agency</th>
                <th className="pb-2 font-medium text-[#888]">Status</th>
                <th className="pb-2 font-medium text-[#888]">Pipeline Stage</th>
              </tr>
            </thead>
            <tbody>
              {recentClients.map((client) => (
                <tr key={client.id} className="border-b border-[#F0F0EE] last:border-0">
                  <td className="py-2.5">
                    <Link href={`/admin/clients/${client.slug}`} className="text-[#1A1A18] font-medium hover:text-[#2D7A4F]">
                      {client.name}
                    </Link>
                  </td>
                  <td className="py-2.5">
                    <Badge variant={agencyColors[client.agency_slug] || 'gray'}>
                      {agencyNames[client.agency_slug] || client.agency_slug}
                    </Badge>
                  </td>
                  <td className="py-2.5">
                    <Badge variant={statusColors[client.status] || 'gray'}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-2.5">
                    <Badge variant={stageColors[client.pipeline_stage || ''] || 'gray'}>
                      {(client.pipeline_stage || 'unknown').charAt(0).toUpperCase() + (client.pipeline_stage || 'unknown').slice(1)}
                    </Badge>
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
