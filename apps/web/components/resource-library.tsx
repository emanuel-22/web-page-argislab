import { BookMarked, BookOpen, FileText, ListChecks, MessageSquare, Presentation, Wrench } from 'lucide-react';

import { ReadingList } from '@/components/reading-list';
import { TalkList } from '@/components/talk-list';
import type { Book } from '@/data/books';
import type { Talk } from '@/data/talks';

const TYPES = [
  'Plantillas',
  'Prompts',
  'Checklists',
  'Guías',
  'Herramientas',
  'Materiales de charlas',
  'Lecturas recomendadas',
] as const;

const TYPE_SLUGS: Record<(typeof TYPES)[number], string> = {
  Plantillas: 'plantillas',
  Prompts: 'prompts',
  Checklists: 'checklists',
  Guías: 'guias',
  Herramientas: 'herramientas',
  'Materiales de charlas': 'materiales-de-charlas',
  'Lecturas recomendadas': 'lecturas-recomendadas',
};

const TYPE_ICONS: Record<(typeof TYPES)[number], typeof FileText> = {
  Plantillas: FileText,
  Prompts: MessageSquare,
  Checklists: ListChecks,
  Guías: BookOpen,
  Herramientas: Wrench,
  'Materiales de charlas': Presentation,
  'Lecturas recomendadas': BookMarked,
};

type Resource = {
  title: string;
  type: Exclude<(typeof TYPES)[number], 'Lecturas recomendadas' | 'Materiales de charlas'>;
  area: string;
};

const RESOURCES: Resource[] = [
  // { title: 'Plantilla de retrospectiva ágil', type: 'Plantillas', area: 'Agilidad y gestión' },
  // { title: 'Plantilla de Definition of Done', type: 'Plantillas', area: 'Tecnología' },
  // { title: 'Prompts para generar historias de usuario con IA', type: 'Prompts', area: 'Inteligencia artificial aplicada' },
  // { title: 'Prompts para revisión de código asistida por IA', type: 'Prompts', area: 'Tecnología' },
  // { title: 'Checklist de code review', type: 'Checklists', area: 'Tecnología' },
  // { title: 'Checklist para reducir deuda técnica', type: 'Checklists', area: 'Tecnología' },
  // { title: 'Guía introductoria a Scrum y Kanban', type: 'Guías', area: 'Agilidad y gestión' },
  // { title: 'Guía de buenas prácticas para adoptar IA en equipos', type: 'Guías', area: 'Inteligencia artificial aplicada' },
  // { title: 'Comparativa de herramientas de IA para desarrollo', type: 'Herramientas', area: 'Inteligencia artificial aplicada' },
  // { title: 'Kit de herramientas para testing y calidad', type: 'Herramientas', area: 'Tecnología' },
];

function ResourceCard({ title, type, area }: Resource) {
  const Icon = TYPE_ICONS[type];
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <Icon className="h-5 w-5 shrink-0 text-primary" />
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          Próximamente
        </span>
      </div>
      <h3 className="font-bold leading-snug">{title}</h3>
      <p className="text-sm text-muted-foreground">{area}</p>
    </div>
  );
}

export function ResourceLibrary({ books, talks }: { books: Book[]; talks: Talk[] }) {
  return (
    <div className="flex flex-col gap-20">
      <nav className="flex flex-wrap justify-center gap-2">
        {TYPES.map((type) => {
          const Icon = TYPE_ICONS[type];
          return (
            <a
              key={type}
              href={`#${TYPE_SLUGS[type]}`}
              className="flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              {type}
            </a>
          );
        })}
      </nav>

      {TYPES.map((type) => {
        if (type === 'Lecturas recomendadas') {
          const Icon = TYPE_ICONS[type];
          return (
            <section key={type} id={TYPE_SLUGS[type]} className="scroll-mt-24">
              <div className="flex items-center gap-3 border-b pb-4">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-black tracking-tight">{type}</h2>
              </div>
              <div className="mt-6">
                <ReadingList books={books} />
              </div>
            </section>
          );
        }

        if (type === 'Materiales de charlas') {
          const Icon = TYPE_ICONS[type];
          return (
            <section key={type} id={TYPE_SLUGS[type]} className="scroll-mt-24">
              <div className="flex items-center gap-3 border-b pb-4">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-black tracking-tight">{type}</h2>
              </div>
              <div className="mt-6">
                <TalkList talks={talks} />
              </div>
            </section>
          );
        }

        const items = RESOURCES.filter((r) => r.type === type);
        if (items.length === 0) return null;
        const Icon = TYPE_ICONS[type];

        return (
          <section key={type} id={TYPE_SLUGS[type]} className="scroll-mt-24">
            <div className="flex items-center gap-3 border-b pb-4">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black tracking-tight">{type}</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((resource) => (
                <ResourceCard key={resource.title} {...resource} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
