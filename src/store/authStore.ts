import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AUTH_STORAGE_KEY } from '@/utils/constants'
import type { Usuario } from '@/types'

interface AuthState {
  token: string | null
  usuario: Usuario | null
  isAuthenticated: boolean
  setSession: (token: string, usuario: Usuario) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      usuario: null,
      isAuthenticated: false,
      setSession: (token, usuario) =>
        set({ token, usuario, isAuthenticated: true }),
      logout: () =>
        set({ token: null, usuario: null, isAuthenticated: false }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({
        token: state.token,
        usuario: state.usuario,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
