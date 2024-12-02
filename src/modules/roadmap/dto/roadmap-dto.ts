import { Level } from '@modules/course/types'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator'

class CategoryDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number
}

export class RoadmapDto {
  @ApiProperty()
  @IsString()
  @Length(10, 100, { message: 'Title must be between 10 and 100 characters' })
  title: string

  @ApiProperty()
  @IsString()
  @Length(20, 500, {
    message: 'Description must be between 20 and 500 characters',
  })
  description: string

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean

  @ApiProperty({ enum: Level })
  @IsEnum(Level)
  level: Level

  @ApiProperty({ type: CategoryDto })
  @Type(() => CategoryDto)
  category: CategoryDto
}
