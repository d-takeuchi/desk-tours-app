import {
  AfterLoad,
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
  RelationId,
  UpdateDateColumn,
} from 'typeorm'

import { Comment } from 'src/comments/comments.entity'
import { Like } from 'src/likes/likes.entity'
import { Tag } from 'src/tags/tags.entity'
import { User } from 'src/users/users.entity'
import { Item } from 'src/items/items.entity'

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column('text')
  imageFileUrl: string

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User

  @RelationId((post: Post) => post.user)
  userId: number

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'post_tags' })
  tags: Tag[]

  @ManyToMany(() => Item)
  @JoinTable({ name: 'post_items' })
  items: Item[]

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

  @AfterLoad()
  cacheBustingImageUrl(): void {
    const now = new Date()
    this.imageFileUrl = `${this.imageFileUrl}?${now.getTime()}`
  }
}
