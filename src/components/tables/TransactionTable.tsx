import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Transaccion } from '@/types'
import { EstadoBadge } from '@/components/common/EstadoBadge'
import { formatCurrency, formatDateTime } from '@/utils/formatters'
import { METODO_PAGO_LABELS } from '@/utils/constants'
import { ROUTES } from '@/routes/RouteConfig'

type SortKey = 'fecha' | 'monto' | 'comercioNombre'
const PAGE_SIZE = 8

interface TransactionTableProps {
  data: Transaccion[]
}

export function TransactionTable({ data }: TransactionTableProps) {
  const navigate = useNavigate()
  const [sortKey, setSortKey] = useState<SortKey>('fecha')
  const [asc, setAsc] = useState(false)
  const [page, setPage] = useState(0)

  const sorted = useMemo(() => {
    const copy = [...data]
    copy.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return asc ? cmp : -cmp
    })
    return copy
  }, [data, sortKey, asc])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages - 1)
  const pageRows = sorted.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE,
  )

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAsc((v) => !v)
    } else {
      setSortKey(key)
      setAsc(false)
    }
    setPage(0)
  }

  const sortIcon = (key: SortKey) =>
    key === sortKey ? (asc ? ' ▲' : ' ▼') : ''

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th
              className="cursor-pointer px-4 py-3"
              onClick={() => toggleSort('comercioNombre')}
            >
              Comercio{sortIcon('comercioNombre')}
            </th>
            <th
              className="cursor-pointer px-4 py-3"
              onClick={() => toggleSort('fecha')}
            >
              Fecha{sortIcon('fecha')}
            </th>
            <th className="px-4 py-3">Método</th>
            <th className="px-4 py-3">Estado</th>
            <th
              className="cursor-pointer px-4 py-3 text-right"
              onClick={() => toggleSort('monto')}
            >
              Monto{sortIcon('monto')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {pageRows.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                No hay transacciones para los filtros seleccionados.
              </td>
            </tr>
          ) : (
            pageRows.map((t) => (
              <tr
                key={t.id}
                onClick={() => navigate(ROUTES.detalleTransaccion(t.id))}
                className="cursor-pointer hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium text-brand-700">{t.id}</td>
                <td className="px-4 py-3 text-slate-700">{t.comercioNombre}</td>
                <td className="px-4 py-3 text-slate-500">
                  {formatDateTime(t.fecha)}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {METODO_PAGO_LABELS[t.metodoPago]}
                </td>
                <td className="px-4 py-3">
                  <EstadoBadge estado={t.estado} />
                </td>
                <td className="px-4 py-3 text-right font-medium text-slate-700">
                  {formatCurrency(t.monto)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
        <span>
          {sorted.length} resultado{sorted.length === 1 ? '' : 's'}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 0}
            onClick={() => setPage(currentPage - 1)}
            className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-40"
          >
            Anterior
          </button>
          <span>
            {currentPage + 1} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages - 1}
            onClick={() => setPage(currentPage + 1)}
            className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
