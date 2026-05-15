import { requireAdmin } from '@/lib/queries/auth'
import { fetchAllOnboardingSubmissions } from '@/lib/queries/clients'
import { Card } from '@/components/ui/card'
import { OnboardingTable } from '@/components/admin/onboarding-table'

export default async function AdminOnboardingPage() {
  await requireAdmin()
  const submissions = await fetchAllOnboardingSubmissions()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold text-[#1A1A18]">Onboarding Pipeline</h1>
        <span className="text-[13px] text-[#888]">{submissions.length} submissions</span>
      </div>

      <Card className="overflow-hidden p-0">
        <OnboardingTable submissions={submissions} />
      </Card>
    </div>
  )
}
