import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/api/dashboard.service'

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.obtener(),
    refetchInterval: 30000,
  })
}
