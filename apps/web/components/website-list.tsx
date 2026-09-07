import Image from 'next/image';
import { Globe } from 'lucide-react';
import type { Website } from '@/data/websites';

function WebsiteCard({ title, category, href, description, thumbnailUrl, topics }: Website) {
  const isPdf = href.toLowerCase().split('?')[0]?.endsWith('.pdf') ?? false;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-linear-to-b from-primary/15 to-transparent">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`Vista previa de ${title}`}
            fill
            sizes="400px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Globe className="h-8 w-8 text-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">
          {category}
          {topics && topics.length > 0 ? ` · ${topics.join(', ')}` : ''}
        </span>
        <h3 className="font-bold leading-snug">{title}</h3>
        {description ? <p className="text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
        <span className="mt-2 text-sm font-medium text-primary">{isPdf ? 'Abrir PDF' : 'Visitar sitio'} →</span>
      </div>
    </a>
  );
}

export function WebsiteList({ websites }: { websites: Website[] }) {
  if (websites.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay páginas web cargadas.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {websites.map((website) => (
        <WebsiteCard key={website.title} {...website} />
      ))}
    </div>
  );
}
