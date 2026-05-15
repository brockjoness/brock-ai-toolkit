'use client'

import { useState } from 'react'
import { CalcInput, CalcOutput, CalcSection, fmt, fmtPct, fmtNum, fmtExact } from './calculator-field'

export function LeadAdsCalculator() {
  const [adSpend, setAdSpend] = useState(5000)
  const [cpc, setCpc] = useState(2)
  const [convRate, setConvRate] = useState(10)
  const [agencyFee, setAgencyFee] = useState(5000)
  const [dealValue, setDealValue] = useState(3000)

  const [qualifiedRate, setQualifiedRate] = useState(100)
  const [scheduledRate, setScheduledRate] = useState(20)
  const [proposalRate, setProposalRate] = useState(80)
  const [closedRate, setClosedRate] = useState(20)

  const clicks = cpc > 0 ? Math.round(adSpend / cpc) : 0
  const leads = Math.round(clicks * (convRate / 100))
  const cpl = leads > 0 ? adSpend / leads : 0
  const qualified = Math.round(leads * (qualifiedRate / 100))
  const scheduled = Math.round(qualified * (scheduledRate / 100))
  const proposals = Math.round(scheduled * (proposalRate / 100))
  const closed = proposals * (closedRate / 100)
  const revenue = closed * dealValue
  const totalCost = adSpend + agencyFee
  const grossProfit = revenue - totalCost
  const roi = totalCost > 0 ? (grossProfit / totalCost) * 100 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CalcSection title="Ad Spend">
          <CalcInput label="Monthly Ad Spend" value={adSpend} onChange={setAdSpend} prefix="$" step={500} />
          <CalcInput label="Cost Per Click" value={cpc} onChange={setCpc} prefix="$" step={0.5} />
          <CalcInput label="Website Conversion Rate" value={convRate} onChange={setConvRate} suffix="%" step={0.5} />
          <CalcInput label="Agency Fee" value={agencyFee} onChange={setAgencyFee} prefix="$" />
          <CalcInput label="Average Deal Value" value={dealValue} onChange={setDealValue} prefix="$" />
        </CalcSection>

        <CalcSection title="Funnel Conversion Rates">
          <CalcInput label="Qualified (Survey)" value={qualifiedRate} onChange={setQualifiedRate} suffix="%" />
          <CalcInput label="Scheduled Call" value={scheduledRate} onChange={setScheduledRate} suffix="%" />
          <CalcInput label="Sent Proposal" value={proposalRate} onChange={setProposalRate} suffix="%" />
          <CalcInput label="Closed Deal" value={closedRate} onChange={setClosedRate} suffix="%" />
        </CalcSection>
      </div>

      <div className="space-y-6">
        <CalcSection title="Funnel Output">
          <CalcOutput label="Clicks" value={fmtNum(clicks)} />
          <CalcOutput label="Leads" value={fmtNum(leads)} />
          <CalcOutput label="Cost Per Lead" value={fmtExact(cpl)} />
          <CalcOutput label="Qualified Prospects" value={fmtNum(qualified)} />
          <CalcOutput label="Calls Scheduled" value={fmtNum(scheduled)} />
          <CalcOutput label="Proposals Sent" value={fmtNum(proposals)} />
          <CalcOutput label="Closed Deals" value={closed.toFixed(1)} />
        </CalcSection>

        <div className="bg-[#E8F5EE] rounded-xl p-5">
          <CalcOutput label="Projected Revenue" value={fmt(revenue)} highlight />
          <CalcOutput label="Gross Profit" value={fmt(grossProfit)} highlight />
          <CalcOutput label="ROI" value={fmtPct(roi)} highlight />
        </div>
      </div>
    </div>
  )
}
