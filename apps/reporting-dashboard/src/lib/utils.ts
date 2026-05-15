export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return '$' + (value / 1000000).toFixed(1) + 'M'
  }
  if (Math.abs(value) >= 1000) {
    return '$' + (value / 1000).toFixed(1) + 'k'
  }
  return '$' + value.toFixed(2)
}

export function formatCurrencyExact(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatPercent(value: number, decimals = 1): string {
  return value.toFixed(decimals) + '%'
}

export function formatRoas(value: number): string {
  return value.toFixed(2) + 'x'
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function calculatePacing(spent: number, budget: number, daysElapsed: number, daysInMonth: number): {
  pctSpent: number
  pctElapsed: number
  projected: number
  status: 'on_track' | 'ahead' | 'behind' | 'critical'
  variancePct: number
} {
  const pctSpent = budget > 0 ? (spent / budget) * 100 : 0
  const pctElapsed = (daysElapsed / daysInMonth) * 100
  const dailyRate = daysElapsed > 0 ? spent / daysElapsed : 0
  const projected = dailyRate * daysInMonth
  const variancePct = pctElapsed > 0 ? ((pctSpent - pctElapsed) / pctElapsed) * 100 : 0

  let status: 'on_track' | 'ahead' | 'behind' | 'critical' = 'on_track'
  if (Math.abs(variancePct) > 20) status = 'critical'
  else if (variancePct > 10) status = 'ahead'
  else if (variancePct < -15) status = 'behind'

  return { pctSpent, pctElapsed, projected, status, variancePct }
}

export function getDateRange(range: string): { from: string; to: string } {
  const now = new Date()
  const to = now.toISOString().split('T')[0]

  switch (range) {
    case '7d': {
      const from = new Date(now)
      from.setDate(from.getDate() - 7)
      return { from: from.toISOString().split('T')[0], to }
    }
    case '30d': {
      const from = new Date(now)
      from.setDate(from.getDate() - 30)
      return { from: from.toISOString().split('T')[0], to }
    }
    case '90d': {
      const from = new Date(now)
      from.setDate(from.getDate() - 90)
      return { from: from.toISOString().split('T')[0], to }
    }
    case 'mtd':
    default: {
      const from = new Date(now.getFullYear(), now.getMonth(), 1)
      return { from: from.toISOString().split('T')[0], to }
    }
  }
}

export function getDaysInMonth(date: Date = new Date()): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function getDaysElapsed(date: Date = new Date()): number {
  return date.getDate()
}
