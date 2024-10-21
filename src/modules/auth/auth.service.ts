import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

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

  async login(data: LoginDto) {
    const { email, password } = data

    const user = await this.userService.findOneByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Credentials.')
    }

    // jwt implementation for token generation in the future
    return true;
  }
}
