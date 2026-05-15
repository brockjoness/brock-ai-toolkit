'use client'

import { useState } from 'react'
import { EcomAdsCalculator } from './ecom-ads'
import { LeadAdsCalculator } from './lead-ads'
import { EcomWebsiteCalculator } from './ecom-website'
import { LeadWebsiteCalculator } from './lead-website'
import { EcomEmailCalculator } from './ecom-email'
import { LeadEmailCalculator } from './lead-email'
import { SeoCalculator } from './seo'

const tabs = [
  { id: 'ecom-ads', label: 'Ecom Ads', component: EcomAdsCalculator },
  { id: 'lead-ads', label: 'Lead Ads', component: LeadAdsCalculator },
  { id: 'ecom-website', label: 'Ecom Website', component: EcomWebsiteCalculator },
  { id: 'lead-website', label: 'Lead Website', component: LeadWebsiteCalculator },
  { id: 'ecom-email', label: 'Ecom Email', component: EcomEmailCalculator },
  { id: 'lead-email', label: 'Lead Email', component: LeadEmailCalculator },
  { id: 'seo', label: 'SEO', component: SeoCalculator },
]

export function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState('ecom-ads')
  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || EcomAdsCalculator

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 bg-[#F2F2EE] rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-[#111110] shadow-sm'
                : 'text-[#6B6B60] hover:text-[#111110]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active calculator */}
      <ActiveComponent />
    </div>
  )
}
