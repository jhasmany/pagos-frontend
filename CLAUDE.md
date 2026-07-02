# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a freshly scaffolded Vite + React + TypeScript project (`create-vite` template), not yet customized. `src/App.tsx` still contains the default Vite/React starter markup. There is no routing, state management, API layer, or test setup yet — these will need to be introduced as the "pagos" (payments) functionality is built out.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check via `tsc -b` then build for production with Vite
- `npm run lint` — run ESLint over the project
- `npm run preview` — preview the production build locally

There is no test runner configured yet.

## Architecture

- Entry point: `src/main.tsx` mounts `<App />` into `#root` inside `React.StrictMode`.
- `src/App.tsx` is the single top-level component; no routing or component structure exists beyond it yet.
- Path aliases: none configured in `vite.config.ts` or `tsconfig.app.json`; use relative imports.
- TypeScript project uses solution-style config: `tsconfig.json` references `tsconfig.app.json` (app code, `src/`, targets ES2023/DOM, bundler module resolution) and `tsconfig.node.json` (Vite config tooling).
- ESLint (flat config in `eslint.config.js`) applies `typescript-eslint` recommended rules plus `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` (Vite variant) to all `.ts`/`.tsx` files, ignoring `dist`.
