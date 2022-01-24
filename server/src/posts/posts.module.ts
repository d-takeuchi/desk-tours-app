import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Comment } from 'src/comments/entities/comments.entity'
import { Item } from 'src/items/entities/items.entity'
import { PhotoModule } from 'src/photo/photo.module'
import { Tag } from 'src/tags/entities/tags.entity'
import { UsersModule } from 'src/users/users.module'
import { Post } from './entities/post.entity'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag, Comment, Item]),
    UsersModule,
    PhotoModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
