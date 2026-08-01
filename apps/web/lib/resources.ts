import { BOOKS, type Book } from '@/data/books';
import { TALKS, type Talk } from '@/data/talks';
import { WEBSITES, type Website } from '@/data/websites';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

type ApiCategory = { id: number; name: string; slug: string };
type ApiTopic = { id: number; name: string; categoryId: number };

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${API_URL}/books`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);

    const apiBooks: {
      title: string;
      category: ApiCategory;
      author: string | null;
      blurb: string | null;
      href: string | null;
      coverUrl: string | null;
      topics: ApiTopic[];
      createdAt: string;
    }[] = await res.json();

    return apiBooks.map((book) => ({
      title: book.title,
      category: book.category.name,
      author: book.author ?? undefined,
      blurb: book.blurb ?? undefined,
      href: book.href ?? undefined,
      coverUrl: book.coverUrl ?? undefined,
      topics: book.topics.map((topic) => topic.name),
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
      category: ApiCategory;
      href: string;
      description: string | null;
      thumbnailUrl: string | null;
      topics: ApiTopic[];
      createdAt: string;
    }[] = await res.json();

    return apiTalks.map((talk) => ({
      title: talk.title,
      category: talk.category.name,
      href: talk.href,
      description: talk.description ?? undefined,
      thumbnailUrl: talk.thumbnailUrl ?? undefined,
      topics: talk.topics.map((topic) => topic.name),
      createdAt: talk.createdAt,
    }));
  } catch {
    return TALKS;
  }
}

export async function getWebsites(): Promise<Website[]> {
  try {
    const res = await fetch(`${API_URL}/websites`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);

    const apiWebsites: {
      title: string;
      category: ApiCategory;
      href: string;
      description: string | null;
      thumbnailUrl: string | null;
      topics: ApiTopic[];
      createdAt: string;
    }[] = await res.json();

    return apiWebsites.map((website) => ({
      title: website.title,
      category: website.category.name,
      href: website.href,
      description: website.description ?? undefined,
      thumbnailUrl: website.thumbnailUrl ?? undefined,
      topics: website.topics.map((topic) => topic.name),
      createdAt: website.createdAt,
    }));
  } catch {
    return WEBSITES;
  }
}
