import React, { Dispatch, SetStateAction, VFC } from 'react'
import { Item } from '../../../types/types'
import { ItemCard } from './ItemCard'

interface Props {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  items: Item[]
  addItem: (item: Item) => void
}

export const ItemModal: VFC<Props> = (props) => {
  const { setIsModalOpen, isModalOpen, items, addItem } = props

  return (
    <>
      {isModalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 max-w-xs md:max-w-2xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">アイテム検索結果</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap">
                      {items &&
                        items.map((item) => (
                          <ItemCard
                            key={item.id}
                            item={item}
                            addItem={addItem}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
