export type EstadoTransaccion =
  | 'PENDIENTE'
  | 'CONCILIADA'
  | 'FALLIDA'
  | 'RECHAZADA'

export type MetodoPago = 'TARJETA' | 'QR' | 'TRANSFERENCIA' | 'EFECTIVO'

export interface Transaccion {
  id: string
  comercioId: string
  comercioNombre: string
  monto: number
  metodoPago: MetodoPago
  estado: EstadoTransaccion
  fecha: string // ISO 8601
  referencia: string
}

export interface CrearTransaccionInput {
  comercioId: string
  monto: number
  metodoPago: MetodoPago
}

export interface TransaccionFiltros {
  estado?: EstadoTransaccion | ''
  comercioId?: string
  fechaDesde?: string
  fechaHasta?: string
  busqueda?: string
}

export interface Comercio {
  id: string
  nombre: string
}
