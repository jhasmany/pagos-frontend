# pagos-frontend

Frontend de gestión de pagos (POS) construido con **Vite + React 19 + TypeScript**. La aplicación permite visualizar un dashboard operativo, administrar transacciones, revisar conciliaciones bancarias y consultar reportes consolidados por comercio.

> **Estado actual:** todos los datos (autenticación, transacciones, conciliaciones, dashboard, notificaciones) provienen de servicios **mock** (JSON en `src/mocks/` + retardo simulado). El cliente Axios y el servicio de WebSocket ya están preparados para conectarse al backend real (Spring Cloud Gateway + Keycloak) apenas esté disponible; ver [Integración pendiente](#integración-pendiente).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Scripts disponibles

- `npm run dev` — inicia el servidor de desarrollo de Vite con HMR
- `npm run build` — valida los tipos con `tsc -b` y genera el build de producción
- `npm run lint` — ejecuta ESLint sobre el proyecto
- `npm run preview` — sirve localmente el build de producción generado

No hay un test runner configurado todavía.

## Stack principal

- **React 19** + **TypeScript**
- **Vite** como bundler y dev server, con **Tailwind CSS 4** (plugin `@tailwindcss/vite`) para estilos
- **React Router 7** para el enrutamiento y las rutas protegidas
- **Zustand** (con middleware `persist`) para estado global (sesión, sidebar, notificaciones toast)
- **TanStack React Query** para el manejo de datos remotos (cache, loading, refetch)
- **React Hook Form** + **Zod** (`@hookform/resolvers`) para formularios y validación
- **Axios** como cliente HTTP, con interceptor de token
- **Recharts** para gráficos del dashboard y reportes

## Módulos y estructura del proyecto

```
src/
├── app/            Bootstrap de la aplicación
├── routes/         Definición de rutas y guard de autenticación
├── pages/          Vistas de cada módulo funcional
├── components/     Componentes de UI reutilizables
├── hooks/          Hooks de datos (React Query) por dominio
├── services/       Acceso a datos: API REST, auth y websocket
├── store/          Estado global (Zustand)
├── types/          Tipos de dominio compartidos
├── utils/          Constantes, formatters y validadores
├── theme/          Paleta y configuración visual
└── mocks/          Datos de ejemplo usados por los servicios mock
```

### `src/app` — Bootstrap

- `main.tsx` — punto de entrada, monta `<App />` en `#root` dentro de `React.StrictMode`.
- `App.tsx` — compone `Providers`, `AppRoutes` y el contenedor global de notificaciones (`NotificationToast`).
- `Providers.tsx` — envuelve la app con `ErrorBoundary`, `QueryClientProvider` (React Query) y `BrowserRouter`.

### `src/routes` — Enrutamiento

- `RouteConfig.tsx` — fuente única de verdad de las rutas (`ROUTES`) y de los ítems de navegación del sidebar (`NAV_ITEMS`).
- `ProtectedRoute.tsx` — guard que redirige a `/login` si `authStore.isAuthenticated` es `false`.
- `AppRoutes` (en `src/app/AppRoutes.tsx`) — declara el árbol de rutas: `/login` pública, y el resto (dashboard, transacciones, conciliación, reportes) protegidas dentro de `MainLayout`.

### `src/pages` — Módulos funcionales

- **login** (`LoginPage`) — formulario de acceso (usuario/contraseña mock).
- **dashboard** (`DashboardPage`) — KPIs operativos (transacciones, conciliadas, fallidas, monto procesado) y gráficos (transacciones por hora, estados de conciliación, monto por comercio).
- **transacciones** — `TransaccionesPage` (listado con filtros), `CrearTransaccionPage` (alta de transacción vía formulario), `DetalleTransaccionPage` (ficha de una transacción).
- **conciliacion** — `ConciliacionPage` (tabla de conciliaciones con filtros por estado/comercio/fecha), `ResumenDiarioPage` (resumen diario por comercio).
- **reportes** (`ReportesPage`) — consolidado diario por comercio: monto procesado, operaciones, conciliadas y fallidas.

### `src/components` — UI reutilizable

- **layout** — `MainLayout` (shell con sidebar + header), `Header`, `Sidebar`, `Footer`.
- **common** — `PageHeader`/`Card`, `KpiCard`, `Loading`, `EstadoBadge` (badge de estado de transacción/conciliación), `ConfirmDialog`, `NotificationToast` (toasts globales), `ErrorBoundary`.
- **forms** — `TransactionForm` (alta de transacciones), `FiltersForm` (filtros de listados).
- **tables** — `TransactionTable`, `ConciliationTable`.
- **charts** — `TransactionChart`, `MerchantAmountChart`, `DailySummaryChart` (envoltorios sobre Recharts).

### `src/hooks` — Acceso a datos por dominio

Hooks basados en React Query que envuelven los servicios de `src/services/api`:

- `useAuth.ts`, `useDashboard.ts`, `useTransactions.ts`, `useConciliations.ts`, `useNotifications.ts` (este último se suscribe a `websocketService`).

### `src/services` — Capa de datos

- **api/** — `axios.ts` (cliente Axios apuntando al futuro Spring Cloud Gateway, con interceptor que agrega el `Bearer token` desde `localStorage`), `mock.ts` (helper `mockRequest` que simula latencia de red), y los servicios de dominio `dashboard.service.ts`, `transaction.service.ts`, `conciliation.service.ts` (actualmente leen de `src/mocks/*.json`).
- **auth/** — `auth.service.ts` (login mock, acepta cualquier usuario/contraseña no vacíos) y `keycloak.ts` (placeholder para la futura integración con Keycloak).
- **websocket/** — `websocket.service.ts` (simula eventos periódicos de notificación de transacciones; reemplazar por conexión SockJS/STOMP real cuando el gateway exponga `/ws/notificaciones`).

### `src/store` — Estado global (Zustand)

- `authStore.ts` — sesión del usuario (`token`, `usuario`, `isAuthenticated`), persistida en `localStorage` bajo la key `pos-pagos-auth`.
- `appStore.ts` — estado de UI: apertura del sidebar y cola de toasts.

### `src/types`, `src/utils`, `src/theme`

- `types/` — modelos de dominio (`transaction`, `conciliation`, `dashboard`, `auth`), reexportados desde `types/index.ts`.
- `utils/` — `constants.ts` (URLs de API/WS, labels y clases de estado, catálogos de métodos de pago), `formatters.ts` (moneda, números, fechas), `validators.ts` (esquemas Zod).
- `theme/` — paleta de colores y configuración visual compartida.

### `src/mocks`

Datos JSON usados por los servicios mock: `comercios.json`, `transacciones.json`, `conciliaciones.json`, `resumenDiario.json`, `dashboard.json`.

## Alias de rutas

Configurado en `vite.config.ts` y `tsconfig.app.json`: `@` apunta a `src/`. Usar `@/...` en los imports en lugar de rutas relativas largas.

## Integración pendiente

Estos puntos están marcados como mock/placeholder en el código y deben reemplazarse cuando el backend esté disponible:

- **Autenticación real vía Keycloak** — `src/services/auth/keycloak.ts` y `auth.service.ts`.
- **Servicios REST reales** — reemplazar las llamadas mock en `src/services/api/*.service.ts` por `apiClient` (`src/services/api/axios.ts`), que ya apunta a `VITE_API_BASE_URL` (por defecto `/api/v1`).
- **WebSocket de notificaciones real** — `src/services/websocket/websocket.service.ts`, contra `/ws/notificaciones` (STOMP/SockJS), configurable vía `VITE_WS_URL`.
