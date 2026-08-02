import { Controller, Get } from '@nestjs/common';
import { InstagramService } from './instagram.service';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Get('media')
  findRecent() {
    return this.instagramService.findRecent();
  }

  @Get('profile')
  findProfile() {
    return this.instagramService.findProfile();
  }
}
