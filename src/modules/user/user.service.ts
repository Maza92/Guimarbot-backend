import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRepository } from './repostiories/user.repository'
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

  updateUser(id: number, data: UpdateUserDto) {
    return this.userRepository.udpateUser(id, data)
  }

  disableUser(id: number) {
    return this.userRepository.disableUser(id)
  }
}
