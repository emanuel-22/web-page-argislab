import Link from 'next/link';
import { Code2, RefreshCw, Sparkles } from 'lucide-react';

import { Button } from '@repo/ui/components/button';
import { HeroBackground } from '@/components/hero-background';
import { HeroPhotoCarousel } from '@/components/hero-photo-carousel';
import { Reveal } from '@/components/reveal';

const CARD_REVEAL: Array<'left' | 'bottom' | 'right'> = ['left', 'bottom', 'right'];

const AREAS = [
  {
    icon: Code2,
    title: 'Tecnología',
    description: 'Ingeniería de software, desarrollo de software, arquitectura de software, calidad y testing.',
    topics: [
      'Desarrollo de software',
      'Arquitectura',
      'Calidad y testing',
      'Deuda técnica',
      'DevOps e infraestructura',
      'Bases de datos',
      'Seguridad',
      'Herramientas y frameworks',
      'Buenas prácticas',
      'Experiencias reales de proyectos',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Agilidad y gestión',
    description: 'Scrum, Kanban, gestión de productos, equipos, liderazgo y mejora continua.',
    topics: [
      'Scrum y Kanban',
      'Gestión de proyectos',
      'Gestión de productos',
      'Liderazgo de equipos',
      'Planificación y estimaciones',
      'Retrospectivas',
      'Mejora continua',
      'Cultura organizacional',
      'Habilidades de comunicación',
      'Transformación ágil',
    ],
  },
  {
    icon: Sparkles,
    title: 'Inteligencia artificial aplicada',
    description: 'IA generativa, prompting, herramientas, automatización y aplicación de IA en equipos de software.',
    topics: [
      'IA generativa',
      'Prompting',
      'Automatización',
      'Agentes de IA',
      'IA para desarrollo de software',
      'IA para equipos ágiles',
      'IA en educación',
      'Uso responsable',
      'Gobernanza y riesgos',
      'Herramientas y casos prácticos',
    ],
  },
];

export default function Home() {
  return (
    <div>
      <div className="relative isolate overflow-hidden">
        <HeroBackground />

        <main className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            <h1 className="animate-in fade-in slide-in-from-bottom-4 text-4xl font-black tracking-tight text-balance duration-700 sm:text-6xl">
              Tecnología, agilidad e <span className="text-primary">inteligencia artificial</span> desde la teoría a la práctica.
            </h1>

            <p className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl text-lg leading-relaxed text-foreground/80 delay-150 duration-700 sm:text-xl">
              Hola, soy Emanuel Barboza 👋. Argis Lab es mi espacio profesional para compartir conocimiento, desarrollar proyectos y explorar nuevas formas de construir tecnología.
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-wrap items-center justify-center gap-4 delay-300 duration-700 lg:justify-start">
              <Button size="lg" className="font-normal" asChild>
                <Link href="/contenidos">Explorar contenidos</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-normal" asChild>
                <Link href="/comunidad">Trabajemos juntos</Link>
              </Button>
            </div>
          </div>

          <div className="animate-in fade-in zoom-in-95 relative mx-auto w-full max-w-md duration-1000 lg:max-w-xl">
            <div
              className="animate-hero-glow absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="animate-hero-float">
              <HeroPhotoCarousel />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground lg:text-left">
              Emanuel Barboza — fundador de Argis Lab
            </p>
          </div>
        </main>
      </div>

      <section className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-24 sm:px-8">
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            Organizamos todo lo que compartimos en Argis Lab en tres áreas principales.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {AREAS.map(({ icon: Icon, title, description, topics }, index) => (
              <Reveal
                key={title}
                from={CARD_REVEAL[index] ?? 'bottom'}
                delay={index * 120}
                className="h-full"
              >
                <div className="h-full rounded-xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-black tracking-tight">{title}</h2>
                  </div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
