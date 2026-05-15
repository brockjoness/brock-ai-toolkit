import type { TextareaHTMLAttributes } from 'react'

export function Textarea({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) {
  return (
    <textarea
      className={`w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] bg-white text-[#1A1A18] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent,#2D7A4F)] focus:border-transparent transition-all min-h-[100px] resize-y ${className}`}
      {...props}
    />
  )
}
