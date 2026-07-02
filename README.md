# pagos-frontend

Frontend de pagos construido con Vite, React y TypeScript.

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

## Stack principal

- **React 19** + **TypeScript**
- **Vite** como bundler y dev server
- **React Router** para el enrutamiento
- **Zustand** para manejo de estado
- **TanStack React Query** para el manejo de datos remotos
- **React Hook Form** + **Zod** para formularios y validación
- **Axios** como cliente HTTP
- **Tailwind CSS** para estilos
- **Recharts** para gráficos

## Estructura del proyecto

- `src/main.tsx` — punto de entrada, monta `<App />` en `#root`
- `src/App.tsx` — componente raíz de la aplicación
- Los alias de rutas no están configurados; usar imports relativos

## Notas

No hay un test runner configurado todavía.
