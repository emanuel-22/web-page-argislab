import { Injectable, Logger } from '@nestjs/common';
import Parser from 'rss-parser';

const CACHE_TTL_MS = 30 * 60 * 1000;
const CHANNEL_ID = 'UCSjaapZr0jVjsgo8CFyRpQA';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type YoutubeVideo = {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  thumbnailUrl: string;
};

type YoutubeFeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  videoId?: string;
};

@Injectable()
export class YoutubeService {
  private readonly logger = new Logger(YoutubeService.name);
  private readonly parser = new Parser<object, YoutubeFeedItem>({
    customFields: { item: [['yt:videoId', 'videoId']] },
  });
  private cache: { data: YoutubeVideo[]; expiresAt: number } | null = null;

  async findRecent(): Promise<YoutubeVideo[]> {
    if (this.cache && this.cache.expiresAt > Date.now()) {
      return this.cache.data;
    }

    const videos = await this.fetchFeed();
    this.cache = { data: videos, expiresAt: Date.now() + CACHE_TTL_MS };
    return videos;
  }

  private async fetchFeed(): Promise<YoutubeVideo[]> {
    try {
      const feed = await this.parser.parseURL(FEED_URL);
      return (feed.items ?? [])
        .filter((item) => !!item.videoId)
        .map((item) => {
          const videoId = item.videoId as string;
          return {
            id: videoId,
            title: item.title ?? 'Sin título',
            link: item.link ?? `https://www.youtube.com/watch?v=${videoId}`,
            publishedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
            thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          };
        });
    } catch (error) {
      this.logger.error('Error al consultar el feed de YouTube', error instanceof Error ? error.stack : error);
      return [];
    }
  }
}
