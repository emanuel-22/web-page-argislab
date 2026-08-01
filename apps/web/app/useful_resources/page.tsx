import { ResourceLibrary } from '@/components/resource-library';
import { getBooks, getTalks } from '@/lib/resources';

export default async function UsefulResourcePage() {
  const [books, talks] = await Promise.all([getBooks(), getTalks()]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <header className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Recursos</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Una biblioteca de diferentes recursos como prompts, checklists, guías, herramientas, materiales de charlas y lecturas
          recomendadas, organizada por tipo. La vamos a ir completando con material real a medida que esté listo.
        </p>
      </header>

      <div className="mt-16">
        <ResourceLibrary books={books} talks={talks} />
      </div>
    </main>
  );
}
