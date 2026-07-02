import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { MontoPorComercio } from '@/types'
import { formatCurrency } from '@/utils/formatters'
import { palette } from '@/theme'

interface MerchantAmountChartProps {
  data: MontoPorComercio[]
}

export function MerchantAmountChart({ data }: MerchantAmountChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 16, bottom: 0, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" fontSize={12} stroke="#94a3b8" />
        <YAxis
          type="category"
          dataKey="comercio"
          fontSize={11}
          width={120}
          stroke="#94a3b8"
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(v) => [formatCurrency(typeof v === 'number' ? v : 0), 'Monto']}
        />
        <Bar dataKey="monto" fill={palette.success} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
