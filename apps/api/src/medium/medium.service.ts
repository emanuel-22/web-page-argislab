import { Injectable, Logger } from '@nestjs/common';
import Parser from 'rss-parser';

const CACHE_TTL_MS = 30 * 60 * 1000;
const FEED_URL = 'https://medium.com/feed/@emabarboza';
const EXCERPT_LENGTH = 200;
const TRACKING_PIXEL_PATTERN = /medium\.com\/_\/stat/i;

export type MediumPost = {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  excerpt: string;
  thumbnailUrl?: string;
};

type MediumFeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentEncoded?: string;
};

function extractThumbnail(html: string): string | undefined {
  const matches = html.matchAll(/<img[^>]+src="([^"]+)"/gi);
  for (const match of matches) {
    const src = match[1];
    if (src && !TRACKING_PIXEL_PATTERN.test(src)) return src;
  }
  return undefined;
}

function extractExcerpt(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > EXCERPT_LENGTH ? `${text.slice(0, EXCERPT_LENGTH)}…` : text;
}

@Injectable()
export class MediumService {
  private readonly logger = new Logger(MediumService.name);
  private readonly parser = new Parser<object, MediumFeedItem>({
    customFields: { item: [['content:encoded', 'contentEncoded']] },
  });
  private cache: { data: MediumPost[]; expiresAt: number } | null = null;

  async findRecent(): Promise<MediumPost[]> {
    if (this.cache && this.cache.expiresAt > Date.now()) {
      return this.cache.data;
    }

    const posts = await this.fetchFeed();
    this.cache = { data: posts, expiresAt: Date.now() + CACHE_TTL_MS };
    return posts;
  }

  private async fetchFeed(): Promise<MediumPost[]> {
    try {
      const feed = await this.parser.parseURL(FEED_URL);
      return (feed.items ?? []).map((item, index) => {
        const html = item.contentEncoded ?? '';
        return {
          id: item.link ?? String(index),
          title: item.title ?? 'Sin título',
          link: item.link ?? '#',
          publishedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
          excerpt: extractExcerpt(html),
          thumbnailUrl: extractThumbnail(html),
        };
      });
    } catch (error) {
      this.logger.error('Error al consultar el feed de Medium', error instanceof Error ? error.stack : error);
      return [];
    }
  }
}
