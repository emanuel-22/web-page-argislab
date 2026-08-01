import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @Get()
  findAll() {
    return this.websitesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateWebsiteDto) {
    return this.websitesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWebsiteDto) {
    return this.websitesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.websitesService.remove(id);
  }
}
