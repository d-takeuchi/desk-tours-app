import { Post } from 'src/posts/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly postId: number;

  @Column()
  readonly comment: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
