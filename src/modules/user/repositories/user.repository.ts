import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

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
}
