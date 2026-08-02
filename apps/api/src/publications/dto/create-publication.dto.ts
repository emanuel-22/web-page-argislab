import { ArrayUnique, IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export const PUBLICATION_TYPES = ['Conference Paper', 'Artículo'] as const;

export class CreatePublicationDto {
  @IsString()
  title!: string;

  @IsInt()
  categoryId!: number;

  @IsString()
  authors!: string;

  @IsString()
  venue!: string;

  @IsIn(PUBLICATION_TYPES)
  type!: (typeof PUBLICATION_TYPES)[number];

  @IsOptional()
  @IsString()
  year?: string;

  @IsString()
  href!: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  topicIds?: number[];
}
