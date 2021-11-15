import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.entity';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User]), UsersModule],
  exports: [TypeOrmModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
