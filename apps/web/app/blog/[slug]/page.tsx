import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { ArticleShare } from '@/components/blog/article-share';
import { ArticleToc } from '@/components/blog/article-toc';
import { PostCard } from '@/components/blog/post-card';
import { formatPostDateLong, getPost, POSTS, relatedPosts } from '@/data/posts';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  // Blog oculto por ahora: accesible por URL pero fuera del menú y sin indexar.
  return pageMetadata({
    title: post.meta.title,
    description: post.meta.excerpt,
    path: `/blog/${post.meta.slug}`,
    noindex: true,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, toc, Body } = post;
  const related = relatedPosts(slug, 3);
  const eyebrow = [meta.category, ...meta.tags].slice(0, 2).join(' · ').toUpperCase();

  return (
    <main className="px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Artículos
        </Link>

        <header className="mt-8 flex flex-col gap-5">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
          <h1 className="text-3xl leading-tight font-black tracking-tight text-balance sm:text-[2.6rem]">
            {meta.title}
          </h1>
          <p className="text-xl leading-relaxed font-light text-muted-foreground">{meta.subtitle}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Emanuel Barboza</span> · {formatPostDateLong(meta.date)} ·{' '}
            {meta.readingMinutes} min de lectura
          </p>
        </header>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-surface">
          {meta.cover ? (
            <Image src={meta.cover} alt="" fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/15 via-primary/5 to-transparent">
              <span className="text-2xl font-black tracking-tight text-primary/40 uppercase sm:text-3xl">
                {meta.category}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ArticleToc entries={toc} />
          </div>
        </aside>

        <article className="prose-article mx-auto max-w-[46rem]">
          <Body />
        </article>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <ArticleShare title={meta.title} slug={meta.slug} />
      </div>

      {related.length > 0 ? (
        <section className="mx-auto mt-16 max-w-6xl">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Para seguir explorando</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <div key={r.slug} data-reveal>
                <PostCard post={r} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
