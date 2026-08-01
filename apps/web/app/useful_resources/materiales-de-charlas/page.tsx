import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TalkList } from '@/components/talk-list';
import { getTalks } from '@/lib/resources';

export default async function MaterialesDeCharlasPage() {
  const talks = await getTalks();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <Link href="/recursos" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a Recursos
      </Link>

      <header className="mx-auto mt-6 flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Materiales de charlas</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Slides y materiales de charlas dadas sobre agilidad, ingeniería de software e inteligencia artificial aplicada.
        </p>
      </header>

      <div className="mt-16">
        <TalkList talks={talks} />
      </div>
    </main>
  );
}
