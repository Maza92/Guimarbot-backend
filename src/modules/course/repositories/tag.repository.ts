import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from '../entities/tag.entity'

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.tagRepository.find()
  }
}
