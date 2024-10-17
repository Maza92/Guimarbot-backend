import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeOrmModule } from './config/database.config'

@Module({
  imports: [typeOrmModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
