import { ConfigModule } from '@nestjs/config'

import mysqlDatabaseConfig from './database.config'

export const envConfig = () => {
  return ConfigModule.forRoot({
    isGlobal: true,
    expandVariables: true,
    load: [mysqlDatabaseConfig],
  })
}
