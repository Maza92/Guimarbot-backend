import { Injectable } from '@nestjs/common'
import { Plan } from '../entities/plan.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePlanDto } from '../dto/create-plan-dto'
import { UpdatePlanDto } from '../dto/update-plan-dto'

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
    return this.planRepository.findOne({
      where: {
        id,
      },
    })
  }

  async update(planId: number, data: UpdatePlanDto) {
    const planToUpdate = await this.planRepository.findOne({
      where: {
        id: planId,
      },
    })

    if (!planToUpdate) return null

    this.planRepository.merge(planToUpdate, data)

    return this.planRepository.save(planToUpdate)
  }
}
