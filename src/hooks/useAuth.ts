import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/authStore'
import type { LoginInput } from '@/types'

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)
  return useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
    onSuccess: (data) => {
      setSession(data.token, data.usuario)
    },
  })
}
