import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from './auth.guard'
import { ApiBody } from '@nestjs/swagger'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterDto })
  @Post('/register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data)
  }

  @ApiBody({ type: LoginDto })
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
