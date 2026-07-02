import type { EstadoTransaccion, MetodoPago } from '@/types'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

export const WS_URL =
  import.meta.env.VITE_WS_URL ?? '/ws/notificaciones'

/** Simulated network latency for mock services (ms). */
export const MOCK_DELAY = 400

export const AUTH_STORAGE_KEY = 'pos-pagos-auth'

export const ESTADO_LABELS: Record<EstadoTransaccion, string> = {
  PENDIENTE: 'Pendiente',
  CONCILIADA: 'Conciliada',
  FALLIDA: 'Fallida',
  RECHAZADA: 'Rechazada',
}

export const ESTADO_BADGE_CLASSES: Record<EstadoTransaccion, string> = {
  PENDIENTE: 'bg-amber-100 text-amber-800',
  CONCILIADA: 'bg-emerald-100 text-emerald-800',
  FALLIDA: 'bg-red-100 text-red-800',
  RECHAZADA: 'bg-slate-200 text-slate-700',
}

export const METODO_PAGO_LABELS: Record<MetodoPago, string> = {
  TARJETA: 'Tarjeta',
  QR: 'QR',
  TRANSFERENCIA: 'Transferencia',
  EFECTIVO: 'Efectivo',
}

export const METODOS_PAGO: MetodoPago[] = [
  'TARJETA',
  'QR',
  'TRANSFERENCIA',
  'EFECTIVO',
]

export const ESTADOS_TRANSACCION: EstadoTransaccion[] = [
  'PENDIENTE',
  'CONCILIADA',
  'FALLIDA',
  'RECHAZADA',
]
