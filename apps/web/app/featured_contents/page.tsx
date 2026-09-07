import { InstagramFeed } from '@/components/instagram-feed';
import { MediumFeed } from '@/components/medium-feed';
import { PublicationsFeed } from '@/components/publications-feed';
import { ResourceLibrary } from '@/components/resource-library';
import { YoutubeFeed } from '@/components/youtube-feed';
import { BOOKS } from '@/data/books';
import { INSTAGRAM_POSTS, INSTAGRAM_PROFILE } from '@/data/instagram';
import { MEDIUM_POSTS } from '@/data/medium';
import { PUBLICATIONS } from '@/data/publications';
import { WEBSITES } from '@/data/websites';
import { YOUTUBE_VIDEOS } from '@/data/youtube';

const PREVIEW_SIZE = 3;

export default function FeaturedContentPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <header className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Explorar</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Todo lo que comparto desde Argis Lab: libros y recursos recomendados, materiales de charlas, y lo que voy
          publicando en distintas plataformas.
        </p>
      </header>

      <div className="mt-16 flex flex-col gap-20">
        <ResourceLibrary books={BOOKS} websites={WEBSITES} />

        <div className="flex flex-col gap-12">
          <InstagramFeed posts={INSTAGRAM_POSTS.slice(0, PREVIEW_SIZE)} profile={INSTAGRAM_PROFILE} />
          <YoutubeFeed videos={YOUTUBE_VIDEOS.slice(0, PREVIEW_SIZE)} />
          <MediumFeed posts={MEDIUM_POSTS.slice(0, PREVIEW_SIZE)} />
          <PublicationsFeed publications={PUBLICATIONS} />
        </div>
      </div>
    </main>
  );
}
