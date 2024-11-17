import { Injectable } from '@nestjs/common'
import { PlanRepository } from './repositories/plan.repository'
import { CreatePlanDto } from './dto/create-plan-dto'

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  createPlan(data: CreatePlanDto) {
    return this.planRepository.createPlan(data)
  }

  findAll() {
    return this.planRepository.findAll()
  }
}
