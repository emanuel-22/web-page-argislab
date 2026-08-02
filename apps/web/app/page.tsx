import Link from 'next/link';
import { Code2, RefreshCw, Sparkles } from 'lucide-react';

import { Button } from '@repo/ui/components/button';
import { AboutTeaser } from '@/components/about-teaser';
import { HeroBackground } from '@/components/hero-background';
import { HeroPhotoCarousel } from '@/components/hero-photo-carousel';

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

        <main className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            <h1 className="text-4xl font-black tracking-tight text-balance sm:text-6xl">
              Tecnología, agilidad e <span className="text-primary">inteligencia artificial</span> desde la práctica y la investigación.
            </h1>

            <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              Hola, soy Emanuel Barboza 👋. Argis Lab es mi espacio profesional para compartir conocimiento, desarrollar proyectos y explorar nuevas formas de construir tecnología.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button size="lg" className="font-normal" asChild>
                <Link href="/contenidos">Explorar contenidos</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-normal" asChild>
                <Link href="/comunidad">Trabajemos juntos</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute -inset-4 -z-10 rounded-4xl bg-primary/15 blur-2xl" aria-hidden="true" />
            <HeroPhotoCarousel />
            <p className="mt-4 text-center text-sm text-muted-foreground lg:text-left">
              Emanuel Barboza — fundador de Argis Lab
            </p>
          </div>
        </main>
      </div>

      <section className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-24 sm:px-8">
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            Organizamos todo lo que compartimos en Argis Lab en tres áreas principales.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {AREAS.map(({ icon: Icon, title, description, topics }) => (
              <div key={title} className="rounded-xl border bg-card p-8">
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
            ))}
          </div>
        </div>
      </section>

      <AboutTeaser />
    </div>
  );
}
