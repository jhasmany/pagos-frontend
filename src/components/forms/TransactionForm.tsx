import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  crearTransaccionSchema,
  type CrearTransaccionSchema,
} from '@/utils/validators'
import { useComercios } from '@/hooks/useTransactions'
import { METODOS_PAGO, METODO_PAGO_LABELS } from '@/utils/constants'

interface TransactionFormProps {
  onSubmit: (values: CrearTransaccionSchema) => void
  isSubmitting?: boolean
}

const fieldClass =
  'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'
const errorClass = 'mt-1 text-xs text-red-600'

export function TransactionForm({
  onSubmit,
  isSubmitting,
}: TransactionFormProps) {
  const { data: comercios } = useComercios()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearTransaccionSchema>({
    resolver: zodResolver(crearTransaccionSchema),
    defaultValues: { comercioId: '', metodoPago: 'TARJETA' },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4"
    >
      <div>
        <label className="text-sm font-medium text-slate-700">Comercio</label>
        <select className={fieldClass} {...register('comercioId')}>
          <option value="">Seleccione un comercio…</option>
          {comercios?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        {errors.comercioId && (
          <p className={errorClass}>{errors.comercioId.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Monto</label>
        <input
          type="number"
          step="0.01"
          className={fieldClass}
          {...register('monto', { valueAsNumber: true })}
        />
        {errors.monto && <p className={errorClass}>{errors.monto.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Método de Pago
        </label>
        <select className={fieldClass} {...register('metodoPago')}>
          {METODOS_PAGO.map((m) => (
            <option key={m} value={m}>
              {METODO_PAGO_LABELS[m]}
            </option>
          ))}
        </select>
        {errors.metodoPago && (
          <p className={errorClass}>{errors.metodoPago.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Registrando…' : 'Registrar transacción'}
      </button>
    </form>
  )
}
