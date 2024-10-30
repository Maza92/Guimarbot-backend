import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator'
import { CreatePaymentDetailDto } from './create-payment-detail.dto'

export class CreatePaymentDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  totalPayment: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  userId: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  paymentMethodId: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDetailDto)
  paymentDetails: CreatePaymentDetailDto[]
}
