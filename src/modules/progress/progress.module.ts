import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Progress } from './entities/progress.entity'
import { ProgressController } from './progress.controller'
import { ProgressService } from './progress.service'
import { ProgressRepository } from './repositories/progress.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Progress])],
  providers: [ProgressService, ProgressRepository],
  controllers: [ProgressController],
  exports: [ProgressRepository],
})
export class ProgressModule {}
