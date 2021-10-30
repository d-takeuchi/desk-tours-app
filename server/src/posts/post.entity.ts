import { Comment } from 'src/comments/comments.entity';
import { Tag } from 'src/tags/tags.entity';
import { User } from 'src/users/users.entity';
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
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('mediumtext')
  imageFile: string;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'post_tags' })
  tags: Tag[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'likes' })
  likes: User[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
