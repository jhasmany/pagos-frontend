import { useNavigate } from 'react-router-dom'
import { PageHeader, Card } from '@/components/common/PageHeader'
import { TransactionForm } from '@/components/forms/TransactionForm'
import { useCrearTransaccion } from '@/hooks/useTransactions'
import { useAppStore } from '@/store/appStore'
import { ROUTES } from '@/routes/RouteConfig'
import type { CrearTransaccionSchema } from '@/utils/validators'

export function CrearTransaccionPage() {
  const crear = useCrearTransaccion()
  const pushToast = useAppStore((s) => s.pushToast)
  const navigate = useNavigate()

  const handleSubmit = (values: CrearTransaccionSchema) => {
    crear.mutate(values, {
      onSuccess: (nueva) => {
        pushToast('success', `Transacción ${nueva.id} registrada`)
        navigate(ROUTES.detalleTransaccion(nueva.id))
      },
      onError: () => pushToast('error', 'No se pudo registrar la transacción'),
    })
  }

  return (
    <div>
      <PageHeader
        title="Nueva transacción"
        subtitle="Registrar una transacción POS"
      />
      <Card className="max-w-lg">
        <TransactionForm
          onSubmit={handleSubmit}
          isSubmitting={crear.isPending}
        />
      </Card>
    </div>
  )
}
