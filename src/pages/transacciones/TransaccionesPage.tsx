import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTransactions } from '@/hooks/useTransactions'
import { PageHeader } from '@/components/common/PageHeader'
import { Loading } from '@/components/common/Loading'
import { FiltersForm, type FiltersValue } from '@/components/forms/FiltersForm'
import { TransactionTable } from '@/components/tables/TransactionTable'
import { ROUTES } from '@/routes/RouteConfig'
import type { TransaccionFiltros } from '@/types'

const EMPTY: FiltersValue = { estado: '', comercioId: '', busqueda: '' }

export function TransaccionesPage() {
  const [filters, setFilters] = useState<FiltersValue>(EMPTY)

  const queryFilters = useMemo<TransaccionFiltros>(
    () => ({
      estado: filters.estado,
      comercioId: filters.comercioId || undefined,
      busqueda: filters.busqueda || undefined,
    }),
    [filters],
  )

  const { data, isLoading } = useTransactions(queryFilters)

  return (
    <div>
      <PageHeader
        title="Transacciones"
        subtitle="Consulta y búsqueda de transacciones POS"
        action={
          <Link
            to={ROUTES.crearTransaccion}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            + Nueva transacción
          </Link>
        }
      />

      <div className="flex flex-col gap-4">
        <FiltersForm value={filters} onChange={setFilters} />
        {isLoading || !data ? (
          <Loading />
        ) : (
          <TransactionTable data={data} />
        )}
      </div>
    </div>
  )
}
