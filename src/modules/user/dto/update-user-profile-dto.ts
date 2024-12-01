import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator'

export class UpdateUserProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  names: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImage: string
}
