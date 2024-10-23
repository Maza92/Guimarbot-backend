import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../entities/role.entity'
import { CreateRoleDto } from '../dto/create-role.dto'

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find()
  }

  createRole(data: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(data)

    return this.roleRepository.save(role)
  }
}
