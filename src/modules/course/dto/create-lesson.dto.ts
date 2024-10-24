import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateLessonDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string
}
