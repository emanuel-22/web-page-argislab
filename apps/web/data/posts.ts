import type { ComponentType } from 'react';

import * as deudaTecnica from '@/content/blog/deuda-tecnica';
import * as iaEnEquipos from '@/content/blog/ia-en-equipos';
import * as retrospectivas from '@/content/blog/retrospectivas-que-no-sirven';

export type PostCategory = 'Tecnología' | 'Agilidad' | 'IA';

export type PostMeta = {
  slug: string;
  title: string;
  subtitle: string;
  category: PostCategory;
  tags: string[];
  /** ISO YYYY-MM-DD */
  date: string;
  readingMinutes: number;
  excerpt: string;
  cover?: string;
  featured?: boolean;
};

type TocEntry = { id: string; title: string };

type PostModule = {
  meta: PostMeta;
  toc: TocEntry[];
  default: ComponentType;
};

const MODULES = [deudaTecnica, iaEnEquipos, retrospectivas] as unknown as PostModule[];

export const POSTS: PostMeta[] = MODULES.map((m) => m.meta).sort((a, b) => b.date.localeCompare(a.date));

export const FEATURED_POST: PostMeta = POSTS.find((p) => p.featured) ?? POSTS[0]!;

export const BLOG_FILTERS: Array<{ label: string; value: PostCategory | 'Todos' }> = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Tecnología', value: 'Tecnología' },
  { label: 'Agilidad', value: 'Agilidad' },
  { label: 'IA', value: 'IA' },
];

export function getPost(slug: string): { meta: PostMeta; toc: TocEntry[]; Body: ComponentType } | null {
  const mod = MODULES.find((m) => m.meta.slug === slug);
  if (!mod) return null;
  return { meta: mod.meta, toc: mod.toc, Body: mod.default };
}

export function relatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = POSTS.find((p) => p.slug === slug);
  const others = POSTS.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

const MONTHS_SHORT = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_SHORT[(m ?? 1) - 1]} ${y}`;
}

export function formatPostDateLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}
