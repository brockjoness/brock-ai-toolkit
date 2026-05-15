import type { SelectHTMLAttributes } from 'react'

export function Select({
  children,
  className = '',
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { className?: string; children: React.ReactNode }) {
  return (
    <select
      className={`w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] bg-white text-[#1A1A18] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent,#2D7A4F)] focus:border-transparent transition-all appearance-none ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
