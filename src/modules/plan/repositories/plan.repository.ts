import { Injectable } from '@nestjs/common'
import { Plan } from '../entities/plan.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePlanDto } from '../dto/create-plan-dto'

@Injectable()
export class PlanRepository {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async createPlan(data: CreatePlanDto): Promise<Plan> {
    const planCreated = this.planRepository.create(data)
    return this.planRepository.save(planCreated)
  }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find()
  }

  async findOneById(id: number): Promise<Plan> {
    return this.planRepository.findOne({ where: { id } })
  }
}
