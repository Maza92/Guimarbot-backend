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

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 50 })
  names: string

  @Column({ length: 50 })
  lastName: string

  @Column({ length: 80, nullable: false, unique: true })
  email: string

  @Column({ nullable: true })
  password?: string

  @Column('text', { nullable: true })
  profileImage: string

  @Column({ nullable: false, default: true })
  isActive: boolean

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
