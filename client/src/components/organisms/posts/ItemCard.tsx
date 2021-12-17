import React, { VFC } from 'react'
import { Item } from '../../../types/types'

interface Props {
  item: Item
}

export const ItemCard: VFC<Props> = (props) => {
  const { item } = props
  return (
    <div className="inline-block px-3">
      <div className="bg-gray-900 w-full max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-5">
        <div className="flex flex-col">
          <a href={item.itemUrl} target={'_blank'} rel="noreferrer">
            <img
              src={item.itemImageUrl}
              alt="アイテム"
              className="object-cover object-center w-full md:h-60 rounded-t-xl"
            />
          </a>
          <div className="flex-auto justify-evenly">
            <div className="flex flex-wrap ">
              <div className="flex items-center w-full justify-between min-w-0 ">
                <h3 className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-purple-500 truncate ">
                  {item.itemName}
                </h3>
              </div>
            </div>
            <div className="text-sm text-white my-2">
              {`楽天価格${item.itemPrice}円（税込）`}
            </div>
            <div className="flex space-x-2 text-sm font-medium justify-start">
              <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                <span>アイテムを追加</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
