export type Event = {
  title: string;
  category: string;
  organizer: string;
  startsAt: string;
  endsAt?: string;
  modality: 'Presencial' | 'Virtual' | 'Híbrido';
  location?: string;
  audience: string[];
  href: string;
  description?: string;
  thumbnailUrl?: string;
  topics?: string[];
};

export const EVENTS: Event[] = [];
