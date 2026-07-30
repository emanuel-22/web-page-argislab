export type Talk = {
  title: string;
  area: string;
  href: string;
  description?: string;
  thumbnailUrl?: string;
};

export const TALKS: Talk[] = [
  {
    title: 'Deuda Tecnica Scrum Latam',
    area: 'Agilidad y gestión',
    href: 'https://prezi.com/p/ayypmffqyc7j/deuda-tecnica-scrum-latam/',
    description: 'Debt stories y prácticas ágiles para gestionar la deuda técnica.',
    thumbnailUrl: 'https://0701.static.prezi.com/preview/v2/p2xzwrnycu7kyygmie5ntk3lb36jc3sachvcdoaizecfr3dnitcq_3_0.png',
  },
  {
    title: 'Scrum - Makisan Tech by Emanuel Barboza',
    area: 'Agilidad y gestión',
    href: 'https://prezi.com/p/lbjptjybr5i6/scrum-makisan-tech-by-emanuel-barboza/',
    description: 'Introducción a Scrum y agilidad para equipos.',
    thumbnailUrl: 'https://0701.static.prezi.com/preview/v2/zyiouu4hu7ji6jhaurhwemgcqd6jc3sachvcdoaizecfr3dnitcq_3_0.png',
  },
  {
    title: 'Prompt Engineering para equipos ágiles',
    area: 'Inteligencia artificial aplicada',
    href: 'https://prezi.com/p/bijm1ktluukx/prompt-engineering-para-equipos-agiles/',
    description: 'El impacto real de la IA en el trabajo y cómo aplicarla en equipos ágiles.',
    thumbnailUrl: 'https://0701.static.prezi.com/preview/v2/6w4igvuvr6ip3jtnc3aodreha76jc3sachvcdoaizecfr3dnitcq_3_0.png',
  },
];
