import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  videoURL: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string
}
