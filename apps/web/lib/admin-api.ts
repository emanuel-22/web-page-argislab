const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export type ApiTopic = { id: number; name: string; categoryId: number };
export type ApiCategory = { id: number; name: string; slug: string; topics: ApiTopic[] };

export type ApiBook = {
  id: number;
  title: string;
  categoryId: number;
  category: { id: number; name: string; slug: string };
  author: string | null;
  blurb: string | null;
  href: string | null;
  coverUrl: string | null;
  topics: ApiTopic[];
};

export type BookInput = {
  title: string;
  categoryId: number;
  author?: string;
  blurb?: string;
  href?: string;
  coverUrl?: string;
  topicIds: number[];
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = Array.isArray(body?.message) ? body.message.join(', ') : (body?.message ?? `Error ${res.status}`);
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export function login(email: string, password: string) {
  return request<{ email: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return request<{ ok: boolean }>('/auth/logout', { method: 'POST' });
}

export function me() {
  return request<{ email: string }>('/auth/me');
}

export function listCategories() {
  return request<ApiCategory[]>('/categories');
}

export function listBooks() {
  return request<ApiBook[]>('/books');
}

export function createBook(input: BookInput) {
  return request<ApiBook>('/books', { method: 'POST', body: JSON.stringify(input) });
}

export function updateBook(id: number, input: BookInput) {
  return request<ApiBook>(`/books/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}

export function deleteBook(id: number) {
  return request<void>(`/books/${id}`, { method: 'DELETE' });
}

export type ApiTalk = {
  id: number;
  title: string;
  categoryId: number;
  category: { id: number; name: string; slug: string };
  href: string;
  description: string | null;
  thumbnailUrl: string | null;
  topics: ApiTopic[];
};

export type TalkInput = {
  title: string;
  categoryId: number;
  href: string;
  description?: string;
  thumbnailUrl?: string;
  topicIds: number[];
};

export function listTalks() {
  return request<ApiTalk[]>('/talks');
}

export function createTalk(input: TalkInput) {
  return request<ApiTalk>('/talks', { method: 'POST', body: JSON.stringify(input) });
}

export function updateTalk(id: number, input: TalkInput) {
  return request<ApiTalk>(`/talks/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}

export function deleteTalk(id: number) {
  return request<void>(`/talks/${id}`, { method: 'DELETE' });
}

export type ApiWebsite = {
  id: number;
  title: string;
  categoryId: number;
  category: { id: number; name: string; slug: string };
  href: string;
  description: string | null;
  thumbnailUrl: string | null;
  topics: ApiTopic[];
};

export type WebsiteInput = {
  title: string;
  categoryId: number;
  href: string;
  description?: string;
  thumbnailUrl?: string;
  topicIds: number[];
};

export function listWebsites() {
  return request<ApiWebsite[]>('/websites');
}

export function createWebsite(input: WebsiteInput) {
  return request<ApiWebsite>('/websites', { method: 'POST', body: JSON.stringify(input) });
}

export function updateWebsite(id: number, input: WebsiteInput) {
  return request<ApiWebsite>(`/websites/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}

export function deleteWebsite(id: number) {
  return request<void>(`/websites/${id}`, { method: 'DELETE' });
}

export const PUBLICATION_TYPES = ['Conference Paper', 'Artículo'] as const;

export type ApiPublication = {
  id: number;
  title: string;
  categoryId: number;
  category: { id: number; name: string; slug: string };
  authors: string;
  venue: string;
  type: (typeof PUBLICATION_TYPES)[number];
  year: string | null;
  href: string;
  topics: ApiTopic[];
};

export type PublicationInput = {
  title: string;
  categoryId: number;
  authors: string;
  venue: string;
  type: (typeof PUBLICATION_TYPES)[number];
  year?: string;
  href: string;
  topicIds: number[];
};

export function listPublications() {
  return request<ApiPublication[]>('/publications');
}

export function createPublication(input: PublicationInput) {
  return request<ApiPublication>('/publications', { method: 'POST', body: JSON.stringify(input) });
}

export function updatePublication(id: number, input: PublicationInput) {
  return request<ApiPublication>(`/publications/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}

export function deletePublication(id: number) {
  return request<void>(`/publications/${id}`, { method: 'DELETE' });
}
