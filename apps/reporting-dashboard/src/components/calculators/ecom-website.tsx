'use client'

import { useState } from 'react'
import { CalcInput, CalcOutput, CalcSection, fmt, fmtPct, fmtNum } from './calculator-field'

export function EcomWebsiteCalculator() {
  const [traffic, setTraffic] = useState(50000)
  const [convRate, setConvRate] = useState(1.5)
  const [aov, setAov] = useState(145)
  const [targetConvRate, setTargetConvRate] = useState(2)
  const [agencyFee, setAgencyFee] = useState(5000)

  const currentPurchases = Math.round(traffic * (convRate / 100))
  const currentMrr = currentPurchases * aov
  const targetPurchases = Math.round(traffic * (targetConvRate / 100))
  const targetMrr = targetPurchases * aov
  const revenueIncrease = targetMrr - currentMrr
  const netIncrease = revenueIncrease - agencyFee
  const convImprovement = convRate > 0 ? ((targetConvRate - convRate) / convRate) * 100 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CalcSection title="Current Performance">
          <CalcInput label="Monthly Traffic" value={traffic} onChange={setTraffic} step={1000} />
          <CalcInput label="Current Conversion Rate" value={convRate} onChange={setConvRate} suffix="%" step={0.1} />
          <CalcInput label="Average Order Value" value={aov} onChange={setAov} prefix="$" />
        </CalcSection>

        <CalcSection title="Target">
          <CalcInput label="Target Conversion Rate" value={targetConvRate} onChange={setTargetConvRate} suffix="%" step={0.1} />
          <CalcInput label="Agency Fee" value={agencyFee} onChange={setAgencyFee} prefix="$" />
        </CalcSection>
      </div>

      <div className="space-y-6">
        <CalcSection title="Current">
          <CalcOutput label="Current Purchases" value={fmtNum(currentPurchases)} />
          <CalcOutput label="Current MRR" value={fmt(currentMrr)} />
        </CalcSection>

        <CalcSection title="After Optimization">
          <CalcOutput label="Target Purchases" value={fmtNum(targetPurchases)} />
          <CalcOutput label="Target MRR" value={fmt(targetMrr)} />
          <CalcOutput label="Conversion Improvement" value={fmtPct(convImprovement)} />
        </CalcSection>

        <div className="bg-[#E8F5EE] rounded-xl p-5">
          <CalcOutput label="Revenue Increase" value={fmt(revenueIncrease)} highlight />
          <CalcOutput label="Net Revenue Increase" value={fmt(netIncrease)} highlight />
        </div>
      </div>
    </div>
  )
}
