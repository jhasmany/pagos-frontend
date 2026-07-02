import { useMemo, useState } from 'react'
import { useConciliations } from '@/hooks/useConciliations'
import { PageHeader } from '@/components/common/PageHeader'
import { Loading } from '@/components/common/Loading'
import { FiltersForm, type FiltersValue } from '@/components/forms/FiltersForm'
import { ConciliationTable } from '@/components/tables/ConciliationTable'
import type { ConciliacionFiltros } from '@/types'

const EMPTY: FiltersValue = {
  estado: '',
  comercioId: '',
  busqueda: '',
  fecha: '',
}

export function ConciliacionPage() {
  const [filters, setFilters] = useState<FiltersValue>(EMPTY)

  const queryFilters = useMemo<ConciliacionFiltros>(
    () => ({
      estado: filters.estado,
      comercioId: filters.comercioId || undefined,
      fecha: filters.fecha || undefined,
    }),
    [filters],
  )

  const { data, isLoading } = useConciliations(queryFilters)

  return (
    <div>
      <PageHeader
        title="Conciliación"
        subtitle="GET /api/v1/conciliacion (mock)"
      />
      <div className="flex flex-col gap-4">
        <FiltersForm
          value={filters}
          onChange={setFilters}
          showBusqueda={false}
          showFecha
        />
        {isLoading || !data ? (
          <Loading />
        ) : (
          <ConciliationTable data={data} />
        )}
      </div>
    </div>
  )
}
