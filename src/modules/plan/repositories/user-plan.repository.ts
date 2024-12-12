import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { UserPlan } from '../entities/user-plan.entity'
import { Plan } from '../entities/plan.entity'

@Injectable()
export class UserPlanRepository {
  constructor(
    @InjectRepository(UserPlan)
    private readonly userPlanRepository: Repository<UserPlan>,
  ) {}

  async create(data: DeepPartial<UserPlan>): Promise<UserPlan> {
    const planCreated = this.userPlanRepository.create(data)
    return this.userPlanRepository.save(planCreated)
  }

  async findByUserId(userId: number): Promise<UserPlan> {
    return this.userPlanRepository.findOne({
      relations: {
        plan: true,
      },
      where: { user: { id: userId } },
    })
  }

  async findAllUserPlansOwnerById(planId: number): Promise<UserPlan[]> {
    return this.userPlanRepository.find({
      relations: {
        user: true,
        plan: true,
      },
      where: {
        isOwner: true,
        plan: {
          id: planId,
        },
      },
    })
  }

  async findPlanCapacityByOwnerId(userId: number): Promise<number> {
    const userPlan = await this.userPlanRepository.findOne({
      relations: {
        plan: true,
      },
      where: {
        user: {
          id: userId,
        },
        isOwner: true,
      },
    })
    return userPlan.plan.maxUsers
  }

  async findCurrentPlanByUserId(userId: number): Promise<Plan> {
    const userPlan = await this.userPlanRepository.findOne({
      relations: {
        plan: true,
      },
      where: {
        user: {
          id: userId,
        },
        isOwner: true,
      },
    })
    return userPlan.plan
  }

  async deletePlanByUserId(userId: number): Promise<void> {
    const userPlan = await this.userPlanRepository.findOne({
      relations: {
        plan: true,
      },
      where: {
        user: {
          id: userId,
        },
        isOwner: true,
      },
    })
    await this.userPlanRepository.delete(userPlan.id)
  }

  async deleteReferralByUserId(userId: number): Promise<void> {
    const referralUserPlan = await this.userPlanRepository.findOne({
      relations: {
        plan: true,
      },
      where: {
        user: {
          id: userId,
        },
        isOwner: false,
      },
    })

    if (!referralUserPlan) return null

    await this.userPlanRepository.delete(referralUserPlan.id)
  }
}
