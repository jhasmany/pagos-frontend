import { useState } from 'react'
import { useComercios } from '@/hooks/useTransactions'
import { useResumenDiario } from '@/hooks/useConciliations'
import { PageHeader, Card } from '@/components/common/PageHeader'
import { Loading } from '@/components/common/Loading'
import { KpiCard } from '@/components/common/KpiCard'
import { formatCurrency, formatNumber } from '@/utils/formatters'

const fieldClass =
  'w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'

export function ResumenDiarioPage() {
  const { data: comercios } = useComercios()
  const [comercioId, setComercioId] = useState('')
  const { data: resumen, isLoading } = useResumenDiario(comercioId || undefined)

  return (
    <div>
      <PageHeader
        title="Resumen Diario"
        subtitle="GET /api/v1/comercios/{id}/conciliacion (mock)"
      />

      <Card className="mb-6">
        <label className="text-xs font-medium text-slate-500">Comercio</label>
        <select
          className={fieldClass}
          value={comercioId}
          onChange={(e) => setComercioId(e.target.value)}
        >
          <option value="">Seleccione un comercio…</option>
          {comercios?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </Card>

      {!comercioId && (
        <p className="text-sm text-slate-400">
          Seleccione un comercio para ver su resumen diario.
        </p>
      )}

      {comercioId && isLoading && <Loading />}

      {comercioId && !isLoading && !resumen && (
        <p className="text-sm text-slate-400">
          No hay resumen disponible para este comercio.
        </p>
      )}

      {resumen && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Total operaciones"
            value={formatNumber(resumen.totalOperaciones)}
            icon="🧾"
          />
          <KpiCard
            label="Total monto"
            value={formatCurrency(resumen.totalMonto)}
            icon="💰"
            accent="text-slate-700"
          />
          <KpiCard
            label="Conciliadas"
            value={formatNumber(resumen.totalConciliadas)}
            icon="✅"
            accent="text-emerald-600"
          />
          <KpiCard
            label="Fallidas"
            value={formatNumber(resumen.totalFallidas)}
            icon="⚠️"
            accent="text-red-600"
          />
        </div>
      )}
    </div>
  )
}
