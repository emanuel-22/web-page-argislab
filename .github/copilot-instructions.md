# GitHub Copilot Instructions — web-page-argislab

## Project Overview

Sitio de Argis Lab. Es **100% estático**: una única app Next.js (`apps/web`) que se
prerenderiza en build y se sirve con Node. **No hay backend, ni API, ni base de datos.**

- **Frontend**: Next.js 16 con App Router, React 19, Tailwind CSS v4
- **Datos**: archivos estáticos en `apps/web/data/*.ts` (libros, charlas, publicaciones,
  webs, eventos, y los feeds de Instagram / Medium / YouTube). Se editan a mano.
- **UI Components**: paquete compartido `@repo/ui` (shadcn/ui)
- **Monorepo**: Turborepo + npm workspaces (`apps/*`, `packages/*`)
- **Package Manager**: npm

## Estructura

- `apps/web` — la app (única app del repo)
- `packages/ui` — componentes shadcn compartidos (`@repo/ui/components/*`)
- `packages/eslint-config`, `packages/typescript-config` — configs compartidas

## Next.js (Web)

- App Router. Server Components por defecto; `'use client'` solo cuando hace falta.
- Corre en el puerto **8000** (`npm run dev:web`).
- Fuentes self-hosted vía Fontsource (no `next/font`).
- Las páginas leen directamente de `@/data/*` — no hay `fetch` a servicios propios.
- URLs en español (`/sobre`, `/contenidos`, `/recursos`, ...) resueltas por
  `rewrites()` en `apps/web/next.config.ts`.
- Imágenes remotas permitidas: ver `images.remotePatterns` en `next.config.ts`.

## Datos

- Fuente de verdad: `apps/web/data/*.ts`. Para agregar un libro / charla / evento /
  post, editar el array correspondiente.
- Los componentes de feed (`instagram-feed`, `medium-feed`, `youtube-feed`) no
  renderizan nada si su lista está vacía.

## Comandos

```bash
npm install
npm run dev:web     # dev en http://localhost:8000
npm run build       # build de producción (SSG)
npm run lint        # lint
npm run check-types # tsc --noEmit
```

## Deploy

- `docker-compose.prod.yml` levanta solo el contenedor `web` (`apps/web/Dockerfile`).
- No requiere variables de entorno.

## Tailwind CSS v4

- `@import 'tailwindcss';`, directiva `@theme`, tokens en oklch.
- Dark mode con estrategia `class` vía `next-themes`
  (`apps/web/components/mode-toggle.tsx`, tokens en `apps/web/app/globals.css`).

## shadcn/ui

- En `packages/ui/`. Agregar: `cd packages/ui && npx shadcn@latest add <component>`.
- Importar desde `@repo/ui/components/*`.

## Evitar

- No reintroducir un backend / API / DB salvo pedido explícito.
- No usar `any` sin necesidad.
- No commitear `.env` ni secretos.
- No usar patrones de Pages Router.
