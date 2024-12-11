import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CourseController } from './course.controller'
import { CourseService } from './course.service'
import { Career } from './entities/career.entity'
import { Category } from './entities/category.entity'
import { Course } from './entities/course.entity'
import { Tag } from './entities/tag.entity'
import { CareerRepository } from './repositories/career.entity'
import { CategoryRepository } from './repositories/category.repository'
import { CourseRepository } from './repositories/course.repository'
import { TagRepository } from './repositories/tag.repository'
import { ResponseService } from '@modules/common'
import { RoadmapModule } from '@modules/roadmap/roadmap.module'
import { ExtraController } from './extra.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Category, Tag, Career]),
    forwardRef(() => RoadmapModule),
  ],
  providers: [
    CourseService,
    CourseRepository,
    CareerRepository,
    CategoryRepository,
    ResponseService,
    TagRepository,
  ],
  controllers: [CourseController, ExtraController],
  exports: [CourseService, CategoryRepository, CourseRepository],
})
export class CourseModule {}
