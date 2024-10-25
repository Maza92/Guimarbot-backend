import { Injectable, NotFoundException } from '@nestjs/common'
import { CourseRepository } from './repositories/course.repository'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.findAll()
  }

  async findOneByTitle(title: string): Promise<Course> {
    const filterTitle = title.replace(/-/g, ' ').toLocaleLowerCase()

    const course = await this.courseRepository.findOneByTitle(filterTitle)

    if (!course) throw new NotFoundException('Course not found')

    return course
  }

  createCourse(data: CreateCourseDto) {
    return this.courseRepository.createCourse(data)
  }
}
