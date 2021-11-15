import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from 'src/posts/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { FavoriteDto } from './dto/favorite.dto';
import { Like } from './likes.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  public async toggleLike({ email, postId }: FavoriteDto): Promise<Post> {
    const user = await this.usersService.findByEmail(email);

    const like = await this.likeRepository.findOne({
      userId: user.id,
      postId,
    });

    if (like) {
      await this.likeRepository.remove(like);
    } else {
      const newLike = this.likeRepository.create({
        userId: user.id,
        postId,
      });
      await this.likeRepository.save(newLike);
    }
    return await this.postsService.findOne(postId);
  }
}
