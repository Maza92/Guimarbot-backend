import { Injectable } from '@nestjs/common'
import { PaymentMethod } from '../entities/payment-method.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PaymentMethodRepository {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find({
      where: {
        status: true,
      },
      select: {
        id: true,
        type: true,
        status: true,
      },
    })
  }
}
