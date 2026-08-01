import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategorySummary, flattenTopics, TopicSummary, validateCategoryAndTopics } from '../common/resource-taxonomy';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const INCLUDE = { category: true, topics: { include: { topic: true } } } as const;

export type BookResponse = {
  id: number;
  title: string;
  categoryId: number;
  category: CategorySummary;
  author: string | null;
  blurb: string | null;
  href: string | null;
  coverUrl: string | null;
  topics: TopicSummary[];
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BookResponse[]> {
    const books = await this.prisma.book.findMany({ orderBy: { title: 'asc' }, include: INCLUDE });
    return books.map(flattenTopics);
  }

  async findOne(id: number): Promise<BookResponse> {
    const book = await this.prisma.book.findUnique({ where: { id }, include: INCLUDE });
    if (!book) throw new NotFoundException('Libro no encontrado');
    return flattenTopics(book);
  }

  async create(dto: CreateBookDto): Promise<BookResponse> {
    const topicIds = dto.topicIds ?? [];
    await validateCategoryAndTopics(this.prisma, dto.categoryId, topicIds);

    const { topicIds: _topicIds, ...rest } = dto;
    const book = await this.prisma.book.create({
      data: { ...rest, topics: { create: topicIds.map((topicId) => ({ topicId })) } },
      include: INCLUDE,
    });
    return flattenTopics(book);
  }

  async update(id: number, dto: UpdateBookDto): Promise<BookResponse> {
    const existing = await this.findOne(id);
    const { topicIds, ...rest } = dto;
    const categoryId = dto.categoryId ?? existing.categoryId;

    if (topicIds !== undefined) {
      await validateCategoryAndTopics(this.prisma, categoryId, topicIds);
    }

    const book = await this.prisma.$transaction(async (tx) => {
      if (topicIds !== undefined) {
        await tx.bookTopic.deleteMany({ where: { bookId: id } });
      }
      return tx.book.update({
        where: { id },
        data: {
          ...rest,
          ...(topicIds !== undefined ? { topics: { create: topicIds.map((topicId) => ({ topicId })) } } : {}),
        },
        include: INCLUDE,
      });
    });
    return flattenTopics(book);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.book.delete({ where: { id } });
  }
}
