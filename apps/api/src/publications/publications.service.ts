import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategorySummary, flattenTopics, TopicSummary, validateCategoryAndTopics } from '../common/resource-taxonomy';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

const INCLUDE = { category: true, topics: { include: { topic: true } } } as const;

export type PublicationResponse = {
  id: number;
  title: string;
  categoryId: number;
  category: CategorySummary;
  authors: string;
  venue: string;
  type: string;
  year: string | null;
  href: string;
  topics: TopicSummary[];
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PublicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PublicationResponse[]> {
    const publications = await this.prisma.publication.findMany({
      orderBy: { createdAt: 'desc' },
      include: INCLUDE,
    });
    return publications.map(flattenTopics);
  }

  async findOne(id: number): Promise<PublicationResponse> {
    const publication = await this.prisma.publication.findUnique({ where: { id }, include: INCLUDE });
    if (!publication) throw new NotFoundException('Publicación no encontrada');
    return flattenTopics(publication);
  }

  async create(dto: CreatePublicationDto): Promise<PublicationResponse> {
    const topicIds = dto.topicIds ?? [];
    await validateCategoryAndTopics(this.prisma, dto.categoryId, topicIds);

    const { topicIds: _topicIds, ...rest } = dto;
    const publication = await this.prisma.publication.create({
      data: { ...rest, topics: { create: topicIds.map((topicId) => ({ topicId })) } },
      include: INCLUDE,
    });
    return flattenTopics(publication);
  }

  async update(id: number, dto: UpdatePublicationDto): Promise<PublicationResponse> {
    const existing = await this.findOne(id);
    const { topicIds, ...rest } = dto;
    const categoryId = dto.categoryId ?? existing.categoryId;

    if (topicIds !== undefined) {
      await validateCategoryAndTopics(this.prisma, categoryId, topicIds);
    }

    const publication = await this.prisma.$transaction(async (tx) => {
      if (topicIds !== undefined) {
        await tx.publicationTopic.deleteMany({ where: { publicationId: id } });
      }
      return tx.publication.update({
        where: { id },
        data: {
          ...rest,
          ...(topicIds !== undefined ? { topics: { create: topicIds.map((topicId) => ({ topicId })) } } : {}),
        },
        include: INCLUDE,
      });
    });
    return flattenTopics(publication);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.publication.delete({ where: { id } });
  }
}
