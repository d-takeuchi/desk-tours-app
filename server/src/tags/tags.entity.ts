import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryColumn()
  readonly id: number;

  @Column()
  readonly name: string;
}
