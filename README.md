# web-page-argislab

Sitio de **Argis Lab**. Es un sitio **100% estático**: una única app Next.js que se
prerenderiza en build y se sirve con Node. No hay backend, ni API, ni base de datos.

## Estructura

```
├── apps/
│   └── web/                    # App Next.js (App Router, React 19, Tailwind v4)
│       ├── app/                # Rutas
│       ├── components/         # Componentes
│       └── data/               # Fuente de datos estática (editable a mano)
├── packages/
│   ├── ui/                     # Componentes compartidos (shadcn/ui) → @repo/ui
│   ├── eslint-config/
│   └── typescript-config/
├── docker-compose.prod.yml     # Deploy: un solo contenedor web
└── turbo.json
```

## Requisitos

- Node.js 18+
- npm

## Desarrollo

```sh
npm install
npm run dev:web      # http://localhost:8000
```

## Editar contenido

Todo el contenido vive en `apps/web/data/`:

| Archivo | Contenido |
|---|---|
| `books.ts` | Libros recomendados (+ categorías) |
| `talks.ts` | Charlas |
| `past-talks.ts` | Charlas anteriores |
| `prezis.ts` | Presentaciones de Prezi |
| `publications.ts` | Publicaciones académicas |
| `websites.ts` | Páginas web recomendadas |
| `events.ts` | Eventos externos |
| `instagram.ts` / `medium.ts` / `youtube.ts` | Feeds sociales (listas vacías = sección oculta) |

## Build y deploy

```sh
npm run build        # build de producción (SSG)
npm run lint
npm run check-types
```

Deploy en el VPS:

```sh
docker compose -f docker-compose.prod.yml up -d --build
```

## Stack

- Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui · next-themes
- Turborepo + npm workspaces
- Fuentes self-hosted con Fontsource (Source Sans Pro)

## URLs en español

`apps/web/next.config.ts` mapea las rutas en español (`/sobre`, `/actividades`,
`/comunidad`, `/contenidos`, `/recursos`, ...) a los directorios de `app/` mediante
`rewrites()`.

## License

MIT
