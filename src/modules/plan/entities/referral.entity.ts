import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { User } from '@modules/user'
import { Plan } from './plan.entity'
import { ReferralStatus } from '../types'

@Entity('referral')
export class Referral {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.referrals)
  @JoinColumn({ name: 'owner_id' })
  owner: Relation<User>

  @ManyToOne(() => User, user => user.referrals)
  @JoinColumn({ name: 'referrer_id' })
  referrer: Relation<User>

  @Column()
  invitedEmail: string

  @ManyToOne(() => Plan, plan => plan.referrals)
  @JoinColumn({ name: 'plan_id' })
  plan: Relation<Plan>

  @Column({
    type: 'enum',
    enum: ReferralStatus,
    default: ReferralStatus.Pending,
  })
  status: ReferralStatus

  @Column({ unique: true, nullable: true })
  invitationToken: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ type: 'datetime', nullable: true })
  acceptedAt: Date
}
