import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from '../entities/course.entity'
import { CreateCourseDto } from '../dto/create-course.dto'
import { ILike, Repository } from 'typeorm'
import { CourseFilter } from '../interfaces/course-filter'

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: {
        lessons: true,
      },
    })
  }

  findOneByTitle(title: string): Promise<Course> {
    return this.courseRepository.findOne({
      relations: {
        lessons: true,
      },
      where: {
        title: ILike(`%${title}%`),
      },
    })
  }

  createCourse(data: CreateCourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create(data)
    return this.courseRepository.save(newCourse)
  }

  async findAllWithFilters(options: CourseFilter): Promise<Course[]> {
    const {
      categoryName,
      tagNames,
      minPrice,
      maxPrice
    } = options;

    const queryBuilder = this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.lessons', 'lessons')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.tags', 'tags');

    if (categoryName) {
      queryBuilder.andWhere('category.name = :categoryName', { categoryName });
    }

    if (tagNames) {
      const tagNameArray = tagNames.split(',').map(tag => tag.trim());

      queryBuilder.andWhere('tags.name IN (:...tagNames)', {
        tagNames: tagNameArray
      });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('course.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('course.price <= :maxPrice', { maxPrice });
    }

    return queryBuilder.getMany();
  }
}
