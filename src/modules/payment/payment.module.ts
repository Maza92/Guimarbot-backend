import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentDetail } from './entities/payment-detail.entity'
import { PaymentMethod } from './entities/payment-method.entity'
import { Payment } from './entities/payment.entity'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { PaymentMethodRepository } from './repositories/payment-method.repository'
import { PaymentRepository } from './repositories/payment.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentDetail, PaymentMethod])],
  providers: [PaymentService, PaymentRepository, PaymentMethodRepository],
  controllers: [PaymentController],
})
export class PaymentModule {}
