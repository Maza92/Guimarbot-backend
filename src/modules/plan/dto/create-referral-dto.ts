import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsNumber, IsPositive } from 'class-validator'

class UserDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number
}

class PlanDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number
}

export class CreateReferralDto {
  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  plan: PlanDto

  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  owner: UserDto

  @ApiProperty()
  @IsEmail()
  email: string
}
