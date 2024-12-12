import { ConfigModule } from '@nestjs/config'

import mysqlDatabaseConfig from './database.config'
// import { resendConfig } from '@lib/send-email'/

export const envConfig = () => {
  return ConfigModule.forRoot({
    isGlobal: true,
    expandVariables: true,
    load: [mysqlDatabaseConfig],
  })
}
