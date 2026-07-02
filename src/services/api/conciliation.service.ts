import { mockRequest } from './mock'
import conciliacionesData from '@/mocks/conciliaciones.json'
import resumenData from '@/mocks/resumenDiario.json'
import type {
  Conciliacion,
  ConciliacionFiltros,
  ResumenDiario,
} from '@/types'

const conciliaciones = conciliacionesData as Conciliacion[]
const resumenes = resumenData as ResumenDiario[]

function aplicarFiltros(
  data: Conciliacion[],
  filtros?: ConciliacionFiltros,
): Conciliacion[] {
  if (!filtros) return data
  return data.filter((c) => {
    if (filtros.estado && c.estado !== filtros.estado) return false
    if (filtros.comercioId && c.comercioId !== filtros.comercioId) return false
    if (filtros.fecha && !c.fecha.startsWith(filtros.fecha)) return false
    return true
  })
}

export const conciliationService = {
  listar(filtros?: ConciliacionFiltros): Promise<Conciliacion[]> {
    return mockRequest(aplicarFiltros(conciliaciones, filtros))
  },

  resumenDiario(comercioId: string): Promise<ResumenDiario | undefined> {
    return mockRequest(resumenes.find((r) => r.comercioId === comercioId))
  },

  listarResumenes(): Promise<ResumenDiario[]> {
    return mockRequest(resumenes)
  },
}
