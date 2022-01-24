import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { UpdateUserData } from '../types/types'
import { schema } from '../validations/users/edit'
import { useMutateUser } from './useMutateUser'

export const useProcessUser = () => {
  const [icon, setIcon] = useState('')
  const { updateUserMutation } = useMutateUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserData>({
    shouldUnregister: false,
    resolver: yupResolver(schema),
  })

  const updateUser = (user: UpdateUserData) => {
    updateUserMutation.mutate(user)
  }

  return {
    icon,
    setIcon,
    register,
    handleSubmit,
    setValue,
    errors,
    updateUser,
  }
}
