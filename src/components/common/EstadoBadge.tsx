import type { EstadoTransaccion } from '@/types'
import { ESTADO_BADGE_CLASSES, ESTADO_LABELS } from '@/utils/constants'

export function EstadoBadge({ estado }: { estado: EstadoTransaccion }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ESTADO_BADGE_CLASSES[estado]}`}
    >
      {ESTADO_LABELS[estado]}
    </span>
  )
}
