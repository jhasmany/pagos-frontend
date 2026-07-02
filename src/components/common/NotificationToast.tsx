import { useEffect } from 'react'
import { useAppStore, type Toast } from '@/store/appStore'

const TOAST_STYLES: Record<Toast['tipo'], string> = {
  info: 'border-brand-500 bg-brand-50 text-brand-800',
  success: 'border-emerald-500 bg-emerald-50 text-emerald-800',
  error: 'border-red-500 bg-red-50 text-red-800',
}

function ToastItem({ toast }: { toast: Toast }) {
  const dismissToast = useAppStore((s) => s.dismissToast)

  useEffect(() => {
    const timer = setTimeout(() => dismissToast(toast.id), 5000)
    return () => clearTimeout(timer)
  }, [toast.id, dismissToast])

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-md border-l-4 px-4 py-3 shadow-md ${TOAST_STYLES[toast.tipo]}`}
    >
      <span className="text-sm font-medium">{toast.mensaje}</span>
      <button
        type="button"
        onClick={() => dismissToast(toast.id)}
        className="ml-auto text-lg leading-none opacity-60 hover:opacity-100"
        aria-label="Cerrar"
      >
        ×
      </button>
    </div>
  )
}

export function NotificationToast() {
  const toasts = useAppStore((s) => s.toasts)

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
