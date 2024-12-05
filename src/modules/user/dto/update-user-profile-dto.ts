import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

// export class UpdateUserProfileDto extends PartialType(
//   OmitType(CreateUserDto, ['password']),
// ) {

export class UpdateUserProfileDto extends CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImage: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio: string

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthDate: Date

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string
}
