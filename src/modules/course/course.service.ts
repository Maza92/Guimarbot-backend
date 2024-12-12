import { Injectable, NotFoundException } from '@nestjs/common'
import { CourseRepository } from './repositories/course.repository'
import { Course } from './entities/course.entity'
import { CreateCourseDto } from './dto/create-course.dto'
import { CourseFilter } from './interfaces/course-filter'
import { CategoryRepository } from './repositories/category.repository'
import { TagRepository } from './repositories/tag.repository'
import { CareerRepository } from './repositories/career.entity'
import { RoadmapRepository } from '@modules/roadmap/repositories/roadmap.repository'
import { CreateCategoryDto } from './dto/create-category-dto'
import { CreateTagDto } from './dto/create-tag-dto'

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly tagRepository: TagRepository,
    private readonly careerRepository: CareerRepository,
    private readonly roadmapRepository: RoadmapRepository,
  ) {}

  findAll({ limit }: { limit: number }): Promise<Course[]> {
    return this.courseRepository.findAll({ limit })
  }

  findAllCategories() {
    return this.categoryRepository.findAll()
  }

  findAllTags() {
    return this.tagRepository.findAll()
  }

  findAllCarrer() {
    return this.careerRepository.findAll()
  }

  async findOneByTitle(title: string): Promise<Course> {
    const filterTitle = title.replace(/-/g, ' ').toLocaleLowerCase()

    const course = await this.courseRepository.findOneByTitle(filterTitle)

    if (!course) throw new NotFoundException('Course not found')

    return course
  }

  findAllByTitle(title: string) {
    return this.courseRepository.findAllByTitle(title)
  }

  async createCourse(data: CreateCourseDto) {
    return this.courseRepository.createCourse(data)
  }

  async findAllWithFilters(options?: CourseFilter) {
    if (Object.keys(options || {}).length > 0) {
      return this.courseRepository.findAllWithFilters(options)
    }

    return this.courseRepository.findAll()
  }

  async findOneById(id: number) {
    const course = await this.courseRepository.findOneById(id)

    if (!course) throw new NotFoundException('Course not found')

    return course
  }

  async createCategory(data: CreateCategoryDto) {
    return this.categoryRepository.createCategory(data)
  }

  async createTag(data: CreateTagDto) {
    return this.tagRepository.createTag(data)
  }
}
