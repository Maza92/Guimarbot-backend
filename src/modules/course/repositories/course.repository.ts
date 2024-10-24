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
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: {
        lessons: true,
      },
    })
  }

  createCourse(data: CreateCourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create(data)
    return this.courseRepository.save(newCourse)
  }
}
