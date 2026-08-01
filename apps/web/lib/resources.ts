import { BOOKS, type Book } from '@/data/books';
import { TALKS, type Talk } from '@/data/talks';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function getBooks(): Promise<Book[]> {
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
      createdAt: string;
    }[] = await res.json();

    return apiBooks.map((book) => ({
      title: book.title,
      category: book.category,
      author: book.author ?? undefined,
      blurb: book.blurb ?? undefined,
      href: book.href ?? undefined,
      coverUrl: book.coverUrl ?? undefined,
      topics: book.topics,
      createdAt: book.createdAt,
    }));
  } catch {
    return BOOKS;
  }
}

export async function getTalks(): Promise<Talk[]> {
  try {
    const res = await fetch(`${API_URL}/talks`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);

    const apiTalks: {
      title: string;
      area: string;
      href: string;
      description: string | null;
      thumbnailUrl: string | null;
      createdAt: string;
    }[] = await res.json();

    return apiTalks.map((talk) => ({
      title: talk.title,
      area: talk.area,
      href: talk.href,
      description: talk.description ?? undefined,
      thumbnailUrl: talk.thumbnailUrl ?? undefined,
      createdAt: talk.createdAt,
    }));
  } catch {
    return TALKS;
  }
}
