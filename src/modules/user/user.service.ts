import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  createUser(data: CreateUserDto) {
    const newUser = this.userRepository.create(data)
    // return newUser
    return this.userRepository.save(newUser)
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } })
  }
}
