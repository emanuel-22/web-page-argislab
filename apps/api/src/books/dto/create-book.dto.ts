import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  blurb?: string;

  @IsOptional()
  @IsString()
  href?: string;

  @IsOptional()
  @IsString()
  coverUrl?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  topics!: string[];
}
