import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { TokenResponseDto } from './dto/token-response.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const { email, password, ...restData } = data

    const user = await this.userService.findOneByEmail(email)
    if (user) {
      throw new BadRequestException('User already exists.')
    }

    await this.userService.createUser({
      ...restData,
      email,
      password: await bcrypt.hash(password, 4),
    })

    return {
      ...restData,
      email,
    }
  }

  // async login(data: LoginDto): Promise<TokenResponseDto> {
  async login(data: LoginDto) {
    const { email, password } = data

    const user = await this.userService.findOneByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Credentials.')
    }

    const payload = { email: user.email, userId: user.id }

    const tokens: TokenResponseDto = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    }

    return {
      userId: user.id,
      ...tokens,
    }
  }
}
