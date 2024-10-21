import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.createUser(body)
  }
}
