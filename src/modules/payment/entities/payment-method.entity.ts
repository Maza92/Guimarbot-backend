import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty()
  id: number

  @ApiProperty()
  @Column({ length: 50 })
  type: string

  @ApiProperty()
  @Column({ default: true })
  status: true

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
