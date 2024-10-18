import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
