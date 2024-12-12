import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreatePlanDto } from './dto/create-plan-dto'
import { CreateUserPlanDto } from './dto/create-user-plan-dto'
import { CreateReferralDto } from './dto/create-referral-dto'
import { ReferralCountDto } from './dto/referral-response-dto'
import { UpdatePlanDto } from './dto/update-plan-dto'
import { PlanService } from './plan.service'
import { Request } from 'express'

@Controller('/api/plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  @ApiOperation({ summary: 'Get all plans' })
  @ApiResponse({ status: 200, description: 'Return all plans' })
  async getAllPlans() {
    return await this.planService.findAll()
  }

  @Get(':planId')
  @ApiOperation({ summary: 'Get plan by id' })
  @ApiResponse({ status: 200, description: 'Return plan by id' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  async getPlanById(@Param('planId') planId: number) {
    return await this.planService.findPlanById(planId)
  }

  @Post()
  @ApiOperation({ summary: 'Create plan' })
  @ApiResponse({ status: 201, description: 'Plan created' })
  @ApiBody({ type: CreatePlanDto })
  async createPlan(@Body() data: CreatePlanDto) {
    return await this.planService.createPlan(data)
  }

  @Post(':planId/user')
  @ApiOperation({ summary: 'Create user plan owner' })
  @ApiResponse({ status: 201, description: 'User plan owner created' })
  async createUserPlan(
    @Body() data: CreateUserPlanDto,
    @Param('planId') planId: number,
  ) {
    return await this.planService.createUserPlan(data, planId)
  }

  @Get(':planId/users')
  @ApiOperation({ summary: 'Get all users by plan' })
  @ApiResponse({ status: 200, description: 'Return all users by plan' })
  async getUsersByPlan(@Param('planId') planId: number) {
    return await this.planService.findUsersByPlanId(planId)
  }

  @Post('/referral')
  @ApiOperation({ summary: 'Create referral' })
  @ApiResponse({ status: 201, description: 'Referral created' })
  async createReferral(@Body() data: CreateReferralDto, @Req() req: Request) {
    return await this.planService.createReferral({
      ...data,
      host: req.headers.host,
    })
  }

  @Get('referral/:token')
  @ApiOperation({ summary: 'Get referral info by token' })
  @ApiResponse({ status: 200, description: 'Return referral by token' })
  async getReferralByToken(@Param('token') token: string) {
    return await this.planService.findReferralByToken(token)
  }

  @Post('referral/verifation/:token/accept')
  @ApiOperation({ summary: 'Accept referral' })
  @ApiResponse({ status: 200, description: 'Referral accepted' })
  async acceptReferral(@Param('token') token: string) {
    return await this.planService.acceptReferral(token)
  }

  @Get('referral/:userId/capacity')
  @ApiOperation({ summary: 'Get plan capacity by user' })
  @ApiResponse({ status: 200, description: 'Return plan capacity by user' })
  async getPlanCapacityByUser(@Param('userId') userId: number) {
    const capacity = await this.planService.CurrentPlanCapacityByOwnerId(userId)
    const response: ReferralCountDto = {
      capacity,
    }
    return response
  }

  @Get(':userId/referrals')
  @ApiOperation({ summary: 'Get all referrals by user' })
  @ApiResponse({ status: 200, description: 'Return all referrals by user' })
  async getReferralsByUser(@Param('userId') userId: number) {
    return await this.planService.findCurrentReferralsOfPlanByOwnerId(userId)
  }

  @Delete(':userId/cancel-plan')
  @ApiOperation({ summary: 'Cancel plan' })
  @ApiResponse({ status: 200, description: 'Plan canceled' })
  async cancelPlan(@Param('userId') userId: number) {
    return await this.planService.deletePlanByUserId(userId)
  }

  @Delete('referral/:userId/cancel')
  @ApiOperation({ summary: 'Cancel referral' })
  @ApiResponse({ status: 200, description: 'Referral canceled' })
  async cancelReferral(@Param('userId') userId: number) {
    return await this.planService.deleteReferralByUserId(userId)
  }

  @ApiOperation({ summary: 'Update a plan' })
  @ApiResponse({
    status: 200,
    description: 'Plan updated successfully',
  })
  @Put('/:planId')
  async updatePlan(
    @Param('planId') planId: number,
    @Body() data: UpdatePlanDto,
  ) {
    return await this.planService.updatePlan(planId, data)
  }
}
