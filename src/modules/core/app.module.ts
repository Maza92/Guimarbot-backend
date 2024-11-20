import { PlanModule } from './../plan/plan.module'
import { Module } from '@nestjs/common'
import { envConfig } from '@config/env.config'
import { typeOrmModule } from '@config/database.config'

import { UserModule } from '../user/user.module'
import { AuthModule } from '../auth/auth.module'
import { CourseModule } from '../course/course.module'
import { RolesModule } from '../roles/role.module'
import { PaymentModule } from '../payment/payment.module'
import { ProgressModule } from '@modules/progress/progress.module'

@Module({
  imports: [
    PlanModule,
    envConfig(),
    typeOrmModule(),
    UserModule,
    AuthModule,
    CourseModule,
    RolesModule,
    PaymentModule,
    ProgressModule,
  ],
})
export class AppModule {}
