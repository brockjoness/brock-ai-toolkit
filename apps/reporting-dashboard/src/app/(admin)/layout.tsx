import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { getAgencyTheme, getAgencyThemeCSSVars } from '@/lib/agency-theme'
import { AdminSidebar } from '@/components/layout/admin-sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { data: clientUsers } = await supabase
    .from('client_users')
    .select('*')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .limit(1)

  const clientUser = clientUsers?.[0] ?? null

  if (!clientUser) {
    redirect('/login')
  }

  // Admin always uses Clickflow theme
  const theme = getAgencyTheme('clickflow')
  const cssVars = getAgencyThemeCSSVars(theme)

  return (
    <div style={cssVars as React.CSSProperties}>
      <AdminSidebar theme={theme} userEmail={user.email || 'Admin'} />
      <main
        className="ml-[240px] px-8 py-7 min-h-screen"
        style={{ background: 'var(--color-background)' }}
      >
        <div className="max-w-[1280px]">
          {children}
        </div>
      </main>
    </div>
  )
}
