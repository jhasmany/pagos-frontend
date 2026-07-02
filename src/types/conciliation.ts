import type { EstadoTransaccion } from './transaction'

export interface Conciliacion {
  id: string
  transaccionId: string
  comercioId: string
  comercioNombre: string
  monto: number
  estado: EstadoTransaccion
  fecha: string
  fechaConciliacion: string | null
}

export interface ConciliacionFiltros {
  estado?: EstadoTransaccion | ''
  comercioId?: string
  fecha?: string
}

export interface ResumenDiario {
  comercioId: string
  comercioNombre: string
  fecha: string
  totalOperaciones: number
  totalMonto: number
  totalFallidas: number
  totalConciliadas: number
}
