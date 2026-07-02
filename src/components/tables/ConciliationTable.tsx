import type { Conciliacion } from '@/types'
import { EstadoBadge } from '@/components/common/EstadoBadge'
import { formatCurrency, formatDateTime } from '@/utils/formatters'

interface ConciliationTableProps {
  data: Conciliacion[]
}

export function ConciliationTable({ data }: ConciliationTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Transacción</th>
            <th className="px-4 py-3">Comercio</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Conciliada</th>
            <th className="px-4 py-3 text-right">Monto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                No hay conciliaciones para los filtros seleccionados.
              </td>
            </tr>
          ) : (
            data.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-700">{c.id}</td>
                <td className="px-4 py-3 text-brand-700">{c.transaccionId}</td>
                <td className="px-4 py-3 text-slate-700">{c.comercioNombre}</td>
                <td className="px-4 py-3">
                  <EstadoBadge estado={c.estado} />
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {c.fechaConciliacion
                    ? formatDateTime(c.fechaConciliacion)
                    : '—'}
                </td>
                <td className="px-4 py-3 text-right font-medium text-slate-700">
                  {formatCurrency(c.monto)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
