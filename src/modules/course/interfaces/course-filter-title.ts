import { ApiProperty } from '@nestjs/swagger'

export class TitleParam {
  @ApiProperty()
  title: string
}
