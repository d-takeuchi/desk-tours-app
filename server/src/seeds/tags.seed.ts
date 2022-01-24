import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'

import { Tag } from 'src/tags/entities/tags.entity'

export default class CreateTags implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tag)
      .values([
        { id: 1, name: '#エンジニア' },
        { id: 2, name: '#デザイナー' },
        { id: 3, name: '#ゲーマー' },
      ])
      .execute()
  }
}
