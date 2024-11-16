import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsNumber,
  IsPositive
} from 'class-validator'

export class CreatePaymentDetailDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  courseId: number
}
