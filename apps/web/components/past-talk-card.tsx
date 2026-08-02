import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import type { PastTalk } from '@/data/past-talks';

export function PastTalkCard({ title, organizer, href, videoId }: PastTalk) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
          <PlayCircle className="h-10 w-10 text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-1 p-5">
        <span className="text-xs font-medium text-muted-foreground">{organizer}</span>
        <h3 className="font-bold leading-snug">{title}</h3>
        <span className="mt-2 text-sm font-medium text-primary">Ver charla →</span>
      </div>
    </a>
  );
}
