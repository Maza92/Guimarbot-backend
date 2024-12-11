import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CourseService } from './course.service'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'
import { TitleParam } from './interfaces/course-filter-title'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all courses with limited quantity' })
  @ApiResponse({
    status: 200,
    description: 'Return all courses with limited quantity',
  })
  @ApiResponse({ status: 404, description: 'Courses not found' })
  async getAllCourse(@Query('limit') limit: string): Promise<Course[]> {
    return this.courseService.findAll({ limit: Number(limit) || undefined })
  }

  @Get('/categories')
  @ApiOperation({ summary: 'Get all course categories' })
  @ApiResponse({
    status: 200,
    description: 'Return all course categories',
  })
  @ApiResponse({ status: 404, description: 'Categories not found' })
  async getAllCategories() {
    return this.courseService.findAllCategories()
  }

  @Get('/tags')
  @ApiOperation({ summary: 'Get all course tags' })
  @ApiResponse({
    status: 200,
    description: 'Return all course tags',
  })
  @ApiResponse({ status: 404, description: 'Tags not found' })
  async getAllTags() {
    return this.courseService.findAllTags()
  }

  @Get('/career')
  @ApiOperation({ summary: 'Get all career' })
  @ApiResponse({
    status: 200,
    description: 'Return all career',
  })
  @ApiResponse({ status: 404, description: 'Career not found' })
  getAllCareer() {
    return this.courseService.findAllCarrer()
  }

  @Get('/find-by-title')
  @ApiOperation({ summary: 'Get course by title' })
  @ApiResponse({
    status: 200,
    description: 'Return course by title',
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseByName(@Query() query: TitleParam): Promise<Course> {
    const { title } = query

    return this.courseService.findOneByTitle(title)
  }

  @ApiOperation({ summary: 'Get course by title' })
  @ApiResponse({
    status: 200,
    description: 'Return course by title',
  })
  @ApiResponse({
    status: 404,
    description: 'Course not found',
  })
  @Get('/find-all-by-title')
  async getCoursesByName(@Query() query: TitleParam) {
    const { title } = query

    return this.courseService.findAllByTitle(title)
  }

  @Post()
  @ApiOperation({ summary: 'Create a course' })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateCourseDto })
  async createCourse(@Body() data: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(data)
  }

  @Get('/find-courses')
  @ApiOperation({ summary: 'Get all courses with filters' })
  @ApiResponse({
    status: 200,
    description: 'Return all courses with filters',
  })
  @ApiResponse({ status: 404, description: 'Courses not found' })
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

  @Get('/:id')
  @ApiOperation({ summary: 'Get course by id' })
  @ApiResponse({
    status: 200,
    description: 'Return course by id',
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseById(@Param('id') id: number): Promise<Course> {
    return this.courseService.findOneById(id)
  }
}
