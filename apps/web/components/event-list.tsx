import Image from 'next/image';
import { Calendar, CalendarDays, MapPin, Users, Video } from 'lucide-react';
import type { Event } from '@/data/events';

function formatRange(startsAt: string, endsAt?: string) {
  const start = new Date(startsAt);
  const startLabel = start.toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' });
  if (!endsAt) return startLabel;

  const end = new Date(endsAt);
  const sameDay = start.toDateString() === end.toDateString();
  const endLabel = sameDay
    ? end.toLocaleTimeString('es-AR', { timeStyle: 'short' })
    : end.toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' });
  return `${startLabel} – ${endLabel}`;
}

function ModalityIcon({ modality }: { modality: Event['modality'] }) {
  return modality === 'Presencial' ? <MapPin className="h-4 w-4" /> : <Video className="h-4 w-4" />;
}

function EventRow({
  title,
  category,
  organizer,
  startsAt,
  endsAt,
  modality,
  location,
  audience,
  href,
  description,
  thumbnailUrl,
  topics,
}: Event) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-4 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50 sm:flex-row"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md border bg-linear-to-b from-primary/15 to-transparent sm:w-48">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`Imagen de ${title}`}
            fill
            sizes="192px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <CalendarDays className="h-8 w-8 text-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {category}
            {topics && topics.length > 0 ? ` · ${topics.join(', ')}` : ''}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
            <Calendar className="h-3.5 w-3.5" />
            {formatRange(startsAt, endsAt)}
          </span>
        </div>

        <h3 className="font-bold leading-snug">{title}</h3>
        {description ? <p className="text-sm leading-relaxed text-muted-foreground">{description}</p> : null}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ModalityIcon modality={modality} />
            {location || modality}
          </span>
          {audience.length > 0 ? (
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {audience.join(', ')}
            </span>
          ) : null}
          <span>Organiza: {organizer}</span>
        </div>

        <span className="text-sm font-medium text-primary">Más información →</span>
      </div>
    </a>
  );
}

export function EventList({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay eventos próximos cargados.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
        <EventRow key={`${event.title}-${event.startsAt}`} {...event} />
      ))}
    </div>
  );
}
