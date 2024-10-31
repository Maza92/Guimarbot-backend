import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CourseService } from './course.service'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'
import { TitleParam } from './interfaces/course-filter-title'

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourse(): Promise<Course[]> {
    return this.courseService.findAll()
  }

  @Get('/categories')
  async getAllCategories() {
    return this.courseService.findAllCategories()
  }

  @Get('/tags')
  async getAllTags() {
    return this.courseService.findAllTags()
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

  @Get('find-courses')
  async findAll(
    @Query('category-name') categoryName?: string,
    @Query('tag-names') tagNames?: string,
    @Query('min-price') minPrice?: number,
    @Query('max-price') maxPrice?: number,
  ) {
    return this.courseService.findAllWithFilters({
      categoryName,
      tagNames,
      minPrice,
      maxPrice,
    })
  }
}
