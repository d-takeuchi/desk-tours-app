import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from 'src/posts/post.entity';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/users/users.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly postsService:PostsService
  ) {}

  async create({ comment, postId,userId  }: CreateCommentDto): Promise<Post> {
    const post = await this.postRepository.findOne(postId);
    const user = await this.userRepository.findOne(userId);
    const newComment = this.commentRepository.create({ comment, post, user });

    await this.commentRepository.save(newComment);
    return await this.postsService.findOne(post.id)
  }
}
