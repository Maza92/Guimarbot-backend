import { Controller, Get } from '@nestjs/common'
import { CourseService } from './course.service'
import { Course } from './entities/course.entity'

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourse(): Promise<Course[]> {
    return this.courseService.findAll()
  }
}
