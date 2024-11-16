import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator'
import { CreatePaymentDetailDto } from './create-payment-detail.dto'
import { ApiProperty } from '@nestjs/swagger'

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
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDetailDto)
  paymentDetails: CreatePaymentDetailDto[]
}
