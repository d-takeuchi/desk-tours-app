import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/users.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Post, (post) => post.likes, {
    eager: true,
  })
  @JoinColumn({ name: 'postId' })
  public post!: Post;

  @ManyToOne(() => User, (user) => user.likes, {
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  public user!: User;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
