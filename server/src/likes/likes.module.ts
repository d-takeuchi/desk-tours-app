import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from 'src/posts/post.entity';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { LikesController } from './likes.controller';
import { Like } from './likes.entity';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post]), UsersModule, PostsModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
