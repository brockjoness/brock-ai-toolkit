'use client'

import { useState } from 'react'
import { CalcInput, CalcOutput, CalcSection, fmt, fmtExact, fmtPct, fmtX, fmtNum } from './calculator-field'

export function EcomAdsCalculator() {
  const [productCost, setProductCost] = useState(50)
  const [shippingCost, setShippingCost] = useState(8)
  const [fulfillmentCost, setFulfillmentCost] = useState(1)
  const [merchantFees, setMerchantFees] = useState(2.9)
  const [aov, setAov] = useState(150)
  const [customerShipping, setCustomerShipping] = useState(10)
  const [adBudget, setAdBudget] = useState(10000)
  const [roasTarget, setRoasTarget] = useState(3.2)
  const [agencyFee, setAgencyFee] = useState(5000)

  const totalRevPerOrder = aov + customerShipping
  const merchantFeePerOrder = totalRevPerOrder * (merchantFees / 100)
  const totalCostPerOrder = productCost + shippingCost + fulfillmentCost + merchantFeePerOrder
  const profitPerOrder = totalRevPerOrder - totalCostPerOrder
  const grossMargin = totalRevPerOrder > 0 ? (profitPerOrder / totalRevPerOrder) * 100 : 0

  const projectedRevenue = adBudget * roasTarget
  const avgCostPerPurchase = roasTarget > 0 ? aov / roasTarget : 0
  const projectedSales = avgCostPerPurchase > 0 ? Math.round(adBudget / avgCostPerPurchase) : 0
  const grossRevenue = projectedSales * totalRevPerOrder
  const totalCogs = projectedSales * totalCostPerOrder
  const netRevenue = grossRevenue - totalCogs - adBudget
  const projectedProfit = netRevenue - agencyFee
  const profitMargin = grossRevenue > 0 ? (projectedProfit / grossRevenue) * 100 : 0

  const breakEvenRoas = profitPerOrder > 0 ? totalRevPerOrder / profitPerOrder : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CalcSection title="Cost Structure">
          <CalcInput label="Product Cost" value={productCost} onChange={setProductCost} prefix="$" />
          <CalcInput label="Shipping Cost" value={shippingCost} onChange={setShippingCost} prefix="$" />
          <CalcInput label="Fulfillment Cost" value={fulfillmentCost} onChange={setFulfillmentCost} prefix="$" />
          <CalcInput label="Merchant Processing Fees" value={merchantFees} onChange={setMerchantFees} suffix="%" step={0.1} />
        </CalcSection>

        <CalcSection title="Revenue">
          <CalcInput label="Average Order Value" value={aov} onChange={setAov} prefix="$" />
          <CalcInput label="Customer Shipping Charge" value={customerShipping} onChange={setCustomerShipping} prefix="$" />
        </CalcSection>

        <CalcSection title="Advertising">
          <CalcInput label="Monthly Ad Budget" value={adBudget} onChange={setAdBudget} prefix="$" step={500} />
          <CalcInput label="Target ROAS" value={roasTarget} onChange={setRoasTarget} suffix="x" step={0.1} />
          <CalcInput label="Agency Fee" value={agencyFee} onChange={setAgencyFee} prefix="$" />
        </CalcSection>
      </div>

      <div className="space-y-6">
        <CalcSection title="Per-Order Economics">
          <CalcOutput label="Total Fees Per Order" value={fmtExact(totalCostPerOrder)} />
          <CalcOutput label="Profit Per Order" value={fmtExact(profitPerOrder)} />
          <CalcOutput label="Gross Profit Margin" value={fmtPct(grossMargin)} />
          <CalcOutput label="Break-Even ROAS" value={fmtX(breakEvenRoas)} />
        </CalcSection>

        <CalcSection title="Monthly Projections">
          <CalcOutput label="Avg Cost Per Purchase" value={fmtExact(avgCostPerPurchase)} />
          <CalcOutput label="Projected Sales" value={fmtNum(projectedSales)} />
          <CalcOutput label="Gross Revenue" value={fmt(grossRevenue)} />
          <CalcOutput label="Cost of Goods" value={fmt(totalCogs)} />
          <CalcOutput label="Net Revenue (After Ads)" value={fmt(netRevenue)} />
          <CalcOutput label="Agency Fee" value={fmt(agencyFee)} />
        </CalcSection>

        <div className="bg-[#E8F5EE] rounded-xl p-5">
          <CalcOutput label="Projected Net Profit" value={fmt(projectedProfit)} highlight />
          <CalcOutput label="Profit Margin" value={fmtPct(profitMargin)} highlight />
        </div>
      </div>
    </div>
  )
}
