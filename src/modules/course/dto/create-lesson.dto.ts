import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  videoURL: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string
}
