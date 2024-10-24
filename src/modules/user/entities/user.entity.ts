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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
