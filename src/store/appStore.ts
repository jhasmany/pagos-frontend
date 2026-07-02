import { create } from 'zustand'

export interface Toast {
  id: string
  tipo: 'info' | 'success' | 'error'
  mensaje: string
}

interface AppState {
  sidebarOpen: boolean
  toasts: Toast[]
  toggleSidebar: () => void
  setSidebar: (open: boolean) => void
  pushToast: (tipo: Toast['tipo'], mensaje: string) => void
  dismissToast: (id: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  toasts: [],
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebar: (open) => set({ sidebarOpen: open }),
  pushToast: (tipo, mensaje) =>
    set((s) => ({
      toasts: [
        ...s.toasts,
        { id: crypto.randomUUID(), tipo, mensaje },
      ],
    })),
  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
