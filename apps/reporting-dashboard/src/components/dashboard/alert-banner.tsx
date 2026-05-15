type AlertVariant = 'warning' | 'success'

const variants: Record<AlertVariant, { bg: string; border: string; text: string; icon: string }> = {
  warning: {
    bg: '#FEF9E7',
    border: '#F5E6A3',
    text: '#7A6200',
    icon: '\u26A0',
  },
  success: {
    bg: '#E8F5EE',
    border: '#A8D8B9',
    text: '#1B5E32',
    icon: '\u2713',
  },
}

export function AlertBanner({
  variant = 'warning',
  children,
}: {
  variant?: AlertVariant
  children: React.ReactNode
}) {
  const v = variants[variant]

  return (
    <div
      className="flex items-center gap-3 px-[18px] py-3.5 rounded-xl mb-6 text-[13px]"
      style={{
        background: v.bg,
        border: `1px solid ${v.border}`,
        color: v.text,
      }}
    >
      <span className="text-[18px] flex-shrink-0">{v.icon}</span>
      <div>{children}</div>
    </div>
  )
}
