import { getClientUser } from '@/lib/queries/auth'
import { Card } from '@/components/ui/card'

export default async function CreativeLibraryPage() {
  const { client } = await getClientUser()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#111110]">Creative Library</h1>
          <p className="text-[13px] text-[#6B6B60] mt-1">Save and organize ad inspiration from around the web.</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#EC4899]/10 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth={2} className="w-6 h-6">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[#111110] mb-1">Inspiration Board</p>
            <p className="text-[13px] text-[#9B9B90]">Coming soon. Paste ad links to save and preview creative inspiration.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
