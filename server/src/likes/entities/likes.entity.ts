import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

import { Post } from 'src/posts/entities/post.entity'
import { User } from 'src/users/entities/users.entity'

@Entity({ name: 'likes' })
@Unique(['userId', 'postId'])
export class Like {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => Post, (post) => post.likes, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  public post!: Post

  @Column()
  readonly postId: number

  @ManyToOne(() => User, (user) => user.likes, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  public user!: User

  @Column()
  readonly userId: number

  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date
}
