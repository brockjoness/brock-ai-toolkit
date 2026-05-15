'use client'

import { useState } from 'react'
import { CalcInput, CalcOutput, CalcSection, fmt, fmtPct, fmtNum } from './calculator-field'

export function LeadEmailCalculator() {
  const [listSize, setListSize] = useState(55000)
  const [monthlySends, setMonthlySends] = useState(4)
  const [dealValue, setDealValue] = useState(1500)
  const [agencyFee, setAgencyFee] = useState(5000)

  // Campaign funnel
  const [openRate, setOpenRate] = useState(18)
  const [clickRate, setClickRate] = useState(1.2)
  const [qualifiedRate, setQualifiedRate] = useState(50)
  const [callRate, setCallRate] = useState(60)
  const [proposalRate, setProposalRate] = useState(30)
  const [closedRate, setClosedRate] = useState(20)

  // Auto-responder
  const [monthlyTraffic, setMonthlyTraffic] = useState(20000)
  const [formRate, setFormRate] = useState(2)
  const [arOpenRate, setArOpenRate] = useState(50)
  const [arClickRate, setArClickRate] = useState(15)
  const [arQualifiedRate, setArQualifiedRate] = useState(60)
  const [arCallRate, setArCallRate] = useState(80)
  const [arProposalRate, setArProposalRate] = useState(60)
  const [arClosedRate, setArClosedRate] = useState(50)

  // Campaign calculations
  const campaignClicks = listSize * monthlySends * (openRate / 100) * (clickRate / 100)
  const campaignQualified = campaignClicks * (qualifiedRate / 100)
  const campaignCalls = campaignQualified * (callRate / 100)
  const campaignProposals = campaignCalls * (proposalRate / 100)
  const campaignClosed = campaignProposals * (closedRate / 100)
  const campaignRev = campaignClosed * dealValue

  // Auto-responder calculations
  const formSubmissions = Math.round(monthlyTraffic * (formRate / 100))
  const arClicks = formSubmissions * (arOpenRate / 100) * (arClickRate / 100)
  const arQualified = arClicks * (arQualifiedRate / 100)
  const arCalls = arQualified * (arCallRate / 100)
  const arProposals = arCalls * (arProposalRate / 100)
  const arClosed = arProposals * (arClosedRate / 100)
  const arRev = arClosed * dealValue

  const totalRev = campaignRev + arRev
  const netRev = totalRev - agencyFee

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CalcSection title="Campaign Parameters">
          <CalcInput label="List Size" value={listSize} onChange={setListSize} step={1000} />
          <CalcInput label="Monthly Sends" value={monthlySends} onChange={setMonthlySends} />
          <CalcInput label="Average Deal Value" value={dealValue} onChange={setDealValue} prefix="$" />
          <CalcInput label="Agency Fee" value={agencyFee} onChange={setAgencyFee} prefix="$" />
        </CalcSection>

        <CalcSection title="Campaign Funnel Rates">
          <CalcInput label="Open Rate" value={openRate} onChange={setOpenRate} suffix="%" step={0.5} />
          <CalcInput label="Click Rate" value={clickRate} onChange={setClickRate} suffix="%" step={0.1} />
          <CalcInput label="Qualified Rate" value={qualifiedRate} onChange={setQualifiedRate} suffix="%" />
          <CalcInput label="Call Scheduled" value={callRate} onChange={setCallRate} suffix="%" />
          <CalcInput label="Proposal Sent" value={proposalRate} onChange={setProposalRate} suffix="%" />
          <CalcInput label="Closed Deal" value={closedRate} onChange={setClosedRate} suffix="%" />
        </CalcSection>

        <CalcSection title="Auto-Responder">
          <CalcInput label="Monthly Traffic" value={monthlyTraffic} onChange={setMonthlyTraffic} step={1000} />
          <CalcInput label="Form Submission Rate" value={formRate} onChange={setFormRate} suffix="%" step={0.1} />
        </CalcSection>
      </div>

      <div className="space-y-6">
        <CalcSection title="Campaign Revenue">
          <CalcOutput label="Campaign Clicks" value={fmtNum(campaignClicks)} />
          <CalcOutput label="Closed Deals" value={campaignClosed.toFixed(1)} />
          <CalcOutput label="Campaign Revenue" value={fmt(campaignRev)} />
        </CalcSection>

        <CalcSection title="Auto-Responder Revenue">
          <CalcOutput label="Form Submissions" value={fmtNum(formSubmissions)} />
          <CalcOutput label="Closed Deals" value={arClosed.toFixed(1)} />
          <CalcOutput label="Auto-Responder Revenue" value={fmt(arRev)} />
        </CalcSection>

        <div className="bg-[#E8F5EE] rounded-xl p-5">
          <CalcOutput label="Total Revenue" value={fmt(totalRev)} highlight />
          <CalcOutput label="Net Revenue" value={fmt(netRev)} highlight />
        </div>
      </div>
    </div>
  )
}
