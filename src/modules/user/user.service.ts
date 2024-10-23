import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRepository } from './repositories/user.repository'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email)
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
}
