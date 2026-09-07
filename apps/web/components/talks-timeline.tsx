import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

import type { PastTalk } from '@/data/past-talks';

function formatMonthYear(iso?: string) {
  if (!iso) return null;
  const parsed = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  const label = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(parsed);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function TalksTimeline({ talks }: { talks: PastTalk[] }) {
  if (talks.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay charlas cargadas.</p>;
  }

  return (
    <ol className="relative ml-2 border-l-2 border-border">
      {talks.map((talk) => {
        const when = formatMonthYear(talk.date);
        return (
          <li key={talk.videoId} className="relative pb-10 pl-8 last:pb-0">
            <span
              className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-2 border-primary bg-background"
              aria-hidden="true"
            />
            {when ? <time className="text-sm font-medium text-muted-foreground">{when}</time> : null}

            <a
              href={talk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 grid gap-4 sm:grid-cols-[220px_1fr] sm:items-start"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={`https://i.ytimg.com/vi/${talk.videoId}/hqdefault.jpg`}
                  alt={talk.title}
                  fill
                  sizes="(min-width: 640px) 220px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                  <PlayCircle className="h-10 w-10 text-white" />
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground">{talk.organizer}</span>
                <h3 className="mt-1 font-bold leading-snug group-hover:text-primary">{talk.title}</h3>
                <span className="mt-2 inline-block text-sm font-medium text-primary group-hover:underline">
                  Ver charla →
                </span>
              </div>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
