import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CreatePostDto } from './dto/create-post.dto'
import { SearchParamsDto } from './dto/search-params.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public findAll(@Query() query:SearchParamsDto) {
    return this.postsService.findAll(query)
  }

  @Get(':id')
  public findOne(@Param('id') id: number) {
    return this.postsService.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public create(@Body(ValidationPipe) postData: CreatePostDto) {
    return this.postsService.create(postData)
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  public edit(
    @Param('id') id: number,
    @Body(ValidationPipe) postData: UpdatePostDto,
  ) {
    return this.postsService.edit(id, postData)
  }


  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public delete(@Param('id') id: number){
    return this.postsService.delete(id)
  }
}
