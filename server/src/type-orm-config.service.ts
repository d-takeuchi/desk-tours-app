import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from './users/users.entity';
import { Tag } from './tags/tags.entity';
import { Post } from './posts/post.entity';
import { Like } from './likes/likes.entity';
import { Comment } from './comments/comments.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService();
    return {
      type: 'mysql' as 'mysql',
      host: configService.get('DATABASE_HOST', 'db-server'),
      port: Number(configService.get('DATABASE_PORT')),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD') as string,
      database: configService.get('DATABASE_NAME') as string,
      entities: [User, Tag, Post, Comment, Like],
      synchronize: true,
    };
  }
}
