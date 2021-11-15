import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Tag } from './tags.entity';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }
}
