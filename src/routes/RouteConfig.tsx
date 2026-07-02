export const ROUTES = {
  login: '/login',
  dashboard: '/',
  transacciones: '/transacciones',
  crearTransaccion: '/transacciones/nueva',
  detalleTransaccion: (id = ':id') => `/transacciones/${id}`,
  conciliacion: '/conciliacion',
  resumenDiario: '/conciliacion/resumen',
  reportes: '/reportes',
} as const

export interface NavItem {
  label: string
  to: string
  icon: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: ROUTES.dashboard, icon: '📊' },
  { label: 'Transacciones', to: ROUTES.transacciones, icon: '💳' },
  { label: 'Conciliación', to: ROUTES.conciliacion, icon: '🧾' },
  { label: 'Resumen Diario', to: ROUTES.resumenDiario, icon: '📅' },
  { label: 'Reportes', to: ROUTES.reportes, icon: '📈' },
]
