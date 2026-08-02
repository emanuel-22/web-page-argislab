import { siResearchgate } from 'simple-icons';
import type { Publication } from '@/data/publications';

function ResearchGateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siResearchgate.path} />
    </svg>
  );
}

export function PublicationsFeed({ publications }: { publications: Publication[] }) {
  if (publications.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center gap-3 border-b p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <ResearchGateIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="text-left">
          <div className="font-bold">Publicaciones académicas</div>
          <p className="text-xs text-muted-foreground">Artículos y conference papers publicados en distintos repositorios académicos.</p>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {publications.map((publication) => (
          <a
            key={publication.href}
            href={publication.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border bg-background p-5 transition-colors hover:border-primary/50"
          >
            <span className="w-fit rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
              {publication.type}
              {publication.year ? ` · ${publication.year}` : ''}
            </span>
            <h3 className="font-bold leading-snug">{publication.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{publication.authors}</p>
            <p className="text-xs text-muted-foreground">{publication.venue}</p>
            <span className="mt-auto text-sm font-medium text-primary group-hover:underline">Ver publicación →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
