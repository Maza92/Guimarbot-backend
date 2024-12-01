/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { ResponseService } from './response.service'

@Module({
  imports: [],
  controllers: [],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class CommonModule {}
