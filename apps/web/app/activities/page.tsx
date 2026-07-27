import Image from 'next/image';
import { Calendar, GraduationCap, Hammer, PlayCircle, Users } from 'lucide-react';

type Talk = {
  title: string;
  organizer: string;
  href: string;
  videoId: string;
};

const TALKS: Talk[] = [
  {
    title: 'Backlog en acción: de la teoría a la práctica con equipos ágiles',
    organizer: 'Proyecto DAR',
    href: 'https://www.youtube.com/watch?v=I_hcpoE4ObY&t=4088s',
    videoId: 'I_hcpoE4ObY',
  },
  {
    title: 'Súbete al Tren!! #2 - Uso consciente y crítico de la inteligencia artificial',
    organizer: 'Súbete al tren de la IA',
    href: 'https://www.youtube.com/watch?v=s4ndLzI_NyA&t=2618s',
    videoId: 's4ndLzI_NyA',
  },
];

const CATEGORIES: { icon: typeof PlayCircle; title: string; talks: Talk[] }[] = [
  { icon: PlayCircle, title: 'Charlas anteriores', talks: TALKS },
  { icon: Calendar, title: 'Próximos encuentros', talks: [] },
  { icon: Hammer, title: 'Talleres', talks: [] },
  { icon: GraduationCap, title: 'Clases abiertas', talks: [] },
  { icon: Users, title: 'Participaciones en comunidades', talks: [] },
];

function TalkCard({ title, organizer, href, videoId }: Talk) {
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

export default function ActivitiesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <header className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Charlas y actividades</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Charlas anteriores, próximos encuentros, talleres, clases abiertas y participaciones en comunidades de
          Argis Lab.
        </p>
      </header>

      <div className="mt-16 flex flex-col gap-16">
        {CATEGORIES.map(({ icon: Icon, title, talks }) => (
          <section key={title}>
            <div className="flex items-center gap-3 border-b pb-4">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black tracking-tight">{title}</h2>
            </div>

            {talks.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {talks.map((talk) => (
                  <TalkCard key={talk.videoId} {...talk} />
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">Próximamente vamos a ir sumando actividades acá.</p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
