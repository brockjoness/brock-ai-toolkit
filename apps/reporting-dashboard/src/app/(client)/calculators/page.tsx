import { getClientUser } from '@/lib/queries/auth'
import { Card } from '@/components/ui/card'
import { CalculatorTabs } from '@/components/calculators/calculator-tabs'

export default async function CalculatorsPage() {
  await getClientUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold text-[#111110]">ROI Calculators</h1>
        <p className="text-[13px] text-[#6B6B60] mt-1">Calculate your return on investment across ads, website, email, and SEO.</p>
      </div>

      <Card>
        <CalculatorTabs />
      </Card>
    </div>
  )
}
