'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
  ComposedChart,
} from 'recharts'
import type { DailyMetric } from '@/lib/types'

export function RevenueSpendChart({ data }: { data: DailyMetric[] }) {
  const chartData = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: d.revenue,
    spend: d.spend,
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[15px] font-semibold">Revenue vs. Spend</div>
          <div className="text-[12px] text-[#888]">Daily, all platforms blended</div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-[12px] text-[#888]">
            <span className="w-2 h-2 rounded-full inline-block bg-[#2D7A4F]" /> Revenue
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#888]">
            <span className="w-2 h-2 rounded-full inline-block bg-[#4285F4]" /> Spend
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#F0F0EE" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#bbb', fontFamily: 'DM Sans' }}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#bbb', fontFamily: 'DM Mono' }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #E8E8E6',
              borderRadius: 10,
              fontSize: 12,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            formatter={(value, name) => [
              `$${Number(value).toLocaleString()}`,
              String(name).charAt(0).toUpperCase() + String(name).slice(1),
            ]}
          />
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2D7A4F" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#2D7A4F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4285F4" stopOpacity={0.06} />
              <stop offset="100%" stopColor="#4285F4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2D7A4F"
            strokeWidth={2.5}
            fill="url(#revenueGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#2D7A4F' }}
          />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="#4285F4"
            strokeWidth={2}
            strokeDasharray="5 3"
            fill="url(#spendGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#4285F4' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
