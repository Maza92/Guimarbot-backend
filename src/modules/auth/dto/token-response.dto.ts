import { IsString } from 'class-validator'

export class TokenResponseDto {
  @IsString()
  accessToken: string

  @IsString()
  refreshToken: string
}
