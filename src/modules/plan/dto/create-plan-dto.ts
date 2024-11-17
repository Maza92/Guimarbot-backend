import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, Length, Min, IsPositive } from 'class-validator'

export class CreatePlanDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  name: string

  @ApiProperty()
  @Min(0)
  price: number

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  maxUsers: number

  @ApiProperty()
  @IsString()
  @Length(20, 200)
  description: string
}
