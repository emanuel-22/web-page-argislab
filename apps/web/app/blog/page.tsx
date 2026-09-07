import Image from 'next/image';

import { BlogIndex } from '@/components/blog/blog-index';
import { FEATURED_POST, POSTS } from '@/data/posts';

export const metadata = {
  title: 'Artículos · Argis Lab',
  description: 'Ideas, aprendizajes y experiencias sobre ingeniería de software, agilidad e inteligencia artificial.',
};

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="grid items-center gap-8 lg:grid-cols-[1fr_auto]" data-reveal>
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Artículos</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Ideas, aprendizajes y experiencias sobre ingeniería de software, agilidad e inteligencia artificial.
          </p>
        </div>
        <Image
          src="/animation/para_blog.webp"
          alt=""
          width={640}
          height={480}
          priority
          className="mx-auto w-full max-w-64 lg:max-w-xs xl:max-w-sm"
        />
      </header>

      <div className="mt-10 sm:mt-12">
        <BlogIndex posts={POSTS} featured={FEATURED_POST} />
      </div>
    </main>
  );
}
