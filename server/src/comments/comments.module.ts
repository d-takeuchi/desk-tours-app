import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { Comment } from './entities/comments.entity'
import { Post } from 'src/posts/entities/post.entity'
import { User } from 'src/users/entities/users.entity'
import { PostsModule } from 'src/posts/posts.module'

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User]), PostsModule],
  exports: [TypeOrmModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
