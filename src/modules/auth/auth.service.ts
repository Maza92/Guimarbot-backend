import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(data: RegisterDto) {
    const { email, password, ...restData } = data

    const user = await this.userService.findOneByEmaiL(email)
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
}
