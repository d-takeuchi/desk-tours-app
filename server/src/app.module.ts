import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { User } from './users/entities/users.entity'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { TagsModule } from './tags/tags.module'
import { Tag } from './tags/entities/tags.entity'
import { Post } from './posts/entities/post.entity'
import { CommentsModule } from './comments/comments.module'
import { Comment } from './comments/entities/comments.entity'
import { Like } from './likes/entities/likes.entity'
import { LikesModule } from './likes/likes.module'
import { EmailModule } from './email/email.module'
import { PhotoModule } from './photo/photo.module'
import { ItemsModule } from './items/items.module'
import { Item } from './items/entities/items.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST,
    //   port: Number(process.env.DATABASE_PORT),
    //   username: process.env.DATABASE_USERNAME,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   entities: [User, Tag, Post, Comment, Like, Item],
    //   synchronize: true,
    // }),
    TypeOrmModule.forFeature([User, Tag, Post, Comment, Like, Item]),
    UsersModule,
    AuthModule,
    PostsModule,
    TagsModule,
    CommentsModule,
    LikesModule,
    EmailModule,
    PhotoModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
