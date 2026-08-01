import Image from 'next/image';
import { Globe } from 'lucide-react';
import type { Website } from '@/data/websites';

function WebsiteCard({ title, category, href, description, thumbnailUrl, topics }: Website) {
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
        <span className="mt-2 text-sm font-medium text-primary">Visitar sitio →</span>
      </div>
    </a>
  );
}

export function WebsiteList({ websites }: { websites: Website[] }) {
  if (websites.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay páginas web cargadas.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {websites.map((website) => (
        <WebsiteCard key={website.title} {...website} />
      ))}
    </div>
  );
}
