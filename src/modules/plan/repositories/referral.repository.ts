import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Referral } from '../entities/referral.entity'
import { ReferralStatus } from '../types'
import { User } from '@modules/user'

@Injectable()
export class ReferralRepository {
  constructor(
    @InjectRepository(Referral)
    private readonly referralRepository: Repository<Referral>,
  ) {}

  async create(data: Referral): Promise<Referral> {
    const referralCreated = this.referralRepository.create(data)
    return this.referralRepository.save(referralCreated)
  }

  async updateStatus(
    referral: Referral,
    status: ReferralStatus,
  ): Promise<Referral> {
    const updateReferral = await this.referralRepository.findOne({
      relations: {
        plan: true,
        referrer: true,
      },
      where: {
        id: referral.id,
      },
    })

    updateReferral.status = status

    return this.referralRepository.save(updateReferral)
  }

  async findByToken(token: string): Promise<Referral> {
    return this.referralRepository.findOne({
      relations: ['plan'],
      where: { invitationToken: token },
    })
  }

  async findCurrentReferralsByOwnerId(userId: number): Promise<User[]> {
    const referrals = await this.referralRepository.find({
      relations: ['referrer'],
      where: {
        owner: {
          id: userId,
        },
        status: ReferralStatus.Accepted,
      },
    })

    return referrals.map(referral => referral.referrer)
  }

  async findCountCurrentReferralsByOwnerId(userId: number): Promise<number> {
    return this.referralRepository.count({
      where: {
        owner: {
          id: userId,
        },
        status: ReferralStatus.Accepted,
      },
    })
  }

  async deleteReferralByUserId(userId: number): Promise<void> {
    const referral = await this.referralRepository.findOne({
      where: {
        referrer: {
          id: userId,
        },
      },
    })

    await this.referralRepository.delete(referral.id)
  }
}
