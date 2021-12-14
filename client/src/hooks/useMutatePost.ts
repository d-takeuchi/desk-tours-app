import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'

import { useAppDispatch } from '../app/hooks'
import { toggleCsrfState } from '../slices/csrfSlice'
import {
  CommentData,
  CreatePostData,
  LoginUserInfo,
  Post,
  SearchParams,
  UpdatePostData,
  FavoriteData,
} from '../types/types'
import { useProcessAuth } from './useProcessAuth'

export const useMutatePost = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<LoginUserInfo>('user')
  const { logout } = useProcessAuth()

  const createPostMutation = useMutation(
    (post: CreatePostData) =>
      axios.post<Post>(
        `${process.env.REACT_APP_API_URL}/posts`,
        { ...post, userId: user?.id },
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData('posts', [...previousPosts, res.data])
        }
        toast.success('投稿成功')
        history.push('/posts')
      },
      onError: (err: any) => {
        toast.error('投稿失敗')
        dispatch(toggleCsrfState())
        if (err.response.data.message === 'Unauthorized') {
          logout()
        }
      },
    }
  )

  const updatePostMutation = useMutation(
    (post: UpdatePostData) =>
      axios.put<Post>(
        `${process.env.REACT_APP_API_URL}/posts/${post.id}`,
        post,
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.map((post) =>
              post.id === variables.id ? res.data : post
            )
          )
        }
        toast.success('更新成功')
        history.push('/posts')
      },
      onError: (err: any) => {
        toast.error('更新失敗')
        dispatch(toggleCsrfState())
        if (err.response.data.message === 'Unauthorized') {
          logout()
        }
      },
    }
  )

  const deletePostMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (res, variables) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.filter((post) => post.id !== variables)
          )
        }
        toast.success('削除成功')
        history.push('/posts')
      },
      onError: (err: any) => {
        toast.error('削除失敗')
        dispatch(toggleCsrfState())
        if (err.response.data.message === 'Unauthorized') {
          logout()
        }
      },
    }
  )

  const createCommentMutation = useMutation(
    (comment: CommentData) =>
      axios.post<Post>(`${process.env.REACT_APP_API_URL}/comments`, comment, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        queryClient.setQueryData<Post>(
          ['singlePost', String(res.data.id)],
          res.data
        )
      },
      onError: (err: any) => {
        toast.error('コメント投稿失敗')
        dispatch(toggleCsrfState())
        if (err.response.data.message === 'Unauthorized') {
          logout()
        }
      },
    }
  )

  const searchPostsMutation = useMutation(
    ({ title }: SearchParams) =>
      axios.get<Post[]>(
        `${process.env.REACT_APP_API_URL}/posts?title=${title}`
      ),
    {
      onSuccess: (res) => {
        queryClient.setQueryData<Post[]>('posts', res.data)
      },
    }
  )

  const toggleFavoriteMutation = useMutation(
    ({ userId, postId }: FavoriteData) =>
      axios.post<Post>(
        'http://localhost:3000/likes',
        {
          userId,
          postId,
        },
        { withCredentials: true }
      ),
    {
      onSuccess: (res) => {
        queryClient.setQueryData<Post>(
          ['singlePost', String(res.data.id)],
          res.data
        )
      },
      onError: (err: any) => {
        toast.error('いいね失敗')
        dispatch(toggleCsrfState())
        if (err.response.data.message === 'Unauthorized') {
          logout()
        }
      },
    }
  )

  return {
    createPostMutation,
    updatePostMutation,
    deletePostMutation,
    createCommentMutation,
    searchPostsMutation,
    toggleFavoriteMutation,
  }
}
