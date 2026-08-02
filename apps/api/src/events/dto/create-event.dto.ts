import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export const EVENT_AUDIENCES = [
  'Profesionales',
  'Empresarios',
  'Estudiantes',
  'Académicos',
  'Público general',
] as const;

export const EVENT_MODALITIES = ['Presencial', 'Virtual', 'Híbrido'] as const;

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsInt()
  categoryId!: number;

  @IsString()
  organizer!: string;

  @IsDateString()
  startsAt!: string;

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
