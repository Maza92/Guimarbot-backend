import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from './auth.guard'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data)
  }

  @Post('/login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data)
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  me() {
    return 'token working'
  }
}
