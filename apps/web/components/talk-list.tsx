import Image from 'next/image';
import { Presentation } from 'lucide-react';
import type { Talk } from '@/data/talks';

function TalkCard({ title, area, href, description, thumbnailUrl }: Talk) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-linear-to-b from-primary/15 to-transparent">
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt={`Vista previa de ${title}`} fill sizes="400px" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Presentation className="h-8 w-8 text-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">{area}</span>
        <h3 className="font-bold leading-snug">{title}</h3>
        {description ? <p className="text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
        <span className="mt-2 text-sm font-medium text-primary">Ver charla →</span>
      </div>
    </a>
  );
}

export function TalkList({ talks }: { talks: Talk[] }) {
  if (talks.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay materiales de charlas cargados.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {talks.map((talk) => (
        <TalkCard key={talk.title} {...talk} />
      ))}
    </div>
  );
}
