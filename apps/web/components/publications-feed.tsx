import type { Publication } from '@/data/publications';

export function PublicationsGrid({ publications }: { publications: Publication[] }) {
  if (publications.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {publications.map((publication) => (
        <a
          key={publication.href}
          href={publication.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
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
  );
}
