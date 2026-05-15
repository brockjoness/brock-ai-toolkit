'use client'

import { useState } from 'react'
import { CalcInput, CalcOutput, CalcSection, fmt, fmtPct, fmtNum } from './calculator-field'

export function SeoCalculator() {
  const [keywords, setKeywords] = useState(14)
  const [searchVolume, setSearchVolume] = useState(10000)
  const [ctr, setCtr] = useState(13)
  const [convRate, setConvRate] = useState(2)
  const [aov, setAov] = useState(65)
  const [agencyFee, setAgencyFee] = useState(5000)
  const [difficulty, setDifficulty] = useState(50)

  const rankingFactor = (100 - difficulty) / 100
  const clicksPerKeyword = Math.round(searchVolume * rankingFactor * (ctr / 100))
  const totalVisitors = clicksPerKeyword * keywords
  const purchases = Math.round(totalVisitors * (convRate / 100))
  const revenue = purchases * aov
  const profit = revenue - agencyFee
  const roi = agencyFee > 0 ? (profit / agencyFee) * 100 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CalcSection title="SEO Inputs">
          <CalcInput label="Keywords Targeted" value={keywords} onChange={setKeywords} />
          <CalcInput label="Avg. Monthly Search Volume" value={searchVolume} onChange={setSearchVolume} step={500} />
          <CalcInput label="Ranking Difficulty" value={difficulty} onChange={setDifficulty} suffix="/100" max={100} />
          <CalcInput label="Click-Through Rate" value={ctr} onChange={setCtr} suffix="%" step={0.5} />
          <CalcInput label="Website Conversion Rate" value={convRate} onChange={setConvRate} suffix="%" step={0.1} />
          <CalcInput label="Average Order Size" value={aov} onChange={setAov} prefix="$" />
          <CalcInput label="Agency Fee" value={agencyFee} onChange={setAgencyFee} prefix="$" />
        </CalcSection>
      </div>

      <div className="space-y-6">
        <CalcSection title="Outcomes">
          <CalcOutput label="Clicks Per Keyword" value={fmtNum(clicksPerKeyword)} />
          <CalcOutput label="New Site Visitors" value={fmtNum(totalVisitors)} />
          <CalcOutput label="Net-New Purchases" value={fmtNum(purchases)} />
          <CalcOutput label="Net-New Revenue" value={fmt(revenue)} />
        </CalcSection>

        <div className="bg-[#E8F5EE] rounded-xl p-5">
          <CalcOutput label="Projected Gross Profit" value={fmt(profit)} highlight />
          <CalcOutput label="Projected ROI" value={fmtPct(roi)} highlight />
        </div>
      </div>
    </div>
  )
}
