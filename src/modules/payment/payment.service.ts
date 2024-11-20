import { Injectable, NotFoundException } from '@nestjs/common'
import { PaymentRepository } from './repositories/payment.repository'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { PaymentMethodRepository } from './repositories/payment-method.repository'
import { CourseService } from '@modules/course/course.service'
import { ProgressRepository } from '@modules/progress/repositories/progress.repository'

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentMethodRepository: PaymentMethodRepository,
    private readonly courseService: CourseService,
    private readonly progressRepository: ProgressRepository,
  ) {}

  getAllPaymentMethod() {
    return this.paymentMethodRepository.findAll()
  }

  async createPayment(data: CreatePaymentDto) {
    const { userId, paymentDetails: paymentDetailsDto } = data
    let totalPayment = 0

    const updatedPaymentDetails = await Promise.all(
      paymentDetailsDto.map(async paymentDetail => {
        const course = await this.courseService.findOneById(
          paymentDetail.courseId,
        )

        if (!course) throw new NotFoundException('Course not found')

        totalPayment += course.price

        return {
          courseId: paymentDetail.courseId,
          description: course.title,
        }
      }),
    )

    const payment = await this.paymentRepository.createPayment({
      ...data,
      totalPayment,
      paymentDetails: updatedPaymentDetails,
    })

    const { paymentDetails } = payment

    await this.progressRepository.createUserProgress(
      paymentDetails
        .map(({ course }) =>
          course.lessons.map(lesson => ({
            userId,
            lessonId: lesson.id,
          })),
        )
        .flat(),
    )

    return payment
  }
}
