'use client'

import { useState, useTransition } from 'react'
import { updateClient } from '@/app/actions/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { Client } from '@/lib/types'

export function ClientEditForm({ client }: { client: Client }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  const [status, setStatus] = useState(client.status)
  const [pipelineStage, setPipelineStage] = useState(client.pipeline_stage || 'active')
  const [monthlyBudget, setMonthlyBudget] = useState(client.monthly_budget?.toString() || '')
  const [roasTarget, setRoasTarget] = useState(client.roas_target?.toString() || '')
  const [cpaTarget, setCpaTarget] = useState(client.cpa_target?.toString() || '')
  const [mrr, setMrr] = useState(client.mrr?.toString() || '')
  const [metaAccountId, setMetaAccountId] = useState(client.meta_account_id || '')
  const [googleCustomerId, setGoogleCustomerId] = useState(client.google_customer_id || '')
  const [klaviyoApiKey, setKlaviyoApiKey] = useState(client.klaviyo_api_key || '')
  const [shopifyStore, setShopifyStore] = useState(client.shopify_store || '')

  function handleSave() {
    setSaved(false)
    startTransition(async () => {
      await updateClient(client.id, {
        status,
        pipeline_stage: pipelineStage,
        monthly_budget: monthlyBudget ? Number(monthlyBudget) : null,
        roas_target: roasTarget ? Number(roasTarget) : null,
        cpa_target: cpaTarget ? Number(cpaTarget) : null,
        mrr: mrr ? Number(mrr) : 0,
        meta_account_id: metaAccountId || null,
        google_customer_id: googleCustomerId || null,
        klaviyo_api_key: klaviyoApiKey || null,
        shopify_store: shopifyStore || null,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div className="space-y-5">
      {/* Status & Pipeline */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">Status</label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="churning">Churning</option>
            <option value="churned">Churned</option>
          </Select>
        </div>
        <div>
          <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">Pipeline Stage</label>
          <Select value={pipelineStage} onChange={(e) => setPipelineStage(e.target.value)}>
            <option value="lead">Lead</option>
            <option value="onboarding">Onboarding</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="churning">Churning</option>
            <option value="churned">Churned</option>
          </Select>
        </div>
      </div>

      {/* Financials */}
      <div>
        <h3 className="text-[12px] font-semibold text-[#1A1A18] uppercase tracking-wide mb-2">Financials</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">Monthly Budget</label>
            <Input type="number" value={monthlyBudget} onChange={(e) => setMonthlyBudget(e.target.value)} placeholder="30000" />
          </div>
          <div>
            <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">MRR</label>
            <Input type="number" value={mrr} onChange={(e) => setMrr(e.target.value)} placeholder="5000" />
          </div>
          <div>
            <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">ROAS Target</label>
            <Input type="number" step="0.1" value={roasTarget} onChange={(e) => setRoasTarget(e.target.value)} placeholder="3.0" />
          </div>
          <div>
            <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">CPA Target</label>
            <Input type="number" value={cpaTarget} onChange={(e) => setCpaTarget(e.target.value)} placeholder="20" />
          </div>
        </div>
      </div>

      {/* Platform Connections */}
      <div>
        <h3 className="text-[12px] font-semibold text-[#1A1A18] uppercase tracking-wide mb-2">Platform IDs</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">Meta Account ID</label>
            <Input value={metaAccountId} onChange={(e) => setMetaAccountId(e.target.value)} placeholder="794660901226835" />
          </div>
          <div>
            <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">Google Customer ID</label>
            <Input value={googleCustomerId} onChange={(e) => setGoogleCustomerId(e.target.value)} placeholder="123-456-7890" />
          </div>
          <div>
            <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">Klaviyo API Key</label>
            <Input value={klaviyoApiKey} onChange={(e) => setKlaviyoApiKey(e.target.value)} placeholder="pk_..." />
          </div>
          <div>
            <label className="block text-[11px] text-[#888] uppercase tracking-wide mb-1">Shopify Store</label>
            <Input value={shopifyStore} onChange={(e) => setShopifyStore(e.target.value)} placeholder="my-store.myshopify.com" />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3 pt-2">
        <Button variant="accent" onClick={handleSave} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
        {saved && <span className="text-[12px] text-[#2D7A4F] font-medium">Saved</span>}
      </div>
    </div>
  )
}
