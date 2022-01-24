import axios from 'axios'
import { useQuery } from 'react-query'
import { Post } from '../types/types'

export const useQueryPosts = () => {
  const getPosts = async () => {
    const { data } = await axios.get<Post[]>(
      `${process.env.REACT_APP_API_URL}/posts?title=`
    )

    return data
  }
  return useQuery<Post[], Error>({
    queryKey: 'posts',
    queryFn: getPosts,
    staleTime: 0,
  })
}
