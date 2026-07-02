import { useQuery } from '@tanstack/react-query'
import { conciliationService } from '@/services/api/conciliation.service'
import type { ConciliacionFiltros } from '@/types'

export function useConciliations(filtros?: ConciliacionFiltros) {
  return useQuery({
    queryKey: ['conciliaciones', filtros],
    queryFn: () => conciliationService.listar(filtros),
  })
}

export function useResumenDiario(comercioId: string | undefined) {
  return useQuery({
    queryKey: ['resumen-diario', comercioId],
    queryFn: () => conciliationService.resumenDiario(comercioId!),
    enabled: Boolean(comercioId),
  })
}

export function useResumenes() {
  return useQuery({
    queryKey: ['resumenes'],
    queryFn: () => conciliationService.listarResumenes(),
  })
}
