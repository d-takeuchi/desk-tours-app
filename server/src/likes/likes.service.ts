import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Post } from 'src/posts/entities/post.entity'
import { PostsService } from 'src/posts/posts.service'
import { FavoriteDto } from './dto/favorite.dto'
import { Like } from './entities/likes.entity'
import { User } from 'src/users/entities/users.entity'

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly postsService: PostsService
  ) {}

  public async toggleLike({ userId, postId }: FavoriteDto): Promise<Post> {
    const user = await this.userRepository.findOne(userId)
    const like = await this.likeRepository.findOne({
      userId: user.id,
      postId,
    })

    if (like) {
      await this.likeRepository.remove(like)
    } else {
      const newLike = this.likeRepository.create({
        userId: user.id,
        postId,
      })
      await this.likeRepository.save(newLike)
    }
    return await this.postsService.findOne(postId)
  }
}
