'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const INDUSTRIES = [
  'E-commerce',
  'SaaS',
  'Services',
  'Retail',
  'Health & Wellness',
  'Food & Beverage',
  'Fashion',
  'Beauty',
  'Home & Garden',
  'Mobile App',
  'Other',
]

const KPI_OPTIONS = ['Revenue', 'ROAS', 'CPA', 'Conversions', 'Brand Awareness', 'New Customers']

const PLATFORM_OPTIONS = ['Meta Ads', 'Google Ads', 'Klaviyo', 'Shopify']

const STEP_LABELS = ['Company Info', 'Goals & Budget', 'Platforms', 'Competitors & Context', 'Confirm']

type AccountType = 'agency' | 'brand'

interface FormData {
  account_type: AccountType
  company_name: string
  website: string
  industry: string
  contact_name: string
  contact_email: string
  contact_phone: string
  monthly_budget: string
  roas_target: string
  primary_kpis: string[]
  goals: string
  platforms: string[]
  meta_account_id: string
  google_customer_id: string
  klaviyo_api_key: string
  shopify_store: string
  competitor_urls: string[]
  brand_voice: string
  target_audience: string
  additional_notes: string
}

const initialFormData: FormData = {
  account_type: 'brand',
  company_name: '',
  website: '',
  industry: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  monthly_budget: '',
  roas_target: '',
  primary_kpis: [],
  goals: '',
  platforms: [],
  meta_account_id: '',
  google_customer_id: '',
  klaviyo_api_key: '',
  shopify_store: '',
  competitor_urls: ['', '', ''],
  brand_voice: '',
  target_audience: '',
  additional_notes: '',
}

export function OnboardingForm({ userEmail = '' }: { userEmail?: string }) {
  const [step, setStep] = useState(0) // 0 = account type selection, 1-5 = form steps
  const [form, setForm] = useState<FormData>({ ...initialFormData, contact_email: userEmail })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const analyzedUrlRef = useRef('')

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleArrayItem(key: 'primary_kpis' | 'platforms', item: string) {
    setForm((prev) => {
      const arr = prev[key]
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item],
      }
    })
  }

  function updateCompetitor(index: number, value: string) {
    setForm((prev) => {
      const urls = [...prev.competitor_urls]
      urls[index] = value
      return { ...prev, competitor_urls: urls }
    })
  }

  function canAdvance(): boolean {
    if (step === 1) {
      return !!(form.company_name && form.contact_name && form.contact_email)
    }
    return true
  }

  const analyzeWebsite = useCallback(async () => {
    if (!form.website || analyzing || analyzedUrlRef.current === form.website) return
    setAnalyzing(true)
    analyzedUrlRef.current = form.website
    try {
      const res = await fetch('/api/onboarding/analyze-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: form.website }),
      })
      if (res.ok) {
        const data = await res.json()
        setForm((prev) => ({
          ...prev,
          brand_voice: prev.brand_voice || data.brand_voice || '',
          target_audience: prev.target_audience || data.target_audience || '',
          additional_notes: prev.additional_notes || data.additional_notes || '',
        }))
        setAnalyzed(true)
      }
    } catch {
      // Silent fail — user can fill manually
    } finally {
      setAnalyzing(false)
    }
  }, [form.website, analyzing])

  // Auto-analyze when reaching step 4 (Competitors & Context)
  useEffect(() => {
    if (step === 4 && form.website && !analyzed) {
      analyzeWebsite()
    }
  }, [step, form.website, analyzed, analyzeWebsite])

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)

    const payload: Record<string, unknown> = {
      account_type: form.account_type,
      company_name: form.company_name,
      contact_name: form.contact_name,
      contact_email: form.contact_email,
      contact_phone: form.contact_phone || null,
      website: form.website || null,
      industry: form.industry || null,
      monthly_budget: form.monthly_budget ? Number(form.monthly_budget) : null,
      roas_target: form.roas_target ? Number(form.roas_target) : null,
      primary_kpis: form.primary_kpis.length > 0 ? form.primary_kpis : null,
      goals: form.goals || null,
      platforms: form.platforms.length > 0 ? form.platforms : null,
      meta_account_id: form.meta_account_id || null,
      google_customer_id: form.google_customer_id || null,
      klaviyo_api_key: form.klaviyo_api_key || null,
      shopify_store: form.shopify_store || null,
      competitor_urls:
        form.competitor_urls.filter((u) => u.trim()).length > 0
          ? form.competitor_urls.filter((u) => u.trim())
          : null,
      brand_voice: form.brand_voice || null,
      target_audience: form.target_audience || null,
      additional_notes: form.additional_notes || null,
    }

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      // Redirect straight to the dashboard — client + user link are already created
      window.location.href = data.redirect || '/dashboard'
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  // Step 0: Account type selection
  if (step === 0) {
    return (
      <div className="space-y-4">
        <p className="text-center text-[14px] text-gray-500 mb-2">How will you be using Clickflow?</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              update('account_type', 'agency')
              setStep(1)
            }}
            className="group relative border-2 border-gray-200 rounded-2xl p-6 text-left transition-all hover:border-[#2D7A4F] hover:shadow-md cursor-pointer"
          >
            <div className="text-2xl mb-3">&#127970;</div>
            <h3 className="text-[15px] font-semibold text-[#1A1A18] mb-1">I&apos;m an Agency</h3>
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Set up your agency, then onboard and manage your clients from one dashboard.
            </p>
            <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-[#2D7A4F] group-hover:bg-[#2D7A4F] transition-colors flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              update('account_type', 'brand')
              setStep(1)
            }}
            className="group relative border-2 border-gray-200 rounded-2xl p-6 text-left transition-all hover:border-[#2D7A4F] hover:shadow-md cursor-pointer"
          >
            <div className="text-2xl mb-3">&#128640;</div>
            <h3 className="text-[15px] font-semibold text-[#1A1A18] mb-1">I&apos;m a Brand</h3>
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Get your ad performance dashboard set up with reporting, tools, and creative generation.
            </p>
            <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-[#2D7A4F] group-hover:bg-[#2D7A4F] transition-colors flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Account type indicator */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setStep(0)}
          className="text-[12px] text-[#2D7A4F] hover:underline cursor-pointer"
        >
          &larr; Change account type
        </button>
        <span className="text-[12px] text-gray-400">|</span>
        <span className="text-[12px] font-medium text-[#1A1A18]">
          {form.account_type === 'agency' ? 'Agency' : 'Brand'} signup
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-8">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1
          const isActive = step === stepNum
          const isComplete = step > stepNum
          return (
            <div key={label} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  isComplete
                    ? 'bg-[#2D7A4F]'
                    : isActive
                      ? 'bg-[#2D7A4F]/60'
                      : 'bg-gray-200'
                }`}
              />
              <p
                className={`text-[11px] mt-1.5 ${
                  isActive ? 'text-[#2D7A4F] font-medium' : 'text-gray-400'
                }`}
              >
                {label}
              </p>
            </div>
          )
        })}
      </div>

      <Card>
        {/* Step 1: Company Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">
              {form.account_type === 'agency' ? 'Agency Info' : 'Company Info'}
            </h2>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                {form.account_type === 'agency' ? 'Agency Name' : 'Company Name'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <Input
                value={form.company_name}
                onChange={(e) => update('company_name', e.target.value)}
                placeholder={form.account_type === 'agency' ? 'Your Agency Name' : 'Acme Inc.'}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Website URL
              </label>
              <Input
                value={form.website}
                onChange={(e) => update('website', e.target.value)}
                placeholder="https://example.com"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                We&apos;ll use this to pre-fill your brand details
              </p>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">Industry</label>
              <Select value={form.industry} onChange={(e) => update('industry', e.target.value)}>
                <option value="">Select industry...</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Contact Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={form.contact_name}
                onChange={(e) => update('contact_name', e.target.value)}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={form.contact_email}
                onChange={(e) => update('contact_email', e.target.value)}
                placeholder="jane@acme.com"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Contact Phone
              </label>
              <Input
                type="tel"
                value={form.contact_phone}
                onChange={(e) => update('contact_phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        )}

        {/* Step 2: Goals & Budget */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">Goals &amp; Budget</h2>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Monthly Ad Budget
              </label>
              <Input
                type="number"
                value={form.monthly_budget}
                onChange={(e) => update('monthly_budget', e.target.value)}
                placeholder="10000"
              />
              <p className="text-[11px] text-gray-400 mt-1">$5,000 - $500,000+</p>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                ROAS Target
              </label>
              <Input
                type="number"
                step="0.1"
                value={form.roas_target}
                onChange={(e) => update('roas_target', e.target.value)}
                placeholder="3.0"
              />
              <p className="text-[11px] text-gray-400 mt-1">e.g., 3.0</p>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-2">
                Primary KPIs
              </label>
              <div className="flex flex-wrap gap-2">
                {KPI_OPTIONS.map((kpi) => {
                  const selected = form.primary_kpis.includes(kpi)
                  return (
                    <button
                      key={kpi}
                      type="button"
                      onClick={() => toggleArrayItem('primary_kpis', kpi)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#2D7A4F] text-white border-[#2D7A4F]'
                          : 'bg-white text-[#1A1A18] border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {kpi}
                    </button>
                  )
                })}
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">Goals</label>
              <Textarea
                value={form.goals}
                onChange={(e) => update('goals', e.target.value)}
                placeholder="What are you hoping to achieve in the next 90 days?"
              />
            </div>
          </div>
        )}

        {/* Step 3: Platforms */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">Platforms</h2>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-2">
                Which platforms should we manage?
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORM_OPTIONS.map((plat) => {
                  const selected = form.platforms.includes(plat)
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => toggleArrayItem('platforms', plat)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#2D7A4F] text-white border-[#2D7A4F]'
                          : 'bg-white text-[#1A1A18] border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {plat}
                    </button>
                  )
                })}
              </div>
            </div>

            {form.platforms.includes('Meta Ads') && (
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                  Meta Ad Account ID
                </label>
                <Input
                  value={form.meta_account_id}
                  onChange={(e) => update('meta_account_id', e.target.value)}
                  placeholder="act_123456789"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Found in Meta Business Manager &rarr; Ad Account Settings
                </p>
              </div>
            )}

            {form.platforms.includes('Google Ads') && (
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                  Google Ads Customer ID
                </label>
                <Input
                  value={form.google_customer_id}
                  onChange={(e) => update('google_customer_id', e.target.value)}
                  placeholder="123-456-7890"
                />
                <p className="text-[11px] text-gray-400 mt-1">Format: 123-456-7890</p>
              </div>
            )}

            {form.platforms.includes('Klaviyo') && (
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                  Klaviyo API Key
                </label>
                <Input
                  value={form.klaviyo_api_key}
                  onChange={(e) => update('klaviyo_api_key', e.target.value)}
                  placeholder="pk_..."
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Settings &rarr; API Keys &rarr; Create Private Key
                </p>
              </div>
            )}

            {form.platforms.includes('Shopify') && (
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                  Shopify Store URL
                </label>
                <Input
                  value={form.shopify_store}
                  onChange={(e) => update('shopify_store', e.target.value)}
                  placeholder="your-store.myshopify.com"
                />
                <p className="text-[11px] text-gray-400 mt-1">your-store.myshopify.com</p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Competitors & Context */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">
              Competitors &amp; Context
            </h2>

            {analyzing && (
              <div className="flex items-center gap-2 bg-[#2D7A4F]/5 border border-[#2D7A4F]/20 rounded-xl px-4 py-3">
                <div className="w-4 h-4 border-2 border-[#2D7A4F] border-t-transparent rounded-full animate-spin" />
                <p className="text-[13px] text-[#2D7A4F]">
                  Analyzing your website to pre-fill brand details...
                </p>
              </div>
            )}

            {analyzed && !analyzing && (
              <div className="flex items-center gap-2 bg-[#2D7A4F]/5 border border-[#2D7A4F]/20 rounded-xl px-4 py-3">
                <span className="text-[#2D7A4F]">&#10003;</span>
                <p className="text-[13px] text-[#2D7A4F]">
                  Pre-filled from your website. Feel free to edit.
                </p>
              </div>
            )}

            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Competitor URLs
              </label>
              <div className="space-y-2">
                {form.competitor_urls.map((url, i) => (
                  <Input
                    key={i}
                    value={url}
                    onChange={(e) => updateCompetitor(i, e.target.value)}
                    placeholder={`https://competitor${i + 1}.com`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Brand Voice
              </label>
              <Textarea
                value={form.brand_voice}
                onChange={(e) => update('brand_voice', e.target.value)}
                placeholder="How would you describe your brand's tone? E.g., bold and direct, warm and approachable, premium and sophisticated"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Target Audience
              </label>
              <Textarea
                value={form.target_audience}
                onChange={(e) => update('target_audience', e.target.value)}
                placeholder="Describe your ideal customer"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#1A1A18] mb-1">
                Additional Notes
              </label>
              <Textarea
                value={form.additional_notes}
                onChange={(e) => update('additional_notes', e.target.value)}
                placeholder="Anything else we should know?"
              />
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">Review &amp; Submit</h2>

            <SummarySection
              title={form.account_type === 'agency' ? 'Agency Info' : 'Company Info'}
              onEdit={() => setStep(1)}
              items={[
                ['Account Type', form.account_type === 'agency' ? 'Agency' : 'Brand'],
                [form.account_type === 'agency' ? 'Agency' : 'Company', form.company_name],
                ['Website', form.website || '--'],
                ['Industry', form.industry || '--'],
                ['Contact', form.contact_name],
                ['Email', form.contact_email],
                ['Phone', form.contact_phone || '--'],
              ]}
            />

            <SummarySection
              title="Goals & Budget"
              onEdit={() => setStep(2)}
              items={[
                [
                  'Monthly Budget',
                  form.monthly_budget ? `$${Number(form.monthly_budget).toLocaleString()}` : '--',
                ],
                ['ROAS Target', form.roas_target || '--'],
                ['KPIs', form.primary_kpis.join(', ') || '--'],
                ['Goals', form.goals || '--'],
              ]}
            />

            <SummarySection
              title="Platforms"
              onEdit={() => setStep(3)}
              items={[
                ['Platforms', form.platforms.join(', ') || '--'],
                ...(form.platforms.includes('Meta Ads')
                  ? [['Meta Account ID', form.meta_account_id || '--'] as [string, string]]
                  : []),
                ...(form.platforms.includes('Google Ads')
                  ? [['Google Customer ID', form.google_customer_id || '--'] as [string, string]]
                  : []),
                ...(form.platforms.includes('Klaviyo')
                  ? [['Klaviyo API Key', form.klaviyo_api_key ? '********' : '--'] as [string, string]]
                  : []),
                ...(form.platforms.includes('Shopify')
                  ? [['Shopify Store', form.shopify_store || '--'] as [string, string]]
                  : []),
              ]}
            />

            <SummarySection
              title="Competitors & Context"
              onEdit={() => setStep(4)}
              items={[
                [
                  'Competitors',
                  form.competitor_urls.filter((u) => u.trim()).join(', ') || '--',
                ],
                ['Brand Voice', form.brand_voice || '--'],
                ['Target Audience', form.target_audience || '--'],
                ['Notes', form.additional_notes || '--'],
              ]}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setStep(0)}>
              Back
            </Button>
          )}

          {step < 5 ? (
            <Button
              variant="accent"
              onClick={() => setStep(step + 1)}
              disabled={!canAdvance()}
            >
              Next
            </Button>
          ) : (
            <Button variant="accent" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

function SummarySection({
  title,
  onEdit,
  items,
}: {
  title: string
  onEdit: () => void
  items: [string, string][]
}) {
  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-semibold text-[#1A1A18]">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-[12px] text-[#2D7A4F] hover:underline cursor-pointer"
        >
          Edit
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {items.map(([label, value]) => (
          <div key={label}>
            <p className="text-[11px] text-gray-400">{label}</p>
            <p className="text-[13px] text-[#1A1A18] break-words">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
