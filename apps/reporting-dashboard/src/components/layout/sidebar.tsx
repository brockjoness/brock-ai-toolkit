import type { AgencyTheme } from '@/lib/types'
import { SidebarItem } from './sidebar-item'

/* SVG Icons */
function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}
function ReportsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
    </svg>
  )
}
function PersonasIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function LibraryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M12 6v7" /><path d="M9 10l3-3 3 3" />
    </svg>
  )
}
function GeneratorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
function CalculatorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" />
      <line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="8" y1="18" x2="8" y2="18.01" />
      <line x1="12" y1="18" x2="16" y2="18" />
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function SidebarDivider() {
  return <div className="h-px bg-white/[0.08] my-3" />
}

function SidebarSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.08em] text-[#666] px-3 mb-1 mt-1 font-medium">
      {children}
    </div>
  )
}

export function Sidebar({
  theme,
  clientName,
  userRole,
}: {
  theme: AgencyTheme
  clientName: string
  userRole: string
}) {
  const initials = clientName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-[240px] flex flex-col z-10 px-3 py-5"
      style={{
        background: 'var(--color-sidebar, #1A1A18)',
        color: 'var(--color-sidebar-text, #fff)',
      }}
    >
      {/* Logo */}
      <div className="text-[18px] font-bold mb-8 px-3">
        clickflow<span className="text-[#6B6B60]">.dev</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5">
        <SidebarItem href="/dashboard" icon={<DashboardIcon />} label="Dashboard" />

        <SidebarDivider />
        <SidebarSectionLabel>Create</SidebarSectionLabel>
        <SidebarItem href="/generator" icon={<GeneratorIcon />} label="Generator" />
        <SidebarItem href="/ad-copy" icon={<CopyIcon />} label="Ad Copy" />
        <SidebarItem href="/ad-images" icon={<ImageIcon />} label="Ad Images" />
        <SidebarItem href="/personas" icon={<PersonasIcon />} label="Personas" />

        <SidebarDivider />
        <SidebarSectionLabel>Analyze</SidebarSectionLabel>
        <SidebarItem href="/reports" icon={<ReportsIcon />} label="Reports" />
        <SidebarItem href="/creative-library" icon={<LibraryIcon />} label="Creative Library" />

        <SidebarDivider />
        <SidebarSectionLabel>Tools</SidebarSectionLabel>
        <SidebarItem href="/calculators" icon={<CalculatorIcon />} label="ROI Calculators" />

        <div className="flex-1" />

        <SidebarDivider />
        <SidebarItem href="/settings" icon={<SettingsIcon />} label="Settings" />
      </nav>

      {/* Footer */}
      <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2.5 px-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgba(66,133,244,0.3)] to-[rgba(251,188,5,0.3)] flex items-center justify-center text-[12px] font-semibold">
          {initials}
        </div>
        <div>
          <div className="text-[13px] font-medium">{clientName}</div>
          <div className="text-[11px] text-[#666] capitalize">{userRole}</div>
        </div>
      </div>
    </aside>
  )
}
