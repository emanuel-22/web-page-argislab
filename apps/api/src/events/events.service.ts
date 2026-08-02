import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategorySummary, flattenTopics, TopicSummary, validateCategoryAndTopics } from '../common/resource-taxonomy';
import { fetchOgImage } from '../talks/og-image';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

const INCLUDE = { category: true, topics: { include: { topic: true } } } as const;

export type EventResponse = {
  id: number;
  title: string;
  categoryId: number;
  category: CategorySummary;
  description: string | null;
  organizer: string;
  startsAt: Date;
  endsAt: Date | null;
  modality: string;
  location: string | null;
  audience: string[];
  href: string;
  thumbnailUrl: string | null;
  topics: TopicSummary[];
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<EventResponse[]> {
    const events = await this.prisma.event.findMany({ orderBy: { startsAt: 'asc' }, include: INCLUDE });
    return events.map(flattenTopics);
  }

  async findOne(id: number): Promise<EventResponse> {
    const event = await this.prisma.event.findUnique({ where: { id }, include: INCLUDE });
    if (!event) throw new NotFoundException('Evento no encontrado');
    return flattenTopics(event);
  }

  async create(dto: CreateEventDto): Promise<EventResponse> {
    const topicIds = dto.topicIds ?? [];
    await validateCategoryAndTopics(this.prisma, dto.categoryId, topicIds);

    const { topicIds: _topicIds, startsAt, endsAt, ...rest } = dto;
    const thumbnailUrl = dto.thumbnailUrl ?? (await fetchOgImage(dto.href));
    const event = await this.prisma.event.create({
      data: {
        ...rest,
        startsAt: new Date(startsAt),
        endsAt: endsAt ? new Date(endsAt) : undefined,
        thumbnailUrl,
        topics: { create: topicIds.map((topicId) => ({ topicId })) },
      },
      include: INCLUDE,
    });
    return flattenTopics(event);
  }

  async update(id: number, dto: UpdateEventDto): Promise<EventResponse> {
    const existing = await this.findOne(id);
    const { topicIds, startsAt, endsAt, ...rest } = dto;
    const categoryId = dto.categoryId ?? existing.categoryId;

    if (topicIds !== undefined) {
      await validateCategoryAndTopics(this.prisma, categoryId, topicIds);
    }

    const event = await this.prisma.$transaction(async (tx) => {
      if (topicIds !== undefined) {
        await tx.eventTopic.deleteMany({ where: { eventId: id } });
      }
      return tx.event.update({
        where: { id },
        data: {
          ...rest,
          ...(startsAt !== undefined ? { startsAt: new Date(startsAt) } : {}),
          ...(endsAt !== undefined ? { endsAt: endsAt ? new Date(endsAt) : null } : {}),
          ...(topicIds !== undefined ? { topics: { create: topicIds.map((topicId) => ({ topicId })) } } : {}),
        },
        include: INCLUDE,
      });
    });
    return flattenTopics(event);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.event.delete({ where: { id } });
  }
}
