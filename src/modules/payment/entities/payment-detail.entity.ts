import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Payment } from './payment.entity'
import { Course } from '@modules/course'

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @ManyToOne(() => Payment, payment => payment.paymentDetails)
  @JoinColumn()
  payment: Relation<Payment>

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course
}
