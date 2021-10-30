import * as yup from "yup";

const FILE_SIZE = 1000000;

export const schema = yup
  .object({
    title: yup
      .string()
      .max(50, "50文字以下で入力してください")
      .required("この項目は必須です"),

    description: yup
      .string()
      .max(300, "300文字以下で入力してください")
      .required("この項目は必須です"),

    tagIds: yup.array().min(1, "1つ以上選択してください"),

    imageFile: yup
      .mixed()
      .test("fileSize", "画像ファイルを選択してください", (value) => {
        return value.length !== 0;
      })
      .test("fileSize", "画像サイズが大きいです", (value) => {
        return value.length > 0 && value[0].size <= FILE_SIZE;
      }),
    // .test(
    //   "fileFormat",
    //   "Unsupported file type",
    //   (value) => value.length > 0 && SUPPORTED_FORMATS.includes(value[0].type)
    // ),
  })
  .required();
