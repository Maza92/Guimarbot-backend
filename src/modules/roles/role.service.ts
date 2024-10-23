import { Injectable } from '@nestjs/common'
import { RoleRepository } from './repositories/role.repository'
import { Role } from './entities/role.entity'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.findAll()
  }

  createRole(data: CreateRoleDto): Promise<Role> {
    return this.roleRepository.createRole(data)
  }
}
