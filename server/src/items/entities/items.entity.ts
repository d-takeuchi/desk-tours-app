import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'items' })
export class Item {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  url: string

  @Column()
  imageUrl: string

  @Column()
  price: string
}
