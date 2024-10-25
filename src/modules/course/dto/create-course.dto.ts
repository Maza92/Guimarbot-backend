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
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateLessonDto } from './create-lesson.dto'

export class CreateCourseDto {
  @IsString()
  @Length(10, 100)
  title: string

  @IsString()
  @Length(20, 500)
  description: string

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number

  @IsString()
  @IsUrl()
  videoPreviewUrl: string

  @IsString()
  @Length(10, 50)
  teacherName: string

  @IsPositive()
  durationHours: number

  @IsPositive()
  totalLessons: number

  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  averageRating: number

  @IsOptional()
  @IsBoolean()
  isPublished: boolean

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonDto)
  lesssons: CreateLessonDto[]
}
