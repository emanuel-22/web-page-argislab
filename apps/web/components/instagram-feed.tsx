import { BadgeCheck } from 'lucide-react';
import { siInstagram } from 'simple-icons';
import type { InstagramPost, InstagramProfile } from '@/lib/resources';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/argis_lab/';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siInstagram.path} />
    </svg>
  );
}

function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(timestamp),
  );
}

function numberFormat(value: number) {
  return new Intl.NumberFormat('es-AR').format(value);
}

export function InstagramFeed({ posts, profile }: { posts: InstagramPost[]; profile: InstagramProfile | null }) {
  if (posts.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center justify-between gap-4 border-b p-4">
        <div className="flex items-center gap-3">
          {profile?.profilePictureUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- Instagram's CDN hostnames are dynamic/signed
            <img
              src={profile.profilePictureUrl}
              alt={profile.username}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <InstagramIcon className="h-5 w-5 text-primary" />
            </div>
          )}
          <div className="text-left">
            <div className="flex items-center gap-1 font-bold">
              {profile?.username ?? 'argis_lab'}
              <BadgeCheck className="h-4 w-4 fill-primary text-card" />
            </div>
            <p className="text-xs text-muted-foreground">
              {profile?.mediaCount !== undefined ? `${numberFormat(profile.mediaCount)} publicaciones` : null}
              {profile?.mediaCount !== undefined && profile?.followersCount !== undefined ? ' · ' : null}
              {profile?.followersCount !== undefined ? `${numberFormat(profile.followersCount)} seguidores` : null}
            </p>
          </div>
        </div>

        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Seguir
        </a>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-xl border bg-background transition-colors hover:border-primary/50"
          >
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <span className="truncate text-xs font-semibold">{profile?.username ?? 'argis_lab'}</span>
              <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.timestamp}>{formatDate(post.timestamp)}</time>
                <InstagramIcon className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="aspect-square w-full overflow-hidden perspective-[1000px]">
              <div className="relative h-full w-full transform-3d transition-transform duration-500 group-hover:transform-[rotateY(180deg)]">
                <div className="absolute inset-0 backface-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Instagram's CDN hostnames are dynamic/signed */}
                  <img
                    src={post.mediaUrl}
                    alt={post.caption?.slice(0, 140) ?? 'Publicación de Instagram'}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 overflow-y-auto bg-background p-4 backface-hidden transform-[rotateY(180deg)]">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.caption ?? 'Sin descripción.'}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
