import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'

import { LoginUserInfo } from '../types/types'

export const useQueryUser = () => {
  const history = useHistory()
  const queryClient = useQueryClient()
  const getCurrentUser = async () => {
    const { data } = await axios.get<LoginUserInfo>(
      `${process.env.REACT_APP_API_URL}/auth/getLoginUser`,
      {
        withCredentials: true,
      }
    )
    return data
  }

  return useQuery({
    queryKey: 'user',
    queryFn: getCurrentUser,
    staleTime: 1800000,
    refetchInterval: 1800000,
    onError: () => {
      queryClient.removeQueries('user')
      history.push('/login')
    },
  })
}
