import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserParamsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userId: string
}
