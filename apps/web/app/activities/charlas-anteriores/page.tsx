import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { PastTalkCard } from '@/components/past-talk-card';
import { PAST_TALKS } from '@/data/past-talks';

export default function CharlasAnterioresPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <Link href="/actividades" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a Charlas y actividades
      </Link>

      <header className="mx-auto mt-6 flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Charlas anteriores</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Charlas y presentaciones grabadas en las que participé, en colaboración con instituciones, eventos y
          comunidades.
        </p>
      </header>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PAST_TALKS.map((talk) => (
          <PastTalkCard key={talk.videoId} {...talk} />
        ))}
      </div>
    </main>
  );
}
