export type PastTalk = {
  title: string;
  organizer: string;
  href: string;
  videoId: string;
};

export const PAST_TALKS: PastTalk[] = [
  {
    title: 'Backlog en acción: de la teoría a la práctica con equipos ágiles',
    organizer: 'Proyecto DAR',
    href: 'https://www.youtube.com/watch?v=I_hcpoE4ObY&t=4088s',
    videoId: 'I_hcpoE4ObY',
  },
  {
    title: 'Súbete al Tren!! #2 - Uso consciente y crítico de la inteligencia artificial',
    organizer: 'Súbete al tren de la IA',
    href: 'https://www.youtube.com/watch?v=s4ndLzI_NyA&t=2618s',
    videoId: 's4ndLzI_NyA',
  },
];
