import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { PreziGrid } from '@/components/prezi-carousel';

export const metadata = {
  title: 'Materiales de charlas · Argis Lab',
};

export default function MaterialesDeCharlasPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <Link href="/contenidos" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a Explorar
      </Link>

      <header className="mx-auto mt-6 flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Materiales de charlas</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Slides y presentaciones de charlas y talleres sobre agilidad, ingeniería de software e inteligencia artificial
          aplicada. Publicadas en Prezi.
        </p>
      </header>

      <div className="mt-16">
        <PreziGrid />
      </div>
    </main>
  );
}
