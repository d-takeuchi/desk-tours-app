import * as yup from "yup";

export const schema = yup
  .object({
    userName: yup.string().max(20).required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
