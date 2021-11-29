import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationCount,
  UpdateDateColumn,
} from 'typeorm'

import { Comment } from 'src/comments/comments.entity'
import { Like } from 'src/likes/likes.entity'
import { Tag } from 'src/tags/tags.entity'
import { User } from 'src/users/users.entity'

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column('mediumtext')
  imageFile: string

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'post_tags' })
  tags: Tag[]

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[]

  @RelationCount('likes')
  likesCount?: number

  @RelationCount('comments')
  commentsCount?: number

  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date
}
