import { requireAdmin } from '@/lib/queries/auth'
import { fetchAllRequests } from '@/lib/queries/clients'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusUpdater } from '@/components/admin/status-updater'

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

export default async function AdminRequestsPage() {
  await requireAdmin()
  const requests = await fetchAllRequests()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold text-[#1A1A18]">All Requests</h1>
        <span className="text-[13px] text-[#888]">{requests.length} requests</span>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E8E6] text-left bg-[#FAFAF9]">
                <th className="px-5 py-3 font-medium text-[#888]">Client</th>
                <th className="px-5 py-3 font-medium text-[#888]">Type</th>
                <th className="px-5 py-3 font-medium text-[#888]">Title</th>
                <th className="px-5 py-3 font-medium text-[#888]">Priority</th>
                <th className="px-5 py-3 font-medium text-[#888]">Status</th>
                <th className="px-5 py-3 font-medium text-[#888]">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-[#F0F0EE] last:border-0 hover:bg-[#FAFAF9] transition-colors">
                  <td className="px-5 py-3 text-[#1A1A18] font-medium">
                    {req.client_name || '--'}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant="blue">{req.type.replace(/_/g, ' ')}</Badge>
                  </td>
                  <td className="px-5 py-3 text-[#1A1A18]">{req.title}</td>
                  <td className="px-5 py-3">
                    <Badge variant={priorityColors[req.priority] || 'gray'}>
                      {req.priority.charAt(0).toUpperCase() + req.priority.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <StatusUpdater
                      id={req.id}
                      currentStatus={req.status}
                      type="request"
                      statuses={['open', 'in_progress', 'completed', 'cancelled']}
                    />
                  </td>
                  <td className="px-5 py-3 text-[#888]">{formatDate(req.created_at)}</td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-[#888]">
                    No requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
