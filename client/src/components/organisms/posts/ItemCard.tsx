import React, { VFC } from 'react'

import { Item } from '../../../types/types'

interface Props {
  item: Item
  addItem?: (item: Item) => void
  removeItem?: (itemCode: string) => void
}

export const ItemCard: VFC<Props> = (props) => {
  const { item, addItem, removeItem } = props

  return (
    <div className="inline-block p-3">
      <div className="bg-gray-800 w-3/4 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-5">
        <div className="flex flex-col">
          <a href={item.url} target={'_blank'} rel="noreferrer">
            <img
              src={item.imageUrl}
              alt="アイテム"
              className="object-contain object-center mx-auto"
            />
          </a>
          <div className="flex-auto justify-evenly">
            <div className="flex flex-wrap ">
              <div className="flex items-center w-full justify-between min-w-0 ">
                <h3 className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-purple-500 truncate ">
                  {item.name}
                </h3>
              </div>
            </div>
            <div className="text-sm text-white my-2">
              {`楽天価格${item.price}円（税込）`}
            </div>
            <div className="flex space-x-2 text-sm font-medium justify-start">
              {addItem && (
                <button
                  type="button"
                  className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0  bg-primaryButton px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-gray-200 "
                  onClick={() => addItem(item)}
                >
                  アイテムを追加
                </button>
              )}
              {removeItem && (
                <button
                  type="button"
                  className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0  bg-red-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-gray-200 "
                  onClick={() => removeItem(item.id)}
                >
                  アイテムを削除
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
