import { Type } from 'class-transformer'
import { IsNumber, IsPositive } from 'class-validator'

export class UpdateProgressVideoDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  userId: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  lessonId: number
}
