import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Tag } from 'src/tags/tags.entity'
import { UsersService } from 'src/users/users.service'
import { CreatePostDto } from './dto/create-post.dto'
import { Post } from './post.entity'
import { UpdatePostDto } from './dto/update-post.dto'
import { User } from 'src/users/users.entity'

@Injectable()
export class PostsService {
  private relations = ['tags', 'likes', 'comments', 'comments.user']
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async create(postData: CreatePostDto): Promise<Post> {
    const { title, description, imageFile, tagIds, userId } = postData
    const tags = await this.tagRepository.findByIds(tagIds)
    const user = await this.userRepository.findOne(userId)
    const post = this.postRepository.create({
      title,
      description,
      imageFile,
      tags,
      user,
    })

    return await this.postRepository.save(post)
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: this.relations,
      order: {
        id: 'DESC',
      },
    })
  }

  async findOne(postId: number): Promise<Post> {
    return await this.postRepository.findOne(postId, {
      relations: this.relations,
    })
  }

  async edit(id: number, postData: UpdatePostDto): Promise<Post> {
    const { title, description, imageFile, tagIds } = postData
    const post = await this.postRepository.findOne(id, {
      relations: this.relations,
    })
    const tags = await this.tagRepository.findByIds(tagIds)
    if (!post) {
      throw new NotFoundException()
    }
    return await this.postRepository.save({
      ...post,
      title,
      description,
      imageFile,
      tags,
    })
  }
}
