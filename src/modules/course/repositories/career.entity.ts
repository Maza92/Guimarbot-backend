import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Career } from '../entities/career.entity'

@Injectable()
export class CareerRepository {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}

  findAll() {
    return this.careerRepository.find({
      relations: {
        courses: {
          category: true,
          tags: true,
        },
      },
      select: {
        courses: {
          id: true,
          title: true,
          teacherName: true,
          description: true,
          category: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  findOneById(id: number): Promise<Career> {
    return this.careerRepository.findOne({
      where: { id },
    })
  }

  createCareer(data: Career) {
    return this.careerRepository.save(data)
  }
}
