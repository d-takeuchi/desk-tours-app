import { Controller, Get, Query } from '@nestjs/common'
import axios from 'axios'

@Controller('items')
export class ItemsController {
  @Get()
  public async fetchRakutenItems(@Query() query: { itemName: string }) {
    const { itemName } = query

    const uri = encodeURI(
      `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${process.env.RAKUTEN_APP_ID}&keyword=${itemName}`
    )

    try {
      const { data } = await axios.get(uri)
      let items = []

      data.Items.map((item) => {
        items = [
          ...items,
          {
            itemCode: item.Item.itemCode,
            itemName: item.Item.itemName,
            itemUrl: item.Item.itemUrl,
            itemImageUrl: item.Item.mediumImageUrls[0].imageUrl,
            itemPrice: item.Item.itemPrice,
          },
        ]
      })
      return items
    } catch (error) {
      console.log(error)
    }
  }
}
