import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#1A1A18] text-white border border-[#1A1A18] hover:bg-[#2a2a28]',
  secondary: 'bg-white text-[#1A1A18] border border-[#E8E8E6] hover:border-[#ccc]',
  accent: 'bg-[#2D7A4F] text-white border border-[#2D7A4F] hover:bg-[#256B43]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[12px]',
  md: 'px-4 py-2 text-[13px]',
  lg: 'px-6 py-2.5 text-[14px]',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-[10px] font-medium cursor-pointer transition-all duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
