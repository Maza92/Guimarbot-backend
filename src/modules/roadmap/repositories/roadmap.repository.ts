import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Roadmap } from '../entities/roadmap.entity'
import { Repository } from 'typeorm'
import { ResponseService } from '@modules/common/response.service'

@Injectable()
export class RoadmapRepository {
  constructor(
    @InjectRepository(Roadmap)
    private readonly roadmapRepository: Repository<Roadmap>,
    private readonly responseService: ResponseService,
  ) {
    this.responseService.initType(Roadmap)
  }

  findAll(): Promise<Roadmap[]> {
    return this.roadmapRepository.find({
      relations: {
        category: true,
        courses: true,
      },
    })
  }

  findAllByUserId(userId: number): Promise<Roadmap[]> {
    return this.roadmapRepository.find({
      relations: {
        category: true,
        courses: true,
      },
      where: {
        isDefault: false,
        user: {
          id: userId,
        },
      },
    })
  }

  findAllDefaultRoadmaps(): Promise<Roadmap[]> {
    return this.roadmapRepository.find({
      relations: {
        category: true,
        courses: true,
      },
      where: {
        isDefault: true,
      },
    })
  }

  findOneByTitle(title: string): Promise<Roadmap> {
    return this.roadmapRepository.findOne({
      relations: {
        category: true,
        courses: true,
      },
      where: {
        title,
      },
    })
  }

  findOneById(id: number): Promise<Roadmap> {
    return this.roadmapRepository.findOne({
      relations: {
        category: true,
        courses: true,
      },
      where: {
        id,
      },
    })
  }

  async createRoadmap(data: Roadmap) {
    const newRoadmap = this.roadmapRepository.create(data)

    try {
      const savedRoadmap = await this.roadmapRepository.save(newRoadmap)

      if (!savedRoadmap) {
        return this.responseService.createResponseError()
      }
      return this.responseService.createResponse()
    } catch (error) {
      throw new Error(`Error saving roadmap: ${error.message}`)
    }
  }

  updateRoadmap(id: number, data: Roadmap) {
    if (!this.roadmapRepository.save({ ...data, id: Number(id) })) {
      return this.responseService.updateResponseError()
    }

    return this.responseService.updateResponse()
  }

  deleteRoadmap(id: number) {
    if (!this.roadmapRepository.delete(id)) {
      return this.responseService.deleteResponseError()
    }
    return this.responseService.deleteResponse()
  }
}
