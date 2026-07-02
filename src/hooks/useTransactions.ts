import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '@/services/api/transaction.service'
import type { CrearTransaccionInput, TransaccionFiltros } from '@/types'

const KEY = 'transacciones'

export function useTransactions(filtros?: TransaccionFiltros) {
  return useQuery({
    queryKey: [KEY, filtros],
    queryFn: () => transactionService.listar(filtros),
  })
}

export function useTransaction(id: string | undefined) {
  return useQuery({
    queryKey: [KEY, 'detalle', id],
    queryFn: () => transactionService.obtener(id!),
    enabled: Boolean(id),
  })
}

export function useComercios() {
  return useQuery({
    queryKey: ['comercios'],
    queryFn: () => transactionService.listarComercios(),
    staleTime: Infinity,
  })
}

export function useCrearTransaccion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CrearTransaccionInput) =>
      transactionService.crear(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] })
    },
  })
}
