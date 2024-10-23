import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string
}
