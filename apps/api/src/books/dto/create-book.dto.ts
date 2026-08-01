import { ArrayUnique, IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title!: string;

  @IsInt()
  categoryId!: number;

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

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  topicIds?: number[];
}
