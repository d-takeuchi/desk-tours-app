import { memo, VFC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { schema } from "../../../validations/signup";
import GoogleIcon from "../../atoms/GoogleIcon";
import TwitterIcon from "../../atoms/TwitterIcon";

const SignUp: VFC = memo(() => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  type FormInputData = {
    name: string;
    email: string;
    password: string;
  };

  const onSubmit = (data: FormInputData) => {
    axios
      .post("http://localhost:3000/users", data)
      .then(() => {
        toast.success("ユーザー作成成功");
        history.push("/login");
      })
      .catch((err) => {
        toast.error("ユーザー作成失敗");
      });
  };

  return (
    <section className="flex-grow flex text-blueGray-700 justify-center bg-primary">
      <div className="container items-center px-5 py-12 lg:px-20">
        <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <h1 className="text-center">新規ユーザー登録</h1>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="relative mt-4">
              <label
                htmlFor="name"
                className="text-base leading-7 text-blueGray-500"
              >
                ユーザー名
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              />
              <span className="text-xs text-red-700">
                {errors.userName?.message}
              </span>
            </div>
            <div className="relative mt-4">
              <label
                htmlFor="email"
                className="text-base leading-7 text-blueGray-500"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              />
              <span className="text-xs text-red-700">
                {errors.email?.message}
              </span>
            </div>
            <div className="relative mt-4">
              <label
                htmlFor="userName"
                className="text-base leading-7 text-blueGray-500"
              >
                パスワード
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              />
              <span className="text-xs text-red-700">
                {errors.password?.message}
              </span>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full px-16 py-2 my-2 mr-2 text-base text-white transition duration-500 ease-in-out transform bg-primaryButton border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-200"
              >
                新規登録
              </button>
            </div>
          </form>
          <p className="mx-auto mt-3 text-xs text-blueGray-500 mb-5">または</p>

          <div className="flex justify-enter\ flex-col">
            <button
              type="button"
              className="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-gray-400 hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            >
              <div className="flex items-center justify-center">
                <GoogleIcon />
                <span className="ml-4">Googleアカウントで登録</span>
              </div>
            </button>
            <button
              type="button"
              className="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-gray-400 hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 mt-5"
            >
              <div className="flex items-center justify-center">
                <TwitterIcon />
                <span className="ml-4"> Twitterアカウントで登録</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SignUp;
