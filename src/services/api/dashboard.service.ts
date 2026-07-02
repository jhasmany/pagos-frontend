import { mockRequest } from './mock'
import dashboardData from '@/mocks/dashboard.json'
import type { DashboardData } from '@/types'

export const dashboardService = {
  obtener(): Promise<DashboardData> {
    return mockRequest(dashboardData as DashboardData)
  },
}
