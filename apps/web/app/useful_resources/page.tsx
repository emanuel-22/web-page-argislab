import { ResourceLibrary } from '@/components/resource-library';
import { BOOKS, type Book } from '@/data/books';
import { TALKS, type Talk } from '@/data/talks';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${API_URL}/books`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);

    const apiBooks: {
      title: string;
      category: string;
      author: string | null;
      blurb: string | null;
      href: string | null;
      coverUrl: string | null;
      topics: string[];
    }[] = await res.json();

    return apiBooks.map((book) => ({
      title: book.title,
      category: book.category,
      author: book.author ?? undefined,
      blurb: book.blurb ?? undefined,
      href: book.href ?? undefined,
      coverUrl: book.coverUrl ?? undefined,
      topics: book.topics,
    }));
  } catch {
    return BOOKS;
  }
}

async function getTalks(): Promise<Talk[]> {
  try {
    const res = await fetch(`${API_URL}/talks`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);

    const apiTalks: {
      title: string;
      area: string;
      href: string;
      description: string | null;
      thumbnailUrl: string | null;
    }[] = await res.json();

    return apiTalks.map((talk) => ({
      title: talk.title,
      area: talk.area,
      href: talk.href,
      description: talk.description ?? undefined,
      thumbnailUrl: talk.thumbnailUrl ?? undefined,
    }));
  } catch {
    return TALKS;
  }
}

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
