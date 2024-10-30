import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'

export class CreatePaymentDetailDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  coureId: number
}
