import { Injectable } from '@nestjs/common'
import { RoadmapRepository } from './repositories/roadmap.repository'
import { CreateUserRoadmapDto } from './dto/create-user-roadmap'
import { Roadmap } from './entities/roadmap.entity'
import { CategoryRepository } from '@modules/course/repositories/category.repository'
import { CourseRepository } from '@modules/course/repositories/course.repository'
import { UserRepository } from '@modules/user/repositories/user.repository'
import { RoadmapDto } from './dto/roadmap-dto'
import { CreateDefaultRoadmapDto } from './dto/create-default-roadmap'

@Injectable()
export class RoadmapService {
  constructor(
    private readonly roadmapRepository: RoadmapRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository,
  ) {}

  findAll() {
    return this.roadmapRepository.findAll()
  }

  findAllDefaultRoadmaps() {
    return this.roadmapRepository.findAllDefaultRoadmaps()
  }

  findOneByTitle(title: string) {
    return this.roadmapRepository.findOneByTitle(title)
  }

  findOneById(id: number) {
    return this.roadmapRepository.findOneById(id)
  }

  async createUserRoadmap(data: CreateUserRoadmapDto) {
    if (!data.user) {
      throw new Error('User is required')
    }

    const user = await this.userRepository.findOneById(data.user.id)

    const roadmap: Roadmap = await this.createRoadmap(data)
    roadmap.isDefault = false
    roadmap.user = user

    return this.roadmapRepository.createRoadmap(roadmap)
  }

  async createDefaultRoadmap(data: CreateDefaultRoadmapDto) {
    const roadmap: Roadmap = await this.createRoadmap(data)
    roadmap.isDefault = true

    return this.roadmapRepository.createRoadmap(roadmap)
  }

  private validateRoadmap(data: RoadmapDto) {
    if (!data) {
      throw new Error('Invalid data')
    }

    if (!data.category) {
      throw new Error('Category is required')
    }

    return true
  }

  private async getCategoryById(id: number) {
    return this.categoryRepository.findOneById(id)
  }

  private async calculateEstimatedDuration(courses: any[]) {
    let estimatedDuration = 0

    for (const course of courses) {
      estimatedDuration += course.duration
    }

    return estimatedDuration
  }

  private async createRoadmap(data: RoadmapDto): Promise<Roadmap> {
    if (!this.validateRoadmap(data)) {
      throw new Error('Error')
    }

    const category = await this.getCategoryById(data.category.id)

    const roadmap: Roadmap = {
      id: null,
      ...data,
      isDefault: false,
      estimatedDuration: 0,
      user: null,
      category: category,
      courses: [],
      createAt: new Date(),
      updateAt: new Date(),
    }
    return roadmap
  }

  async updateRoadmap(id: number, data: RoadmapDto) {
    const roadmap = await this.roadmapRepository.findOneById(id)

    if (!roadmap) {
      throw new Error('Roadmap not found')
    }

    const category = await this.getCategoryById(data.category.id)
    const updatedRoadmap: Roadmap = {
      ...roadmap,
      ...data,
      category: category,
    }

    return this.roadmapRepository.updateRoadmap(id, updatedRoadmap)
  }

  async deleteRoadmap(id: number) {
    const roadmap = await this.roadmapRepository.findOneById(id)

    if (!roadmap) {
      throw new Error('Roadmap not found')
    }

    return this.roadmapRepository.deleteRoadmap(id)
  }
}
