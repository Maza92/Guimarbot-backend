import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Enrollement {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ default: true })
  status: boolean

  @Column({ type: 'date' })
  startDate: Date

  @Column({ type: 'date' })
  endDate: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
