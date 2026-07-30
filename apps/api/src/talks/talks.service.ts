import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';

@Injectable()
export class TalksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.talk.findMany({ orderBy: { title: 'asc' } });
  }

  async findOne(id: number) {
    const talk = await this.prisma.talk.findUnique({ where: { id } });
    if (!talk) throw new NotFoundException('Charla no encontrada');
    return talk;
  }

  create(dto: CreateTalkDto) {
    return this.prisma.talk.create({ data: dto });
  }

  async update(id: number, dto: UpdateTalkDto) {
    await this.findOne(id);
    return this.prisma.talk.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.talk.delete({ where: { id } });
  }
}
