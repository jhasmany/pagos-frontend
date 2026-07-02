import { MOCK_DELAY } from '@/utils/constants'

/**
 * Simula una llamada de red devolviendo `data` tras un pequeño retardo.
 * Se clona el dato para evitar mutaciones accidentales sobre el JSON mock.
 */
export function mockRequest<T>(data: T, delay = MOCK_DELAY): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), delay)
  })
}
