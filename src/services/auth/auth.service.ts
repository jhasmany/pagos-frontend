import { mockRequest } from '@/services/api/mock'
import type { AuthResponse, LoginInput } from '@/types'

/**
 * Autenticación común (mock). Acepta cualquier usuario/contraseña no vacíos
 * y devuelve un token ficticio. Reemplazar por Keycloak / gateway real.
 */
export const authService = {
  login(input: LoginInput): Promise<AuthResponse> {
    if (!input.usuario || !input.password) {
      return Promise.reject(new Error('Credenciales inválidas'))
    }
    return mockRequest<AuthResponse>({
      token: `mock-jwt-${Date.now()}`,
      usuario: {
        id: 'U-001',
        nombre: input.usuario,
        email: `${input.usuario}@pos-pagos.local`,
        rol: 'ADMIN',
      },
    })
  },
}
