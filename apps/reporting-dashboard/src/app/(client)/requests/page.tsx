import { getClientUser } from '@/lib/queries/auth'
import { fetchClientRequests } from '@/lib/queries/requests'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RequestForm } from '@/components/forms/request-form'

const TYPE_LABELS: Record<string, string> = {
  creative_brief: 'Creative Brief',
  strategy_change: 'Strategy Change',
  budget_change: 'Budget Change',
  question: 'Question',
  other: 'Other',
}

const STATUS_VARIANTS: Record<string, 'blue' | 'yellow' | 'green' | 'gray'> = {
  open: 'blue',
  in_progress: 'yellow',
  completed: 'green',
  cancelled: 'gray',
}

const STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const PRIORITY_VARIANTS: Record<string, 'gray' | 'blue' | 'yellow' | 'red'> = {
  low: 'gray',
  normal: 'blue',
  high: 'yellow',
  urgent: 'red',
}

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
  urgent: 'Urgent',
}

export default async function RequestsPage() {
  const { client } = await getClientUser()
  const requests = client ? await fetchClientRequests(client.id) : []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-[#1A1A18]">Requests</h1>
        <p className="text-[14px] text-gray-500 mt-1">
          Submit requests and track their status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit a Request */}
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-4">Submit a Request</h2>
            <RequestForm />
          </Card>
        </div>

        {/* Your Requests */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-[15px] font-semibold text-[#1A1A18] mb-4">Your Requests</h2>

            {requests.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[14px] text-gray-400">No requests yet.</p>
                <p className="text-[13px] text-gray-400 mt-1">
                  Submit your first request using the form.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-[11px] font-medium text-gray-400 uppercase tracking-wider pb-3 pr-4">
                        Title
                      </th>
                      <th className="text-[11px] font-medium text-gray-400 uppercase tracking-wider pb-3 pr-4">
                        Type
                      </th>
                      <th className="text-[11px] font-medium text-gray-400 uppercase tracking-wider pb-3 pr-4">
                        Priority
                      </th>
                      <th className="text-[11px] font-medium text-gray-400 uppercase tracking-wider pb-3 pr-4">
                        Status
                      </th>
                      <th className="text-[11px] font-medium text-gray-400 uppercase tracking-wider pb-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 pr-4">
                          <span className="text-[13px] font-medium text-[#1A1A18]">
                            {req.title}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="gray">{TYPE_LABELS[req.type] || req.type}</Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant={PRIORITY_VARIANTS[req.priority] || 'gray'}>
                            {PRIORITY_LABELS[req.priority] || req.priority}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant={STATUS_VARIANTS[req.status] || 'gray'}>
                            {STATUS_LABELS[req.status] || req.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <span className="text-[12px] text-gray-500">
                            {new Date(req.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
