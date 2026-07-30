import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { TalksModule } from './talks/talks.module';

@Module({
  imports: [PrismaModule, AuthModule, BooksModule, TalksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
