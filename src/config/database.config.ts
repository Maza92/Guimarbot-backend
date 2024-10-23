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

export const typeOrmConfig: () => TypeOrmModuleOptions = () => ({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [pathEntities],
  synchronize: true,
})

export const typeOrmModule = () => {
  return TypeOrmModule.forRootAsync({
    useFactory: typeOrmConfig,
  })
}

export default typeOrmConfig
