import axios from 'axios'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router'

import { useAppDispatch } from '../app/hooks'
import { toggleCsrfState } from '../slices/csrfSlice'
import { Post } from '../types/types'

export const useQuerySinglePost = (id: string) => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const getSinglePost = async (id: string) => {
    const { data } = await axios.get<Post>(
      `${process.env.REACT_APP_API_URL}/posts/${id}`,
      {
        withCredentials: true,
      }
    )
    return data
  }

  return useQuery<Post, Error>({
    queryKey: ['singlePost', id],
    queryFn: () => getSinglePost(id),
    enabled: !!id,
    staleTime: 0,
    onError: (err: any) => {
      toast.error('取得失敗')
      dispatch(toggleCsrfState())
      history.push('/login')
    },
  })
}
