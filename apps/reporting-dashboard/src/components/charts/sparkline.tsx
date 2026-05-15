'use client'

const colorMap = {
  green: '#2D7A4F',
  red: '#D14343',
  yellow: '#FBB005',
}

const inactiveColor = '#E0E0DE'

export function Sparkline({
  data,
  color = 'green',
}: {
  data: number[]
  color?: 'green' | 'red' | 'yellow'
}) {
  if (!data || data.length === 0) return null

  const max = Math.max(...data)
  const barColor = colorMap[color]

  return (
    <div className="flex items-end gap-0.5 h-6">
      {data.map((val, i) => {
        const height = max > 0 ? Math.max(4, (val / max) * 24) : 4
        const isActive = color !== 'red'
        return (
          <div
            key={i}
            className="w-1 rounded-sm"
            style={{
              height: `${height}px`,
              background: color === 'red'
                ? `${barColor}99` // 60% opacity for declining
                : color === 'yellow'
                  ? (i < data.length / 2 ? barColor : inactiveColor)
                  : isActive ? barColor : inactiveColor,
            }}
          />
        )
      })}
    </div>
  )
}
