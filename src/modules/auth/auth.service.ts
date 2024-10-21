import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  //bcrypt implementation for password hashing in the future 
  async register(data: RegisterDto) {
    const { email, password, ...restData } = data

    const user = await this.userService.findOneByEmail(email)
    if (user) {
      throw new BadRequestException('User already exists.')
    }

    await this.userService.createUser({
      ...restData,
      email,
      password,
    })

    return {
      ...restData,
      email,
    }
  }

  async login(data: LoginDto) {
    const { email, password } = data

    const user = await this.userService.findOneByEmail(email)
    if (!user || user.password !== password) {
      throw new BadRequestException('Invalid Credentials.')
    }

    // jwt implementation for token generation in the future
    return true;
  }
}
