import { Module } from '@nestjs/common'
import { typeOrmModule } from './config/database.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { CourseModule } from './modules/course/course.module'
import { RolesModule } from './modules/roles/role.module'
import { envConfig } from './config/env.config'

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
