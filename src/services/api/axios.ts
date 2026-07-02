import axios from 'axios'
import { API_BASE_URL, AUTH_STORAGE_KEY } from '@/utils/constants'

/**
 * Axios client pointing at the Spring Cloud Gateway.
 *
 * NOTE: los servicios REST todavía no existen. Por ahora los módulos
 * `*.service.ts` devuelven datos mock (JSON hardcodeado). Cuando el gateway
 * esté disponible basta con reemplazar las llamadas mock por `apiClient`.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)
  if (raw) {
    try {
      const { token } = JSON.parse(raw) as { token?: string }
      if (token) config.headers.Authorization = `Bearer ${token}`
    } catch {
      // token inválido en storage, se ignora
    }
  }
  return config
})
