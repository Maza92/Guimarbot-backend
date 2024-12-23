import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from '../entities/course.entity'
import { CreateCourseDto } from '../dto/create-course.dto'
import { ILike, Repository } from 'typeorm'
import { CourseFilter } from '../interfaces/course-filter'
import { UpdateCourseDto } from '../dto/update-course.dto'

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll(filters?: { limit: number }): Promise<Course[]> {
    const { limit } = filters

    return this.courseRepository.find({
      take: limit,
      relations: {
        tags: true,
      },
    })
  }

  findOneByTitle(title: string): Promise<Course> {
    return this.courseRepository.findOne({
      relations: {
        lessons: true,
        tags: true,
        category: true,
      },
      where: {
        title: ILike(`%${title}%`),
      },
    })
  }

  findAllByTitle(title: string): Promise<Course[]> {
    return this.courseRepository.find({
      relations: {
        tags: true,
        category: true,
      },
      where: {
        title: ILike(`%${title}%`),
      },
    })
  }

  findOneById(id: number): Promise<Course> {
    return this.courseRepository.findOne({
      relations: {
        lessons: true,
      },
      where: {
        id,
      },
    })
  }

  createCourse(data: CreateCourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create(data)
    return this.courseRepository.save(newCourse)
  }

  async updateCourse(courseId: number, data: UpdateCourseDto): Promise<Course> {
    const courseToUpdate = await this.courseRepository.findOne({
      where: {
        id: courseId,
      },
    })

    if (!courseToUpdate) return null

    this.courseRepository.merge(courseToUpdate, data)

    return this.courseRepository.save(courseToUpdate)
  }

  async findAllWithFilters(options: CourseFilter): Promise<Course[]> {
    const { categoryId, tagIds, minPrice, maxPrice } = options

    const queryBuilder = this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.tags', 'tags')

    if (typeof minPrice === 'number' && categoryId) {
      queryBuilder.andWhere('category.id = :categoryId', { categoryId })
    }

    if (tagIds) {
      const tagNameArray = tagIds.split(',').map(tag => tag.trim())

      queryBuilder.andWhere('tags.id IN (:...tagIds)', {
        tagIds: tagNameArray,
      })
    }

    if (typeof minPrice === 'number' && minPrice !== 0) {
      queryBuilder.andWhere('course.price >= :minPrice', { minPrice })
    }

    if (typeof minPrice === 'number' && maxPrice !== 0) {
      queryBuilder.andWhere('course.price <= :maxPrice', { maxPrice })
    }

    return queryBuilder.getMany()
  }
}
