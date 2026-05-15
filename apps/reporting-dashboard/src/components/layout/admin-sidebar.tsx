import type { AgencyTheme } from '@/lib/types'
import { SidebarItem } from './sidebar-item'

function OverviewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function ClientsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function OnboardingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  )
}

function RequestsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function SidebarDivider() {
  return <div className="h-px bg-white/[0.08] my-4" />
}

function SidebarSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.05em] text-[#555] px-3 mb-1">
      {children}
    </div>
  )
}

export function AdminSidebar({
  theme,
  userEmail,
}: {
  theme: AgencyTheme
  userEmail: string
}) {
  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-[240px] flex flex-col z-10 px-4 py-6"
      style={{
        background: 'var(--color-sidebar, #1A1A18)',
        color: 'var(--color-sidebar-text, #fff)',
      }}
    >
      {/* Logo */}
      <div className="text-[20px] font-bold mb-10 px-2">
        clickflow<span style={{ color: 'var(--color-accent, #2D7A4F)' }}>.dev</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        <SidebarSectionLabel>Admin</SidebarSectionLabel>
        <SidebarItem href="/admin" icon={<OverviewIcon />} label="Overview" />
        <SidebarItem href="/admin/clients" icon={<ClientsIcon />} label="Clients" />

        <SidebarDivider />
        <SidebarSectionLabel>Manage</SidebarSectionLabel>
        <SidebarItem href="/admin/onboarding" icon={<OnboardingIcon />} label="Onboarding" />
        <SidebarItem href="/admin/requests" icon={<RequestsIcon />} label="Requests" />

        <div className="flex-1" />
      </nav>

      {/* Footer */}
      <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2.5 px-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgba(45,122,79,0.4)] to-[rgba(45,122,79,0.15)] flex items-center justify-center text-[13px] font-semibold">
          A
        </div>
        <div>
          <div className="text-[13px] font-medium truncate max-w-[150px]">{userEmail}</div>
          <div className="text-[11px] text-[#777]">Admin</div>
        </div>
      </div>
    </aside>
  )
}
