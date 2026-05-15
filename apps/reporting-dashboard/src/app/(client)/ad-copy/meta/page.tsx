import { getClientUser } from '@/lib/queries/auth'
import { Card } from '@/components/ui/card'

export default async function MetaCopyPage() {
  const { client } = await getClientUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold text-[#111110]">Meta Ad Copy</h1>
        <p className="text-[13px] text-[#6B6B60] mt-1">Generate headlines, descriptions, and body copy for Meta campaigns.</p>
      </div>

      <Card>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#4285F4]/10 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth={2} className="w-6 h-6">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[#111110] mb-1">Meta Copy Generator</p>
            <p className="text-[13px] text-[#9B9B90]">Coming soon. AI-powered copy generation for Facebook & Instagram ads.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
