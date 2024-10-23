import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from '../entities/course.entity'
import { CreateCourseDto } from '../dto/create-course.dto'
import { Repository } from 'typeorm'

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  findAll(): Promise<Course[]> {
    return this.courseRepository.find()
  }

  createCourse(data: CreateCourseDto) {
    const newCourse = this.courseRepository.create(data)
    return this.courseRepository.save(newCourse)
  }
}
