import { getClientUser } from '@/lib/queries/auth'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default async function AdCopyPage() {
  const { client } = await getClientUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold text-[#111110]">Ad Copy Generator</h1>
        <p className="text-[13px] text-[#6B6B60] mt-1">Generate platform-specific ad copy with AI. Select a platform to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/ad-copy/meta" className="no-underline">
          <Card className="hover:border-[#4285F4] transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#4285F4]/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth={2} className="w-5 h-5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-[#111110] group-hover:text-[#4285F4] transition-colors">Meta Ads</h2>
                <p className="text-[12px] text-[#6B6B60]">Headlines, descriptions, body copy</p>
              </div>
            </div>
            <p className="text-[13px] text-[#9B9B90]">Generate scroll-stopping ad copy for Facebook and Instagram campaigns. Includes primary text, headlines, and descriptions.</p>
          </Card>
        </Link>

        <Link href="/ad-copy/google" className="no-underline">
          <Card className="hover:border-[#34A853] transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#34A853]/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth={2} className="w-5 h-5">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-[#111110] group-hover:text-[#34A853] transition-colors">Google Ads</h2>
                <p className="text-[12px] text-[#6B6B60]">Search, PMax, extensions</p>
              </div>
            </div>
            <p className="text-[13px] text-[#9B9B90]">Generate up to 30 headlines and 10 descriptions for Search and Performance Max campaigns. Includes callouts, sitelinks, and more.</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
