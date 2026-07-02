import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TransaccionesPorHora } from '@/types'
import { palette } from '@/theme'

interface TransactionChartProps {
  data: TransaccionesPorHora[]
}

export function TransactionChart({ data }: TransactionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="hora" fontSize={12} stroke="#94a3b8" />
        <YAxis fontSize={12} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(v) => [`${typeof v === 'number' ? v : 0}`, 'Transacciones']}
        />
        <Bar dataKey="cantidad" fill={palette.brand} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
