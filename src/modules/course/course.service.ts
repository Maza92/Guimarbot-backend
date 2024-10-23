import { Injectable } from '@nestjs/common'
import { CourseRepository } from './repositories/course.repository'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) { }

  findAll(): Promise<Course[]> {
    return this.courseRepository.findAll()
  }

  createCourse(data: CreateCourseDto) {
    return this.courseRepository.createCourse(data)
  }
}
