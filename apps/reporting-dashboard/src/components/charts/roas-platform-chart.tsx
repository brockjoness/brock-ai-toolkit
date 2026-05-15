'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts'

interface RoasDataPoint {
  date: string
  meta: number
  google: number
}

export function RoasPlatformChart({
  data,
  target = 3.0,
}: {
  data: RoasDataPoint[]
  target?: number
}) {
  const chartData = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    meta: d.meta,
    google: d.google,
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[15px] font-semibold">ROAS by Platform</div>
          <div className="text-[12px] text-[#888]">Daily trend &middot; Target: {target.toFixed(1)}x</div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-[12px] text-[#888]">
            <span className="w-2 h-2 rounded-full inline-block bg-[#4285F4]" /> Meta
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#888]">
            <span className="w-2 h-2 rounded-full inline-block bg-[#34A853]" /> Google
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#888]">
            <span className="w-2 h-2 rounded-full inline-block bg-[rgba(0,0,0,0.15)]" /> Target
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
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
            tickFormatter={(v) => `${v.toFixed(1)}x`}
            domain={[2.0, 4.5]}
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
              `${Number(value).toFixed(2)}x`,
              String(name) === 'meta' ? 'Meta' : String(name) === 'google' ? 'Google' : String(name),
            ]}
          />
          <ReferenceLine
            y={target}
            stroke="rgba(0,0,0,0.12)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
          <Line
            type="monotone"
            dataKey="meta"
            stroke="#4285F4"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#4285F4' }}
          />
          <Line
            type="monotone"
            dataKey="google"
            stroke="#34A853"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#34A853' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
