export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--color-card,#fff)] border border-[var(--color-card-border,#E8E8E6)] rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  )
}

export function ChartCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--color-card,#fff)] border border-[var(--color-card-border,#E8E8E6)] rounded-2xl px-6 py-[22px] ${className}`}>
      {children}
    </div>
  )
}

export function TableCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--color-card,#fff)] border border-[var(--color-card-border,#E8E8E6)] rounded-2xl px-6 py-[22px] mb-4 ${className}`}>
      {children}
    </div>
  )
}
