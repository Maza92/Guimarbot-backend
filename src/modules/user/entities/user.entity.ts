import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Relation,
  OneToMany,
} from 'typeorm'
import { Role } from '@modules/roles'
import { Progress } from '@modules/progress'
import { Payment } from '@modules/payment'
import { Roadmap } from '@modules/roadmap'
import { UserPlan } from '@modules/plan/entities/user-plan.entity'
import { Referral } from '@modules/plan/entities/referral.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 50 })
  names: string

  @Column({ length: 50 })
  lastName: string

  @Column({ length: 100, nullable: true })
  username: string

  @Column({ length: 80, nullable: false, unique: true })
  email: string

  @Column({ length: 25, nullable: true })
  phone: string

  @Column({
    // type: 'enum',
    // enum: ['masculino', 'femenino', null],
    // nullable: false,
    length: 20,
    nullable: true,
  })
  gender: string

  @Column({ type: 'text', nullable: true })
  bio: string

  @Column({ nullable: true })
  password?: string

  @Column('text', { nullable: true })
  profileImage: string

  @Column({ nullable: false, default: true })
  isActive: boolean

  @Column({ type: 'datetime', nullable: true })
  birthDate: Date

  @ManyToMany(() => Role, role => role.users, {
    nullable: true,
    cascade: ['recover'],
  })
  @JoinTable()
  roles: Relation<Role[]>

  @OneToMany(() => Progress, progress => progress.user)
  progress: Relation<Progress[]>

  @OneToMany(() => Payment, payment => payment.user, { cascade: true })
  payments: Relation<Payment[]>

  @OneToMany(() => Roadmap, roadmap => roadmap.user)
  roadmaps: Relation<Roadmap[]>

  @OneToMany(() => UserPlan, userPlan => userPlan.user)
  userPlans: Relation<UserPlan[]>

  @OneToMany(() => Referral, referral => referral.referrer)
  referrals: Relation<Referral[]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
