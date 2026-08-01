'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { BookOpen, type LucideIcon } from 'lucide-react';
import { CATEGORIES, type Book } from '@/data/books';

export function BookCard({ title, author, blurb, href, coverUrl, topics }: Book) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50"
    >
      <div className="relative h-50 w-38 shrink-0 overflow-hidden rounded-md border bg-linear-to-b from-primary/15 to-transparent">
        {coverUrl ? (
          <Image src={coverUrl} alt={`Portada de ${title}`} fill sizes="136px" className="object-cover" />
        ) : (
          <div className="flex h-full flex-col justify-between p-2.5">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-xs leading-tight font-bold">{title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">{topics.join(' · ')}</span>
        <h3 className="font-bold leading-snug">{title}</h3>
        {author ? <p className="text-sm text-muted-foreground">{author}</p> : null}
        {blurb ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{blurb}</p> : null}
        <span className="mt-2 text-sm font-medium text-primary">Buscar el libro →</span>
      </div>
    </a>
  );
}

function CategorySection({ name, icon: Icon, books }: { name: string; icon: LucideIcon; books: Book[] }) {
  const [activeTopic, setActiveTopic] = useState<string | 'Todos'>('Todos');

  const topics = useMemo(() => Array.from(new Set(books.flatMap((b) => b.topics))).sort(), [books]);
  const filtered = activeTopic === 'Todos' ? books : books.filter((b) => b.topics.includes(activeTopic));

  return (
    <section id={`cat-${name}`} className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3 border-b pb-4">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-black tracking-tight">{name}</h3>
        <span className="text-sm text-muted-foreground">({books.length})</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(['Todos', ...topics] as const).map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => setActiveTopic(topic)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              activeTopic === topic
                ? 'border-primary bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:text-foreground'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((book) => (
            <BookCard key={book.title} {...book} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">Todavía no hay libros cargados con este tema.</p>
      )}
    </section>
  );
}

export function ReadingList({ books }: { books: Book[] }) {
  return (
    <div className="flex flex-col gap-16">
      <nav className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map(({ name, icon: Icon }) => (
          <a
            key={name}
            href={`#cat-${name}`}
            className="flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className="h-3.5 w-3.5 text-primary" />
            {name}
          </a>
        ))}
      </nav>

      {CATEGORIES.map(({ name, icon }) => {
        const categoryBooks = books.filter((b) => b.category === name);
        if (categoryBooks.length === 0) return null;
        return <CategorySection key={name} name={name} icon={icon} books={categoryBooks} />;
      })}
    </div>
  );
}
