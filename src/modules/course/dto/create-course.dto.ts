import {
  IsString,
  IsUrl,
  IsPositive,
  Length,
  Min,
  Max,
  ValidateNested,
  IsArray,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  Matches,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateLessonDto } from './create-lesson.dto'
import { Level } from '../types'
import { ApiProperty } from '@nestjs/swagger'

class IdDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number
}

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @Length(10, 100)
  title: string

  @ApiProperty()
  @IsString()
  @Length(20, 500)
  description: string

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number

  @ApiProperty()
  @IsString()
  @IsUrl()
  videoPreviewUrl: string

  @ApiProperty()
  @IsString()
  @Length(0, 50)
  teacherName: string

  @ApiProperty()
  @IsPositive()
  durationHours: number

  @ApiProperty()
  @IsPositive()
  totalLessons: number

  @ApiProperty({ enum: Level })
  @IsNotEmpty()
  @Matches(
    `^${Object.values(Level)
      .filter(value => typeof value !== 'number')
      .join('|')}$`,
    'i',
  )
  level: Level

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  averageRating: number

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPublished: boolean

  @ApiProperty({ type: IdDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdDto)
  tags: IdDto[]

  @ApiProperty({ type: IdDto })
  @IsOptional()
  @Type(() => IdDto)
  roadmap: IdDto

  @ApiProperty({ type: IdDto })
  @Type(() => IdDto)
  category: IdDto

  @ApiProperty({ type: IdDto })
  @Type(() => IdDto)
  carrer: IdDto

  @ApiProperty({ type: CreateLessonDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonDto)
  lessons: CreateLessonDto[]
}
