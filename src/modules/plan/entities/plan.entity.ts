import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { UserPlan } from './user-plan.entity'
import { Referral } from './referral.entity'

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column('int')
  maxUsers: number

  @Column()
  description: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => UserPlan, userPlan => userPlan.plan)
  userPlans: Relation<UserPlan[]>

  @OneToMany(() => Referral, referral => referral.plan)
  referrals: Relation<Referral[]>
}
