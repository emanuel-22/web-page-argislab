import type { Metadata } from 'next';

import { SITE } from '@/lib/site';

type PageSeo = {
  title: string;
  description: string;
  /** Ruta canónica en español, empezando con "/". */
  path: string;
  noindex?: boolean;
};

/**
 * Metadata por página: título, descripción, canonical a la URL en español y
 * Open Graph. La imagen OG la aporta `app/opengraph-image.png` (convención de
 * Next), así que acá no se define `images`.
 */
export function pageMetadata({ title, description, path, noindex }: PageSeo): Metadata {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: SITE.locale,
      url: `${SITE.url}${canonicalPath === '/' ? '' : canonicalPath}`,
      title: `${title} · ${SITE.name}`,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
