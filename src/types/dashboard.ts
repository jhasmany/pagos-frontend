export interface DashboardKpis {
  totalTransacciones: number
  totalConciliadas: number
  totalFallidas: number
  montoProcesado: number
}

export interface TransaccionesPorHora {
  hora: string // "08:00"
  cantidad: number
}

export interface MontoPorComercio {
  comercio: string
  monto: number
}

export interface EstadoConciliacion {
  estado: string
  cantidad: number
}

export interface DashboardData {
  kpis: DashboardKpis
  transaccionesPorHora: TransaccionesPorHora[]
  montoPorComercio: MontoPorComercio[]
  estadosConciliacion: EstadoConciliacion[]
}
