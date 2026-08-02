import { BOOKS, type Book } from '@/data/books';
import { PUBLICATIONS, type Publication } from '@/data/publications';
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

export type InstagramPost = {
  id: string;
  permalink: string;
  mediaUrl: string;
  caption?: string;
  likeCount?: number;
  commentsCount?: number;
  timestamp: string;
};

export type InstagramProfile = {
  username: string;
  profilePictureUrl?: string;
  followersCount?: number;
  mediaCount?: number;
};

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const res = await fetch(`${API_URL}/instagram/media`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);
    return await res.json();
  } catch {
    return [];
  }
}

export async function getInstagramProfile(): Promise<InstagramProfile | null> {
  try {
    const res = await fetch(`${API_URL}/instagram/profile`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export type MediumPost = {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  excerpt: string;
  thumbnailUrl?: string;
};

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch(`${API_URL}/medium/posts`, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);
    return await res.json();
  } catch {
    return [];
  }
}

export type YoutubeVideo = {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  thumbnailUrl: string;
};

export async function getYoutubeVideos(): Promise<YoutubeVideo[]> {
  try {
    const res = await fetch(`${API_URL}/youtube/videos`, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);
    return await res.json();
  } catch {
    return [];
  }
}

export async function getPublications(): Promise<Publication[]> {
  try {
    const res = await fetch(`${API_URL}/publications`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);

    const apiPublications: {
      title: string;
      authors: string;
      venue: string;
      type: Publication['type'];
      year: string | null;
      href: string;
    }[] = await res.json();

    return apiPublications.map((publication) => ({
      title: publication.title,
      authors: publication.authors,
      venue: publication.venue,
      type: publication.type,
      year: publication.year ?? undefined,
      href: publication.href,
    }));
  } catch {
    return PUBLICATIONS;
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
