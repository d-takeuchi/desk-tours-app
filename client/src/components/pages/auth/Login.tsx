import { VFC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import GoogleLogin from 'react-google-login'

import { schema } from '../../../validations/auth/login'
import TwitterIcon from '../../atoms/TwitterIcon'
import { useProcessAuth } from '../../../hooks/useProcessAuth'
import GoogleIcon from '../../atoms/GoogleIcon'

export const Login: VFC = () => {
  const { login, googleLogin } = useProcessAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  return (
    <section className="flex-grow flex text-blueGray-700 justify-center bg-primary min-h-screen items-center">
      <div className="container items-center px-5 py-12 lg:px-20">
        <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <h1 className="text-center">ログイン</h1>
          <form onSubmit={handleSubmit(login)} autoComplete="off">
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
                {...register('email')}
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
                {...register('password')}
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

          <div className="flex justify-center flex-col">
            <GoogleLogin
              clientId="150873333936-vbk9fj9jf8gtssmi9bj6p879tv3bh9go.apps.googleusercontent.com"
              buttonText="Googleアカウントでログイン"
              onSuccess={googleLogin}
              onFailure={googleLogin}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-gray-400 hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 mt-5"
                >
                  <div className="flex items-center justify-center w-full">
                    <GoogleIcon />

                    <span className="ml-4">Googleアカウントでログイン</span>
                  </div>
                </button>
              )}
            />
            <button
              type="button"
              className="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-gray-400 hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 mt-5"
              onClick={() =>
                (window.location.href = `${process.env.REACT_APP_API_URL}/auth/twitter`)
              }
            >
              <div className="flex items-center justify-center w-full">
                <TwitterIcon />
                <span className="ml-4">Twitterアカウントでログイン</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
