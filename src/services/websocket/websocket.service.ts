import type { EstadoTransaccion } from '@/types'

export interface NotificacionEvento {
  transaccionId: string
  estado: EstadoTransaccion
  monto: number
}

type Listener = (evento: NotificacionEvento) => void

/**
 * Servicio de notificaciones en tiempo real.
 *
 * El backend WebSocket/STOMP (`/ws/notificaciones`,
 * `/topic/comercio/{comercioId}`) todavía no existe, así que esta
 * implementación **simula** eventos periódicos. Cuando el gateway exponga el
 * socket, reemplazar `connect` por una conexión SockJS/STOMP real.
 */
class WebSocketService {
  private timer: ReturnType<typeof setInterval> | null = null
  private listeners = new Set<Listener>()

  connect(comercioId?: string): void {
    if (this.timer) return
    const estados: EstadoTransaccion[] = ['CONCILIADA', 'FALLIDA', 'PENDIENTE']
    this.timer = setInterval(() => {
      const evento: NotificacionEvento = {
        transaccionId: `T-${1000 + Math.floor(Math.random() * 999)}`,
        estado: estados[Math.floor(Math.random() * estados.length)],
        monto: Number((Math.random() * 500 + 10).toFixed(2)),
      }
      void comercioId
      this.listeners.forEach((l) => l(evento))
    }, 12000)
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  disconnect(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    this.listeners.clear()
  }
}

export const websocketService = new WebSocketService()
