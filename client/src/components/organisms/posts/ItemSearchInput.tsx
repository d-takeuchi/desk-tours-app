import axios from 'axios'
import React, { MouseEvent, useState, VFC } from 'react'

import { Item } from '../../../types/types'
import { ItemModal } from './ItemModal'

interface Props {
  addItem: (item: Item) => void
}

export const ItemSearchInput: VFC<Props> = ({ addItem }) => {
  const [itemName, setItemName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const fetchRakutenItems = async (e: MouseEvent<HTMLButtonElement>) => {
    const { data } = await axios.get<Item[]>(
      `${process.env.REACT_APP_API_URL}/items?itemName=${itemName}`
    )
    setIsModalOpen(true)
    setItems(data)
  }

  return (
    <div>
      <label
        htmlFor="tags"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        アイテム検索
      </label>
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="button"
            className="p-1 focus:outline-none focus:shadow-outline"
            onClick={fetchRakutenItems}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          className="py-2 text-sm  rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
          placeholder="（例：マウス、キーボードなど）"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <ItemModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        items={items}
        addItem={addItem}
      />
    </div>
  )
}
