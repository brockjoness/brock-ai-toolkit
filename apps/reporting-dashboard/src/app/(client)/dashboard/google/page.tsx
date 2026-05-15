import { getClientUser } from '@/lib/queries/auth'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getDateRange, formatCurrency, formatNumber } from '@/lib/utils'
import { Card, TableCard } from '@/components/ui/card'
import Link from 'next/link'

interface GoogleCampaign {
  campaign_name: string
  spend: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  quality_score: number
  quality_count: number
}

export default async function GoogleDeepDivePage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const { client } = await getClientUser()
  const { range } = await searchParams
  const dateRange = getDateRange(range || '30d')

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400 text-lg">No client data available.</p>
      </div>
    )
  }

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('google_ads')
    .select('campaign_name, spend, impressions, clicks, conversions, revenue, quality_score')
    .eq('client_id', client.id)
    .gte('date', dateRange.from)
    .lte('date', dateRange.to)

  // Group by campaign_name
  const campaignMap = new Map<string, GoogleCampaign>()
  if (data) {
    for (const row of data) {
      const name = row.campaign_name || 'Unknown Campaign'
      const existing = campaignMap.get(name) || {
        campaign_name: name,
        spend: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        quality_score: 0,
        quality_count: 0,
      }
      existing.spend += Number(row.spend || 0)
      existing.impressions += Number(row.impressions || 0)
      existing.clicks += Number(row.clicks || 0)
      existing.conversions += Number(row.conversions || 0)
      existing.revenue += Number(row.revenue || 0)
      if (row.quality_score) {
        existing.quality_score += Number(row.quality_score)
        existing.quality_count += 1
      }
      campaignMap.set(name, existing)
    }
  }

  const campaigns = Array.from(campaignMap.values())
    .map((c) => ({
      ...c,
      quality_score: c.quality_count > 0 ? c.quality_score / c.quality_count : 0,
    }))
    .sort((a, b) => b.spend - a.spend)

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <Link href="/dashboard" className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors mb-2 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Google Ads
        </h1>
        <p className="text-sm text-gray-500">
          Campaign performance for {dateRange.from} to {dateRange.to}
        </p>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <p className="text-gray-400 text-[14px] mb-3">
              Connect your Google Ads account in Settings to see data here.
            </p>
            <Link
              href="/settings"
              className="text-[13px] font-medium px-4 py-2 rounded-[10px] bg-[#1A1A18] text-white hover:bg-[#2a2a28] transition-all inline-block"
            >
              Go to Settings
            </Link>
          </div>
        </Card>
      ) : (
        <TableCard>
          <h3 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
            Campaigns ({campaigns.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="pb-3 pr-4 font-medium">Campaign</th>
                  <th className="pb-3 pr-4 font-medium text-right">Spend</th>
                  <th className="pb-3 pr-4 font-medium text-right">Impressions</th>
                  <th className="pb-3 pr-4 font-medium text-right">Clicks</th>
                  <th className="pb-3 pr-4 font-medium text-right">Conversions</th>
                  <th className="pb-3 pr-4 font-medium text-right">Revenue</th>
                  <th className="pb-3 font-medium text-right">Quality Score</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.campaign_name} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 pr-4 font-medium" style={{ color: 'var(--color-foreground)' }}>
                      {c.campaign_name}
                    </td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatCurrency(c.spend)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatNumber(c.impressions)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatNumber(c.clicks)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatNumber(c.conversions)}</td>
                    <td className="py-3 pr-4 text-right text-gray-600">{formatCurrency(c.revenue)}</td>
                    <td className="py-3 text-right text-gray-600">
                      {c.quality_score > 0 ? c.quality_score.toFixed(1) : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TableCard>
      )}
    </div>
  )
}
