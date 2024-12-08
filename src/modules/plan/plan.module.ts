import { PlanService } from './plan.service'
import { PlanController } from './plan.controller'
import { forwardRef, Module } from '@nestjs/common'
import { Plan } from './entities/plan.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlanRepository } from './repositories/plan.repository'
import { UserModule } from '@modules/user/user.module'
import { UserPlanRepository } from './repositories/user-plan.repository'
import { User } from '@modules/user'
import { UserPlan } from './entities/user-plan.entity'
import { ReferralRepository } from './repositories/referral.repository'
import { Referral } from './entities/referral.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan, User, UserPlan, Referral]),
    forwardRef(() => UserModule),
  ],
  controllers: [PlanController],
  providers: [
    PlanService,
    PlanRepository,
    UserPlanRepository,
    ReferralRepository,
  ],
})
export class PlanModule {}
