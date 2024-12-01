import { RoadmapDto } from './roadmap-dto'
import { IsNumber, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

class UserDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number
}

export class CreateUserRoadmapDto extends RoadmapDto {
  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  user: UserDto
}
