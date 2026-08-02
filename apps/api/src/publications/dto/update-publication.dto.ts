import { ArrayUnique, IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { PUBLICATION_TYPES } from './create-publication.dto';

export class UpdatePublicationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsString()
  authors?: string;

  @IsOptional()
  @IsString()
  venue?: string;

  @IsOptional()
  @IsIn(PUBLICATION_TYPES)
  type?: (typeof PUBLICATION_TYPES)[number];

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  href?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  topicIds?: number[];
}
