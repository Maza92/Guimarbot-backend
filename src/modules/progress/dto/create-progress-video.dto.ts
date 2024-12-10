import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsPositive } from 'class-validator'

export class CreateProgressVideoDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty()
  userId: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty()
  lessonId: number
}
