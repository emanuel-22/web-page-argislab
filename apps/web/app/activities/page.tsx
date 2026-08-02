import Link from 'next/link';
import { Calendar, PlayCircle } from 'lucide-react';

import { PastTalkCard } from '@/components/past-talk-card';
import { UpcomingEventsCarousel, type UpcomingEvent } from '@/components/upcoming-events-carousel';
import { PAST_TALKS } from '@/data/past-talks';

const PREVIEW_SIZE = 6;
const UPCOMING_EVENTS: UpcomingEvent[] = [];

export default function ActivitiesPage() {
  const previewTalks = PAST_TALKS.slice(0, PREVIEW_SIZE);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <header className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Charlas y actividades</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Charlas, encuentros y actividades en las que participo o que impulso desde Argis Lab, en colaboración con
          instituciones, eventos y comunidades.
        </p>
      </header>

      <div className="mt-16 flex flex-col gap-16">
        <section>
          <div className="flex items-center gap-3 border-b pb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-black tracking-tight">Próximos encuentros</h2>
          </div>
          <UpcomingEventsCarousel events={UPCOMING_EVENTS} />
        </section>

        <section>
          <div className="flex items-center gap-3 border-b pb-4">
            <PlayCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-black tracking-tight">Charlas anteriores</h2>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewTalks.map((talk) => (
              <PastTalkCard key={talk.videoId} {...talk} />
            ))}
          </div>

          {PAST_TALKS.length > PREVIEW_SIZE ? (
            <div className="mt-6 flex justify-center">
              <Link
                href="/actividades/charlas-anteriores"
                className="rounded-full border bg-card px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
              >
                Ver todas las charlas anteriores ({PAST_TALKS.length}) →
              </Link>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
