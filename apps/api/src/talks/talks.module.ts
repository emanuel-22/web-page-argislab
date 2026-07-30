import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TalksController } from './talks.controller';
import { TalksService } from './talks.service';

@Module({
  imports: [AuthModule],
  controllers: [TalksController],
  providers: [TalksService],
})
export class TalksModule {}
