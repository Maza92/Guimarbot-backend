import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'

export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  durationMinutes: number

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
