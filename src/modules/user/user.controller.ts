import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserParamsDto } from './dto/user-params.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdateUserProfileDto } from './dto/update-user-profile-dto'

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Get('/:userId/payments')
  async getAllPaymentByUser(@Param() params: UserParamsDto) {
    return await this.userService.findAllPaymentByUser(Number(params.userId))
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

  @Patch('/update-password')
  async updatePassword(@Body() data: UpdatePasswordDto) {
    return await this.userService.updateUserPassword(data)
  }

  @Put('/update-profile/:userId')
  async updateProfile(
    @Body() data: UpdateUserProfileDto,
    @Param() params: UserParamsDto,
  ) {
    return await this.userService.UpdateUserProfile(Number(params.userId), data)
  }

  // @Get('/:userId/data')
  // async getUserData(@Param() params: UserParamsDto) {
  //   return await this.userService.getUserData(Number(params.userId))
  // }

  @Get('/:userId/courses')
  async getAllCoursesById(@Param() params: UserParamsDto) {
    return await this.userService.findAllCoursesByUserId(Number(params.userId))
  }
}
