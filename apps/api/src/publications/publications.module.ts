import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

@Module({
  imports: [AuthModule],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
