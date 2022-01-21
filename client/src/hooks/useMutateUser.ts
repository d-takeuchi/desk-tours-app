import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'

import { useAppDispatch } from '../app/hooks'
import { toggleCsrfState } from '../slices/csrfSlice'
import { LoginUserInfo, UpdateUserData } from '../types/types'
import { useProcessAuth } from './useProcessAuth'

export const useMutateUser = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { logout } = useProcessAuth()

  const updateUserMutation = useMutation(
    async (user: UpdateUserData) =>
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${user.id}`,
        user,
        { withCredentials: true }
      ),
    {
      onSuccess: (res) => {
        toast.success('更新成功')
        queryClient.setQueryData<LoginUserInfo>('user', res.data)
        history.push('/')
      },
      onError: (err: any) => {
        toast.error('更新失敗')
        dispatch(toggleCsrfState())
        if (err.response.data.message === 'Unauthorized') {
          toast.error('ログインしてください')
          logout()
        }
      },
    }
  )

  return { updateUserMutation }
}
