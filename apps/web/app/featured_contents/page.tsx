import { Code2, RefreshCw, Sparkles } from 'lucide-react';

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

export default function FeaturedContentPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20 sm:px-8">
      <header className="flex flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Contenidos</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Organizamos todo lo que compartimos en Argis Lab en tres áreas principales.
        </p>
      </header>

      <div className="mt-16 flex flex-col gap-12">
        {AREAS.map(({ icon: Icon, title, description, topics }) => (
          <section key={title} className="rounded-xl border bg-card p-8">
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
          </section>
        ))}
      </div>
    </main>
  );
}
