'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';
import { useState } from 'react';

import { PREZIS, type Prezi } from '@/data/prezis';

export function PreziGrid({ prezis = PREZIS }: { prezis?: Prezi[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {prezis.map((prezi) => (
        <a
          key={prezi.id}
          href={prezi.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-primary/50"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-black">
            <Image
              src={prezi.image}
              alt={`Vista previa de ${prezi.title}`}
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{prezi.category}</span>
          <h3 className="font-bold leading-snug">{prezi.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{prezi.description}</p>
          <span className="mt-1 text-sm font-medium text-primary">Ver presentación →</span>
        </a>
      ))}
    </div>
  );
}

export function PreziCarousel({ limit }: { limit?: number }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const prezis = limit ? PREZIS.slice(0, limit) : PREZIS;

  if (prezis.length === 0) return null;

  const total = prezis.length;
  const prezi = prezis[index] ?? prezis[0]!;

  const go = (next: number) => {
    setPlaying(false);
    setIndex((next + total) % total);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {index + 1} / {total}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Presentación anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Presentación siguiente"
            className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-6 rounded-2xl border bg-card p-4 sm:p-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-black">
          {playing ? (
            <iframe
              src={`https://prezi.com/p/embed/${prezi.id}/`}
              title={prezi.title}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0"
              aria-label={`Reproducir ${prezi.title}`}
            >
              <Image
                src={prezi.image}
                alt={`Vista previa de ${prezi.title}`}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover transition-transform group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Play className="h-6 w-6 translate-x-0.5" />
                </span>
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium text-muted-foreground">{prezi.category}</span>
          <h3 className="text-lg font-black leading-snug tracking-tight">{prezi.title}</h3>
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{prezi.description}</p>
          <a
            href={prezi.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
          >
            Abrir en Prezi
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {prezis.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ir a ${p.title}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
