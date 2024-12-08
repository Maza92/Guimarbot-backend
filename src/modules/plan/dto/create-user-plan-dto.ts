import { ApiProperty } from '@nestjs/swagger'
import { PlanStatus } from '../types'
import { IsEnum, IsNumber, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

class UserDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number
}

export class CreateUserPlanDto {
  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  user: UserDto

  @ApiProperty({ enum: PlanStatus })
  @IsEnum(PlanStatus)
  status: PlanStatus
}
