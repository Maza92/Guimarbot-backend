import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserParamsDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userId: string
}
