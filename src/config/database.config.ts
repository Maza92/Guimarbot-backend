import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'guimarbot_db_dev',
  entities: [],
  synchronize: true,
}

export const typeOrmModule = () => {
  return TypeOrmModule.forRoot(typeOrmConfig)
}
