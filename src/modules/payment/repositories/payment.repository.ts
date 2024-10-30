import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePaymentDto } from '../dto/create-payment.dto'
import { PaymentDetail } from '../entities/payment-detail.entity'
import { Payment } from '../entities/payment.entity'

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(PaymentDetail)
    private readonly paymentDetailRepository: Repository<PaymentDetail>,
  ) {}

  createPayment(dataDto: CreatePaymentDto): Promise<Payment> {
    const { paymentDetails, paymentMethodId, userId, ...restDataDto } = dataDto

    const details = paymentDetails.map(({ coureId, ...restData }) =>
      this.paymentDetailRepository.create({
        ...restData,
        course: {
          id: coureId,
        },
      }),
    )

    const paymentCreated = this.paymentRepository.create({
      ...restDataDto,
      user: {
        id: userId,
      },
      paymentMethod: {
        id: paymentMethodId,
      },
      paymentDetails: details,
    })

    return this.paymentRepository.save(paymentCreated)
  }
}
