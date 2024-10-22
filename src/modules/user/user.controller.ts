import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserParamsDto } from './dto/user-params.dto'

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return await this.userService.createUser(data)
  }

  @Put('/:userId')
  async updateUser(
    @Param() params: UserParamsDto,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.updateUser(Number(params.userId), data)
  }

  @Patch('/disable/:userId')
  async disableUser(@Param() params: UserParamsDto) {
    return await this.userService.disableUser(Number(params.userId))
  }
}
