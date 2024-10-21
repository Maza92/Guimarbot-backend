import { join } from 'node:path'
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm'

const pathEntities = join(
  __dirname,
  '..',
  'modules',
  '**',
  'entities',
  '*.entity.{ts,js}',
)

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'edison12',
  database: 'guimarbot_db_dev',
  entities: [pathEntities],
  synchronize: true,
}

export const typeOrmModule = () => {
  return TypeOrmModule.forRoot(typeOrmConfig)
}
