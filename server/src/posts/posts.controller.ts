import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) postData: CreatePostDto) {
    return this.postsService.create(postData);
  }

  @Get('getNewArrivalPosts')
  getNewArrivalPosts() {
    return this.postsService.getNewArrivalPosts();
  }
}
