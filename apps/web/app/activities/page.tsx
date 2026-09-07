import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';

import { TalksTimeline } from '@/components/talks-timeline';
import { PAST_TALKS } from '@/data/past-talks';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Charlas y actividades',
  description:
    'Charlas, encuentros y actividades en las que participo o que impulso desde Argis Lab, en colaboración con instituciones, eventos y comunidades.',
  path: '/actividades',
});

export default function ActivitiesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="grid items-center gap-8 lg:grid-cols-[1fr_auto]" data-reveal>
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Charlas y actividades</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Charlas, encuentros y actividades en las que participo o que impulso desde Argis Lab, en colaboración con
            instituciones, eventos y comunidades.
          </p>
        </div>
        <Image
          src="/animation/para_charlas.webp"
          alt=""
          width={640}
          height={480}
          priority
          className="mx-auto w-full max-w-64 lg:max-w-xs xl:max-w-sm"
        />
      </header>

      <Link
        href="/comunidad/eventos"
        className="group mt-10 flex flex-col justify-between gap-3 rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg sm:flex-row sm:items-center"
        data-reveal
      >
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h2 className="font-bold">Próximos encuentros</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Los anuncio acá y en la comunidad. Mientras tanto, en la agenda hay eventos externos de tecnología,
              agilidad e IA.
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary">
          Ver la agenda <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>

      <section className="mt-14" data-reveal>
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Charlas anteriores</h2>
        <p className="mt-3 mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Charlas y presentaciones grabadas en las que participé, de la más reciente a la más antigua.
        </p>
        <TalksTimeline talks={PAST_TALKS} />
      </section>
    </main>
  );
}
