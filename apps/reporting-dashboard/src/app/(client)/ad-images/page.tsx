import { getClientUser } from '@/lib/queries/auth'
import { Card } from '@/components/ui/card'

export default async function AdImagesPage() {
  const { client } = await getClientUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold text-[#111110]">Ad Images</h1>
        <p className="text-[13px] text-[#6B6B60] mt-1">Generate styled ad images from your product photos with AI.</p>
      </div>

      <Card>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2} className="w-6 h-6">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[#111110] mb-1">AI Image Generator</p>
            <p className="text-[13px] text-[#9B9B90]">Coming soon. Paste a product URL and generate styled ad creatives.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
