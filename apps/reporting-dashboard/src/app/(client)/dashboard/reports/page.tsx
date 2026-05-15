import { getClientUser } from '@/lib/queries/auth'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const REPORT_TYPES = [
  {
    title: 'Weekly Reports',
    description:
      'A concise summary of the past 7 days: top-performing campaigns, budget pacing, and key changes across all platforms. Generated every Monday.',
    badge: 'Weekly',
    badgeVariant: 'blue' as const,
  },
  {
    title: 'Monthly Reports',
    description:
      'Comprehensive month-end analysis covering spend vs. budget, ROAS trends, platform breakdowns, Klaviyo performance, and Shopify revenue. Includes month-over-month comparisons.',
    badge: 'Monthly',
    badgeVariant: 'green' as const,
  },
  {
    title: 'Quarterly Business Reviews',
    description:
      'In-depth strategic review with 90-day trend analysis, channel attribution insights, audience performance, and recommendations for the upcoming quarter.',
    badge: 'Quarterly',
    badgeVariant: 'yellow' as const,
  },
]

export default async function ReportsPage() {
  const { client } = await getClientUser()

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400 text-lg">No client data available.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <Link href="/dashboard" className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors mb-2 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Reports
        </h1>
        <p className="text-sm text-gray-500">
          Automated performance reports for {client.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {REPORT_TYPES.map((report) => (
          <Card key={report.title}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-[15px] font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    {report.title}
                  </h3>
                  <Badge variant={report.badgeVariant}>{report.badge}</Badge>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed max-w-2xl">
                  {report.description}
                </p>
              </div>
              <div className="text-[12px] text-gray-400 ml-4 shrink-0">
                Coming soon
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <p className="text-[13px] text-gray-500 text-center">
          Reports are generated automatically via AI and will appear here once your platforms are connected and syncing data.
        </p>
      </Card>
    </div>
  )
}
