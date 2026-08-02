'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export type UpcomingEvent = {
  title: string;
  organizer: string;
  date: string;
  href: string;
};

const SCROLL_AMOUNT = 320;

export function UpcomingEventsCarousel({ events }: { events: UpcomingEvent[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (events.length === 0) {
    return <p className="mt-6 text-sm text-muted-foreground">Próximamente vamos a ir sumando encuentros acá.</p>;
  }

  const scrollBy = (amount: number) => scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

  return (
    <div className="mt-6">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map((event) => (
          <a
            key={event.href}
            href={event.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-72 shrink-0 snap-start flex-col gap-2 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <span className="text-xs font-medium text-primary">{event.date}</span>
            <h3 className="font-bold leading-snug">{event.title}</h3>
            <span className="text-xs text-muted-foreground">{event.organizer}</span>
          </a>
        ))}
      </div>

      <div className="mt-4 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollBy(-SCROLL_AMOUNT)}
          aria-label="Encuentros anteriores"
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(SCROLL_AMOUNT)}
          aria-label="Encuentros siguientes"
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
