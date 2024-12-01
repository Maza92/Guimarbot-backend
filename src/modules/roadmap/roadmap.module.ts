import { TypeOrmModule } from '@nestjs/typeorm'
import { RoadmapController } from './roadmap.controller'
import { RoadmapService } from './roadmap.service'
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common'
import { Roadmap } from './entities/roadmap.entity'
import { Category } from '@modules/course/entities/category.entity'
import { RoadmapRepository } from './repositories/roadmap.repository'
import { ResponseService } from '@modules/common/response.service'
import { CommonModule } from '@modules/common/common.module'
import { CourseModule } from '@modules/course/course.module'
import { UserModule } from '@modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Roadmap, Category]),
    CommonModule,
    forwardRef(() => CourseModule),
    forwardRef(() => UserModule),
  ],
  controllers: [RoadmapController],
  providers: [RoadmapService, RoadmapRepository, ResponseService],
})
export class RoadmapModule {}
