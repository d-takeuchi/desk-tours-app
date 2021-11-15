import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Comment } from './comments.entity';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public create(
    @Body(ValidationPipe) commentData: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(commentData);
  }
}
