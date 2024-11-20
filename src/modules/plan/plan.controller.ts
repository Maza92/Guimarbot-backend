import { Body, Controller, Get, Post } from '@nestjs/common'
import { PlanService } from './plan.service'
import { CreatePlanDto } from './dto/create-plan-dto'
import { ApiBody } from '@nestjs/swagger'

@Controller('/api/plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async getAllPlans() {
    return await this.planService.findAll()
  }

  @Post()
  @ApiBody({ type: CreatePlanDto })
  async createPlan(@Body() data: CreatePlanDto) {
    return await this.planService.createPlan(data)
  }
}
