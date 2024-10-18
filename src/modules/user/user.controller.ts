import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.findAll()
  }
}
