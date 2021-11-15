import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public findAll() {
    return this.postsService.findAll();
  }

  @Get('getNewArrivalPosts')
  public getNewArrivalPosts() {
    return this.postsService.getNewArrivalPosts();
  }

  @Get(':id')
  public findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public create(@Body(ValidationPipe) postData: CreatePostDto) {
    return this.postsService.create(postData);
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  public edit(
    @Param('id') id: number,
    @Body(ValidationPipe) postData: UpdatePostDto,
  ) {
    return this.postsService.edit(id, postData);
  }
}
