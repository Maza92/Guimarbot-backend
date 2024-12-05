import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRepository } from './repositories/user.repository'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdateUserProfileDto } from './dto/update-user-profile-dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email)
  }

  async findAllCoursesByUserId(userId: number) {
    const user = await this.userRepository.findAllCoursesByUserId(userId)

    if (!user) {
      throw new NotFoundException('User is not register')
    }

    const { payments, ...restUserData } = user

    const courses = payments
      .map(({ paymentDetails }) => paymentDetails.map(({ course }) => course))
      .flat()

    return {
      user: restUserData,
      courses,
    }
  }

  createUser(data: CreateUserDto) {
    return this.userRepository.createUser(data)
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.updateUser(id, data)

    if (!user) throw new NotFoundException('User not found.')

    return user
  }

  async disableUser(id: number) {
    const user = await this.userRepository.disableUser(id)

    if (!user) throw new NotFoundException('User not found.')

    return user
  }

  async updateUserPassword(updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneByEmail(
      updatePasswordDto.email,
    )

    if (!user) throw new NotFoundException('User not found.')

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 4)
    updatePasswordDto.newPassword = hashedPassword

    await this.userRepository.updateUserPassword(updatePasswordDto)

    return user
  }

  async findAllPaymentByUser(userId: number) {
    const payments = await this.userRepository.findAllPaymentByUser(userId)

    if (!payments) throw new NotFoundException('User not found')

    return payments
  }

  async updateUserProfile(userId: number, data: UpdateUserProfileDto) {
    const user = await this.userRepository.updateUser(userId, data)

    if (!user) throw new NotFoundException('User not found.')

    return user
  }

  async checkUserEnrollment(userId: number, courseId: number) {
    const user = await this.userRepository.findEnrollmentInCourse(
      userId,
      courseId,
    )

    return {
      userId,
      isEnrolled: Boolean(user),
    }
  }

  async findAllRoadmapsByUserId(userId: number) {
    const user = await this.userRepository.findRoadmapsByUserId(userId)

    if (!user) {
      throw new NotFoundException('User is not register')
    }

    const { roadmaps, ...restUserData } = user

    return {
      user: restUserData,
      roadmaps,
    }
  }
}
