import * as yup from 'yup'

export const schema = yup
  .object({
    comment: yup
      .string()
      .max(255, '255文字以下で入力してください')
      .min(1, '1文字以上入力してください'),
    userId: yup.string().required(),
    postId: yup.string().required(),

  })
  .required()
