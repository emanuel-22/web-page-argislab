import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { EVENT_AUDIENCES, EVENT_MODALITIES } from './create-event.dto';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsString()
  organizer?: string;

  @IsOptional()
  @IsDateString()
  startsAt?: string;

  @IsOptional()
  @IsDateString()
  endsAt?: string;

  @IsOptional()
  @IsIn(EVENT_MODALITIES)
  modality?: (typeof EVENT_MODALITIES)[number];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsIn(EVENT_AUDIENCES, { each: true })
  audience?: (typeof EVENT_AUDIENCES)[number][];

  @IsOptional()
  @IsString()
  href?: string;

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
