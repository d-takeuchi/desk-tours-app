import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from 'src/posts/post.entity';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create({ comment, postId, email }: CreateCommentDto): Promise<Comment> {
    const post = await this.postRepository.findOne(postId);
    const user = await this.usersService.findByEmail(email);
    const newComment = this.commentRepository.create({ comment, post, user });

    return await this.commentRepository.save(newComment);
  }
}
