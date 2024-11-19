import { Body, Controller, Patch } from '@nestjs/common'
import { ProgressService } from './progress.service'
import { UpdateProgressVideoDto } from './dto/update-progress-video.dto'

@Controller('/api/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Patch('/update-progress-video')
  updateProgressVideo(@Body() data: UpdateProgressVideoDto) {
    return this.progressService.updateProgressVideo(data)
  }
}
