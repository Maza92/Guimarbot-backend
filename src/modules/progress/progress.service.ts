import { Injectable, NotFoundException } from '@nestjs/common'
import { ProgressRepository } from './repositories/progress.repository'
import { UpdateProgressVideoDto } from './dto/update-progress-video.dto'

@Injectable()
export class ProgressService {
  constructor(private readonly progressRepostory: ProgressRepository) {}

  async updateProgressVideo(data: UpdateProgressVideoDto) {
    const progressVideo =
      await this.progressRepostory.updateVideoCompleted(data)

    if (!progressVideo) {
      throw new NotFoundException(
        'Lesson course is not register for this user.',
      )
    }

    return progressVideo
  }
}
