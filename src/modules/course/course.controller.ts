import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CourseService } from './course.service'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'
import { TitleParam } from './interfaces/course-filter-title'

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Get()
  async getAllCourse(@Query('limit') limit: string): Promise<Course[]> {
    return this.courseService.findAll({ limit: Number(limit) || undefined })
  }

  @Get('/categories')
  async getAllCategories() {
    return this.courseService.findAllCategories()
  }

  @Get('/tags')
  async getAllTags() {
    return this.courseService.findAllTags()
  }

  @Get('/career')
  getAllCareer() {
    return this.courseService.findAllCarrer()
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
    @Query('categoryId') categoryId?: number,
    @Query('tagIds') tagIds?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.courseService.findAllWithFilters({
      categoryId,
      tagIds,
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
    })
  }

  @Get(':id')
  async getCourseById(@Param('id') id: number): Promise<Course> {
    return this.courseService.findOneByid(id)
  }
}
