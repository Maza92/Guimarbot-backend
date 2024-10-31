import { Injectable, NotFoundException } from '@nestjs/common'
import { CourseRepository } from './repositories/course.repository'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'
import { CourseFilter } from './interfaces/course-filter'

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) { }

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
  async findAllWithFilters(options?: CourseFilter) {
    if (Object.keys(options || {}).length > 0) {
      return this.courseRepository.findAllWithFilters(options);
    }
    return this.courseRepository.findAll();
  }
}
