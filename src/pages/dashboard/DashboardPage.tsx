import { useDashboard } from '@/hooks/useDashboard'
import { KpiCard } from '@/components/common/KpiCard'
import { PageHeader, Card } from '@/components/common/PageHeader'
import { Loading } from '@/components/common/Loading'
import { TransactionChart } from '@/components/charts/TransactionChart'
import { MerchantAmountChart } from '@/components/charts/MerchantAmountChart'
import { DailySummaryChart } from '@/components/charts/DailySummaryChart'
import { formatCurrency, formatNumber } from '@/utils/formatters'

export function DashboardPage() {
  const { data, isLoading } = useDashboard()

  if (isLoading || !data) return <Loading label="Cargando dashboard…" />

  const { kpis, transaccionesPorHora, montoPorComercio, estadosConciliacion } =
    data

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Indicadores operativos en tiempo real"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Transacciones"
          value={formatNumber(kpis.totalTransacciones)}
          icon="💳"
        />
        <KpiCard
          label="Conciliadas"
          value={formatNumber(kpis.totalConciliadas)}
          icon="✅"
          accent="text-emerald-600"
        />
        <KpiCard
          label="Fallidas"
          value={formatNumber(kpis.totalFallidas)}
          icon="⚠️"
          accent="text-red-600"
        />
        <KpiCard
          label="Monto procesado"
          value={formatCurrency(kpis.montoProcesado)}
          icon="💰"
          accent="text-slate-700"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Transacciones por hora">
          <TransactionChart data={transaccionesPorHora} />
        </Card>
        <Card title="Estados de conciliación">
          <DailySummaryChart data={estadosConciliacion} />
        </Card>
        <Card title="Monto por comercio" className="lg:col-span-2">
          <MerchantAmountChart data={montoPorComercio} />
        </Card>
      </div>
    </div>
  )
}
