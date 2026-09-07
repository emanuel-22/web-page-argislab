import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { PresentationsGrid } from '@/components/presentations-grid';

export const metadata = {
  title: 'Materiales de charlas · Argis Lab',
};

export default function MaterialesDeCharlasPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <Link href="/recursos" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a Recursos
      </Link>

      <header className="mx-auto mt-6 flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Materiales de charlas</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Slides y presentaciones de charlas y talleres sobre agilidad, ingeniería de software e inteligencia artificial
          aplicada.
        </p>
      </header>

      <div className="mt-10 sm:mt-12">
        <PresentationsGrid />
      </div>
    </main>
  );
}
