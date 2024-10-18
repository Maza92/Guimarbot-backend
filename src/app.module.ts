import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeOrmModule } from './config/database.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [typeOrmModule(), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
