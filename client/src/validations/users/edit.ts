import * as yup from "yup";

const FILE_SIZE = 1000000;

export const schema = yup
  .object({
    name: yup
      .string()
      .max(50, "50文字以下で入力してください")
      .required("この項目は必須です"),

    icon: yup
      .mixed()
      .test("fileSize", "画像ファイルを選択してください", (value) => {
        console.log("value");
        console.log(value);
        return value.length !== 0;
      })
      .test("fileSize", "画像サイズが大きいです", (value) => {
        return value.length > 0 && value[0].size <= FILE_SIZE;
      }),
  })
  .required();
