import { Body, Controller, Patch } from '@nestjs/common'
import { ProgressService } from './progress.service'
import { UpdateProgressVideoDto } from './dto/update-progress-video.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('/api/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Patch('/update-progress-video')
  @ApiOperation({ summary: 'Update progress video' })
  @ApiResponse({ status: 200, description: 'Return updated progress video' })
  @ApiResponse({ status: 404, description: 'Progress video not found' })
  updateProgressVideo(@Body() data: UpdateProgressVideoDto) {
    return this.progressService.updateProgressVideo(data)
  }
}
