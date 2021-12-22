import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutatePost } from './useMutatePost'
import { CreatePostData, Item, UpdatePostData } from '../types/types'
import { schema } from '../validations/posts/create'

export const useProcessPost = () => {
  const { createPostMutation, updatePostMutation, deletePostMutation } =
    useMutatePost()
  const [deskImageUrl, setDeskImageUrl] = useState('')

  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  const addItem = (item: Item) => {
    if (!selectedItems.find((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems([...selectedItems, item])
    }
  }

  const removeItem = (itemCode: string) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.id !== itemCode)
    )
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreatePostData>({
    shouldUnregister: false,
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      tagIds: [],
      imageFile: '',
      description: '',
      items: [],
    },
  })

  const createPost = (post: CreatePostData) => {
    createPostMutation.mutate({ ...post, items: selectedItems })
  }

  const updatePost = (post: UpdatePostData) => {
    updatePostMutation.mutate({ ...post, items: selectedItems })
  }

  const deletePost = (id: number) => {
    deletePostMutation.mutate(id)
  }

  return {
    createPost,
    updatePost,
    deletePost,
    register,
    handleSubmit,
    setValue,
    errors,
    deskImageUrl,
    setDeskImageUrl,
    addItem,
    removeItem,
    selectedItems,
    setSelectedItems,
  }
}
