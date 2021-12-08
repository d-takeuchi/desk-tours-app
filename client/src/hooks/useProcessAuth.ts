import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router'

import { LoginData, SignUpData } from '../types/types'
import { useMutateAuth } from './useMutateAuth'

export const useProcessAuth = () => {
  const history = useHistory()
  const queryClient = useQueryClient()
  const { loginMutation, logoutMutation, signUpMutation,googleLoginMutation } = useMutateAuth()

  const login = async (loginData: LoginData) => {
    loginMutation.mutate(loginData)
  }

  const signUp = async (signUpData: SignUpData) => {
    signUpMutation.mutate(signUpData)
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries('posts')
    queryClient.removeQueries('tags')
    queryClient.removeQueries('user')
    history.push('/login')
  }


  const googleLogin = async (response : any) => {
    googleLoginMutation.mutate(response.profileObj)
  }

  return { login, signUp, logout, loginMutation, signUpMutation , googleLogin }
}
