import { Body, Controller, Get, Post } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './entities/role.entity'

@Controller('/api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRoles(): Promise<Role[]> {
    return this.roleService.findAll()
  }

  @Post()
  createRole(@Body() data: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(data)
  }
}
