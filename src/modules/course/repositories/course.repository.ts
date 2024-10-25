import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from '../entities/course.entity'
import { CreateCourseDto } from '../dto/create-course.dto'
import { ILike, Repository } from 'typeorm'

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

  findOneByTitle(title: string): Promise<Course> {
    return this.courseRepository.findOne({
      relations: {
        lessons: true,
      },
      where: {
        title: ILike(`%${title}%`),
      },
    })
  }

  createCourse(data: CreateCourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create(data)
    return this.courseRepository.save(newCourse)
  }
}
