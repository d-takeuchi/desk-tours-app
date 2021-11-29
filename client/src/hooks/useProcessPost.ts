import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutatePost } from './useMutatePost'
import { CommentData, CreatePostData, UpdatePostData } from '../types/types'
import { schema } from '../validations/posts/create'

export const useProcessPost = () => {
  const { createPostMutation, updatePostMutation,deletePostMutation,createCommentMutation } = useMutatePost()
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

  const createComment = (comment:CommentData) => {
    createCommentMutation.mutate(comment)
  }

  return {
    createPost,
    updatePost,
    deletePost,
    createComment,
    register,
    handleSubmit,
    setValue,
    errors,
    deskImageUrl,
    setDeskImageUrl,
  }
}
