import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { websocketService } from '@/services/websocket/websocket.service'
import { useAppStore } from '@/store/appStore'
import { formatCurrency } from '@/utils/formatters'
import { ESTADO_LABELS } from '@/utils/constants'

/**
 * Conecta al canal de notificaciones en tiempo real (simulado), muestra un
 * toast por cada evento y refresca dashboard + transacciones.
 */
export function useNotifications(comercioId?: string) {
  const pushToast = useAppStore((s) => s.pushToast)
  const queryClient = useQueryClient()

  useEffect(() => {
    websocketService.connect(comercioId)
    const unsubscribe = websocketService.subscribe((evento) => {
      const tipo =
        evento.estado === 'FALLIDA'
          ? 'error'
          : evento.estado === 'CONCILIADA'
            ? 'success'
            : 'info'
      pushToast(
        tipo,
        `Transacción ${evento.transaccionId} · ${ESTADO_LABELS[evento.estado]} · ${formatCurrency(evento.monto)}`,
      )
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['transacciones'] })
    })

    return () => {
      unsubscribe()
      websocketService.disconnect()
    }
  }, [comercioId, pushToast, queryClient])
}
