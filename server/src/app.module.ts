import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tags.entity';
import { Post } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comments.entity';
import { Like } from './likes/likes.entity';
import { LikesModule } from './likes/likes.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-server',
      port: 3306,
      username: 'develop',
      password: 'password',
      database: 'develop',
      entities: [User, Tag, Post, Comment, Like],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    TagsModule,
    CommentsModule,
    LikesModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
