import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly postId: number;

  @Column()
  readonly userId: number;

  @Column()
  readonly comment: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;
}
