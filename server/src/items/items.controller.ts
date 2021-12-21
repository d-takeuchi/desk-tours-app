import { Controller, Get, Query } from '@nestjs/common'

import { ItemsService } from './items.service'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  public async fetchRakutenItems(@Query() query: { itemName: string }) {
    const { itemName } = query

    if (!itemName) {
      return null
    }

    return this.itemsService.fetchRakutenItems(itemName)
  }
}
