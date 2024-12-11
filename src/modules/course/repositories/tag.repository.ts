import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from '../entities/tag.entity'
import { CreateTagDto } from '../dto/create-tag-dto'

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.tagRepository.find()
  }

  findOneById(id: number): Promise<Tag> {
    return this.tagRepository.findOne({
      where: { id },
    })
  }

  createTag(data: CreateTagDto) {
    try {
      this.tagRepository.save(data)
    } catch (error) {
      return error
    }
  }
}
