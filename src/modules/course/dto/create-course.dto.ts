import {
  IsString,
  IsDecimal,
  IsUrl,
  IsPositive,
  Length,
  Min,
  Max,
} from 'class-validator'

export class CreateCourseDto {
  @IsString()
  @Length(10, 100)
  title: string

  @IsString()
  @Length(20, 500)
  description: string

  @IsDecimal()
  @Min(0)
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

  @IsDecimal()
  @Min(0)
  @Max(5)
  averageRating: number

  isPublished: boolean
}
