import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Progress } from '../entities/progress.entity'
import { Repository } from 'typeorm'
import { UpdateProgressVideoDto } from '../dto/update-progress-video.dto'

@Injectable()
export class ProgressRepository {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
  ) {}

  public async updateVideoCompleted({
    userId,
    lessonId,
  }: UpdateProgressVideoDto) {
    const progressVideo = await this.progressRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        lesson: {
          id: lessonId,
        },
      },
    })

    if (!progressVideo) return null

    this.progressRepository.merge(progressVideo, { completed: true })

    return this.progressRepository.save(progressVideo)
  }
}
