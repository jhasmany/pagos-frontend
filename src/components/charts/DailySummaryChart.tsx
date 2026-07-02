import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { EstadoConciliacion } from '@/types'
import { estadoColors } from '@/theme'

interface DailySummaryChartProps {
  data: EstadoConciliacion[]
}

export function DailySummaryChart({ data }: DailySummaryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="cantidad"
          nameKey="estado"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={(entry) => `${entry.payload.estado}`}
        >
          {data.map((entry) => (
            <Cell
              key={entry.estado}
              fill={estadoColors[entry.estado] ?? '#64748b'}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
