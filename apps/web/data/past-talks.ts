export type PastTalk = {
  title: string;
  organizer: string;
  href: string;
  videoId: string;
  /** Fecha de la charla (ISO YYYY-MM-DD). Se muestra como mes y año. */
  date?: string;
};

export const PAST_TALKS: PastTalk[] = [
  {
    title: 'Súbete al Tren!! #4 - Desarrollo y Talento de Software',
    organizer: 'Súbete al tren de la IA',
    href: 'https://www.youtube.com/watch?v=Ly2iReQffcY&t=418s',
    videoId: 'Ly2iReQffcY',
    date: '2026-08-03',
  },
  {
    title: 'Súbete al Tren!! #2 - Uso consciente y crítico de la inteligencia artificial',
    organizer: 'Súbete al tren de la IA',
    href: 'https://www.youtube.com/watch?v=s4ndLzI_NyA&t=2618s',
    videoId: 's4ndLzI_NyA',
    date: '2026-07-07',
  },
  {
    title: 'Backlog en acción: de la teoría a la práctica con equipos ágiles',
    organizer: 'Proyecto DAR',
    href: 'https://www.youtube.com/watch?v=I_hcpoE4ObY&t=4088s',
    videoId: 'I_hcpoE4ObY',
    date: '2025-06-28',
  },
];
