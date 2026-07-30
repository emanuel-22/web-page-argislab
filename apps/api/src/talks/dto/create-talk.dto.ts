import { IsOptional, IsString } from 'class-validator';

export class CreateTalkDto {
  @IsString()
  title!: string;

  @IsString()
  area!: string;

  @IsString()
  href!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;
}
