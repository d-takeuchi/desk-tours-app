import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'

import { useAppDispatch } from '../app/hooks'
import { toggleCsrfState } from '../slices/csrfSlice'
import { LoginData, LoginUserInfo, SignUpData } from '../types/types'

export const useMutateAuth = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const loginMutation = useMutation(
    async (loginData: LoginData) =>
      await axios.post<LoginUserInfo>(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginData,
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res) => {
        queryClient.setQueryData('user', res.data)
        toast.success('ログイン成功')
        history.push('/')
      },
      onError: (err: any) => {
        toast.error('ログイン失敗')
        if (err.response.data.message === 'invalid csrf token') {
          dispatch(toggleCsrfState())
        }
      },
    }
  )

  const signUpMutation = useMutation(
    async (signUpData: SignUpData) =>
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        { ...signUpData, icon: '' },
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: () => {
        toast.success('本人確認メールを送信しました。\nご確認ください。')
        history.push('/login')
      },
      onError: (err: any) => {
        toast.error('ユーザー作成失敗')
        if (err.response.data.message === 'invalid csrf token') {
          dispatch(toggleCsrfState())
        }
      },
    }
  )

  const logoutMutation = useMutation(
    async () =>
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: () => {
        history.push('/login')
      },
      onError: (err: any) => {
        toast.error('ログアウト失敗')
        if (err.response.data.message === 'invalid csrf token') {
          dispatch(toggleCsrfState())
          history.push('/login')
        }
      },
    }
  )

  return { loginMutation, signUpMutation, logoutMutation }
}
