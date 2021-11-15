import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/users.entity';

@Entity({ name: 'likes' })
@Unique(['userId', 'postId'])
export class Like {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Post, (post) => post.likes, {
    eager: true,
    nullable: false,
  })
  public post!: Post;

  @Column()
  readonly postId: number;

  @ManyToOne(() => User, (user) => user.likes, {
    eager: true,
    nullable: false,
  })
  public user!: User;

  @Column()
  readonly userId: number;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
