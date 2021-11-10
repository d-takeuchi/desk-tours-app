import { memo, useContext, VFC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import toast from "react-hot-toast";

import { schema } from "../../../validations/login";
import { DecodedToken } from "../../../types/types";
import { AuthContext } from "../../../providers/AuthProvider";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Profile } from "../../../types/users/profile";
import TwitterIcon from "../../atoms/TwitterIcon";
import GoogleIcon from "../../atoms/GoogleIcon";

const Login: VFC = memo(() => {
  const history = useHistory();
  const { setIsAuth } = useContext(AuthContext);
  const { setProfile } = useContext(LoginUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  type FormInputData = {
    email: string;
    password: string;
  };

  const onSubmit = async (data: FormInputData) => {
    try {
      const loginResponse = await axios.post<{ access_token: string }>(
        `http://localhost:3000/auth/login`,
        data
      );
      const decodedToken: DecodedToken = jwt(loginResponse.data.access_token);
      localStorage.setItem("app-auth", loginResponse.data.access_token);
      localStorage.setItem("app-meta", JSON.stringify(decodedToken));

      const loginUser = await axios.get<Profile>(
        `http://localhost:3000/users/${decodedToken.email}`
      );
      setProfile(loginUser.data);
      toast.success("ログイン成功");
      setIsAuth(true);
      history.push("/");
    } catch (error) {
      toast.error("ログイン失敗");
    }
  };

  return (
    <section className="flex-grow flex text-blueGray-700 justify-center bg-primary">
      <div className="container items-center px-5 py-12 lg:px-20">
        <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <h1 className="text-center">ログイン</h1>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
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
                className="w-full px-16 py-2 my-2 mr-2 text-base text-white transition duration-500 ease-in-out transform bg-primaryButton border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-200 "
              >
                ログイン
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
                <span className="ml-4">Googleアカウントでログイン</span>
              </div>
            </button>
            <button
              type="button"
              className="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-gray-400 hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 mt-5"
            >
              <div className="flex items-center justify-center">
                <TwitterIcon />
                <span className="ml-4"> Twitterアカウントでログイン</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Login;
