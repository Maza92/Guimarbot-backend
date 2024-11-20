import { PlanService } from './plan.service'
import { PlanController } from './plan.controller'
import { Module } from '@nestjs/common'
import { Plan } from './entities/plan.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlanRepository } from './repositories/plan.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository],
})
export class PlanModule {}
