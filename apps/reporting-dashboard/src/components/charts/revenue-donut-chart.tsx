'use client'

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

interface ChannelRevenue {
  name: string
  value: number
  color: string
}

const COLORS = {
  meta: '#4285F4',
  google: '#34A853',
  klaviyo: '#8B5CF6',
}

export function RevenueDonutChart({
  channels,
  totalLabel = 'Total Revenue',
}: {
  channels: ChannelRevenue[]
  totalLabel?: string
}) {
  const total = channels.reduce((sum, c) => sum + c.value, 0)
  const formatted = total >= 1000
    ? `$${(total / 1000).toFixed(1)}k`
    : `$${total.toLocaleString()}`

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[15px] font-semibold">Revenue by Channel</div>
          <div className="text-[12px] text-[#888]">March 2026 MTD</div>
        </div>
      </div>
      <div className="relative w-[220px] h-[220px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={channels}
              cx="50%"
              cy="50%"
              innerRadius="72%"
              outerRadius="100%"
              dataKey="value"
              stroke="none"
              paddingAngle={0}
            >
              {channels.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #E8E8E6',
                borderRadius: 10,
                fontSize: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-[28px] font-bold">{formatted}</div>
          <div className="text-[11px] text-[#888]">{totalLabel}</div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-3">
        {channels.map((c) => (
          <div key={c.name} className="flex items-center gap-1.5 text-[12px] text-[#888]">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: c.color }} />
            {c.name} ${(c.value / 1000).toFixed(1)}k
          </div>
        ))}
      </div>
    </div>
  )
}
