export type Publication = {
  title: string;
  authors: string;
  venue: string;
  type: 'Conference Paper' | 'Artículo';
  year?: string;
  href: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    title: 'Razones de Fracaso de Proyectos de Software: un Mapeo Sistemático',
    authors: 'Barboza, Héctor Emanuel; Balas, José; Antonelli, Leandro; Thomas, Pablo',
    venue: '30° Congreso Argentino de Ciencias de la Computación - CACIC 2024',
    type: 'Conference Paper',
    year: '2024',
    href: 'https://digital.cic.gba.gob.ar/server/api/core/bitstreams/3ff79620-de7d-47c0-aa30-bee550d88602/content',
  },
  {
    title: 'End-to-end platform evaluation for Spanish Handwritten Text Recognition',
    authors: 'Xamena, Eduardo; Barboza, Héctor Emanuel; Orozco, Carlos Ismael',
    venue: 'Universidad de Palermo, Facultad de Ingeniería',
    type: 'Artículo',
    href: 'https://ri.conicet.gov.ar/handle/11336/173361',
  },
  {
    title: 'Content Based Image Retrieval (CBIR): aplicando descriptor ORB',
    authors: 'Cabero, Gerardo Antonio; Barboza, Héctor Emanuel',
    venue: 'Simposio Argentino de Imágenes y Visión - JAIIO 48',
    type: 'Artículo',
    href: 'https://sedici.unlp.edu.ar/handle/10915/89200',
  },
];
