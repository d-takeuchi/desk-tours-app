import * as yup from 'yup'

export const schema = yup
  .object({
    name: yup
      .string()
      .max(50, '50文字以下で入力してください')
      .required('この項目は必須です'),
    icon: yup.lazy((value) =>
      /^data/.test(value)
        ? yup
            .string()
            .trim()
            .matches(
              /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
              '選択したデータに問題があります'
            )
            .required('この項目は必須です')
        : yup
            .string()
            .trim()
            .url('有効なデータではありません')
            .required('この項目は必須です')
    ),
  })
  .required()
