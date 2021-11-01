import { VFC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { schema } from "../../validations/signup";
const SignUp: VFC = () => {
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
    console.log(data);
    axios
      .post("http://localhost:3000/users", data)
      .then(() => {
        toast.success("ユーザー作成成功");
        history.push("/login");
      })
      .catch((err) => {
        toast.error("ユーザー作成失敗");
        console.error(err);
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    ></path>
                  </defs>
                  <clipPath id="b">
                    <use xlinkHref="#a" overflow="visible"></use>
                  </clipPath>
                  <path
                    clipPath="url(#b)"
                    fill="#FBBC05"
                    d="M0 37V11l17 13z"
                  ></path>
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  ></path>
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  ></path>
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  ></path>
                </svg>
                <span className="ml-4">Googleアカウントで登録</span>
              </div>
            </button>
            <button
              type="button"
              className="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-gray-400 hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 mt-5"
            >
              <div className="flex items-center justify-center">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
                <span className="ml-4"> Twitterアカウントで登録</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
