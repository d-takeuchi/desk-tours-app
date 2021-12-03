import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutatePost } from './useMutatePost'
import { CreatePostData, UpdatePostData } from '../types/types'
import { schema } from '../validations/posts/create'

export const useProcessPost = () => {
  const { createPostMutation, updatePostMutation,deletePostMutation } = useMutatePost()
  const [deskImageUrl, setDeskImageUrl] = useState('')
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
    },
  })

  const createPost = (post: CreatePostData) => {
    createPostMutation.mutate(post)
  }

  const updatePost = (post: UpdatePostData) => {
    updatePostMutation.mutate(post)
  }

  const deletePost = (id:number) => {
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
  }
}
