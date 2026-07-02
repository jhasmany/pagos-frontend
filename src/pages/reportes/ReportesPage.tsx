import { useResumenes } from '@/hooks/useConciliations'
import { PageHeader, Card } from '@/components/common/PageHeader'
import { Loading } from '@/components/common/Loading'
import { MerchantAmountChart } from '@/components/charts/MerchantAmountChart'
import { formatCurrency, formatNumber } from '@/utils/formatters'

export function ReportesPage() {
  const { data, isLoading } = useResumenes()

  if (isLoading || !data) return <Loading label="Cargando reportes…" />

  const chartData = data.map((r) => ({
    comercio: r.comercioNombre,
    monto: r.totalMonto,
  }))

  const totalMonto = data.reduce((acc, r) => acc + r.totalMonto, 0)
  const totalOperaciones = data.reduce((acc, r) => acc + r.totalOperaciones, 0)

  return (
    <div>
      <PageHeader
        title="Reportes"
        subtitle="Consolidado diario por comercio"
      />

      <Card title="Monto procesado por comercio" className="mb-6">
        <MerchantAmountChart data={chartData} />
      </Card>

      <Card title="Detalle por comercio">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2">Comercio</th>
                <th className="py-2 text-right">Operaciones</th>
                <th className="py-2 text-right">Conciliadas</th>
                <th className="py-2 text-right">Fallidas</th>
                <th className="py-2 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((r) => (
                <tr key={r.comercioId}>
                  <td className="py-2 text-slate-700">{r.comercioNombre}</td>
                  <td className="py-2 text-right text-slate-600">
                    {formatNumber(r.totalOperaciones)}
                  </td>
                  <td className="py-2 text-right text-emerald-600">
                    {formatNumber(r.totalConciliadas)}
                  </td>
                  <td className="py-2 text-right text-red-600">
                    {formatNumber(r.totalFallidas)}
                  </td>
                  <td className="py-2 text-right font-medium text-slate-700">
                    {formatCurrency(r.totalMonto)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200 font-semibold text-slate-700">
                <td className="py-2">Total</td>
                <td className="py-2 text-right">
                  {formatNumber(totalOperaciones)}
                </td>
                <td className="py-2" colSpan={2} />
                <td className="py-2 text-right">{formatCurrency(totalMonto)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  )
}
