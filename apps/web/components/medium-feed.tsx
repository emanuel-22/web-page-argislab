import { siMedium } from 'simple-icons';
import type { MediumPost } from '@/lib/resources';

const MEDIUM_PROFILE_URL = 'https://medium.com/@emabarboza';

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siMedium.path} />
    </svg>
  );
}

function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(timestamp),
  );
}

export function MediumFeed({ posts }: { posts: MediumPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center justify-between gap-4 border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <MediumIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <div className="font-bold">Artículos en Medium</div>
            <p className="text-xs text-muted-foreground">Textos que fui escribiendo sobre software y agilidad.</p>
          </div>
        </div>

        <a
          href={MEDIUM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Seguir
        </a>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-xl border bg-background transition-colors hover:border-primary/50"
          >
            <div className="aspect-video w-full overflow-hidden bg-muted">
              {post.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- Medium's CDN images aren't allowlisted for next/image
                <img
                  src={post.thumbnailUrl}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <MediumIcon className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
              <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                {formatDate(post.publishedAt)}
              </time>
              <h3 className="font-bold leading-snug">{post.title}</h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <span className="mt-auto text-sm font-medium text-primary group-hover:underline">Leer artículo →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
