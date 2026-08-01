import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { TalksModule } from './talks/talks.module';
import { WebsitesModule } from './websites/websites.module';

@Module({
  imports: [PrismaModule, AuthModule, CategoriesModule, BooksModule, TalksModule, WebsitesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
