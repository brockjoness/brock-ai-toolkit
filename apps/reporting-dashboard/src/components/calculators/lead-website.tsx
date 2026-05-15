'use client'

import { useState } from 'react'
import { CalcInput, CalcOutput, CalcSection, fmt, fmtPct, fmtNum } from './calculator-field'

export function LeadWebsiteCalculator() {
  const [traffic, setTraffic] = useState(10000)
  const [convRate, setConvRate] = useState(1.5)
  const [closingRate, setClosingRate] = useState(30)
  const [dealValue, setDealValue] = useState(1500)
  const [targetConvRate, setTargetConvRate] = useState(2)
  const [agencyFee, setAgencyFee] = useState(5000)

  const leads = Math.round(traffic * (convRate / 100))
  const closedDeals = Math.round(leads * (closingRate / 100))
  const currentMrr = closedDeals * dealValue

  const targetLeads = Math.round(traffic * (targetConvRate / 100))
  const targetClosed = Math.round(targetLeads * (closingRate / 100))
  const targetMrr = targetClosed * dealValue

  const revenueIncrease = targetMrr - currentMrr
  const netIncrease = revenueIncrease - agencyFee
  const roi = agencyFee > 0 ? (netIncrease / agencyFee) * 100 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CalcSection title="Current Performance">
          <CalcInput label="Monthly Traffic" value={traffic} onChange={setTraffic} step={1000} />
          <CalcInput label="Conversion Rate" value={convRate} onChange={setConvRate} suffix="%" step={0.1} />
          <CalcInput label="Closing Rate" value={closingRate} onChange={setClosingRate} suffix="%" />
          <CalcInput label="Average Deal Value" value={dealValue} onChange={setDealValue} prefix="$" />
        </CalcSection>

        <CalcSection title="Target">
          <CalcInput label="Target Conversion Rate" value={targetConvRate} onChange={setTargetConvRate} suffix="%" step={0.1} />
          <CalcInput label="Agency Fee" value={agencyFee} onChange={setAgencyFee} prefix="$" />
        </CalcSection>
      </div>

      <div className="space-y-6">
        <CalcSection title="Current">
          <CalcOutput label="Leads" value={fmtNum(leads)} />
          <CalcOutput label="Closed Deals" value={fmtNum(closedDeals)} />
          <CalcOutput label="Current MRR" value={fmt(currentMrr)} />
        </CalcSection>

        <CalcSection title="After Optimization">
          <CalcOutput label="Target Leads" value={fmtNum(targetLeads)} />
          <CalcOutput label="Target Closed Deals" value={fmtNum(targetClosed)} />
          <CalcOutput label="Target MRR" value={fmt(targetMrr)} />
        </CalcSection>

        <div className="bg-[#E8F5EE] rounded-xl p-5">
          <CalcOutput label="Net Revenue Increase" value={fmt(netIncrease)} highlight />
          <CalcOutput label="ROI" value={fmtPct(roi)} highlight />
        </div>
      </div>
    </div>
  )
}
