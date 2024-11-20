import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator'
import { CreatePaymentDetailDto } from './create-payment-detail.dto'

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  userId: number

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  paymentMethodId: number

  @ApiProperty({ type: [CreatePaymentDetailDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDetailDto)
  paymentDetails: CreatePaymentDetailDto[]
}
