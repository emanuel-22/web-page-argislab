'use client';

import { useMemo, useState } from 'react';

import { BLOG_FILTERS, type PostCategory, type PostMeta } from '@/data/posts';
import { FeaturedPostCard, PostCard } from '@/components/blog/post-card';

export function BlogIndex({ posts, featured }: { posts: PostMeta[]; featured: PostMeta }) {
  const [filter, setFilter] = useState<PostCategory | 'Todos'>('Todos');

  const rest = useMemo(() => posts.filter((p) => p.slug !== featured.slug), [posts, featured.slug]);
  const visible = useMemo(
    () => (filter === 'Todos' ? rest : rest.filter((p) => p.category === filter)),
    [filter, rest],
  );

  const showFeatured = filter === 'Todos' || featured.category === filter;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoría">
        {BLOG_FILTERS.map(({ label, value }) => {
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(value)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {showFeatured ? (
        <div className="mt-8" data-reveal>
          <FeaturedPostCard post={featured} />
        </div>
      ) : null}

      {visible.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Últimos artículos</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <div key={post.slug} data-reveal>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {!showFeatured && visible.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Todavía no hay artículos en esta categoría.</p>
      ) : null}
    </div>
  );
}
