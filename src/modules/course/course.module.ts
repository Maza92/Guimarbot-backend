import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CourseController } from './course.controller'
import { CourseService } from './course.service'
import { Category } from './entities/category.entity'
import { Course } from './entities/course.entity'
import { Tag } from './entities/tag.entity'
import { CategoryRepository } from './repositories/category.repository'
import { CourseRepository } from './repositories/course.repository'
import { TagRepository } from './repositories/tag.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Course, Category, Tag])],
  providers: [
    CourseService,
    CourseRepository,
    CategoryRepository,
    TagRepository,
  ],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule { }
