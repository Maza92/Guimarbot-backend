import { User } from 'src/modules/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

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
