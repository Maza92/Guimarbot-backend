import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from '../entities/category.entity'
import { CreateCategoryDto } from '../dto/create-category-dto'

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find()
  }

  findOneById(id: number) {
    return this.categoryRepository.findOne({ where: { id } })
  }

  createCategory(data: CreateCategoryDto) {
    try {
      this.categoryRepository.save(data)
    } catch (error) {
      return error
    }
  }
}
