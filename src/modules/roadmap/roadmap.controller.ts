import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { RoadmapService } from './roadmap.service'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserRoadmapDto } from './dto/create-user-roadmap'
import { CreateDefaultRoadmapDto } from './dto/create-default-roadmap'
import { RoadmapDto } from './dto/roadmap-dto'

@ApiTags('Roadmap')
@Controller('/api/roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all roadmaps' })
  @ApiResponse({ status: 200, description: 'Return all roadmaps' })
  @ApiResponse({ status: 404, description: 'Roadmaps not found' })
  async getRoadmaps() {
    return await this.roadmapService.findAll()
  }

  @Get('/default')
  @ApiOperation({ summary: 'Get administrative roadmaps' })
  @ApiResponse({ status: 200, description: 'Return administrative roadmaps' })
  @ApiResponse({
    status: 404,
    description: 'Administrative roadmaps not found',
  })
  async getDefaultRoadmaps() {
    return await this.roadmapService.findAllDefaultRoadmaps()
  }

  @Get('/title/:title')
  @ApiOperation({ summary: 'Get roadmap by title' })
  @ApiResponse({ status: 200, description: 'Return roadmap by title' })
  @ApiResponse({ status: 404, description: 'Roadmap not found' })
  async getRoadmapByTitle(@Param('title') title: string) {
    return await this.roadmapService.findOneByTitle(title)
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get roadmap by id' })
  @ApiResponse({ status: 200, description: 'Return roadmap by id' })
  @ApiResponse({ status: 404, description: 'Roadmap not found' })
  getRoadmapById(@Param('id') id: number) {
    return this.roadmapService.findOneById(id)
  }

  @Post('user')
  @ApiOperation({ summary: 'Create user roadmap' })
  @ApiResponse({ status: 201, description: 'User roadmap created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateUserRoadmapDto })
  async createUserRoadmap(@Body() data: CreateUserRoadmapDto) {
    return await this.roadmapService.createUserRoadmap(data)
  }

  @Post('default')
  @ApiOperation({ summary: 'Create administrative roadmap' })
  @ApiResponse({ status: 201, description: 'Administrative roadmap created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateDefaultRoadmapDto })
  async createDefaultRoadmap(@Body() data: CreateUserRoadmapDto) {
    return await this.roadmapService.createDefaultRoadmap(data)
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update roadmap' })
  @ApiResponse({ status: 200, description: 'Roadmap updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: RoadmapDto })
  async updateRoadmap(@Param('id') id: number, @Body() data: RoadmapDto) {
    return await this.roadmapService.updateRoadmap(id, data)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Total delete roadmap' })
  @ApiResponse({ status: 200, description: 'Roadmap deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async deleteRoadmap(@Param('id') id: number) {
    return await this.roadmapService.deleteRoadmap(id)
  }
}
