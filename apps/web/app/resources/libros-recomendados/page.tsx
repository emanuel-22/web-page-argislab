import Link from 'next/link';
import { ArrowLeft, Quote } from 'lucide-react';

import { ReadingList } from '@/components/reading-list';
import { BOOKS } from '@/data/books';

export const metadata = {
  title: 'Libros recomendados · Argis Lab',
  description:
    'Una biblioteca personal de libros sobre ingeniería de software, agilidad, liderazgo, producto e inteligencia artificial.',
};

export default function LibrosRecomendadosPage() {
  const books = BOOKS;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <Link
        href="/recursos"
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Recursos
      </Link>

      <header className="mx-auto mt-6 flex max-w-3xl flex-col gap-5 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Libros recomendados</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Una biblioteca personal en construcción. Reúno acá los libros que marcaron mi forma de
          entender la ingeniería de software, la agilidad, el liderazgo, el producto y la inteligencia
          artificial, junto a algunas lecturas sobre productividad y desarrollo personal.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground">
          Están agrupados por categoría y tema: usá los filtros dentro de cada categoría para llegar
          más rápido a lo que buscás. Cada tarjeta enlaza a una búsqueda para que consigas el libro en
          la tienda o formato que prefieras.
        </p>
      </header>

      <figure className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border bg-card px-6 py-6 text-center">
        <Quote className="h-5 w-5 text-primary" />
        <blockquote className="text-lg leading-relaxed font-light text-balance">
          “Un libro es como un jardín que se lleva en el bolsillo.”
        </blockquote>
        <figcaption className="text-sm text-muted-foreground">Proverbio árabe</figcaption>
      </figure>

      <section className="mt-12">
        <h2 className="text-xl font-black tracking-tight">Recorré por categoría</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Un carrusel por cada categoría. Deslizá para recorrerlo o tocá cualquier libro para abrirlo en grande con
          una descripción más detallada.
        </p>
        <div className="mt-6">
          <ReadingList books={books} />
        </div>
      </section>
    </main>
  );
}
