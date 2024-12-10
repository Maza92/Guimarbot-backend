import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { PaymentService } from './payment.service'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PaymentMethod } from './entities/payment-method.entity'

@ApiTags('payment')
@Controller('/api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Get('/')
  // async getPaymentsByUserId() {}

  @Get('/methods')
  @ApiOperation({ summary: 'Get all payment methods' })
  @ApiResponse({ status: 200, description: 'Return all payment methods', type: PaymentMethod })
  async getAllPaymentMethod() {
    return await this.paymentService.getAllPaymentMethod()
  }

  @Post()
  @ApiBody({ type: CreatePaymentDto })
  @ApiOperation({ summary: 'Create a payment, it is proposed to use it to register purchases with the cart and individual purchases' })
  @ApiResponse({ status: 201, description: 'The payment has been successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createPayment(@Body() data: CreatePaymentDto) {
    return await this.paymentService.createPayment(data)
  }
}
