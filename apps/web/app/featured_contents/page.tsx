import { InstagramFeed } from '@/components/instagram-feed';
import { MediumFeed } from '@/components/medium-feed';
import { PublicationsFeed } from '@/components/publications-feed';
import { YoutubeFeed } from '@/components/youtube-feed';
import { getInstagramPosts, getInstagramProfile, getMediumPosts, getPublications, getYoutubeVideos } from '@/lib/resources';

const PREVIEW_SIZE = 6;

export default async function FeaturedContentPage() {
  const [instagramPosts, instagramProfile, youtubeVideos, mediumPosts, publications] = await Promise.all([
    getInstagramPosts(),
    getInstagramProfile(),
    getYoutubeVideos(),
    getMediumPosts(),
    getPublications(),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <header className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Contenido</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Lo que voy compartiendo en distintas plataformas: publicaciones, artículos y más.
        </p>
      </header>

      <div className="mt-16 flex flex-col gap-12">
        <InstagramFeed posts={instagramPosts.slice(0, PREVIEW_SIZE)} profile={instagramProfile} />
        <YoutubeFeed videos={youtubeVideos.slice(0, PREVIEW_SIZE)} />
        <MediumFeed posts={mediumPosts.slice(0, PREVIEW_SIZE)} />
        <PublicationsFeed publications={publications} />
      </div>
    </main>
  );
}
