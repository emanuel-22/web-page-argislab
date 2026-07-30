const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export type ApiBook = {
  id: number;
  title: string;
  category: string;
  author: string | null;
  blurb: string | null;
  href: string | null;
  coverUrl: string | null;
  topics: string[];
};

export type BookInput = {
  title: string;
  category: string;
  author?: string;
  blurb?: string;
  href?: string;
  coverUrl?: string;
  topics: string[];
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
  area: string;
  href: string;
  description: string | null;
  thumbnailUrl: string | null;
};

export type TalkInput = {
  title: string;
  area: string;
  href: string;
  description?: string;
  thumbnailUrl?: string;
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
