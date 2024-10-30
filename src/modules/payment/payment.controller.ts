import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { PaymentService } from './payment.service'

@Controller('/api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Get('/')
  // async getPaymentsByUserId() {}

  @Get('/methods')
  async getAllPaymentMethod() {
    return await this.paymentService.getAllPaymentMethod()
  }

  @Post()
  async createPayment(@Body() data: CreatePaymentDto) {
    return await this.paymentService.createPayment(data)
  }
}
