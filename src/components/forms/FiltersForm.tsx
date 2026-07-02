import { useComercios } from '@/hooks/useTransactions'
import { ESTADOS_TRANSACCION, ESTADO_LABELS } from '@/utils/constants'
import type { EstadoTransaccion } from '@/types'

export interface FiltersValue {
  estado: EstadoTransaccion | ''
  comercioId: string
  busqueda: string
  fecha?: string
}

interface FiltersFormProps {
  value: FiltersValue
  onChange: (value: FiltersValue) => void
  showBusqueda?: boolean
  showFecha?: boolean
}

const fieldClass =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'

export function FiltersForm({
  value,
  onChange,
  showBusqueda = true,
  showFecha = false,
}: FiltersFormProps) {
  const { data: comercios } = useComercios()

  const update = (patch: Partial<FiltersValue>) =>
    onChange({ ...value, ...patch })

  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label className="text-xs font-medium text-slate-500">Estado</label>
        <select
          className={fieldClass}
          value={value.estado}
          onChange={(e) =>
            update({ estado: e.target.value as EstadoTransaccion | '' })
          }
        >
          <option value="">Todos</option>
          {ESTADOS_TRANSACCION.map((e) => (
            <option key={e} value={e}>
              {ESTADO_LABELS[e]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">Comercio</label>
        <select
          className={fieldClass}
          value={value.comercioId}
          onChange={(e) => update({ comercioId: e.target.value })}
        >
          <option value="">Todos</option>
          {comercios?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      {showFecha && (
        <div>
          <label className="text-xs font-medium text-slate-500">Fecha</label>
          <input
            type="date"
            className={fieldClass}
            value={value.fecha ?? ''}
            onChange={(e) => update({ fecha: e.target.value })}
          />
        </div>
      )}

      {showBusqueda && (
        <div>
          <label className="text-xs font-medium text-slate-500">Búsqueda</label>
          <input
            type="text"
            placeholder="ID, comercio, referencia…"
            className={fieldClass}
            value={value.busqueda}
            onChange={(e) => update({ busqueda: e.target.value })}
          />
        </div>
      )}
    </div>
  )
}
