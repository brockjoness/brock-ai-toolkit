import { getClientUser } from '@/lib/queries/auth'
import { getAgencyTheme, getAgencyThemeCSSVars } from '@/lib/agency-theme'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, clientUser, client } = await getClientUser()
  const theme = getAgencyTheme(client?.agency_slug || 'clickflow')
  const cssVars = getAgencyThemeCSSVars(theme)

  return (
    <div style={cssVars as React.CSSProperties}>
      <Sidebar
        theme={theme}
        clientName={client?.name || 'Dashboard'}
        userRole={clientUser.role}
      />
      <main
        className="ml-[240px] px-8 py-7 min-h-screen"
        style={{ background: 'var(--color-background)' }}
      >
        <Header
          clientName={client?.name || 'Dashboard'}
          theme={theme}
        />
        <div className="max-w-[1280px]">
          {children}
        </div>
      </main>
    </div>
  )
}
