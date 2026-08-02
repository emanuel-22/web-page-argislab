import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { EventsModule } from './events/events.module';
import { InstagramModule } from './instagram/instagram.module';
import { MediumModule } from './medium/medium.module';
import { PrismaModule } from './prisma/prisma.module';
import { PublicationsModule } from './publications/publications.module';
import { TalksModule } from './talks/talks.module';
import { WebsitesModule } from './websites/websites.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CategoriesModule,
    BooksModule,
    TalksModule,
    WebsitesModule,
    InstagramModule,
    MediumModule,
    YoutubeModule,
    PublicationsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
