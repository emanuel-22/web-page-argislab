import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategorySummary, flattenTopics, TopicSummary, validateCategoryAndTopics } from '../common/resource-taxonomy';
import { fetchOgImage } from '../talks/og-image';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';

const INCLUDE = { category: true, topics: { include: { topic: true } } } as const;

export type WebsiteResponse = {
  id: number;
  title: string;
  categoryId: number;
  category: CategorySummary;
  description: string | null;
  href: string;
  thumbnailUrl: string | null;
  topics: TopicSummary[];
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class WebsitesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<WebsiteResponse[]> {
    const websites = await this.prisma.website.findMany({ orderBy: { title: 'asc' }, include: INCLUDE });
    return websites.map(flattenTopics);
  }

  async findOne(id: number): Promise<WebsiteResponse> {
    const website = await this.prisma.website.findUnique({ where: { id }, include: INCLUDE });
    if (!website) throw new NotFoundException('Página web no encontrada');
    return flattenTopics(website);
  }

  async create(dto: CreateWebsiteDto): Promise<WebsiteResponse> {
    const topicIds = dto.topicIds ?? [];
    await validateCategoryAndTopics(this.prisma, dto.categoryId, topicIds);

    const { topicIds: _topicIds, ...rest } = dto;
    const thumbnailUrl = dto.thumbnailUrl ?? (await fetchOgImage(dto.href));
    const website = await this.prisma.website.create({
      data: { ...rest, thumbnailUrl, topics: { create: topicIds.map((topicId) => ({ topicId })) } },
      include: INCLUDE,
    });
    return flattenTopics(website);
  }

  async update(id: number, dto: UpdateWebsiteDto): Promise<WebsiteResponse> {
    const existing = await this.findOne(id);
    const { topicIds, ...rest } = dto;
    const categoryId = dto.categoryId ?? existing.categoryId;

    if (topicIds !== undefined) {
      await validateCategoryAndTopics(this.prisma, categoryId, topicIds);
    }

    const website = await this.prisma.$transaction(async (tx) => {
      if (topicIds !== undefined) {
        await tx.websiteTopic.deleteMany({ where: { websiteId: id } });
      }
      return tx.website.update({
        where: { id },
        data: {
          ...rest,
          ...(topicIds !== undefined ? { topics: { create: topicIds.map((topicId) => ({ topicId })) } } : {}),
        },
        include: INCLUDE,
      });
    });
    return flattenTopics(website);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.website.delete({ where: { id } });
  }
}
