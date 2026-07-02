import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTransaction } from '@/hooks/useTransactions'
import { PageHeader, Card } from '@/components/common/PageHeader'
import { Loading } from '@/components/common/Loading'
import { EstadoBadge } from '@/components/common/EstadoBadge'
import { formatCurrency, formatDateTime } from '@/utils/formatters'
import { METODO_PAGO_LABELS } from '@/utils/constants'
import { ROUTES } from '@/routes/RouteConfig'

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between border-b border-slate-100 py-3 text-sm last:border-0">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  )
}

export function DetalleTransaccionPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useTransaction(id)

  if (isLoading) return <Loading />

  if (!data) {
    return (
      <div>
        <PageHeader title="Transacción no encontrada" />
        <Link to={ROUTES.transacciones} className="text-sm text-brand-600">
          ← Volver a transacciones
        </Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={`Transacción ${data.id}`}
        subtitle={`Referencia ${data.referencia}`}
        action={
          <Link
            to={ROUTES.transacciones}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            ← Volver
          </Link>
        }
      />
      <Card className="max-w-lg">
        <Row label="Comercio" value={data.comercioNombre} />
        <Row label="Monto" value={formatCurrency(data.monto)} />
        <Row
          label="Método de pago"
          value={METODO_PAGO_LABELS[data.metodoPago]}
        />
        <Row label="Estado" value={<EstadoBadge estado={data.estado} />} />
        <Row label="Fecha" value={formatDateTime(data.fecha)} />
        <Row label="Referencia" value={data.referencia} />
      </Card>
    </div>
  )
}
