import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EventList } from '@/components/event-list';
import { getEvents } from '@/lib/resources';

export default async function EventosPage() {
  const events = await getEvents();
  const now = Date.now();
  const upcoming = events
    .filter((event) => new Date(event.endsAt ?? event.startsAt).getTime() >= now)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-8">
      <Link href="/comunidad" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a Comunidad
      </Link>

      <header className="mx-auto mt-6 flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Eventos Externos</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Agenda de eventos de tecnología, agilidad e inteligencia artificial en Argentina y el mundo, presenciales y
          virtuales. Son eventos organizados por terceros que curamos para la comunidad, no organizados por Argis
          Lab.
        </p>
      </header>

      <div className="mt-16">
        <EventList events={upcoming} />
      </div>
    </main>
  );
}
