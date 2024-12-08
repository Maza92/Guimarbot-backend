import { User } from '@modules/user'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Plan } from './plan.entity'
import { PlanStatus } from '../types'

@Entity('user_plans')
export class UserPlan {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.userPlans)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>

  @ManyToOne(() => Plan, plan => plan.userPlans)
  @JoinColumn({ name: 'plan_id' })
  plan: Relation<Plan>

  @Column({ default: false })
  isOwner: boolean

  @CreateDateColumn()
  joinedAt: Date

  @Column({
    type: 'enum',
    enum: PlanStatus,
    default: PlanStatus.Active,
  })
  status: PlanStatus
}
