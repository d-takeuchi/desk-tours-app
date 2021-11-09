import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from 'src/tags/tags.entity';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    private readonly usersService: UsersService,
  ) {}

  async create(postData: CreatePostDto): Promise<Post> {
    const { title, description, imageFile, tagIds, email } = postData;
    const tags = await this.tagRepository.findByIds(tagIds);
    const user = await this.usersService.findByEmail(email);
    const post = this.postRepository.create({
      title,
      description,
      imageFile,
      tags,
      user,
    });

    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['tags'] });
  }

  async findOne(postId: number): Promise<Post> {
    return await this.postRepository.findOne(postId, { relations: ['tags'] });
  }

  async getNewArrivalPosts(): Promise<Post[]> {
    return await this.postRepository.find({
      order: { createdAt: 'DESC' },
      take: 3,
    });
  }
}
