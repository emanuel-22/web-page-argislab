import Image from 'next/image';
import Link from 'next/link';

import { formatPostDate, type PostMeta } from '@/data/posts';

function Cover({ post, className = '' }: { post: PostMeta; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {post.cover ? (
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/15 via-primary/5 to-transparent">
          <span className="px-6 text-center text-lg font-black tracking-tight text-primary/40 uppercase">
            {post.category}
          </span>
        </div>
      )}
    </div>
  );
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <Cover post={post} className="aspect-video w-full" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold tracking-wide text-primary uppercase">{post.category}</span>
        <h3 className="text-lg leading-snug font-bold tracking-tight group-hover:text-primary">{post.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto pt-2 text-xs font-medium tracking-wide text-muted-foreground">
          {formatPostDate(post.date)} · {post.readingMinutes} MIN
        </span>
      </div>
    </Link>
  );
}

export function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg md:grid-cols-2"
    >
      <Cover post={post} className="aspect-video w-full md:aspect-auto md:h-full md:min-h-72" />
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
        <span className="text-xs font-semibold tracking-wide text-primary uppercase">
          Artículo destacado · {post.category}
        </span>
        <h2 className="text-2xl leading-tight font-black tracking-tight group-hover:text-primary sm:text-3xl">
          {post.title}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-1 text-xs font-medium tracking-wide text-muted-foreground">
          {formatPostDate(post.date)} · {post.readingMinutes} MIN DE LECTURA
        </span>
      </div>
    </Link>
  );
}
