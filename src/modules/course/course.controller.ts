import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CourseService } from './course.service'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'
import { TitleParam } from './interfaces/course-filter'

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourse(): Promise<Course[]> {
    return this.courseService.findAll()
  }

  @Get('/find-by-title')
  async getCourseByName(@Query() query: TitleParam): Promise<Course> {
    const { title } = query

    return this.courseService.findOneByTitle(title)
  }

  @Post()
  async createCourse(@Body() data: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(data)
  }
}
