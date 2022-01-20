import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ItemsController } from './items.controller'
import { Item } from './entities/items.entity'
import { ItemsService } from './items.service'

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [TypeOrmModule],
})
export class ItemsModule {}
