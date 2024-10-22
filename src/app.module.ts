import { Module } from '@nestjs/common'
import { typeOrmModule } from './config/database.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { CourseModule } from './modules/course/course.module'

@Module({
  imports: [typeOrmModule(), UserModule, AuthModule, CourseModule],
})
export class AppModule {}
