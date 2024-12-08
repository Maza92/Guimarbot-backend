import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsPositive } from 'class-validator'

export class ReferralCountDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  capacity: number
}
