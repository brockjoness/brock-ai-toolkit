import { getClientUser } from '@/lib/queries/auth'
import { Card } from '@/components/ui/card'

export default async function GoogleCopyPage() {
  const { client } = await getClientUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold text-[#111110]">Google Ad Copy</h1>
        <p className="text-[13px] text-[#6B6B60] mt-1">Generate headlines, descriptions, and extensions for Google campaigns.</p>
      </div>

      <Card>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#34A853]/10 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth={2} className="w-6 h-6">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[#111110] mb-1">Google Copy Generator</p>
            <p className="text-[13px] text-[#9B9B90]">Coming soon. Generate up to 30 headlines and 10 descriptions for Search & PMax.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
