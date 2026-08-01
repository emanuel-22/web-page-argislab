import { ArrayUnique, IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTalkDto {
  @IsString()
  title!: string;

  @IsInt()
  categoryId!: number;

  @IsString()
  href!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  topicIds?: number[];
}
