import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type CategorySummary = { id: number; name: string; slug: string };
export type TopicSummary = { id: number; name: string; categoryId: number };

export async function validateCategoryAndTopics(
  prisma: PrismaService,
  categoryId: number,
  topicIds: number[],
): Promise<void> {
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) throw new BadRequestException('La categoría seleccionada no existe');

  if (topicIds.length > 0) {
    const count = await prisma.topic.count({ where: { id: { in: topicIds }, categoryId } });
    if (count !== topicIds.length) {
      throw new BadRequestException('Todos los temas deben pertenecer a la categoría seleccionada');
    }
  }
}

export function flattenTopics<T extends { topics: { topic: TopicSummary }[] }>(
  resource: T,
): Omit<T, 'topics'> & { topics: TopicSummary[] } {
  const { topics, ...rest } = resource;
  return { ...rest, topics: topics.map((t) => t.topic) };
}
