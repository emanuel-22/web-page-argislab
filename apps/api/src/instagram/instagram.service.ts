import { Injectable, Logger } from '@nestjs/common';

const FETCH_TIMEOUT_MS = 5000;
const CACHE_TTL_MS = 10 * 60 * 1000;
const MEDIA_LIMIT = 12;
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,like_count,comments_count,timestamp';

export type InstagramPost = {
  id: string;
  permalink: string;
  mediaUrl: string;
  caption?: string;
  likeCount?: number;
  commentsCount?: number;
  timestamp: string;
};

export type InstagramProfile = {
  username: string;
  profilePictureUrl?: string;
  followersCount?: number;
  mediaCount?: number;
};

type GraphMediaItem = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  like_count?: number;
  comments_count?: number;
  timestamp: string;
};

@Injectable()
export class InstagramService {
  private readonly logger = new Logger(InstagramService.name);
  private mediaCache: { data: InstagramPost[]; expiresAt: number } | null = null;
  private profileCache: { data: InstagramProfile | null; expiresAt: number } | null = null;

  async findRecent(): Promise<InstagramPost[]> {
    if (this.mediaCache && this.mediaCache.expiresAt > Date.now()) {
      return this.mediaCache.data;
    }

    const posts = await this.fetchFromGraphApi();
    this.mediaCache = { data: posts, expiresAt: Date.now() + CACHE_TTL_MS };
    return posts;
  }

  async findProfile(): Promise<InstagramProfile | null> {
    if (this.profileCache && this.profileCache.expiresAt > Date.now()) {
      return this.profileCache.data;
    }

    const profile = await this.fetchProfileFromGraphApi();
    this.profileCache = { data: profile, expiresAt: Date.now() + CACHE_TTL_MS };
    return profile;
  }

  private async fetchFromGraphApi(): Promise<InstagramPost[]> {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      this.logger.warn('INSTAGRAM_ACCESS_TOKEN o INSTAGRAM_USER_ID no configurados; se omite el feed de Instagram.');
      return [];
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const url = `https://graph.instagram.com/${userId}/media?fields=${FIELDS}&limit=${MEDIA_LIMIT}&access_token=${accessToken}`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) {
        this.logger.error(`Instagram Graph API respondió ${res.status}: ${await res.text()}`);
        return [];
      }

      const body: { data: GraphMediaItem[] } = await res.json();
      return body.data
        .filter((item) => item.media_type !== 'VIDEO' || item.thumbnail_url)
        .map((item) => ({
          id: item.id,
          permalink: item.permalink,
          mediaUrl: item.media_type === 'VIDEO' ? (item.thumbnail_url as string) : item.media_url,
          caption: item.caption,
          likeCount: item.like_count,
          commentsCount: item.comments_count,
          timestamp: item.timestamp,
        }));
    } catch (error) {
      this.logger.error('Error al consultar la Instagram Graph API', error instanceof Error ? error.stack : error);
      return [];
    }
  }

  private async fetchProfileFromGraphApi(): Promise<InstagramProfile | null> {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) return null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const url = `https://graph.instagram.com/${userId}?fields=username,profile_picture_url,followers_count,media_count&access_token=${accessToken}`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) {
        this.logger.error(`Instagram Graph API (profile) respondió ${res.status}: ${await res.text()}`);
        return null;
      }

      const body: {
        username: string;
        profile_picture_url?: string;
        followers_count?: number;
        media_count?: number;
      } = await res.json();

      return {
        username: body.username,
        profilePictureUrl: body.profile_picture_url,
        followersCount: body.followers_count,
        mediaCount: body.media_count,
      };
    } catch (error) {
      this.logger.error('Error al consultar el perfil en la Instagram Graph API', error instanceof Error ? error.stack : error);
      return null;
    }
  }
}
