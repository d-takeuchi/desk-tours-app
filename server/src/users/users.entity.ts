import { Post } from 'src/posts/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 128 })
  password: string;

  @Column({ length: 50 })
  email: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
