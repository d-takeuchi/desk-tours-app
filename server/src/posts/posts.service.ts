import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'

import { Tag } from 'src/tags/entities/tags.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { Post } from './entities/post.entity'
import { UpdatePostDto } from './dto/update-post.dto'
import { User } from 'src/users/entities/users.entity'
import { SearchParamsDto } from './dto/search-params.dto'
import { PhotoService } from 'src/photo/photo.service'
import { Item } from 'src/items/entities/items.entity'

@Injectable()
export class PostsService {
  private relations = ['tags', 'likes', 'comments', 'comments.user', 'items']
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly photoService: PhotoService
  ) {}

  public async create(postData: CreatePostDto) {
    const { title, description, imageFile, tagIds, userId, items } = postData

    const tags = await this.tagRepository.findByIds(tagIds)
    const user = await this.userRepository.findOne(userId)

    items.map(async (item) => {
      if (!(await this.itemRepository.findOne(item.id))) {
        const newItem = this.itemRepository.create(item)
        await this.itemRepository.save(newItem)
      }
    })

    let post = this.postRepository.create({
      title,
      description,
      imageFileUrl: '',
      tags,
      user,
      items: items.map((item) => ({
        id: item.id,
      })),
    })
    post = await this.postRepository.save(post)

    const imageFileUrl = await this.photoService.uploadPhoto(
      `post-${post.id}`,
      imageFile
    )
    post.imageFileUrl = imageFileUrl
    return await this.postRepository.save(post)
  }

  public async findAll({ title }: SearchParamsDto): Promise<Post[]> {
    return await this.postRepository.find({
      relations: this.relations,
      order: {
        id: 'DESC',
      },
      where: {
        title: Like(`%${title}%`),
      },
    })
  }

  public async findOne(postId: number): Promise<Post> {
    return await this.postRepository.findOne(postId, {
      relations: this.relations,
    })
  }

  public async edit(id: number, postData: UpdatePostDto): Promise<Post> {
    const { title, description, imageFile, tagIds, items } = postData
    const post = await this.postRepository.findOne(id, {
      relations: this.relations,
    })
    const tags = await this.tagRepository.findByIds(tagIds)
    if (!post) {
      throw new NotFoundException()
    }
    const imageFileUrl = await this.photoService.uploadPhoto(
      `post-${id}`,
      imageFile
    )
    items.map(async (item) => {
      if (!(await this.itemRepository.findOne(item.id))) {
        const newItem = this.itemRepository.create(item)
        await this.itemRepository.save(newItem)
      }
    })
    post.imageFileUrl = imageFileUrl
    return await this.postRepository.save({
      ...post,
      title,
      description,
      imageFileUrl,
      tags,
      items: items.map((item) => ({
        id: item.id,
      })),
    })
  }

  public async delete(id: number) {
    return await this.postRepository.delete({ id })
  }
}
