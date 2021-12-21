import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class ItemsService {
  public async fetchRakutenItems(itemName: string) {
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
            id: item.Item.itemCode,
            name: item.Item.itemName,
            url: item.Item.itemUrl,
            imageUrl: item.Item.mediumImageUrls[0].imageUrl,
            price: item.Item.itemPrice,
          },
        ]
      })
      return items
    } catch (error) {
      throw new Error()
    }
  }
}
