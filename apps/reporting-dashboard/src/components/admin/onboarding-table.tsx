'use client'

import { useState, Fragment } from 'react'
import { Badge } from '@/components/ui/badge'
import { StatusUpdater } from '@/components/admin/status-updater'
import { CreateClientButton } from '@/components/admin/create-client-button'
import { formatCurrencyExact } from '@/lib/utils'
import type { OnboardingSubmission } from '@/lib/types'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function OnboardingTable({ submissions }: { submissions: OnboardingSubmission[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-[#E8E8E6] text-left bg-[#FAFAF9]">
            <th className="px-5 py-3 font-medium text-[#888] w-6"></th>
            <th className="px-5 py-3 font-medium text-[#888]">Company</th>
            <th className="px-5 py-3 font-medium text-[#888]">Contact</th>
            <th className="px-5 py-3 font-medium text-[#888]">Budget</th>
            <th className="px-5 py-3 font-medium text-[#888]">Platforms</th>
            <th className="px-5 py-3 font-medium text-[#888]">Status</th>
            <th className="px-5 py-3 font-medium text-[#888]">Date</th>
            <th className="px-5 py-3 font-medium text-[#888]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => {
            const isExpanded = expandedId === sub.id
            return (
              <Fragment key={sub.id}>
                <tr
                  className="border-b border-[#F0F0EE] hover:bg-[#FAFAF9] transition-colors cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                >
                  <td className="px-5 py-3 text-[#888]">
                    <span className={`inline-block transition-transform ${isExpanded ? 'rotate-90' : ''}`}>&#9654;</span>
                  </td>
                  <td className="px-5 py-3 text-[#1A1A18] font-medium">{sub.company_name}</td>
                  <td className="px-5 py-3">
                    <div className="text-[#1A1A18]">{sub.contact_name}</div>
                    <div className="text-[11px] text-[#888]">{sub.contact_email}</div>
                  </td>
                  <td className="px-5 py-3 text-[#1A1A18]">
                    {sub.monthly_budget ? formatCurrencyExact(sub.monthly_budget) : '--'}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {sub.platforms?.map((p) => (
                        <Badge key={p} variant="blue">{p}</Badge>
                      )) || <span className="text-[#888]">--</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <StatusUpdater
                      id={sub.id}
                      currentStatus={sub.status}
                      type="onboarding"
                      statuses={['submitted', 'reviewing', 'approved', 'rejected', 'completed']}
                    />
                  </td>
                  <td className="px-5 py-3 text-[#888]">{formatDate(sub.created_at)}</td>
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    {(sub.status === 'reviewing' || sub.status === 'approved') && !sub.client_id && (
                      <CreateClientButton submissionId={sub.id} />
                    )}
                    {sub.client_id && (
                      <span className="text-[12px] text-[#2D7A4F] font-medium">Client Created</span>
                    )}
                  </td>
                </tr>
                {isExpanded && (
                  <tr className="bg-[#FAFAF9]">
                    <td colSpan={8} className="px-8 py-5">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-[13px]">
                        <DetailField label="Website" value={sub.website} />
                        <DetailField label="Industry" value={sub.industry} />
                        <DetailField label="Phone" value={sub.contact_phone} />
                        <DetailField label="ROAS Target" value={sub.roas_target ? `${sub.roas_target}x` : null} />
                        <DetailField label="Meta Account ID" value={sub.meta_account_id} />
                        <DetailField label="Google Customer ID" value={sub.google_customer_id} />
                        <DetailField label="Klaviyo API Key" value={sub.klaviyo_api_key} />
                        <DetailField label="Shopify Store" value={sub.shopify_store} />
                        <DetailField label="Brand Voice" value={sub.brand_voice} />
                        <DetailField label="Target Audience" value={sub.target_audience} />
                        {sub.primary_kpis && sub.primary_kpis.length > 0 && (
                          <div>
                            <p className="text-[#888] text-[11px] uppercase tracking-wide mb-0.5">Primary KPIs</p>
                            <div className="flex flex-wrap gap-1">
                              {sub.primary_kpis.map((kpi) => (
                                <Badge key={kpi} variant="gray">{kpi}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {sub.competitor_urls && sub.competitor_urls.length > 0 && (
                          <div>
                            <p className="text-[#888] text-[11px] uppercase tracking-wide mb-0.5">Competitors</p>
                            <div className="space-y-0.5">
                              {sub.competitor_urls.map((url) => (
                                <p key={url} className="text-[#1A1A18] font-mono text-[12px]">{url}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {sub.goals && (
                          <div className="col-span-2 lg:col-span-3">
                            <p className="text-[#888] text-[11px] uppercase tracking-wide mb-0.5">Goals</p>
                            <p className="text-[#1A1A18]">{sub.goals}</p>
                          </div>
                        )}
                        {sub.additional_notes && (
                          <div className="col-span-2 lg:col-span-3">
                            <p className="text-[#888] text-[11px] uppercase tracking-wide mb-0.5">Additional Notes</p>
                            <p className="text-[#1A1A18]">{sub.additional_notes}</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
          {submissions.length === 0 && (
            <tr>
              <td colSpan={8} className="px-5 py-8 text-center text-[#888]">
                No onboarding submissions yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function DetailField({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div>
      <p className="text-[#888] text-[11px] uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-[#1A1A18]">{value}</p>
    </div>
  )
}

