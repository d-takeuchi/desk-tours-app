import axios from 'axios'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router'

import { LoginUserInfo } from '../types/types'

export const useQueryUser = () => {
  const history = useHistory()
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
    staleTime: 3600000,
    cacheTime: 3600000,
    refetchInterval: 3600000,
    onError: () => history.push('/login'),
  })
}
