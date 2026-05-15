'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export function SidebarItem({
  href,
  icon,
  label,
}: {
  href: string
  icon: ReactNode
  label: string
}) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[14px] no-underline transition-all duration-150 ${
        isActive
          ? 'bg-white/10 text-white font-medium'
          : 'text-[#999] hover:bg-white/[0.06] hover:text-white'
      }`}
    >
      <span className="w-[18px] h-[18px] flex-shrink-0 [&>svg]:w-full [&>svg]:h-full">{icon}</span>
      {label}
    </Link>
  )
}
