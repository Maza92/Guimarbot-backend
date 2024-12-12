import { Injectable, NotFoundException } from '@nestjs/common'
import { PlanRepository } from './repositories/plan.repository'
import { CreatePlanDto } from './dto/create-plan-dto'
import { CreateUserPlanDto } from './dto/create-user-plan-dto'
import { UserPlan } from './entities/user-plan.entity'
import { UserRepository } from '@modules/user/repositories/user.repository'
import { PlanStatus, ReferralStatus } from './types'
import { UserPlanRepository } from './repositories/user-plan.repository'
import { User } from '@modules/user'
import { ReferralRepository } from './repositories/referral.repository'
import { CreateReferralDto } from './dto/create-referral-dto'
import { Referral } from './entities/referral.entity'
import { UpdatePlanDto } from './dto/update-plan-dto'

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly userRepository: UserRepository,
    private readonly userPlanRepository: UserPlanRepository,
    private readonly referralRepository: ReferralRepository,
  ) {}

  createPlan(data: CreatePlanDto) {
    return this.planRepository.createPlan(data)
  }

  findAll() {
    return this.planRepository.findAll()
  }

  async createUserPlan(data: CreateUserPlanDto, planId: number) {
    try {
      const user = await this.userRepository.findOneById(data.user.id)
      const plan = await this.planRepository.findOneById(planId)

      if (!user) throw new Error('User not found')

      if (!plan) throw new Error('Plan not found')

      const userPlan: UserPlan = {
        id: undefined,
        user: user,
        plan: plan,
        isOwner: true,
        status: PlanStatus.Active,
        joinedAt: new Date(),
      }
      this.userPlanRepository.create(userPlan)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findUsersByPlanId(planId: number): Promise<User[]> {
    try {
      const userPlans =
        await this.userPlanRepository.findAllUserPlansOwnerById(planId)
      return userPlans.map(userPlan => userPlan.user)
    } catch (error) {
      throw new Error(error)
    }
  }

  async createReferral(data: CreateReferralDto) {
    try {
      /*
       * Future implementation to send email to user referral
       */

      const user = await this.userRepository.findOneByEmail(data.email)
      const owner = await this.userRepository.findOneById(data.owner.id)
      const plan = await this.planRepository.findOneById(data.plan.id)

      if (!user) throw new Error('User not found')
      if (!plan && !owner) throw new Error('Plan not found')

      const token = Math.random().toString(36).substring(2, 15)

      const currentPlanCapacity = await this.CurrentPlanCapacityByOwnerId(
        owner.id,
      )

      if (currentPlanCapacity >= plan.maxUsers) {
        throw new Error('Plan capacity reached')
      }

      const referral: Referral = {
        id: undefined,
        owner: owner,
        referrer: user,
        plan: plan,
        invitedEmail: data.email,
        invitationToken: token,
        status: ReferralStatus.Pending,
        createdAt: new Date(),
        acceptedAt: null,
      }

      this.referralRepository.create(referral)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findReferralByToken(token: string): Promise<Referral> {
    return this.referralRepository.findByToken(token)
  }

  async acceptReferral(token: string) {
    try {
      const referral = await this.referralRepository.findByToken(token)

      if (!referral) throw new Error('Referral not found')

      referral.status = ReferralStatus.Accepted
      referral.acceptedAt = new Date()

      const acceptedReferral = await this.referralRepository.updateStatus(
        referral,
        ReferralStatus.Accepted,
      )

      const userPlan: UserPlan = {
        id: undefined,
        user: acceptedReferral.referrer,
        plan: acceptedReferral.plan,
        isOwner: false,
        status: PlanStatus.Active,
        joinedAt: new Date(),
      }
      this.userPlanRepository.create(userPlan)
    } catch (error) {
      throw new Error(error)
    }
  }

  async CurrentPlanCapacityByOwnerId(userId: number) {
    return this.referralRepository.findCountCurrentReferralsByOwnerId(userId)
  }

  async findCurrentReferralsOfPlanByOwnerId(userId: number) {
    return this.referralRepository.findCurrentReferralsByOwnerId(userId)
  }

  async deletePlanByUserId(userId: number) {
    return this.userPlanRepository.deletePlanByUserId(userId)
  }

  async deleteReferralByUserId(userId: number) {
    try {
      this.userPlanRepository.deleteReferralByUserId(userId)
      this.referralRepository.deleteReferralByUserId(userId)
    } catch (error) {
      throw new Error(error)
    }
  }

  async updatePlan(planId: number, data: UpdatePlanDto) {
    const plan = await this.planRepository.update(planId, data)

    if (!plan) {
      throw new NotFoundException()
    }

    return plan
  }

  findPlanById(planId: number) {
    return this.planRepository.findOneById(planId)
  }
}
