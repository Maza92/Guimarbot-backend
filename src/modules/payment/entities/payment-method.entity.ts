import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 50 })
  type: string

  @Column({ default: true })
  status: true

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
