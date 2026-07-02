/**
 * Placeholder de integración con Keycloak.
 *
 * La autenticación real contra Keycloak todavía no está disponible; por ahora
 * el login usa `auth.service.ts` (mock). Cuando exista el realm, inicializar
 * aquí keycloak-js y exponer los métodos de token / refresh.
 */
export const keycloak = {
  initialized: false,
  init: async (): Promise<boolean> => {
    // TODO: reemplazar con new Keycloak({ url, realm, clientId }).init(...)
    return false
  },
  getToken: (): string | null => null,
  logout: (): void => {},
}
