import * as yup from 'yup'

export const schema = yup
  .object({
    name: yup.string().max(20).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required()
