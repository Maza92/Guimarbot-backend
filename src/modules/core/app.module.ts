import { Module } from '@nestjs/common'
import { envConfig } from '@config/env.config'
import { typeOrmModule } from '@config/database.config'

import { UserModule } from '../user/user.module'
import { AuthModule } from '../auth/auth.module'
import { CourseModule } from '../course/course.module'
import { RolesModule } from '../roles/role.module'

@Module({
  imports: [
    envConfig(),
    typeOrmModule(),
    UserModule,
    AuthModule,
    CourseModule,
    RolesModule,
  ],
})
export class AppModule {}
