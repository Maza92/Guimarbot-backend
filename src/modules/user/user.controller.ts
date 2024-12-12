import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
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
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users for administrative',
  })
  @ApiResponse({
    status: 404,
    description: 'Users not found',
  })
  async getAllUser(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Return user by id',
  })
  @ApiParam({ name: 'userId', type: Number })
  @Get('/:userId')
  async getUserById(@Param() params: UserParamsDto) {
    return await this.userService.findUserById(Number(params.userId))
  }

  @Get('/:userId/payments')
  async getAllPaymentByUser(@Param() params: UserParamsDto) {
    return await this.userService.findAllPaymentByUser(Number(params.userId))
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return await this.userService.createUser(data)
  }

  @Put('/:userId')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
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

  @ApiBody({ type: UpdateUserProfileDto })
  @Put('/update-profile/:userId')
  async updateProfile(
    @Body() data: UpdateUserProfileDto,
    @Param() params: UserParamsDto,
  ) {
    return await this.userService.updateUserProfile(Number(params.userId), data)
  }

  // @Get('/:userId/data')
  // async getUserData(@Param() params: UserParamsDto) {
  //   return await this.userService.getUserData(Number(params.userId))
  // }

  @Get('/:userId/courses')
  async getAllCoursesById(@Param() params: UserParamsDto) {
    return await this.userService.findAllCoursesByUserId(Number(params.userId))
  }

  @Get('/:userId/courses/:courseId/enrollment')
  async checkEnrollment(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number,
  ) {
    return await this.userService.checkUserEnrollment(userId, courseId)
  }

  @ApiOperation({
    summary: 'Get roadmaps for user',
  })
  @ApiResponse({
    status: 200,
    description: `Return all user's roadmaps`,
  })
  @ApiResponse({
    status: 404,
    description: 'Roadmaps not found',
  })
  @Get('/:userId/roadmaps')
  async getRoadmapsByUserId(@Param('userId') userId: number) {
    return await this.userService.findAllRoadmapsByUserId(userId)
  }

  @ApiOperation({
    summary: 'Get plas from user',
  })
  @ApiResponse({
    status: 200,
    description: `Return all user's plnas that is associate`,
  })
  @ApiResponse({
    status: 404,
    description: 'Plan not found',
  })
  @Get('/:userId/plans')
  async getPlansByUserId(@Param('userId') userId: number) {
    return await this.userService.findPlansByUserId(userId)
  }
}
