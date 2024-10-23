import { Body, Controller, Get, Post } from '@nestjs/common'
import { CourseService } from './course.service'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Get()
  async getAllCourse(): Promise<Course[]> {
    return this.courseService.findAll()
  }

  @Post()
  async createCourse(@Body() data: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(data)
  }
}
