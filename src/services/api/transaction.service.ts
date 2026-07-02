import { mockRequest } from './mock'
import comerciosData from '@/mocks/comercios.json'
import transaccionesData from '@/mocks/transacciones.json'
import type {
  Comercio,
  CrearTransaccionInput,
  Transaccion,
  TransaccionFiltros,
} from '@/types'

// Copia mutable en memoria para simular altas de transacciones.
let transacciones = structuredClone(transaccionesData) as Transaccion[]
const comercios = comerciosData as Comercio[]

function aplicarFiltros(
  data: Transaccion[],
  filtros?: TransaccionFiltros,
): Transaccion[] {
  if (!filtros) return data
  return data.filter((t) => {
    if (filtros.estado && t.estado !== filtros.estado) return false
    if (filtros.comercioId && t.comercioId !== filtros.comercioId) return false
    if (filtros.fechaDesde && t.fecha < filtros.fechaDesde) return false
    if (filtros.fechaHasta && t.fecha > filtros.fechaHasta) return false
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase()
      const match =
        t.id.toLowerCase().includes(q) ||
        t.comercioNombre.toLowerCase().includes(q) ||
        t.referencia.toLowerCase().includes(q)
      if (!match) return false
    }
    return true
  })
}

export const transactionService = {
  listar(filtros?: TransaccionFiltros): Promise<Transaccion[]> {
    return mockRequest(aplicarFiltros(transacciones, filtros))
  },

  obtener(id: string): Promise<Transaccion | undefined> {
    return mockRequest(transacciones.find((t) => t.id === id))
  },

  crear(input: CrearTransaccionInput): Promise<Transaccion> {
    const comercio = comercios.find((c) => c.id === input.comercioId)
    const nueva: Transaccion = {
      id: `T-${1000 + transacciones.length + 1}`,
      comercioId: input.comercioId,
      comercioNombre: comercio?.nombre ?? 'Desconocido',
      monto: input.monto,
      metodoPago: input.metodoPago,
      estado: 'PENDIENTE',
      fecha: new Date().toISOString(),
      referencia: `REF-${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
    }
    transacciones = [nueva, ...transacciones]
    return mockRequest(nueva)
  },

  listarComercios(): Promise<Comercio[]> {
    return mockRequest(comercios)
  },
}
