import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UpdatePasswordDto } from '../dto/update-password.dto'
import { UpdateUserProfileDto } from '../dto/update-user-profile-dto'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } })
  }

  findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } })
  }

  createUser(data: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(data)

    return this.userRepository.save(newUser)
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User | null> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } })

    if (!userToUpdate) return null

    this.userRepository.merge(userToUpdate, data)

    return this.userRepository.save(userToUpdate)
  }

  async disableUser(id: number) {
    const userToDisable = await this.userRepository.findOne({
      where: { id },
      select: { id: true, isActive: true },
    })

    if (!userToDisable) return null

    this.userRepository.merge(userToDisable, { isActive: false })

    return this.userRepository.save(userToDisable)
  }

  async updateUserPassword(
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User | null> {
    const { email, newPassword } = updatePasswordDto
    const userToUpdate = await this.userRepository.findOne({ where: { email } })

    if (!userToUpdate) return null

    userToUpdate.password = newPassword

    return this.userRepository.save(userToUpdate)
  }

  async updateUserProfile(
    userId: number,
    updateProfileData: UpdateUserProfileDto,
  ) {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: userId },
    })

    if (!userToUpdate) return null

    this.userRepository.merge(userToUpdate, updateProfileData)

    return this.userRepository.save(userToUpdate)
  }

  async findAllPaymentByUser(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        payments: {
          paymentDetails: {
            course: true,
          },
          paymentMethod: true,
        },
      },
      select: {
        id: true,
        payments: {
          id: true,
          status: true,
          totalPayment: true,
          paymentMethod: {
            id: true,
            type: true,
          },
          paymentDetails: {
            id: true,
            description: true,
            course: {
              id: true,
              title: true,
              teacherName: true,
            },
          },
        },
      },
    })
  }

  findAllCoursesByUserId(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        payments: {
          paymentDetails: {
            course: true,
          },
        },
      },
      select: {
        id: true,
        names: true,
        lastName: true,
        profileImage: true,
        password: false,
        payments: {
          id: true,
          paymentDetails: {
            id: true,
          },
        },
      },
    })
  }

  findEnrollmentInCourse(userId: number, courseId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
        payments: {
          paymentDetails: {
            course: {
              id: courseId,
            },
          },
        },
      },
    })
  }
}
