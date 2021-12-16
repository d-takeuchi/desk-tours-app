import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm'
import * as isBase64 from 'is-base64'

import { Comment } from 'src/comments/comments.entity'
import { Like } from 'src/likes/likes.entity'
import { Post } from 'src/posts/post.entity'

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20 })
  name: string

  @Column({ length: 128 })
  password: string

  @Column({ length: 50 })
  email: string

  @Column('text', { nullable: true })
  icon: string

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date

  @Column({ nullable: true })
  emailVerifiedAt?: Date

  @AfterLoad()
  cacheBustingIcon(): void {
    if (!isBase64(this.icon, { allowMime: true })) {
      const now = new Date()
      this.icon = `${this.icon}?${now.getTime()}`
    }
  }
}
