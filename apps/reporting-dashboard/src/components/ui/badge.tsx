import type { ReactNode } from 'react'

type BadgeVariant = 'green' | 'red' | 'yellow' | 'blue' | 'gray'

const variantStyles: Record<BadgeVariant, string> = {
  green: 'bg-[#E8F5EE] text-[#2D7A4F]',
  red: 'bg-[#FDE8E8] text-[#D14343]',
  yellow: 'bg-[#FEF3CD] text-[#92700C]',
  blue: 'bg-[#E8F0FE] text-[#1A73E8]',
  gray: 'bg-[#F0F0EE] text-[#666]',
}

export function Badge({
  children,
  variant = 'gray',
  className = '',
}: {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={`inline-block px-2.5 py-[3px] rounded-[6px] text-[11px] font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
