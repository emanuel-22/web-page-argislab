import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { siYoutube } from 'simple-icons';
import type { YoutubeVideo } from '@/lib/resources';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@argislab';

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siYoutube.path} />
    </svg>
  );
}

function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(timestamp),
  );
}

export function YoutubeFeed({ videos }: { videos: YoutubeVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center justify-between gap-4 border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <YoutubeIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <div className="font-bold">Videos en YouTube</div>
            <p className="text-xs text-muted-foreground">Charlas, clases y contenido grabado.</p>
          </div>
        </div>

        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Suscribirme
        </a>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <a
            key={video.id}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-xl border bg-background transition-colors hover:border-primary/50"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <PlayCircle className="h-10 w-10 text-white" />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
              <time dateTime={video.publishedAt} className="text-xs text-muted-foreground">
                {formatDate(video.publishedAt)}
              </time>
              <h3 className="font-bold leading-snug">{video.title}</h3>
              <span className="mt-auto text-sm font-medium text-primary group-hover:underline">Ver video →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
