import { Controller, Get } from '@nestjs/common'

import { Tag } from './tags.entity'
import { TagsService } from './tags.service'

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  public findAll(): Promise<Tag[]> {
    return this.tagsService.findAll()
  }
}
