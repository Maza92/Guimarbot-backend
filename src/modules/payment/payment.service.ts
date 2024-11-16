import { Injectable, NotFoundException } from '@nestjs/common'
import { PaymentRepository } from './repositories/payment.repository'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { PaymentMethodRepository } from './repositories/payment-method.repository'
import { CourseService } from '@modules/course/course.service'

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentMethodRepository: PaymentMethodRepository,
    private readonly courseService: CourseService,
  ) { }

  getAllPaymentMethod() {
    return this.paymentMethodRepository.findAll()
  }

  async createPayment(data: CreatePaymentDto) {
    const { paymentDetails } = data
    let totalPayment = 0

    const updatedPaymentDetails = await Promise.all(
      paymentDetails.map(async (paymentDetail) => {
        const course = await this.courseService.findOneByid(paymentDetail.courseId)

        if (!course) throw new NotFoundException('Course not found')

        totalPayment += course.price

        return {
          courseId: paymentDetail.courseId,
          description: course.title,
        }
      }),
    )

    const payment = {
      ...data,
      totalPayment: totalPayment,
      paymentDetails: updatedPaymentDetails,
    }

    return this.paymentRepository.createPayment(payment)
  }
}
