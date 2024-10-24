import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@modules/user'

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 80, nullable: false })
  name: string

  @Column({ nullable: true })
  description: string

  @ManyToMany(() => User, user => user.roles)
  users: Relation<User[]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
