import { SITE } from '@/lib/site';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: 'Argis Lab',
      url: SITE.url,
      logo: `${SITE.url}/logo.png`,
      description: SITE.description,
      founder: { '@id': `${SITE.url}/#emanuel` },
      sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.youtube],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: 'es',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#emanuel`,
      name: 'Emanuel Barboza',
      alternateName: 'Héctor Emanuel Barboza',
      url: `${SITE.url}/sobre`,
      jobTitle: 'Licenciado en Análisis de Sistemas',
      worksFor: { '@id': `${SITE.url}/#organization` },
      knowsAbout: [
        'Ingeniería de software',
        'Agilidad',
        'Scrum',
        'Kanban',
        'Inteligencia artificial aplicada',
        'Liderazgo de equipos',
      ],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Universidad Nacional de Salta' },
        { '@type': 'CollegeOrUniversity', name: 'Universidad Nacional de La Plata' },
      ],
      sameAs: [
        'https://www.linkedin.com/in/emabarboza/',
        'https://github.com/emanuel-22',
        'https://www.researchgate.net/profile/Emanuel-Barboza-2',
        'https://emanuelbarboza.com',
      ],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Datos estructurados de sitio (Organization / WebSite / Person).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
