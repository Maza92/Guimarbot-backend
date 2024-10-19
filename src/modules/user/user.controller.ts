import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Post()
  async createUser(@Body() body: User): Promise<User> {
    return await this.userService.createUser(body)
  }
}
