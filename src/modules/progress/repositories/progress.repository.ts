import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateProgressVideoDto } from '../dto/update-progress-video.dto'
import { Progress } from '../entities/progress.entity'
import { CreateProgressVideoDto } from '../dto/create-progress-video.dto'

@Injectable()
export class ProgressRepository {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
  ) {}

  public async createUserProgress(userInscriptions: CreateProgressVideoDto[]) {
    const progressVideos = this.progressRepository.create(
      userInscriptions.map(({ userId, lessonId }) => ({
        user: {
          id: userId,
        },
        lesson: {
          id: lessonId,
        },
      })),
    )

    return this.progressRepository.save(progressVideos)
  }

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

    this.progressRepository.merge(progressVideo, {
      completed: !progressVideo.completed,
    })

    return this.progressRepository.save(progressVideo)
  }
}
