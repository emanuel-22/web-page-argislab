/**
 * Configuración central del sitio para SEO (canonical, sitemap, Open Graph,
 * datos estructurados).
 *
 * ⚠️  Ajustá el dominio de producción: definí `NEXT_PUBLIC_SITE_URL` en el
 * entorno (ver docker-compose.prod.yml). El valor por defecto es una
 * suposición y hay que confirmarlo.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://argislab.com').replace(/\/+$/, '');

export const SITE = {
  name: 'Argis Lab',
  url: SITE_URL,
  locale: 'es_AR',
  author: 'Emanuel Barboza',
  defaultTitle: 'Argis Lab — Ingeniería de software, agilidad e IA',
  description:
    'Argis Lab es el espacio profesional de Emanuel Barboza para explorar, aplicar y compartir conocimiento sobre ingeniería de software, agilidad e inteligencia artificial: libros, materiales de charlas, recursos y publicaciones.',
  keywords: [
    'Argis Lab',
    'Emanuel Barboza',
    'ingeniería de software',
    'desarrollo de software',
    'agilidad',
    'Scrum',
    'Kanban',
    'inteligencia artificial',
    'IA generativa',
    'liderazgo técnico',
    'facilitación',
  ],
  social: {
    linkedin: 'https://www.linkedin.com/company/argis-lab/',
    instagram: 'https://www.instagram.com/argis_lab/',
    youtube: 'https://www.youtube.com/@argislab',
  },
} as const;
