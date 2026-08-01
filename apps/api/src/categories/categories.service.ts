import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type CategoryWithTopics = {
  id: number;
  name: string;
  slug: string;
  topics: { id: number; name: string; categoryId: number }[];
};

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<CategoryWithTopics[]> {
    return this.prisma.category.findMany({
      orderBy: { id: 'asc' },
      include: { topics: { orderBy: { name: 'asc' } } },
    });
  }
}
