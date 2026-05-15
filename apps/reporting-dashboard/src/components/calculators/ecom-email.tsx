'use client'

import { useState } from 'react'
import { CalcInput, CalcOutput, CalcSection, fmt, fmtPct, fmtNum } from './calculator-field'

export function EcomEmailCalculator() {
  const [listSize, setListSize] = useState(55000)
  const [openRate, setOpenRate] = useState(20)
  const [clickRate, setClickRate] = useState(1.5)
  const [convRate, setConvRate] = useState(4)
  const [aov, setAov] = useState(135)
  const [monthlySends, setMonthlySends] = useState(4)
  const [agencyFee, setAgencyFee] = useState(5000)

  // Flow inputs
  const [welcomeOpenRate, setWelcomeOpenRate] = useState(50)
  const [welcomeClickRate, setWelcomeClickRate] = useState(15)
  const [welcomeConvRate, setWelcomeConvRate] = useState(10)
  const [abandonOpenRate, setAbandonOpenRate] = useState(50)
  const [abandonClickRate, setAbandonClickRate] = useState(20)
  const [abandonConvRate, setAbandonConvRate] = useState(8)
  const [postPurchaseOpenRate, setPostPurchaseOpenRate] = useState(50)
  const [postPurchaseClickRate, setPostPurchaseClickRate] = useState(25)
  const [postPurchaseConvRate, setPostPurchaseConvRate] = useState(5)

  const [monthlyTraffic, setMonthlyTraffic] = useState(45000)
  const [formRate, setFormRate] = useState(1.6)

  // Campaign revenue per send
  const campaignRevPerSend = listSize * (openRate / 100) * (clickRate / 100) * (convRate / 100) * aov
  const campaignRevMonthly = campaignRevPerSend * monthlySends

  // Flow revenues (monthly estimates based on traffic-driven flow entries)
  const newSubscribers = Math.round(monthlyTraffic * (formRate / 100))
  const welcomeRev = newSubscribers * (welcomeOpenRate / 100) * (welcomeClickRate / 100) * (welcomeConvRate / 100) * aov * 3
  const abandonRev = Math.round(monthlyTraffic * 0.7 * 0.03) * (abandonOpenRate / 100) * (abandonClickRate / 100) * (abandonConvRate / 100) * aov
  const postPurchaseRev = Math.round(campaignRevMonthly / aov) * (postPurchaseOpenRate / 100) * (postPurchaseClickRate / 100) * (postPurchaseConvRate / 100) * aov

  const totalFlowRev = welcomeRev + abandonRev + postPurchaseRev
  const totalGrossRev = campaignRevMonthly + totalFlowRev
  const netRev = totalGrossRev - agencyFee

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CalcSection title="Campaign Metrics">
          <CalcInput label="List Size" value={listSize} onChange={setListSize} step={1000} />
          <CalcInput label="Open Rate" value={openRate} onChange={setOpenRate} suffix="%" step={0.5} />
          <CalcInput label="Click Rate" value={clickRate} onChange={setClickRate} suffix="%" step={0.1} />
          <CalcInput label="Conversion Rate" value={convRate} onChange={setConvRate} suffix="%" step={0.5} />
          <CalcInput label="Average Order Value" value={aov} onChange={setAov} prefix="$" />
          <CalcInput label="Monthly Sends" value={monthlySends} onChange={setMonthlySends} />
        </CalcSection>

        <CalcSection title="Flow Inputs">
          <CalcInput label="Monthly Traffic" value={monthlyTraffic} onChange={setMonthlyTraffic} step={1000} />
          <CalcInput label="Form Submission Rate" value={formRate} onChange={setFormRate} suffix="%" step={0.1} />
          <CalcInput label="Agency Fee" value={agencyFee} onChange={setAgencyFee} prefix="$" />
        </CalcSection>
      </div>

      <div className="space-y-6">
        <CalcSection title="Campaign Revenue">
          <CalcOutput label="Revenue Per Send" value={fmt(campaignRevPerSend)} />
          <CalcOutput label="Monthly Campaign Revenue" value={fmt(campaignRevMonthly)} />
        </CalcSection>

        <CalcSection title="Flow Revenue">
          <CalcOutput label="New Subscribers/mo" value={fmtNum(newSubscribers)} />
          <CalcOutput label="Welcome Series Revenue" value={fmt(welcomeRev)} />
          <CalcOutput label="Abandoned Cart Revenue" value={fmt(abandonRev)} />
          <CalcOutput label="Post-Purchase Revenue" value={fmt(postPurchaseRev)} />
          <CalcOutput label="Total Flow Revenue" value={fmt(totalFlowRev)} />
        </CalcSection>

        <div className="bg-[#E8F5EE] rounded-xl p-5">
          <CalcOutput label="Total Gross Revenue" value={fmt(totalGrossRev)} highlight />
          <CalcOutput label="Net Revenue (After Fee)" value={fmt(netRev)} highlight />
        </div>
      </div>
    </div>
  )
}
