/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common'
import { CourseService } from './course.service'
import { CreateCategoryDto } from './dto/create-category-dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('api/extra')
export class ExtraController {
  constructor(private readonly courseService: CourseService) {}

  @Post('category')
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, description: 'Category created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.courseService.createCategory(data)
  }

  @Post('tag')
  @ApiOperation({ summary: 'Create tag' })
  @ApiResponse({ status: 201, description: 'Tag created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createTag(@Body() data: CreateCategoryDto) {
    return this.courseService.createTag(data)
  }
}
