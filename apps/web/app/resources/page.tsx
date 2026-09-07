import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookMarked, Globe, GraduationCap, Presentation } from 'lucide-react';

import { BOOKS } from '@/data/books';
import { PRESENTATIONS } from '@/data/presentations';
import { PUBLICATIONS } from '@/data/publications';
import { WEBSITES } from '@/data/websites';

export const metadata = {
  title: 'Recursos · Argis Lab',
  description:
    'Libros, materiales de charlas, páginas de referencia y publicaciones que reúno y comparto desde Argis Lab.',
};

const RESEARCHGATE_PROFILE = 'https://www.researchgate.net/profile/Emanuel-Barboza-2';

const bookCovers = BOOKS.filter((b) => b.coverUrl).slice(0, 6);

export default function ResourcesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="grid items-center gap-8 lg:grid-cols-[1fr_auto]" data-reveal>
        <div className="flex max-w-2xl flex-col gap-5">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Recursos</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Todo lo que reúno y comparto desde Argis Lab para aprender y facilitar el trabajo: libros, materiales de
            charlas, páginas de referencia y publicaciones. Entrá a cada colección para verla completa.
          </p>
        </div>
        <Image
          src="/animation/para_recursos.webp"
          alt=""
          width={640}
          height={480}
          priority
          className="mx-auto w-full max-w-64 lg:max-w-xs xl:max-w-sm"
        />
      </header>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
        {/* Libros — tile ancho */}
        <Link
          href="/recursos/libros-recomendados"
          className="group flex flex-col overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg sm:col-span-2"
        >
          <BookMarked className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-2xl font-black tracking-tight">Libros recomendados</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Una biblioteca personal de {BOOKS.length} títulos sobre ingeniería de software, agilidad, liderazgo,
            producto e inteligencia artificial. Muchos los tengo en digital: escribime y te los paso.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Ver la biblioteca <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>

          <div className="mt-6 flex -space-x-5 sm:-space-x-6">
            {bookCovers.map((book) => (
              <div
                key={book.title}
                className="relative aspect-2/3 w-16 shrink-0 overflow-hidden rounded-lg border shadow-xl transition-transform group-hover:-translate-y-1 sm:w-18"
              >
                <Image src={book.coverUrl!} alt="" fill sizes="80px" className="object-cover" />
              </div>
            ))}
          </div>
        </Link>

        {/* Materiales de charlas */}
        <Link
          href="/recursos/materiales-de-charlas"
          className="group flex flex-col justify-center rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
        >
          <Presentation className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-lg font-black tracking-tight">Materiales de charlas</h2>
          <p className="mt-1 text-sm text-muted-foreground">{PRESENTATIONS.length} presentaciones · Prezi y slides</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Ver todas <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Páginas web */}
        <Link
          href="/recursos/paginas-web-recomendadas"
          className="group flex flex-col justify-center rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
        >
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-lg font-black tracking-tight">Páginas web recomendadas</h2>
          <p className="mt-1 text-sm text-muted-foreground">{WEBSITES.length} sitios y blogs de referencia</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Ver todas <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Publicaciones — banda ancha */}
        <a
          href={RESEARCHGATE_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between gap-3 rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg sm:col-span-2 sm:flex-row sm:items-center"
        >
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-black tracking-tight">Publicaciones académicas</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {PUBLICATIONS.length} artículos y conference papers publicados en repositorios académicos.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary">
            Ver en ResearchGate <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>
    </main>
  );
}
