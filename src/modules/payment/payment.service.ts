import { Injectable } from '@nestjs/common'
import { PaymentRepository } from './repositories/payment.repository'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { PaymentMethodRepository } from './repositories/payment-method.repository'

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  getAllPaymentMethod() {
    return this.paymentMethodRepository.findAll()
  }

  createPayment(data: CreatePaymentDto) {
    // TODO: calculate total payment
    return this.paymentRepository.createPayment(data)
  }
}
